import React from "react";
import "../styles/tailwind.css";
import { useState, useEffect } from "react";
import axios from "axios";

function Kasir() {
  const baseUrl = "http://localhost:8080/image/";
  const [activeTab, setActiveTab] = useState("table");
  const [menus, setMenus] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [tables, setTables] = useState([]);
  const [table, setTable] = useState([]);
  const [data, setData] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [menuItems, setMenuItems] = useState([]);

  const handleLogout = () => {
    window.location.href = "/login";
  };

  useEffect(() => {
    const token = localStorage.getItem(`token-cafe`);
    const authorization = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios.get("http://localhost:8080/meja", authorization).then((response) => {
      setTables(response.data);
    });

    axios
      .get("http://localhost:8080/transaksi", authorization)
      .then((response) => {
        setTransactions(response.data);
      });

    axios.get("http://localhost:8080/menu", authorization).then((response) => {
      setMenus(response.data);
    });
  }, []);

  const handleTableClick = (table) => {
    setTable(table);
  };

  const handleTableBooking = (e) => {
    e.preventDefault();
    setSelectedTable(table.id_meja);
    setCustomerName(table.nama_pelanggan);
    setActiveTab("menu");
  };

  const handleAddToOrder = (menuId) => {
    const existingItemIndex = orderItems.findIndex(
      (item) => item.id_menu === menuId
    );
    if (existingItemIndex !== -1) {
      // Update quantity if item already in order
      const updatedOrderItems = [...orderItems];
      updatedOrderItems[existingItemIndex].qty += 1;
      setOrderItems(updatedOrderItems);
    } else {
      // Add new item to order
      const menuItem = menus.find((menu) => menu.id_menu === menuId);
      const newOrderItem = {
        id_menu: menuId,
        nama_menu: menuItem.nama_menu,
        harga: menuItem.harga,
        qty: 1,
      };
      setOrderItems([...orderItems, newOrderItem]);
    }
  };

  const handleRemoveFromOrder = (item) => {
    const updatedOrderItems = orderItems.filter(
      (orderItem) => orderItem.id_menu !== item.id_menu
    );
    setOrderItems(updatedOrderItems);
    setTotalPrice(
      updatedOrderItems.reduce((total, item) => total + item.harga * item.qty, 0)
    );
  }

  const handlePlaceOrder = () => {
    if (orderItems.length > 0) {
      const orderData = {
        id_user: localStorage.getItem("user_id"),
        id_meja: selectedTable.id_meja,
        nama_pelanggan: customerName,
        items: orderItems,
        total_price: totalPrice,
      };
      axios
        .post("http://localhost:8080/transaksi", orderData)
        .then((response) => {
          console.log("Order placed successfully!");
          setOrderItems([]);
          setTotalPrice(0);
        });
    }
  };

  return (
    <div className="flex flex-row h-screen overflow-hidden">
      {/* Left sidebar */}
      <div className="bg-gray-800 w-1/4">
        <div className="h-16 flex justify-center items-center mt-5">
          <h1 className="font-bold text-lg text-white">WIKUSAMA CASHIER</h1>
        </div>
        <div className="flex flex-col h-full mt-5 ml-12 text-lg">
          <button
            className={`h-16 flex items-center justify-left ${
              activeTab === "table" ? " text-white" : "text-white"
            }`}
            onClick={() => setActiveTab("table")}
          >
            Table
          </button>
          <button
            className={`h-16 flex items-center justify-left ${
              activeTab === "menu" ? " text-white" : "text-white"
            }`}
            onClick={() => setActiveTab("menu")}
          >
            Menu
          </button>
          <button
            className={`h-16 flex items-center justify-left ${
              activeTab === "transactions" ? " text-white" : "text-white"
            }`}
            onClick={() => setActiveTab("transactions")}
          >
            Transactions
          </button>
          <button
            className=" bg-white rounded text-black mt-25 hover:bg-gray-200"
            onClick={() => handleLogout()}
            style={{ margin: "15px 15px 15px 0", padding: "12px" }}
          >
            Log Out
          </button>
        </div>
      </div>
      {/* Main content */}
      <div className="flex flex-col w-full md:w-2/2 bg-gray-800">
        <div
          id="menu"
          className="flex-grow flex grid grid-cols-5 gap-4"
          style={{
            display: activeTab === "menu" ? "flex" : "none",
            overflowY: "scroll",
          }}
        >
          <div className="flex-grow flex flex-wrap p-4 overflow-y-auto bg-gray-800" > 
            {menus.map((menu) => (
              <div key={menu.id_menu} className="w-1/3 p-2">
                <div className="bg-white rounded-lg shadow-lg">
                  <div className="h-32 aspect-w-1 aspect-h-1 overflow-hidden">
                    <img
                      src={`${baseUrl}${menu.gambar}`}
                      alt={menu.nama_menu}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-medium">{menu.nama_menu}</h3>
                    <p className="text-gray-500">{menu.harga}</p>
                    <button
                      onClick={() => handleAddToOrder(menu.id_menu)}
                      className="mt-2 bg-gray-800 text-white px-4 py-2 rounded-lg"
                    >
                      +
                    </button>
                    {/* <span className="mx-2 font-bold">
                      {orderItems.find((item) => item.id_menu === menu.id_menu)
                        ?.qty || 0}
                    </span>
                    <button
                      onClick={() => handleRemoveFromOrder(menu.id_menu)}
                      className="mt-2 bg-gray-800 text-white px-4 py-2 rounded-lg"
                      disabled={!orderItems[menu.id_menu]}
                    >
                      -
                    </button> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div
            className="bg-gray-100 md:w-2/3"
            style={{ display: activeTab === "menu" ? "block" : "none"}}
          >
            {/* Order summary */}
            <div className="bg-gray-800 p-4 h-full overflow-y-auto" style={{ overflowY: 'scroll', WebkitOverflowScrolling: 'touch' }} >
              <h2 className="text-xl font-semibold mb-4 text-white">
                Order Summary
              </h2>
              <div className="flex-grow">
                <ul>
                  <div className="grid grid-row gap-4">
                    {orderItems.map((item) => (
                      <div
                        key={item.id_menu}
                        className="bg-white p-4 rounded-lg"
                      >
                        <div className="flex justify-between mb-2">
                          <div>
                            <span>{item.nama_menu}</span>
                          </div>
                          <span>x{item.qty}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <div>
                            <span className="text-gray-500 text-sm ml-2 text-left">
                              {item.harga}
                          </span>
                          </div>
                          <button 
                          className="text-red-700"
                          onClick={() => handleRemoveFromOrder(item)}>
                          Remove
                        </button>
                        </div>
                        
                      </div>
                    ))}
                  </div>
                </ul>
              </div>
              <p className="font-bold mt-4 text-white">
                Total Price : {totalPrice}
              </p>
              <button
                onClick={handlePlaceOrder}
                className="mt-2 bg-white text-gray-800 px-4 py-2 rounded-lg w-full hover:bg-gray-200 font-semibold"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
        {/*  tables */}
        <div
          id="table"
          className="h-full p-4"
          style={{
            display: activeTab === "table" ? "block" : "none",
            backgroundColor: "#1F2937",
          }}
        >
          <div className="grid grid-cols-5 gap-4 mt-12 ">
            {/* Display available tables */}
            <div className="grid grid-cols-5 gap-8 col-span-3 ml-5 text-center">
              {tables.map((table) => {
                const transaction = transactions.find(
                  (t) => t.id_meja === table.id_meja
                );
                const isLunas = transaction && transaction.status === "lunas";
                const isClickable = isLunas || !transaction;

                return (
                  <div
                    key={table.id_meja}
                    onClick={() => isClickable && handleTableClick(table)}
                    className={`rounded-lg flex items-center justify-center h-full ${
                      isLunas || !transaction
                        ? "bg-white cursor-pointer"
                        : "bg-black text-white"
                    }`}
                    style={{ pointerEvents: isClickable ? "auto" : "none" }}
                  >
                    <p className="text-2xl">{table.nomor_meja}</p>
                  </div>
                );
              })}
            </div>

            {/* Form for input customer name, table for, and book table button */}
            <div
              className="bg-gray-800 p-4 h-full col-span-2 bg-white rounded-md"
              style={{ display: activeTab === "table" ? "block" : "none" }}
            >
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                {tables ? `Table ${table.nomor_meja}` : "Table Booking"}
              </h2>
              <form onSubmit={handleTableBooking}>
                <label
                  htmlFor="customerName"
                  className="block mb-2 text-black font-bold text-lg"
                >
                  Table For
                </label>
                <input
                  type="text"
                  id="customerName"
                  name="customerName"
                  placeholder="Jane Doe"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3 py-2 rounded-md border border-gray-300 mb-4"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg"
                >
                  Book Table
                </button>
              </form>
            </div>
          </div>
        </div>
        {/* transaksi */}
        <div
          id="transactions"
          className="h-full p-4"
          style={{
            display: activeTab === "transactions" ? "block" : "none",
            backgroundColor: "#1F2937",
          }}
        >
          <div className="bg-white rounded-lg shadow-lg px-8 py-6">
            <h2 className="text-2xl font-medium mb-4">All Transactions</h2>
            <div className="overflow-x-auto">
              <table className="table-auto border-collapse w-full bg-white rounded mb-4">
                <thead>
                  <tr className="bg-gray-100">
                    <th
                      className="px-4 py-2 text-sm border-b border-t"
                      style={{ width: "10%" }}
                    >
                      Date
                    </th>
                    <th
                      className="px-4 py-2 text-sm border-b border-t text-left"
                      style={{ width: "30%" }}
                    >
                      Customer
                    </th>
                    <th
                      className="px-4 py-2 text-sm border-b border-t"
                      style={{ width: "10%" }}
                    >
                      User ID
                    </th>
                    <th
                      className="px-4 py-2 text-sm border-b border-t"
                      style={{ width: "10%" }}
                    >
                      Table ID
                    </th>
                    <th
                      className="px-4 py-2 text-sm border-b border-t"
                      style={{ width: "10%" }}
                    >
                      Total
                    </th>
                    <th
                      className="px-4 py-2 text-sm border-b border-t"
                      style={{ width: "10%" }}
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr
                      key={transaction.id_transaksi}
                      className="cursor-pointer hover:bg-gray-100"
                    >
                      <td
                        className="px-4 py-2 text-lg text-gray-600 border-b text-center"
                        style={{ width: "10%" }}
                      >
                        <div>
                          {new Date(
                            transaction.tgl_transaksi
                          ).toLocaleDateString("en-US", {
                            day: "numeric",
                          })}
                        </div>
                        <div className="text-sm">
                          {new Date(
                            transaction.tgl_transaksi
                          ).toLocaleDateString("en-US", {
                            month: "short",
                            year: "2-digit",
                          })}
                        </div>
                      </td>
                      <td
                        className="px-4 py-2 text-xl font-normal text-gray-600 border-b text-left"
                        style={{ width: "30%" }}
                      >
                        {transaction.nama_pelanggan}
                      </td>
                      <td
                        className="px-4 py-2 text-sm font-normal text-gray-600 border-b text-center"
                        style={{ width: "10%" }}
                      >
                        {transaction.id_user}
                      </td>
                      <td
                        className="px-4 py-2 text-sm font-normal text-gray-600 border-b text-center"
                        style={{ width: "10%" }}
                      >
                        {transaction.id_meja}
                      </td>
                      <td
                        className="px-4 py-2 text-sm font-normal text-gray-600 border-b text-center"
                        style={{ width: "10%" }}
                      >
                        {transaction.status}
                      </td>
                      <td
                        className="px-4 py-2 text-sm font-normal border-b text-center"
                        style={{ width: "10%" }}
                      >
                        <div
                          className="py-1 px-2 rounded-xl text-white text-center"
                          style={{
                            backgroundColor:
                              transaction.status === "lunas" ? "green" : "red",
                          }}
                        >
                          {transaction.status}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Kasir;
