import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import productsData from "../data/products";

function Admin() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [showProductForm, setShowProductForm] = useState(false);

  const [productForm, setProductForm] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    stock: "",
    image: "",
  });

  useEffect(() => {
    const savedProducts =
      JSON.parse(localStorage.getItem("adminProducts")) || [];

    const savedOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    setProducts([...productsData, ...savedProducts]);
    setOrders(savedOrders);
  }, []);

  // Add Product
  const handleProductChange = (e) => {
    const { name, value } = e.target;

    setProductForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Image Upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setProductForm((prev) => ({
        ...prev,
        image: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  // Save Product
  const handleAddProduct = (e) => {
    e.preventDefault();

    if (
      !productForm.name ||
      !productForm.category ||
      !productForm.price ||
      !productForm.description ||
      !productForm.stock
    ) {
      alert("Please fill all required fields.");
      return;
    }

    const savedProducts =
      JSON.parse(localStorage.getItem("adminProducts")) || [];

    const newProduct = {
      id: Date.now(),
      name: productForm.name,
      category: productForm.category,
      price: Number(productForm.price),
      description: productForm.description,
      stock: Number(productForm.stock),
      image: productForm.image,
      tag: "NEW",
    };

    const updatedProducts = [
      ...savedProducts,
      newProduct,
    ];

    localStorage.setItem(
      "adminProducts",
      JSON.stringify(updatedProducts)
    );

    setProducts((prev) => [
      ...prev,
      newProduct,
    ]);

    setProductForm({
      name: "",
      category: "",
      price: "",
      description: "",
      stock: "",
      image: "",
    });

    setShowProductForm(false);

    alert("Product added successfully!");
  };

  // Delete Product
  const handleDeleteProduct = (id) => {
    const defaultProduct = productsData.find(
      (product) => product.id === id
    );

    if (defaultProduct) {
      alert("Default products cannot be deleted.");
      return;
    }

    const savedProducts =
      JSON.parse(localStorage.getItem("adminProducts")) || [];

    const updatedProducts = savedProducts.filter(
      (product) => product.id !== id
    );

    localStorage.setItem(
      "adminProducts",
      JSON.stringify(updatedProducts)
    );

    setProducts((prev) =>
      prev.filter((product) => product.id !== id)
    );
  };

  // Update Order Status
  const handleOrderStatus = (orderId, status) => {
    const updatedOrders = orders.map((order) =>
      String(order.id || order._id) === String(orderId)
        ? {
            ...order,
            status,
          }
        : order
    );

    setOrders(updatedOrders);

    localStorage.setItem(
      "orders",
      JSON.stringify(updatedOrders)
    );
  };

  // Delete Order
  const handleDeleteOrder = (orderId) => {
    const updatedOrders = orders.filter(
      (order) =>
        String(order.id || order._id) !==
        String(orderId)
    );

    setOrders(updatedOrders);

    localStorage.setItem(
      "orders",
      JSON.stringify(updatedOrders)
    );
  };

  // Dashboard Statistics
  const totalProducts = products.length;

  const totalOrders = orders.length;

  const pendingOrders = orders.filter(
    (order) =>
      !order.status ||
      order.status === "Pending"
  ).length;

  const deliveredOrders = orders.filter(
    (order) =>
      order.status === "Delivered"
  ).length;

  const totalRevenue = orders
    .filter(
      (order) => order.status === "Delivered"
    )
    .reduce(
      (total, order) =>
        total +
        Number(
          order.total ||
            order.totalPrice ||
            order.amount ||
            0
        ),
      0
    );

  const getStatusClass = (status) => {
    if (status === "Delivered") {
      return "border-green-500/30 bg-green-500/10 text-green-400";
    }

    if (status === "Processing") {
      return "border-blue-500/30 bg-blue-500/10 text-blue-400";
    }

    if (status === "Shipped") {
      return "border-purple-500/30 bg-purple-500/10 text-purple-400";
    }

    if (status === "Cancelled") {
      return "border-red-500/30 bg-red-500/10 text-red-400";
    }

    return "border-yellow-500/30 bg-yellow-500/10 text-yellow-400";
  };

  // Logout Admin
  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    navigate("/admin-login");
  };

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-10 text-white sm:px-6 lg:px-8">

      <div className="mx-auto max-w-7xl">

        {/* HEADER */}

        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

          <div>
            <p className="font-semibold uppercase tracking-[0.2em] text-blue-400">
              HardwareHub
            </p>

            <h1 className="mt-2 text-3xl font-black md:text-4xl">
              Admin Dashboard
            </h1>

            <p className="mt-2 text-slate-400">
              Manage products and customer orders.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() =>
                setShowProductForm(!showProductForm)
              }
              className="rounded-xl bg-blue-600 px-6 py-3 font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500"
            >
              {showProductForm
                ? "Close Form"
                : "+ Add Product"}
            </button>

            <button
              onClick={handleLogout}
              className="rounded-xl border border-red-500/30 bg-red-500/10 px-6 py-3 font-bold text-red-400 transition hover:bg-red-500 hover:text-white"
            >
              Logout
            </button>
          </div>

        </div>


        {/* STATISTICS */}

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm font-semibold text-slate-400">
              Total Products
            </p>

            <div className="mt-3 flex items-center justify-between">
              <h2 className="text-3xl font-black">
                {totalProducts}
              </h2>

              <span className="text-3xl">
                📦
              </span>
            </div>
          </div>


          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm font-semibold text-slate-400">
              Total Orders
            </p>

            <div className="mt-3 flex items-center justify-between">
              <h2 className="text-3xl font-black">
                {totalOrders}
              </h2>

              <span className="text-3xl">
                🛒
              </span>
            </div>
          </div>


          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm font-semibold text-slate-400">
              Pending Orders
            </p>

            <div className="mt-3 flex items-center justify-between">
              <h2 className="text-3xl font-black">
                {pendingOrders}
              </h2>

              <span className="text-3xl">
                ⏳
              </span>
            </div>
          </div>


          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm font-semibold text-slate-400">
              Revenue
            </p>

            <div className="mt-3 flex items-center justify-between">
              <h2 className="text-xl font-black">
                PKR {totalRevenue.toLocaleString()}
              </h2>

              <span className="text-3xl">
                💰
              </span>
            </div>
          </div>

        </div>


        {/* ADD PRODUCT FORM */}

        {showProductForm && (
          <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8">

            <p className="font-semibold uppercase tracking-[0.2em] text-blue-400">
              Product Management
            </p>

            <h2 className="mt-2 text-2xl font-black">
              Add New Product
            </h2>

            <form
              onSubmit={handleAddProduct}
              className="mt-7 grid gap-5 md:grid-cols-2"
            >

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-300">
                  Product Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={productForm.name}
                  onChange={handleProductChange}
                  placeholder="Enter product name"
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
                />
              </div>


              <div>
                <label className="mb-2 block text-sm font-bold text-slate-300">
                  Category
                </label>

                <select
                  name="category"
                  value={productForm.category}
                  onChange={handleProductChange}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-blue-500"
                >
                  <option value="">
                    Select Category
                  </option>

                  <option value="Power Tools">
                    Power Tools
                  </option>

                  <option value="Hand Tools">
                    Hand Tools
                  </option>

                  <option value="Hardware">
                    Hardware
                  </option>

                  <option value="Safety Equipment">
                    Safety Equipment
                  </option>

                  <option value="Electrical">
                    Electrical
                  </option>

                  <option value="Other">
                    Other
                  </option>
                </select>
              </div>


              <div>
                <label className="mb-2 block text-sm font-bold text-slate-300">
                  Price (PKR)
                </label>

                <input
                  type="number"
                  name="price"
                  min="0"
                  value={productForm.price}
                  onChange={handleProductChange}
                  placeholder="Enter price"
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
                />
              </div>


              <div>
                <label className="mb-2 block text-sm font-bold text-slate-300">
                  Stock Quantity
                </label>

                <input
                  type="number"
                  name="stock"
                  min="0"
                  value={productForm.stock}
                  onChange={handleProductChange}
                  placeholder="Enter stock"
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
                />
              </div>


              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-bold text-slate-300">
                  Description
                </label>

                <textarea
                  name="description"
                  rows="4"
                  value={productForm.description}
                  onChange={handleProductChange}
                  placeholder="Enter product description"
                  className="w-full resize-none rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
                />
              </div>


              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-bold text-slate-300">
                  Product Image
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-slate-300 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:font-semibold file:text-white"
                />

                {productForm.image && (
                  <img
                    src={productForm.image}
                    alt="Product Preview"
                    className="mt-4 h-32 w-32 rounded-xl border border-slate-700 object-cover"
                  />
                )}
              </div>


              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="w-full rounded-xl bg-blue-600 px-6 py-3.5 font-bold text-white transition hover:bg-blue-500"
                >
                  Add Product
                </button>
              </div>

            </form>

          </section>
        )}


        {/* PRODUCT LIST */}

        <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8">

          <div className="mb-6 flex items-center justify-between">

            <div>
              <p className="font-semibold uppercase tracking-[0.2em] text-blue-400">
                Inventory
              </p>

              <h2 className="mt-2 text-2xl font-black">
                Products
              </h2>
            </div>

            <span className="rounded-full bg-slate-800 px-4 py-2 text-sm font-semibold text-slate-300">
              {products.length} Products
            </span>

          </div>


          <div className="overflow-x-auto">

            <table className="w-full min-w-[800px]">

              <thead>
                <tr className="border-b border-slate-700 text-left text-sm text-slate-400">

                  <th className="px-4 py-4">
                    Product
                  </th>

                  <th className="px-4 py-4">
                    Category
                  </th>

                  <th className="px-4 py-4">
                    Price
                  </th>

                  <th className="px-4 py-4">
                    Stock
                  </th>

                  <th className="px-4 py-4">
                    Action
                  </th>

                </tr>
              </thead>

              <tbody>

                {products.map((product) => (

                  <tr
                    key={product.id}
                    className="border-b border-slate-800 hover:bg-slate-800/50"
                  >

                    <td className="px-4 py-4">

                      <div className="flex items-center gap-3">

                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-12 w-12 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-800">
                            📦
                          </div>
                        )}

                        <span className="font-semibold">
                          {product.name}
                        </span>

                      </div>

                    </td>

                    <td className="px-4 py-4 text-sm text-slate-400">
                      {product.category || "Hardware"}
                    </td>

                    <td className="px-4 py-4 font-semibold text-blue-400">
                      PKR {Number(product.price).toLocaleString()}
                    </td>

                    <td className="px-4 py-4 text-slate-300">
                      {product.stock ?? "Available"}
                    </td>

                    <td className="px-4 py-4">

                      <button
                        onClick={() =>
                          handleDeleteProduct(product.id)
                        }
                        className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm font-semibold text-red-400 transition hover:bg-red-500 hover:text-white"
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </section>


        {/* ORDER MANAGEMENT */}

        <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8">

          <div className="mb-6">

            <p className="font-semibold uppercase tracking-[0.2em] text-blue-400">
              Order Management
            </p>

            <h2 className="mt-2 text-2xl font-black">
              Customer Orders
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              Manage customer orders and update order status.
            </p>

          </div>


          {orders.length === 0 ? (

            <div className="rounded-xl border border-dashed border-slate-700 bg-slate-950 px-6 py-12 text-center">

              <div className="text-4xl">
                📦
              </div>

              <h3 className="mt-4 text-lg font-bold">
                No Orders Yet
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                Customer orders will appear here after checkout.
              </p>

            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full min-w-[1000px]">

                <thead>

                  <tr className="border-b border-slate-700 text-left text-sm text-slate-400">

                    <th className="px-4 py-4">
                      Order ID
                    </th>

                    <th className="px-4 py-4">
                      Customer
                    </th>

                    <th className="px-4 py-4">
                      Products
                    </th>

                    <th className="px-4 py-4">
                      Total
                    </th>

                    <th className="px-4 py-4">
                      Status
                    </th>

                    <th className="px-4 py-4">
                      Action
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {orders.map((order, index) => {

                    const orderId =
                      order.id ||
                      order._id ||
                      index + 1;

                    const customerName =
                      order.customerName ||
                      order.name ||
                      order.user?.name ||
                      "Customer";

                    const customerEmail =
                      order.customerEmail ||
                      order.email ||
                      order.user?.email ||
                      "No email";

                    const orderProducts =
                      order.items ||
                      order.products ||
                      [];

                    const orderTotal =
                      order.total ||
                      order.totalPrice ||
                      order.amount ||
                      0;

                    const status =
                      order.status ||
                      "Pending";

                    return (

                      <tr
                        key={orderId}
                        className="border-b border-slate-800 hover:bg-slate-800/50"
                      >

                        <td className="px-4 py-5 font-bold">
                          #{orderId}
                        </td>


                        <td className="px-4 py-5">

                          <p className="font-semibold">
                            {customerName}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            {customerEmail}
                          </p>

                        </td>


                        <td className="px-4 py-5">

                          {orderProducts.length > 0 ? (

                            <div className="space-y-1">

                              {orderProducts
                                .slice(0, 3)
                                .map((item, itemIndex) => (

                                  <p
                                    key={itemIndex}
                                    className="text-sm text-slate-300"
                                  >
                                    {item.name || "Product"} ×{" "}
                                    {item.quantity || 1}
                                  </p>

                                ))}

                              {orderProducts.length > 3 && (
                                <p className="text-xs text-blue-400">
                                  +
                                  {orderProducts.length - 3} more
                                </p>
                              )}

                            </div>

                          ) : (

                            <span className="text-sm text-slate-500">
                              No product details
                            </span>

                          )}

                        </td>


                        <td className="px-4 py-5 font-bold text-blue-400">
                          PKR {Number(orderTotal).toLocaleString()}
                        </td>


                        <td className="px-4 py-5">

                          <select
                            value={status}
                            onChange={(e) =>
                              handleOrderStatus(
                                orderId,
                                e.target.value
                              )
                            }
                            className={`rounded-lg border px-3 py-2 text-sm font-semibold outline-none ${getStatusClass(
                              status
                            )}`}
                          >

                            <option value="Pending">
                              Pending
                            </option>

                            <option value="Processing">
                              Processing
                            </option>

                            <option value="Shipped">
                              Shipped
                            </option>

                            <option value="Delivered">
                              Delivered
                            </option>

                            <option value="Cancelled">
                              Cancelled
                            </option>

                          </select>

                        </td>


                        <td className="px-4 py-5">

                          <button
                            onClick={() =>
                              handleDeleteOrder(orderId)
                            }
                            className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm font-semibold text-red-400 transition hover:bg-red-500 hover:text-white"
                          >
                            Delete
                          </button>

                        </td>

                      </tr>

                    );
                  })}

                </tbody>

              </table>

            </div>

          )}

        </section>

      </div>

    </main>
  );
}

export default Admin;

