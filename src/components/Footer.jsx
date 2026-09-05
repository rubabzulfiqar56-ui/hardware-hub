<<<<<<< HEAD
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300">

      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">

        {/* BRAND */}

        <div className="lg:col-span-2">

          <h2 className="text-2xl font-black text-white">
            Hardware
            <span className="text-blue-400">Hub</span>
          </h2>

          <p className="mt-4 max-w-md leading-7 text-slate-400">
            A modern hardware marketplace providing quality
            tools, electrical equipment and essential hardware
            for your projects.
          </p>

          <p className="mt-5 text-sm text-slate-300">
            📍 Rawalpindi, Pakistan
          </p>

        </div>

        {/* LINKS */}

        <div>

          <h3 className="font-bold text-white">
            Quick Links
          </h3>

          <div className="mt-4 flex flex-col gap-3 text-sm">

            <Link to="/" className="hover:text-blue-400">
              Home
            </Link>

            <Link to="/products" className="hover:text-blue-400">
              Products
            </Link>

            <Link to="/categories" className="hover:text-blue-400">
              Categories
            </Link>

            <Link to="/about" className="hover:text-blue-400">
              About
            </Link>

            <Link to="/contact" className="hover:text-blue-400">
              Contact
            </Link>

          </div>

        </div>

        {/* CUSTOMER SERVICE */}

        <div>

          <h3 className="font-bold text-white">
            Customer Service
          </h3>

          <div className="mt-4 space-y-3 text-sm text-slate-400">

            <p>Product Guidance</p>
            <p>Delivery Information</p>
            <p>Returns & Support</p>
            <p>📧 support@hardwarehub.com</p>
            <p>☎ +92 300 1234567</p>

          </div>

        </div>

      </div>

      {/* COPYRIGHT */}

      <div className="border-t border-slate-800">

        <div className="py-5 text-center text-xs text-slate-500">
          © 2026 HardwareHub. All Rights Reserved.
        </div>

      </div>

    </footer>
  );
}

=======
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300">

      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">

        {/* BRAND */}

        <div className="lg:col-span-2">

          <h2 className="text-2xl font-black text-white">
            Hardware
            <span className="text-blue-400">Hub</span>
          </h2>

          <p className="mt-4 max-w-md leading-7 text-slate-400">
            A modern hardware marketplace providing quality
            tools, electrical equipment and essential hardware
            for your projects.
          </p>

          <p className="mt-5 text-sm text-slate-300">
            📍 Rawalpindi, Pakistan
          </p>

        </div>

        {/* LINKS */}

        <div>

          <h3 className="font-bold text-white">
            Quick Links
          </h3>

          <div className="mt-4 flex flex-col gap-3 text-sm">

            <Link to="/" className="hover:text-blue-400">
              Home
            </Link>

            <Link to="/products" className="hover:text-blue-400">
              Products
            </Link>

            <Link to="/categories" className="hover:text-blue-400">
              Categories
            </Link>

            <Link to="/about" className="hover:text-blue-400">
              About
            </Link>

            <Link to="/contact" className="hover:text-blue-400">
              Contact
            </Link>

          </div>

        </div>

        {/* CUSTOMER SERVICE */}

        <div>

          <h3 className="font-bold text-white">
            Customer Service
          </h3>

          <div className="mt-4 space-y-3 text-sm text-slate-400">

            <p>Product Guidance</p>
            <p>Delivery Information</p>
            <p>Returns & Support</p>
            <p>📧 support@hardwarehub.com</p>
            <p>☎ +92 300 1234567</p>

          </div>

        </div>

      </div>

      {/* COPYRIGHT */}

      <div className="border-t border-slate-800">

        <div className="py-5 text-center text-xs text-slate-500">
          © 2026 HardwareHub. All Rights Reserved.
        </div>

      </div>

    </footer>
  );
}

>>>>>>> a3a503e951cddc352190fd106797d05f2ee95a51
export default Footer;