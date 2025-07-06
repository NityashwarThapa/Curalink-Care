import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer/footer";
import Navbar from "../components/Navbar/navbar";

const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectAll, setSelectAll] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
          alert("User not logged in. Please log in.");
          return;
        }
        const user = JSON.parse(storedUser);
        const userId = user._id;

        const response = await axios.get(`http://localhost:5003/cart/${userId}`);

        const itemsWithSelection = response.data.items.map((item) => ({
          ...item,
          selected: false,
        }));

        setCartItems(itemsWithSelection);
      } catch (error) {
        console.error("Error fetching cart:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const updateQuantity = async (id, amount) => {
    try {
      const updatedCart = cartItems.map((item) =>
        item.productId === id
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
      );
      setCartItems(updatedCart);

      const storedUser = JSON.parse(localStorage.getItem("user"));
      const userId = storedUser._id;

      await axios.put("http://localhost:5003/cart/update", {
        userId,
        productId: id,
        quantity: updatedCart.find((item) => item.productId === id).quantity,
      });
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const removeItem = async (id) => {
    try {
      setCartItems(cartItems.filter((item) => item.productId !== id));

      const storedUser = JSON.parse(localStorage.getItem("user"));
      const userId = storedUser._id;

      await axios.delete("http://localhost:5003/cart/remove", {
        data: { userId, productId: id },
      });
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const toggleSelect = (id) => {
    const updatedCart = cartItems.map((item) =>
      item.productId === id ? { ...item, selected: !item.selected } : item
    );
    setCartItems(updatedCart);
    setSelectAll(updatedCart.every((item) => item.selected));
  };

  const toggleSelectAll = () => {
    const newSelectAll = !selectAll;
    const updatedCart = cartItems.map((item) => ({
      ...item,
      selected: newSelectAll,
    }));
    setCartItems(updatedCart);
    setSelectAll(newSelectAll);
  };

  const handleSaveChanges = () => {
    alert("Save Changes clicked!");
    // Add logic if needed
  };

  const handleCheckout = () => {
    const selectedItems = cartItems.filter((item) => item.selected);
    if (selectedItems.length === 0) {
      alert("Please select at least one item to checkout.");
      return;
    }
    navigate("/checkout");
  };

  const totalPrice = cartItems.reduce(
    (total, item) =>
      item.selected ? total + item.price * item.quantity : total,
    0
  );

  const filteredItems = cartItems.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />

      <section className="py-8 md:pt-[200px] min-h-screen ">
        <div className="max-w-6xl mx-auto ">
          {/* Search and Save */}
          <div className=" flex justify-center items-center  max-w-max mx-auto mb-4 md:mb-20">
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className=" flex-1 rounded-l border w-[533px]  h-[55px] border-gray-300 shadow-inner shadow-slate-400"
            />
            <button
              onClick={handleSaveChanges}
              className=" w-[167px] h-[55px] bg-blue-600 text-white rounded-r hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Cart Section */}
            <div className="w-full md:w-2/3 rounded-lg border border-gray-200 p-6">
              <div className="flex items-center bg-white p-5 mb-4">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={toggleSelectAll}
                  className="mr-2"
                />
                <label className="font-medium">Select all</label>
              </div>

              <div className="flex justify-between items-center mb-4 border-b pb-2">
                <h2 className="text-xl font-semibold">Shopping Cart</h2>
                <p className="text-gray-600">{filteredItems.length} items</p>
              </div>

              {loading ? (
                <p>Loading cart...</p>
              ) : filteredItems.length === 0 ? (
                <p>No items found.</p>
              ) : (
                <div className="space-y-4">
                  {filteredItems.map((item) => (
                    <div
                      key={item.productId}
                      className="flex items-center justify-between border-b pb-4"
                    >
                      <input
                        type="checkbox"
                        checked={item.selected}
                        onChange={() => toggleSelect(item.productId)}
                        className="mr-3"
                      />

                      <div className="flex items-center gap-4 flex-1">
                        <img
                          src={item.productId?.image || "https://via.placeholder.com/60"}
                          alt={item.name}
                          className="w-16 h-16 rounded border"
                        />
                        <div>
                          <h4 className="font-semibold text-blue-600">
                            {item.name}
                          </h4>
                          <p className="text-sm text-gray-500 w-56">
                            {item.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center">
                        <button
                          onClick={() => updateQuantity(item.productId, -1)}
                          className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                        >
                          -
                        </button>
                        <span className="px-3">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, 1)}
                          className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                        >
                          +
                        </button>
                      </div>

                      <p className="w-20 text-right font-bold">
                        ${item.price * item.quantity}
                      </p>

                      {/* <button
                        onClick={() => removeItem(item.productId)}
                        className="text-red-500 text-sm hover:underline ml-4"
                      >
                        Remove
                      </button> */}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Summary Section */}
            <div className="w-full md:w-1/3 rounded-lg shadow-md border border-gray-200 p-6 h-fit">
              <h3 className="text-lg font-semibold mb-4">Summary</h3>
              <div className=" border-t-2 my-2"></div>

              <div className="flex justify-between mb-2">
                <span className="text-gray-700">Items:</span>
                <span className="font-semibold">
                  {cartItems.filter((item) => item.selected).length}
                </span>
              </div>

              <div className="flex justify-between mb-4 border-t-2 pt-2">
                <span className="font-bold">Total:</span>
                <span className="font-bold">${totalPrice.toFixed(2)}</span>
              </div>

              <button
                onClick={handleCheckout}
                className="mt-2 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                CHECKOUT
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default CartPage;
