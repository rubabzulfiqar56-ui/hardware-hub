import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Checkout() {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const customerName = formData.get("customerName");
    const phone = formData.get("phone");
    const address = formData.get("address");
    const paymentMethod = formData.get("paymentMethod");

    const newOrder = {
      id: Date.now(),
      customerName,
      phone,
      address,
      paymentMethod,
      items: cart,
      total: cartTotal,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    const existingOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    const updatedOrders = [
      ...existingOrders,
      newOrder,
    ];

    localStorage.setItem(
      "orders",
      JSON.stringify(updatedOrders)
    );

    // Empty cart after successful order
    clearCart();

    alert("Order placed successfully! 🎉");

    // Go to Home page after placing order
    navigate("/");
  };

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-slate-950 px-5 py-16 text-white">
        <div className="mx-auto max-w-2xl text-center">

          <div className="text-6xl">🛒</div>

          <h1 className="mt-6 text-3xl font-black">
            Your Cart is Empty
          </h1>

          <p className="mt-3 text-slate-400">
            Please add products before checkout.
          </p>

          <Link
            to="/products"
            className="mt-7 inline-block rounded-xl bg-blue-600 px-7 py-3 font-bold hover:bg-blue-500"
          >
            Continue Shopping
          </Link>

        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-12 text-white sm:px-6">

      <div className="mx-auto max-w-5xl">

        {/* HEADER */}
        <div className="mb-10">

          <p className="text-sm font-bold uppercase tracking-widest text-blue-400">
            Checkout
          </p>

          <h1 className="mt-2 text-4xl font-black">
            Complete Your Order
          </h1>

        </div>

        <div className="grid gap-8 lg:grid-cols-3">

          {/* CUSTOMER FORM */}
          <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6 lg:col-span-2">

            <h2 className="text-xl font-black">
              Customer Information
            </h2>

            <form
              onSubmit={handlePlaceOrder}
              className="mt-6 space-y-5"
            >

              {/* NAME */}
              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-300">
                  Full Name
                </label>

                <input
                  type="text"
                  name="customerName"
                  placeholder="Enter your full name"
                  required
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-blue-500"
                />

              </div>

              {/* PHONE */}
              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-300">
                  Phone Number
                </label>

                <input
                  type="tel"
                  name="phone"
                  placeholder="03XX-XXXXXXX"
                  required
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-blue-500"
                />

              </div>

              {/* ADDRESS */}
              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-300">
                  Delivery Address
                </label>

                <textarea
                  name="address"
                  placeholder="Enter your complete delivery address"
                  required
                  rows="4"
                  className="w-full resize-none rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-blue-500"
                />

              </div>

              {/* PAYMENT */}
              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-300">
                  Payment Method
                </label>

                <select
                  name="paymentMethod"
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-blue-500"
                >

                  <option value="Cash on Delivery">
                    Cash on Delivery
                  </option>

                  <option value="Bank Transfer">
                    Bank Transfer
                  </option>

                </select>

              </div>

              {/* PLACE ORDER */}
              <button
                type="submit"
                className="w-full rounded-xl bg-blue-600 px-6 py-3.5 font-bold text-white transition hover:bg-blue-500"
              >
                Place Order
              </button>

            </form>

          </div>

          {/* ORDER SUMMARY */}
          <div className="h-fit rounded-2xl border border-slate-700 bg-slate-900 p-6">

            <h2 className="text-xl font-black">
              Order Summary
            </h2>

            <div className="mt-6 space-y-4">

              {cart.map((item) => (

                <div
                  key={item.id}
                  className="flex justify-between gap-4 border-b border-slate-700 pb-3"
                >

                  <div>

                    <p className="font-semibold">
                      {item.name}
                    </p>

                    <p className="text-sm text-slate-400">
                      Qty: {item.quantity}
                    </p>

                  </div>

                  <p className="font-bold">
                    Rs.{" "}
                    {(item.price * item.quantity).toLocaleString()}
                  </p>

                </div>

              ))}

              {/* DELIVERY */}
              <div className="flex justify-between pt-3">

                <span className="font-bold">
                  Delivery
                </span>

                <span className="font-bold text-green-400">
                  Free
                </span>

              </div>

              {/* TOTAL */}
              <div className="border-t border-slate-700 pt-4">

                <div className="flex justify-between">

                  <span className="font-bold">
                    Total
                  </span>

                  <span className="text-2xl font-black text-blue-400">
                    Rs. {cartTotal.toLocaleString()}
                  </span>

                </div>

              </div>

            </div>

            <Link
              to="/cart"
              className="mt-6 block text-center text-sm font-semibold text-slate-400 hover:text-blue-400"
            >
              ← Back to Cart
            </Link>

          </div>

        </div>

      </div>

    </main>
  );
}

export default Checkout;