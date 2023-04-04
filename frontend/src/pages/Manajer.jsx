import React from "react";
import axios from "axios";
import Modal from "react-modal";
import "../styles/tailwind.css";
import { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";

export default function Manajer() {
  const [activeTab, setActiveTab] = useState("transaksi");
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [data, setData] = useState(null);
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    // filter transactions based on search term
    const filteredTransactions = transactions.filter((transaction) => {
      return transaction.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    });
    setFilteredTransactions(filteredTransactions);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
    // filter transactions based on start date
    const filteredTransactions = transactions.filter((transaction) => {
      return new Date(transaction.date) >= new Date(startDate);
    });
    setFilteredTransactions(filteredTransactions);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
    // filter transactions based on end date
    const filteredTransactions = transactions.filter((transaction) => {
      return new Date(transaction.date) <= new Date(endDate);
    });
    setFilteredTransactions(filteredTransactions);
  };

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

    const getData = () => {
      const endpoint = `http://localhost:8080/transaksi`;
      axios
        .get(endpoint, authorization)
        .then((response) => {
          setTransactions(response.data);
        })
        .catch((error) => console.log(error));
    };

    fetch("http://localhost:8080/menu")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        const endpoint = `http://localhost:8080/transaksi`;
        axios
          .get(endpoint, authorization)
          .then((response) => {
            setTransactions(response.data);
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));

    getData();
  }, []);

  // if (!data || !transactions) {
  //   return <p>Loading...</p>;
  // }

  //   const bestSelling = data
  //     .filter((order) => order.status === "lunas")
  //     .flatMap((order) => order.menu)
  //     .reduce((acc, item) => {
  //       if (!acc[item.nama_makanan]) {
  //         acc[item.nama_makanan] = 0;
  //       }
  //       acc[item.nama_makanan] += item.qty;
  //       return acc;
  //   }, {});

  // const rarest = data
  //   .filter((order) => order.status === "lunas")
  //   .flatMap((order) => order.menu)
  //   .reduce((acc, item) => {
  //     if (!acc[item.nama_makanan]) {
  //       acc[item.nama_makanan] = 0;
  //     }
  //     acc[item.nama_makanan] += 1;
  //     return acc;
  //   }, {})
  //   .filter((value) => value === 1);

  // const bestSellingData = {
  //   labels: Object.keys(bestSelling),
  //   datasets: [
  //     {
  //       data: Object.values(bestSelling),
  //       backgroundColor: [
  //         "#FF6384",
  //         "#36A2EB",
  //         "#FFCE56",
  //         "#33FF99",
  //         "#FF9933",
  //       ],
  //       hoverBackgroundColor: [
  //         "#FF6384",
  //         "#36A2EB",
  //         "#FFCE56",
  //         "#33FF99",
  //         "#FF9933",
  //       ],
  //     },
  //   ],
  // };

  // const rarestData = {
  //   labels: Object.keys(rarest),
  //   datasets: [
  //     {
  //       data: Object.values(rarest),
  //       backgroundColor: [
  //         "#FF6384",
  //         "#36A2EB",
  //         "#FFCE56",
  //         "#33FF99",
  //         "#FF9933",
  //       ],
  //       hoverBackgroundColor: [
  //         "#FF6384",
  //         "#36A2EB",
  //         "#FFCE56",
  //         "#33FF99",
  //         "#FF9933",
  //       ],
  //     },
  //   ],
  // };

  return (
    <div>
      <div className="flex h-screen bg-gray-200">
        <div className="flex flex-col w-60 bg-gray-800">
          <div className="h-16 flex justify-center items-center mt-5">
            <h1 className="font-bold text-lg text-white">Welcome Manajer!</h1>
          </div>
          <div className="flex flex-col h-full mt-5">
            <button
              className={`h-16 flex items-center justify-center ${
                activeTab === "transaksi" ? "bg-white text-black" : "text-white"
              }`}
              onClick={() => setActiveTab("transaksi")}
            >
              All Transactions
            </button>
            <button
              className={`h-16 flex items-center justify-center ${
                activeTab === "dashboard" ? "bg-white text-black" : "text-white"
              }`}
              onClick={() => setActiveTab("dashboard")}
            >
              Dashboard
            </button>
            <button
              className={`h-16 flex items-center justify-center ${
                activeTab === "dessert" ? "bg-white text-black" : "text-white"
              }`}
              onClick={() => setActiveTab("dessert")}
            >
              Manajer
            </button>
            <button
              className=" bg-white rounded text-black mt-25 hover:bg-gray-200"
              onClick={() => handleLogout()}
              style={{ margin: "20px", padding: "12px" }}
            >
              Log Out
            </button>
          </div>
        </div>
        <div className="flex-1 p-4 mt-5 overflow-y-auto">
          {activeTab === "transaksi" && (
            <div>
              <h2 className="text-3xl font-medium mb-4">Transactions</h2>
              <div className="flex flex-row space-x-4 mb-4">
                <input
                  type="text"
                  className="border-gray-200 border-2 p-2 rounded-lg w-1/3"
                  placeholder="Search Transactions"
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <input
                  type="date"
                  className="border-gray-200 border-2 p-2 rounded-lg"
                  placeholder="Start Date"
                  value={startDate}
                  onChange={handleStartDateChange}
                />
                <input
                  type="date"
                  className="border-gray-200 border-2 p-2 rounded-lg"
                  placeholder="End Date"
                  value={endDate}
                  onChange={handleEndDateChange}
                />
              </div>
              <div className="bg-white rounded-lg shadow-lg px-8 py-6">
                <h2 className="text-2xl font-medium mb-4">All Transactions</h2>
                <div className="overflow-x-auto">
                  <table className="table-auto border-collapse w-full bg-white rounded mb-4 max-h-[500px] overflow-y-auto">
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
                                  transaction.status === "lunas"
                                    ? "green"
                                    : "red",
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
          )}
          {activeTab === "dashboard" && (
            <div>
              <h2 className="text-3xl font-medium mb-4">Dashboard</h2>
              {/* <h2>Best-Selling Items</h2>
              <Doughnut data={bestSellingData} />
              <h2>Rarest Items</h2>
              <Doughnut data={rarestData} /> */}
            </div>
          )}
          {activeTab === "dessert" && <h1>Manajer</h1>}
        </div>
      </div>
    </div>
  );
}
