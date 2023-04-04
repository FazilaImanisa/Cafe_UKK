{
  /* <div className="bg-white rounded-lg shadow-lg px-8 py-6">
  <div className="flex justify-between items-center mb-4">
    <h2 className="text-xl font-semibold">Menus</h2>
    <div className="flex flex-col">
      <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
      <ul>
        {orderItems.map((itemId) => {
          const menuItem = menus.find((menu) => menu.id_menu === itemId);
          return (
            <li key={itemId} className="flex justify-between">
              <span>{menuItem.nama_menu}</span>
              <span>{menuItem.harga}</span>
              <button onClick={() => handleRemoveFromOrder(menuItem)}>
                Remove
              </button>
            </li>
          );
        })}
      </ul>
      <p>Total Price: {totalPrice}</p>
      <button onClick={handlePlaceOrder}>Place Order</button>
    </div>
  </div>
  <div className="bg-white">
    <div className="mx-auto max-w-2xl py-8 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="grid grid-cols-1 gap-y-5 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {menus.map((menu) => (
          <div key={menu.id_menu} className="group relative">
            <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80">
              <img
                src={`${baseUrl}${menu.gambar}`}
                alt={menu.gambar}
                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
              />
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <h3
                  className="text-sm text-gray-700"
                >
                  <a href={menu.href}>
                    <span aria-hidden="true" className="absolute inset-0" />
                    {menu.nama_menu}
                  </a>
                </h3>
                <p className="mt-1 text-sm text-gray-500">{menu.jenis}</p>
              </div>
              <button
                onClick={() => handleAddToOrder(menu)}
                className="text-sm font-medium text-white bg-indigo-600 py-1 px-2 rounded"
              >
                Add to Order
              </button>
              <p className="text-sm font-medium text-gray-900">{menu.harga}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</div> */
}

<div className="flex flex-row h-screen overflow-hidden">
  {/* Sidebar */}
  <div className="bg-gray-100 w-1/4 border-r border-gray-200">
    {/* TODO: Add sidebar content */}
  </div>
  {/* Main content */}
  <div className="flex flex-col w-3/4">
    {/* Menu items */}
    <div className="flex-grow flex flex-wrap p-4 overflow-y-auto">
      {menus.map((menu) => (
        <div key={menu.id_menu} className="w-1/5 p-2">
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
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Add to order
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
    {/* Order summary */}
    <div className="bg-gray-100 p-4">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
      <ul>
        {orderItems.map((itemId) => {
          const menuItem = menus.find((menu) => menu.id_menu === itemId);
          return (
            <li key={itemId} className="flex justify-between">
              <span>{menuItem.nama_menu}</span>
              <span>{menuItem.harga}</span>
              <button onClick={() => handleRemoveFromOrder(menuItem)}>
                Remove
              </button>
            </li>
          );
        })}
      </ul>
      <p>Total Price: {totalPrice}</p>
      <button
        onClick={handlePlaceOrder}
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
        Place Order
      </button>
    </div>
  </div>
  {/* Right sidebar /}
<div className="bg-gray-100 w-1/4 border-l border-gray-200">
<div className="bg-gray-100 p-4">
                    <h2 className="text-xl font-semibold mb-4">
                      Order Summary
                    </h2>
                    <ul>
                      {orderItems.map((itemId) => {
                        const menuItem = menus.find(
                          (menu) => menu.id_menu === itemId
                        );
                        return (
                          <li key={itemId} className="flex justify-between">
                            <span>{menuItem.nama_menu}</span>
                            <span>{menuItem.harga}</span>
                            <button
                              onClick={() => handleRemoveFromOrder(menuItem)}
                            >
                              Remove
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                    <p>Total Price: {totalPrice}</p>
                    <button
                      onClick={handlePlaceOrder}
                      className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
                    >
                      Place Order
                    </button>
                  </div>
                </div>
{/ TODO: Add right sidebar content */}
</div>;
