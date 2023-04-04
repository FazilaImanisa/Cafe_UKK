import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import Modal from "react-modal";
import "../styles/tailwind.css";

export default function Admin() {
  const baseUrl = "http://localhost:8080/image/";
  const [passwordError, setPasswordError] = useState("");
  // menu declaration
  const [menus, setMenus] = useState([]);
  const [namaMenu, setNamaMenu] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [gambar, setGambar] = useState(null);
  const [harga, setHarga] = useState("");
  const [jenisMakanan, setJenisMakanan] = useState("");

  // meja declaration
  const [tables, setTables] = useState([]);
  const [nomor, setNomor] = useState("");
  const [idMeja, setIDMeja] = useState(0);
  const [idMenu, setIDMenu] = useState(0);
  const [mejaError, setMejaError] = useState("");

  const [activeTab, setActiveTab] = useState("user");
  // const [modalIsOpen, setModalIsOpen] = useState(false);
  // const [modalType, setModalType] = useState(null);
  const [action, setAction] = useState("");
  const [message, setMessage] = useState("");
  const [userModalIsOpen, setUserModalIsOpen] = useState(false);
  const [mejaModalIsOpen, setMejaModalIsOpen] = useState(false);
  const [menuModalIsOpen, setMenuModalIsOpen] = useState(false);

  // user declaration
  const [users, setUsers] = useState([]);
  const [idUser, setIDUser] = useState(0);
  const [nama, setNama] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  // const [selectedRole, setSelectedRole] = useState("user");

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const handleLogout = () => {
    window.location.href = "/login";
  };

  const handleUserModalClose = () => {
    setUserModalIsOpen(false);
  };

  const handleMejaModalClose = () => {
    setMejaModalIsOpen(false);
  };

  const handleMenuModalClose = () => {
    setMenuModalIsOpen(false);
  };

  const token = localStorage.getItem(`token-cafe`);
  const authorization = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const getData = () => {
    const endpoint = `http://localhost:8080/user`;
    axios
      .get(endpoint, authorization)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => console.log(error));
  };

  const getMejaData = () => {
    const endpoint = `http://localhost:8080/meja`;
    axios
      .get(endpoint, authorization)
      .then((response) => {
        setTables(response.data);
      })
      .catch((error) => console.log(error));
  };

  const getMenuData = () => {
    const endpoint = `http://localhost:8080/menu`;
    axios
      .get(endpoint, authorization)
      .then((response) => {
        setMenus(response.data);
      })
      .catch((error) => console.log(error));
  };

  const handleAddUser = () => {
    setUserModalIsOpen(true);
    // setModalType("user");
    setNama("");
    setUsername("");
    setPassword("");
    setRole("");
    setAction(`insert`);
  };

  const handleEditUser = (user) => {
    setUserModalIsOpen(true);
    // setModalType("user");
    setIDUser(user.id_user);
    setNama(user.nama_user);
    setUsername(user.username);
    setPassword(user.password);
    setRole(user.role);
    setAction(`edit`);
  };

  const handleDeleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      const updatedUser = users.filter((user) => user.id_user !== id);
      setUsers(updatedUser);
    }
  };

  const handleAddMeja = () => {
    setMejaModalIsOpen(true);
    // setModalType("meja");
    setNomor("");
    setAction(`insert`);
    setMejaError("");
  };

  const handleEditMeja = (table) => {
    setMejaModalIsOpen(true);
    setIDMeja(table.id_meja);
    setNomor(table.nomor_meja);
    setAction(`edit`);
    setMejaError("");
  };

  const handleDeleteMeja = (id) => {
    if (window.confirm("Are you sure you want to delete this table?")) {
      const updatedTables = tables.filter((table) => table.id_meja !== id);
      setTables(updatedTables);
    }
  };

  const handleAddMenu = () => {
    setMenuModalIsOpen(true);
    // setModalType("user");
    setNamaMenu("");
    setDeskripsi("");
    setGambar("");
    setHarga("");
    setJenisMakanan("");
    setAction(`insert`);
  };

  const handleEditMenu = (menu) => {
    setMenuModalIsOpen(true);
    setIDMenu(menu.id_menu);
    setNamaMenu(menu.nama_menu);
    setDeskripsi(menu.deskripsi);
    setGambar(menu.gambar);
    setHarga(menu.harga);
    setJenisMakanan(menu.jenis);
    setAction(`edit`);
  };

  const handleDeleteMenu = (id) => {
    if (window.confirm("Are you sure you want to delete this menu?")) {
      const updatedMenus = menus.filter((menu) => menu.id_menu !== id);
      setMenus(updatedMenus);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      return;
    } else {
      setPasswordError("");
    }

    setUserModalIsOpen(passwordError === "");

    if (action === "insert") {
      const endpoint = `http://localhost:8080/user`;
      const data = {
        nama_user: nama,
        username: username,
        password: password,
        role: role,
      };

      axios
        .post(endpoint, data, authorization)
        .then((response) => {
          setMessage(response.data.message);
          getData();
        })
        .catch((error) => console.log(error));
    } else if (action === "edit") {
      const endpoint = `http://localhost:8080/user/${idUser}`;
      const data = {
        nama_user: nama,
        username: username,
        password: password,
        role: role,
      };
      /** sending data untuk update user */
      axios
        .put(endpoint, data, authorization)
        .then((response) => {
          setMessage(response.data.message);
          getData();
        })
        .catch((error) => console.log(error));
    }
  };

  const handleGambarChange = (event) => {
    setGambar(event.target.files[0]);
  };

  const handleFormSubmitMenu = (event) => {
    event.preventDefault();
    setMenuModalIsOpen(false);

    const formData = new FormData();
    formData.append("nama_menu", namaMenu);
    formData.append("deskripsi", deskripsi);
    formData.append("harga", harga);
    formData.append("jenis", jenisMakanan);
    formData.append("gambar", gambar);

    if (action === "insert") {
      const endpoint = `http://localhost:8080/menu`;
      axios
        .post(endpoint, formData, authorization)
        .then((response) => {
          setMessage(response.data.message);
          getMenuData();
        })
        .catch((error) => console.log(error));
    } else if (action === "edit") {
      const endpoint = `http://localhost:8080/menu/${idMenu}`;
      axios
        .put(endpoint, formData, authorization)
        .then((response) => {
          setMessage(response.data.message);
          getMenuData();
        })
        .catch((error) => console.log(error));
    }
  };

  const handleFormSubmitMeja = (e) => {
    e.preventDefault();
    setMejaModalIsOpen(false);

    if (action === "insert") {
      const endpoint = `http://localhost:8080/meja`;
      const data = {
        nomor_meja: nomor,
      };
      axios
        .post(endpoint, data, authorization)
        .then((response) => {
          setMessage(response.data.message);
          getMejaData();
        })
        .catch((error) => {
          if (error.response && error.response.data) {
            setMejaError({ nomor_meja: error.response.data.message });
          } else {
            console.log(error);
          }
        });
    } else if (action === "edit") {
      const endpoint = `http://localhost:8080/meja/${idMeja}`;
      const data = {
        nomor_meja: nomor,
      };

      /** sending data untuk update user */
      axios
        .put(endpoint, data, authorization)
        .then((response) => {
          setMessage(response.data.message);
          getMejaData();
        })
        .catch((error) => {
          if (error.response && error.response.data) {
            setMejaError({ nomor_meja: error.response.data.message });
          } else {
            console.log(error);
          }
        });
    }
  };

  useEffect(() => {
    const token = localStorage.getItem(`token-cafe`);
    const authorization = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const getData = async () => {
      const endpoint = `http://localhost:8080/user`;
      try {
        const response = await axios.get(endpoint, authorization);
        setUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const getMenuData = () => {
      const endpoint = `http://localhost:8080/menu`;
      axios
        .get(endpoint, authorization)
        .then((response) => {
          setMenus(response.data);
        })
        .catch((error) => console.log(error));
    };

    const getMejaData = () => {
      const endpoint = `http://localhost:8080/meja`;
      axios
        .get(endpoint, authorization)
        .then((response) => {
          setTables(response.data);
        })
        .catch((error) => console.log(error));
    };

    getMejaData();
    getMenuData();
    getData();
    setUserModalIsOpen(false);
    setMejaModalIsOpen(false);
    setMenuModalIsOpen(false);
    setNama("");
    setUsername("");
    setPassword("");
    setRole("");
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {message && <div className="bg-green-200 p-2 mb-4">{message}</div>}
      <Modal
        id="modalUser"
        isOpen={userModalIsOpen}
        onRequestClose={handleUserModalClose}
        className="Modal fixed z-10 inset-0 overflow-y-auto"
        overlayClassName="Overlay fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="flex justify-center items-center min-h-screen">
          <div className="bg-white rounded-lg p-8 w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Add User</h2>
            <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
              <label className="flex flex-col">
                <span className="text-sm font-semibold mb-1">Nama:</span>
                <input
                  type="text"
                  required
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  className="border border-gray-300 px-2 py-1 rounded-md"
                />
              </label>
              <label className="flex flex-col">
                <span className="text-sm font-semibold mb-1">Username:</span>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="border border-gray-300 px-2 py-1 rounded-md"
                />
              </label>
              <label className="flex flex-col">
                <span className="text-sm font-semibold mb-1">Password:</span>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border border-gray-300 px-2 py-1 rounded-md"
                />
                {passwordError && (
                  <span style={{ color: "red" }}>{passwordError}</span>
                )}
              </label>
              <label className="flex flex-col">
                <span className="text-sm font-semibold mb-1">Role:</span>
                <select
                  value={role}
                  required
                  onChange={(e) => setRole(e.target.value)}
                  className="border border-gray-300 px-2 py-1 rounded-md"
                >
                  <option value="admin">Admin</option>
                  <option value="kasir">Kasir</option>
                  <option value="manajer">Manajer</option>
                </select>
              </label>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleUserModalClose}
                  className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-md mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>

      <Modal
        id="modalMeja"
        isOpen={mejaModalIsOpen}
        onRequestClose={handleMejaModalClose}
        className="Modal fixed z-10 inset-0 overflow-y-auto"
        overlayClassName="Overlay fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="flex justify-center items-center min-h-screen">
          <div className="bg-white rounded-lg p-8 w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Add Table</h2>
            <form className="flex flex-col gap-4">
              <label className="flex flex-col">
                <span className="text-sm font-semibold mb-1">Nomor Meja:</span>
                <input
                  type="text"
                  required
                  value={nomor}
                  onChange={(e) => setNomor(e.target.value)}
                  className="border border-gray-300 px-2 py-1 rounded-md"
                />
              </label>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleMejaModalClose}
                  className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-md mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={handleFormSubmitMeja}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>

      <Modal
        id="modalMeja"
        isOpen={menuModalIsOpen}
        onRequestClose={handleMenuModalClose}
        className="Modal fixed inset-0 overflow-y-auto"
        overlayClassName="Overlay fixed inset-0 bg-black bg-opacity-50 z-20"
      >
        <div className="flex justify-center items-center min-h-screen">
          <div className="bg-white rounded-lg p-8 w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Add Menu</h2>
            <form className="flex flex-col gap-4">
              <label className="flex flex-col">
                <span className="text-sm font-semibold mb-1">Nama Menu:</span>
                <input
                  type="text"
                  required
                  value={namaMenu}
                  onChange={(e) => setNamaMenu(e.target.value)}
                  className="border border-gray-300 px-2 py-1 rounded-md"
                />
              </label>
              <label className="flex flex-col">
                <span className="text-sm font-semibold mb-1">Deskripsi:</span>
                <input
                  type="text"
                  required
                  value={deskripsi}
                  onChange={(e) => setDeskripsi(e.target.value)}
                  className="border border-gray-300 px-2 py-1 rounded-md"
                />
              </label>
              <label className="flex flex-col">
                <span className="text-sm font-semibold mb-1">Gambar:</span>
                <input
                  type="file"
                  accept=".jpg"
                  required
                  onChange={handleGambarChange}
                  className="border border-gray-300 px-2 py-1 rounded-md"
                />
              </label>
              <label className="flex flex-col">
                <span className="text-sm font-semibold mb-1">Harga:</span>
                <input
                  type="number"
                  value={harga}
                  required
                  onChange={(e) => setHarga(e.target.value)}
                  className="border border-gray-300 px-2 py-1 rounded-md"
                />
              </label>
              <label className="flex flex-col">
                <span className="text-sm font-semibold mb-1">Jenis:</span>
                <select
                  required
                  value={jenisMakanan}
                  onChange={(e) => setJenisMakanan(e.target.value)}
                  className="border border-gray-300 px-2 py-1 rounded-md"
                >
                  <option value="main_course">Main Course</option>
                  <option value="coffe">Coffe</option>
                  <option value="non_coffe">Non Coffe</option>
                  <option value="snacks">Snacks</option>
                </select>
              </label>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleMenuModalClose}
                  className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-md mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={handleFormSubmitMenu}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>

      <header className="bg-gray-800 py-2 sticky top-0 left-0 right-0 z-10">
        <nav className="container mx-auto flex justify-between items-center">
          <div className="text-white font-bold">Welcome Admin!</div>
          <div className="flex">
            <button
              className={`${
                activeTab === "user"
                  ? "bg-gray-700"
                  : "bg-gray-900 hover:bg-gray-700"
              } text-white py-2 px-4 mr-2 rounded`}
              onClick={() => handleTabClick("user")}
            >
              Users
            </button>
            <button
              className={`${
                activeTab === "meja"
                  ? "bg-gray-700"
                  : "bg-gray-900 hover:bg-gray-700"
              } text-white py-2 px-4 mr-2 rounded`}
              onClick={() => handleTabClick("meja")}
            >
              Tables
            </button>
            <button
              className={`${
                activeTab === "menu"
                  ? "bg-gray-700"
                  : "bg-gray-900 hover:bg-gray-700"
              } text-white py-2 px-4 mr-2 rounded`}
              onClick={() => handleTabClick("menu")}
            >
              Foods
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"
              onClick={() => handleLogout()}
            >
              Log out
            </button>
          </div>
        </nav>
      </header>

      <main className="container mx-auto py-8">
        {activeTab === "user" && (
          <div className="bg-white rounded-lg shadow-lg px-8 py-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Users</h2>
              <button
                className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded"
                onClick={() => handleAddUser()}
              >
                Add User
              </button>
            </div>
            <p className="text-sm mb-4">
              A list of all data users registered in Wikusama Cafe.
            </p>
            <table className="table-fixed w-full text-md bg-white rounded mb-4">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 px-1">ID User</th>
                  <th className="text-left p-3 px-5">Name</th>
                  <th className="text-left p-3 px-5">Username</th>
                  <th className="text-left p-3 px-7">Role</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id_user} className="border-b">
                    <td className="p-3 px-1">
                      <h5 className="bg-transparent">{user.id_user}</h5>
                    </td>
                    <td className="p-3 px-5">
                      <h5 className="bg-transparent">
                        {user.nama_user.charAt(0).toUpperCase() +
                          user.nama_user.slice(1)}
                      </h5>
                    </td>
                    <td className="p-3 px-5">
                      <h5 className="bg-transparent">{user.username}</h5>
                    </td>
                    <td className="p-3 px-7">
                      <h5 className="bg-transparent">
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </h5>
                    </td>

                    <td className="p-3 px-2 flex justify-end">
                      <button
                        type="button"
                        className="edit-button hover:text-blue-700 mr-3 text-sm py-1 px-2"
                        onClick={() => handleEditUser(user)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                        onClick={() => handleDeleteUser(user)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "meja" && (
          <div className="bg-white rounded-lg shadow-lg px-8 py-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Tables</h2>
              <button
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                onClick={() => handleAddMeja()}
              >
                Add Table
              </button>
            </div>
            <p className="text-sm mb-4">
              A list of all tables available in Wikusama Cafe.
            </p>
            <div className="grid grid-cols-5 gap-4">
              {tables.map((table) => (
                <div key={table.id_meja} className="relative">
                  <div className="bg-gray-700 rounded-md text-center py-4">
                    <p className="font-semibold text-white text-lg">
                      {table.nomor_meja}
                    </p>
                  </div>
                  <div className="absolute inset-0 bg-gray-700 opacity-0 hover:opacity-100 flex justify-center items-center">
                    <button
                      type="button"
                      className="mr-2 text-white hover:text-gray-200 bg-blue-500 rounded py-1 px-2"
                      onClick={() => handleEditMeja(table)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="text-white hover:text-gray-200 bg-red-500 rounded py-1 px-2"
                      onClick={() => handleDeleteMeja(table)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "menu" && (
          <div className="bg-white rounded-lg shadow-lg px-8 py-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Menus</h2>
              <button
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                onClick={() => handleAddMenu()}
              >
                Add Menu
              </button>
            </div>
            <p className="text-sm mb-4">
              A list of all menus available in Wikusama Cafe.
            </p>
            <div className="bg-white">
              <div className="mx-auto max-w-2xl py-8 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="grid grid-cols-1 gap-y-5 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                  {menus.map((menu) => (
                    <div key={menu.id_menu} className="group relative">
                      <div className="min-h-80 aspect-w- aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80">
                        <img
                          src={`${baseUrl}${menu.gambar}`}
                          alt={menu.gambar}
                          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                        />
                        <div className="absolute inset-0 opacity-0 hover:opacity-100 flex justify-center items-center z-10 pointer-events-none">
                          <button
                            type="button"
                            className="mr-2 text-white hover:text-gray-200 bg-blue-500 hover:bg-blue-600 py-1 px-2 rounded pointer-events-auto"
                            onClick={() => handleEditMenu(menu)}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="text-white hover:text-gray-200 bg-red-500 hover:bg-red-600 py-1 px-2 rounded pointer-events-auto"
                            onClick={() => handleDeleteMenu(menu)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-between">
                        <div>
                          <h3 className="text-sm text-gray-700">
                            <a href={menu.href}>
                              <span
                                aria-hidden="true"
                                className="absolute inset-0"
                              />
                              {menu.nama_menu}
                            </a>
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">
                            {menu.jenis}
                          </p>
                        </div>
                        <p className="text-sm font-medium text-gray-900">
                          {menu.harga}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
