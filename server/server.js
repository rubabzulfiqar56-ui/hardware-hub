const express = require("express");
const cors = require("cors");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const rateLimit = require("express-rate-limit");
const path = require("path");
const dotenv = require("dotenv");

// ==========================================
// LOAD ENVIRONMENT VARIABLES
// ==========================================

dotenv.config({
  path: path.join(__dirname, ".env"),
});

// ==========================================
// APP CONFIGURATION
// ==========================================

const app = express();
const PORT = process.env.PORT || 5000;

// ==========================================
// CHECK ENV VARIABLES
// ==========================================

console.log("=================================");
console.log("🔍 Checking environment variables...");
console.log("EMAIL_USER:", process.env.EMAIL_USER || "❌ MISSING");
console.log(
  "EMAIL_PASS:",
  process.env.EMAIL_PASS ? "✅ LOADED" : "❌ MISSING"
);
console.log(
  "OTP_SECRET:",
  process.env.OTP_SECRET ? "✅ LOADED" : "❌ MISSING"
);
console.log("=================================");

// Stop server if required credentials are missing
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.error("❌ ERROR: EMAIL_USER or EMAIL_PASS is missing.");
  console.error("Please check: server/.env");
  process.exit(1);
}

if (!process.env.OTP_SECRET) {
  console.error("❌ ERROR: OTP_SECRET is missing.");
  console.error("Please check: server/.env");
  process.exit(1);
}

// ==========================================
// MIDDLEWARE
// ==========================================

// Allow Vite frontend on localhost
app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

// ==========================================
// OTP RATE LIMITER
// ==========================================

const otpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,

  standardHeaders: true,
  legacyHeaders: false,

  message: {
    success: false,
    message: "Too many OTP requests. Please try again later.",
  },
});

// ==========================================
// TEMPORARY OTP STORAGE
// ==========================================

const otpStore = new Map();

// ==========================================
// CONTACT MESSAGE STORAGE
// ==========================================

// Contact messages are stored temporarily in memory.
// They will be cleared when the server restarts.

const contactMessages = [];

// ==========================================
// GMAIL TRANSPORTER
// ==========================================

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ==========================================
// VERIFY GMAIL CONNECTION
// ==========================================

transporter.verify((error) => {
  if (error) {
    console.error("=================================");
    console.error("❌ Gmail SMTP connection failed!");
    console.error("Message:", error.message);
    console.error("Code:", error.code);
    console.error("=================================");
  } else {
    console.log("=================================");
    console.log("✅ Gmail SMTP connection successful!");
    console.log(`📧 Sender: ${process.env.EMAIL_USER}`);
    console.log("=================================");
  }
});

// ==========================================
// GENERATE OTP
// ==========================================

function generateOTP() {
  return crypto.randomInt(100000, 1000000).toString();
}

// ==========================================
// HASH OTP
// ==========================================

function hashOTP(otp) {
  return crypto
    .createHash("sha256")
    .update(otp + process.env.OTP_SECRET)
    .digest("hex");
}

// ==========================================
// HEALTH CHECK
// ==========================================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Hardware Hub OTP server is running!",
  });
});

// ==========================================
// REQUEST OTP
// ==========================================

app.post(
  "/api/auth/forgot-password/request-otp",
  otpLimiter,
  async (req, res) => {
    try {
      const { email } = req.body;

      // Check email
      if (!email) {
        return res.status(400).json({
          success: false,
          message: "Email is required.",
        });
      }

      // Normalize email
      const normalizedEmail = email.trim().toLowerCase();

      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(normalizedEmail)) {
        return res.status(400).json({
          success: false,
          message: "Please enter a valid email address.",
        });
      }

      console.log("=================================");
      console.log(`📧 OTP requested for: ${normalizedEmail}`);

      // Generate OTP
      const otp = generateOTP();

      // Hash OTP before storing
      const otpHash = hashOTP(otp);

      // Store OTP for 5 minutes
      otpStore.set(normalizedEmail, {
        otpHash,
        expiresAt: Date.now() + 5 * 60 * 1000,
        attempts: 0,
      });

      console.log("🔐 OTP generated");
      console.log("⏰ OTP expires in 5 minutes");
      console.log("=================================");

      // ==========================================
      // OTP EMAIL
      // ==========================================

      const mailOptions = {
        from: `"Hardware Hub" <${process.env.EMAIL_USER}>`,
        to: normalizedEmail,

        subject: "Hardware Hub - Password Reset OTP",

        text: `Your Hardware Hub password reset OTP is: ${otp}

This OTP is valid for 5 minutes.

If you did not request a password reset, please ignore this email.`,

        html: `
          <div style="
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: 40px auto;
            padding: 30px;
            border: 1px solid #ddd;
            border-radius: 12px;
            background: #ffffff;
          ">

            <h2 style="color: #1d4ed8;">
              Hardware Hub
            </h2>

            <p>
              You requested a password reset for your Hardware Hub account.
            </p>

            <p>
              Your verification OTP is:
            </p>

            <div style="
              font-size: 32px;
              font-weight: bold;
              letter-spacing: 8px;
              padding: 18px;
              background: #f3f4f6;
              text-align: center;
              margin: 25px 0;
              border-radius: 8px;
              color: #111827;
            ">
              ${otp}
            </div>

            <p>
              This OTP will expire in
              <strong>5 minutes</strong>.
            </p>

            <p>
              If you did not request this password reset,
              you can safely ignore this email.
            </p>

            <p>
              Regards,<br>
              <strong>Hardware Hub Team</strong>
            </p>

          </div>
        `,
      };

      // ==========================================
      // SEND OTP EMAIL
      // ==========================================

      const info = await transporter.sendMail(mailOptions);

      console.log("=================================");
      console.log("✅ OTP EMAIL SENT SUCCESSFULLY");
      console.log(`📧 To: ${normalizedEmail}`);
      console.log(`📨 Message ID: ${info.messageId}`);
      console.log("=================================");

      return res.status(200).json({
        success: true,
        message: "OTP has been sent to your email.",
      });
    } catch (error) {
      console.error("=================================");
      console.error("❌ EMAIL / OTP ERROR");
      console.error("Message:", error.message);
      console.error("Code:", error.code);
      console.error("Command:", error.command);
      console.error("=================================");

      return res.status(500).json({
        success: false,
        message: "Unable to send OTP email.",
      });
    }
  }
);

// ==========================================
// VERIFY OTP
// ==========================================

app.post("/api/auth/forgot-password/verify-otp", (req, res) => {
  try {
    const { email, otp } = req.body;

    // Validate
    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const submittedOTP = otp.toString().trim();

    // Get OTP
    const record = otpStore.get(normalizedEmail);

    if (!record) {
      return res.status(400).json({
        success: false,
        message: "OTP not found or expired.",
      });
    }

    // Check expiry
    if (Date.now() > record.expiresAt) {
      otpStore.delete(normalizedEmail);

      return res.status(400).json({
        success: false,
        message: "OTP has expired.",
      });
    }

    // Increase attempts
    record.attempts++;

    // Maximum attempts
    if (record.attempts > 5) {
      otpStore.delete(normalizedEmail);

      return res.status(400).json({
        success: false,
        message: "Too many incorrect attempts.",
      });
    }

    // Hash submitted OTP
    const submittedHash = hashOTP(submittedOTP);

    // Compare
    if (submittedHash !== record.otpHash) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP.",
      });
    }

    // OTP verified
    otpStore.delete(normalizedEmail);

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Store reset token for 10 minutes
    otpStore.set(`reset:${normalizedEmail}`, {
      resetToken,
      expiresAt: Date.now() + 10 * 60 * 1000,
    });

    console.log("=================================");
    console.log("✅ OTP VERIFIED");
    console.log(`📧 Email: ${normalizedEmail}`);
    console.log("=================================");

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully.",
      resetToken,
    });
  } catch (error) {
    console.error("❌ Verify OTP Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to verify OTP.",
    });
  }
});

// ==========================================
// AUTHORIZE PASSWORD RESET
// ==========================================

app.post("/api/auth/forgot-password/reset", (req, res) => {
  try {
    const { email, resetToken } = req.body;

    if (!email || !resetToken) {
      return res.status(400).json({
        success: false,
        message: "Email and reset token are required.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const record = otpStore.get(`reset:${normalizedEmail}`);

    if (!record) {
      return res.status(400).json({
        success: false,
        message: "Reset session expired. Please request a new OTP.",
      });
    }

    if (Date.now() > record.expiresAt) {
      otpStore.delete(`reset:${normalizedEmail}`);

      return res.status(400).json({
        success: false,
        message: "Reset session expired.",
      });
    }

    if (record.resetToken !== resetToken) {
      return res.status(400).json({
        success: false,
        message: "Invalid reset token.",
      });
    }

    otpStore.delete(`reset:${normalizedEmail}`);

    console.log("=================================");
    console.log("✅ PASSWORD RESET AUTHORIZED");
    console.log(`📧 Email: ${normalizedEmail}`);
    console.log("=================================");

    return res.status(200).json({
      success: true,
      message: "Password reset authorized successfully.",
    });
  } catch (error) {
    console.error("❌ Reset Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to reset password.",
    });
  }
});

// ==========================================
// CONTACT US MESSAGES
// ==========================================

// ==========================================
// SEND CONTACT MESSAGE
// ==========================================

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // ------------------------------------------
    // REQUIRED FIELDS
    // ------------------------------------------

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email and message are required.",
      });
    }

    // ------------------------------------------
    // NORMALIZE DATA
    // ------------------------------------------

    const normalizedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedMessage = message.trim();

    // ------------------------------------------
    // EMPTY FIELD CHECK
    // ------------------------------------------

    if (
      !normalizedName ||
      !normalizedEmail ||
      !normalizedMessage
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // ------------------------------------------
    // EMAIL VALIDATION
    // ------------------------------------------

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(normalizedEmail)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address.",
      });
    }

    // ------------------------------------------
    // CREATE MESSAGE
    // ------------------------------------------

    const newMessage = {
      id: Date.now(),
      name: normalizedName,
      email: normalizedEmail,
      message: normalizedMessage,
      createdAt: new Date().toISOString(),
    };

    // ------------------------------------------
    // SAVE MESSAGE
    // ------------------------------------------

    contactMessages.push(newMessage);

    console.log("=================================");
    console.log("📩 NEW CONTACT MESSAGE");
    console.log(`👤 Name: ${normalizedName}`);
    console.log(`📧 Email: ${normalizedEmail}`);
    console.log(`💬 Message: ${normalizedMessage}`);
    console.log("=================================");

    // ------------------------------------------
    // SEND EMAIL TO ADMIN
    // ------------------------------------------

    try {
      await transporter.sendMail({
        from: `"Hardware Hub" <${process.env.EMAIL_USER}>`,

        // Admin email
        to: process.env.EMAIL_USER,

        // If admin clicks Reply, it replies to customer
        replyTo: normalizedEmail,

        subject: `New Contact Message from ${normalizedName}`,

        text: `
New message received from Hardware Hub Contact Us.

Name: ${normalizedName}
Email: ${normalizedEmail}

Message:
${normalizedMessage}

Received:
${new Date(newMessage.createdAt).toLocaleString()}
        `,

        html: `
          <div style="
            font-family: Arial, sans-serif;
            max-width: 650px;
            margin: 30px auto;
            padding: 30px;
            border: 1px solid #e5e7eb;
            border-radius: 12px;
            background: #ffffff;
          ">

            <h2 style="
              color: #1d4ed8;
              margin-bottom: 20px;
            ">
              Hardware Hub - New Contact Message
            </h2>

            <div style="
              margin-bottom: 15px;
              padding: 12px;
              background: #f8fafc;
              border-radius: 8px;
            ">
              <strong>Name:</strong>
              ${normalizedName}
            </div>

            <div style="
              margin-bottom: 15px;
              padding: 12px;
              background: #f8fafc;
              border-radius: 8px;
            ">
              <strong>Email:</strong>
              ${normalizedEmail}
            </div>

            <div style="
              margin-bottom: 15px;
              padding: 15px;
              background: #f8fafc;
              border-radius: 8px;
              line-height: 1.7;
            ">
              <strong>Message:</strong>
              <p style="
                white-space: pre-wrap;
                margin-top: 10px;
                color: #374151;
              ">
                ${normalizedMessage}
              </p>
            </div>

            <div style="
              margin-top: 20px;
              color: #6b7280;
              font-size: 13px;
            ">
              Received:
              ${new Date(newMessage.createdAt).toLocaleString()}
            </div>

            <p style="
              margin-top: 25px;
              color: #6b7280;
            ">
              Hardware Hub Contact Us System
            </p>

          </div>
        `,
      });

      console.log("✅ Contact notification email sent.");
    } catch (emailError) {
      // Email fail hone par message delete nahi hoga.
      // Message admin dashboard mein available rahega.

      console.error(
        "⚠️ Contact notification email failed:",
        emailError.message
      );
    }

    // ------------------------------------------
    // SUCCESS RESPONSE
    // ------------------------------------------

    return res.status(201).json({
      success: true,
      message: "Message sent successfully.",
    });
  } catch (error) {
    console.error("❌ Contact API Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to send message.",
    });
  }
});

// ==========================================
// GET CONTACT MESSAGES FOR ADMIN
// ==========================================

app.get("/api/contact", (req, res) => {
  return res.status(200).json({
    success: true,
    messages: contactMessages,
  });
});

// ==========================================
// DELETE CONTACT MESSAGE
// ==========================================

app.delete("/api/contact/:id", (req, res) => {
  const messageId = Number(req.params.id);

  const index = contactMessages.findIndex(
    (item) => item.id === messageId
  );

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "Message not found.",
    });
  }

  contactMessages.splice(index, 1);

  return res.status(200).json({
    success: true,
    message: "Message deleted successfully.",
  });
});

// ==========================================
// SERVER ERROR HANDLING
// ==========================================

app.on("error", (error) => {
  console.error("❌ Server error:", error);
});

process.on("uncaughtException", (error) => {
  console.error("❌ Uncaught Exception:", error);
});

process.on("unhandledRejection", (error) => {
  console.error("❌ Unhandled Promise Rejection:", error);
});

// ==========================================
// START SERVER
// ==========================================

const server = app.listen(PORT, "127.0.0.1", () => {
  console.log("");
  console.log("=================================");
  console.log("🚀 Hardware Hub OTP Server");
  console.log(`🌐 http://localhost:${PORT}`);
  console.log("📡 API Ready");
  console.log("📩 Contact API Ready");
  console.log("=================================");
  console.log("");
});

server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(`❌ Port ${PORT} is already in use.`);
    console.error("Please close the old Node.js server.");
  } else {
    console.error("❌ Server failed:", error);
  }
});