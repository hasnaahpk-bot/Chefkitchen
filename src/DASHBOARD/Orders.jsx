import { useOrders } from "../context/OrdersContext";
import { useState } from "react";

const DashboardOrders = () => {
  const { orders } = useOrders();
  const [openId, setOpenId] = useState(null);

  return (
    <div className="p-4 sm:p-6">

      <h1 className="text-lg font-semibold mb-4">Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-400">No orders yet</p>
      ) : (

        <>
          {/* ================= DESKTOP TABLE ================= */}
          <div className="hidden md:block overflow-x-auto bg-white rounded-lg shadow">

  <table className="w-full text-sm table-fixed">

    <thead className="bg-gray-100">

      <tr>
        <th className="p-3 text-left w-[20%]">Customer</th>
        <th className="p-3 text-left w-[25%]">Date</th>
        <th className="p-3 text-left w-[15%]">Type</th>
        <th className="p-3 text-left w-[15%]">Payment</th>
        <th className="p-3 text-right w-[15%]">Total</th>
      </tr>

    </thead>

    <tbody>

      {orders.map(order => {

        const isOpen = openId === order.id;

        return (
          <>

            {/* MAIN ROW */}
            <tr
              key={order.id}
              onClick={() => setOpenId(isOpen ? null : order.id)}
              className="border-t cursor-pointer hover:bg-gray-50"
            >

              <td className="p-3 text-left font-medium truncate">
                {order.customerName}
              </td>

              <td className="p-3 text-left text-xs text-gray-500">
                {new Date(order.createdAt).toLocaleString()}
              </td>

              <td className="p-3 text-left">
                {order.orderType}
              </td>

              <td className="p-3 text-left capitalize">
                {order.paymentMethod}
              </td>

              <td className="p-3 text-right font-semibold">
                ₹{order.total.toFixed(2)}
              </td>

            </tr>

            {/* EXPANDED CONTENT */}
            {isOpen && (
              <tr className="bg-gray-50">

                <td colSpan={5} className="p-3">

                  <div className="space-y-2">

                    {order.items.map(it => (

                      <div
                        key={it.id + it.size}
                        className="flex items-center gap-3"
                      >

                        <img
                          src={it.img}
                          className="w-10 h-10 rounded object-cover"
                          alt={it.title}
                        />

                        <div className="text-xs">

                          <p className="font-medium">
                            {it.title}
                          </p>

                          <p className="text-gray-500">
                            {it.size} × {it.quantity}
                          </p>

                        </div>

                      </div>

                    ))}

                  </div>

                </td>

              </tr>
            )}

          </>
        );
      })}

    </tbody>
  </table>
</div>


          {/* ================= MOBILE CARDS ================= */}
          <div className="md:hidden space-y-4">

            {orders.map(order => {

              const isOpen = openId === order.id;

              return (
                <div
                  key={order.id}
                  className="bg-white rounded-lg shadow p-4"
                  onClick={() => setOpenId(isOpen ? null : order.id)}
                >

                  <div className="flex justify-between mb-2">
                    <p className="font-medium">
                      {order.customerName}
                    </p>

                    <p className="font-semibold">
                      ₹{order.total.toFixed(2)}
                    </p>
                  </div>

                  <p className="text-xs text-gray-500 mb-1">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>

                  <div className="flex justify-between text-sm mb-2">
                    <span>{order.orderType}</span>
                    <span className="capitalize">
                      {order.paymentMethod}
                    </span>
                  </div>

                  {isOpen && (
                    <div className="mt-3 space-y-2 border-t pt-3">

                      {order.items.map(it => (
                        <div
                          key={it.id + it.size}
                          className="flex items-center gap-3"
                        >
                          <img
                            src={it.img}
                            className="w-10 h-10 rounded object-cover"
                            alt={it.title}
                          />

                          <div className="text-xs">
                            <p className="font-medium">
                              {it.title}
                            </p>

                            <p className="text-gray-500">
                              {it.size} × {it.quantity}
                            </p>
                          </div>
                        </div>
                      ))}

                    </div>
                  )}

                </div>
              );
            })}

          </div>
        </>
      )}
    </div>
  );
};

export default DashboardOrders;
