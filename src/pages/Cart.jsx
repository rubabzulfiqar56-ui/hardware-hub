import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
  const {
    cart,
    cartTotal,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-slate-950 px-5 py-16">
        <div className="mx-auto max-w-5xl text-center">

          <div className="text-7xl">🛒</div>

          <h1 className="mt-6 text-4xl font-black text-white">
            Your Cart is Empty
          </h1>

          <p className="mt-3 text-slate-400">
            You haven't added any products to your cart yet.
          </p>

          <Link
            to="/products"
            className="mt-8 inline-block rounded-xl bg-blue-600 px-7 py-3 font-bold text-white transition hover:bg-blue-500"
          >
            Continue Shopping
          </Link>

        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 py-12 sm:py-16">

      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">

        {/* HEADER */}

        <div className="flex items-center justify-between">

          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-blue-400">
              Shopping Cart
            </p>

            <h1 className="mt-2 text-4xl font-black text-white">
              Your Cart
            </h1>
          </div>

          <button
            onClick={clearCart}
            className="rounded-lg border border-red-500/50 px-4 py-2 text-sm font-bold text-red-400 transition hover:bg-red-500 hover:text-white"
          >
            Clear Cart
          </button>

        </div>

        {/* CART CONTENT */}

        <div className="mt-10 grid gap-8 lg:grid-cols-3">

          {/* PRODUCTS */}

          <div className="space-y-4 lg:col-span-2">

            {cart.map((item) => (

              <div
                key={item.id}
                className="flex flex-col gap-5 rounded-2xl border border-slate-700 bg-slate-900 p-5 sm:flex-row sm:items-center"
              >

                {/* IMAGE */}

                <div className="h-32 w-full overflow-hidden rounded-xl bg-slate-800 sm:h-28 sm:w-28 sm:flex-shrink-0">

                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />

                </div>

                {/* DETAILS */}

                <div className="flex-1">

                  <p className="text-xs font-bold uppercase text-blue-400">
                    {item.category}
                  </p>

                  <h2 className="mt-1 text-lg font-black text-white">
                    {item.name}
                  </h2>

                  <p className="mt-2 font-bold text-white">
                    Rs. {item.price.toLocaleString()}
                  </p>

                </div>

                {/* QUANTITY */}

                <div className="flex items-center gap-3">

                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="grid h-9 w-9 place-items-center rounded-lg border border-slate-600 bg-slate-800 text-lg font-bold text-white hover:bg-slate-700"
                  >
                    −
                  </button>

                  <span className="w-8 text-center font-bold text-white">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="grid h-9 w-9 place-items-center rounded-lg border border-slate-600 bg-slate-800 text-lg font-bold text-white hover:bg-slate-700"
                  >
                    +
                  </button>

                </div>

                {/* ITEM TOTAL */}

                <div className="text-right sm:w-32">

                  <p className="text-lg font-black text-white">
                    Rs.{" "}
                    {(item.price * item.quantity).toLocaleString()}
                  </p>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="mt-2 text-sm font-semibold text-red-400 hover:text-red-300"
                  >
                    Remove
                  </button>

                </div>

              </div>

            ))}

          </div>

          {/* ORDER SUMMARY */}

          <div className="h-fit rounded-2xl border border-slate-700 bg-slate-900 p-6">

            <h2 className="text-xl font-black text-white">
              Order Summary
            </h2>

            <div className="mt-6 space-y-4">

              <div className="flex justify-between text-sm">
                <span className="text-slate-400">
                  Subtotal
                </span>

                <span className="font-bold text-white">
                  Rs. {cartTotal.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-slate-400">
                  Delivery
                </span>

                <span className="font-bold text-green-400">
                  Free
                </span>
              </div>

              <div className="border-t border-slate-700 pt-4">

                <div className="flex justify-between">

                  <span className="font-bold text-white">
                    Total
                  </span>

                  <span className="text-2xl font-black text-blue-400">
                    Rs. {cartTotal.toLocaleString()}
                  </span>

                </div>

              </div>

            </div>

            <button
              type="button"
              className="mt-7 w-full rounded-xl bg-blue-600 px-6 py-3.5 font-bold text-white transition hover:bg-blue-500"
            >
              Proceed to Checkout
            </button>

            <Link
              to="/products"
              className="mt-3 block text-center text-sm font-semibold text-slate-400 hover:text-blue-400"
            >
              ← Continue Shopping
            </Link>

          </div>

        </div>

      </div>

    </main>
  );
}

export default Cart;