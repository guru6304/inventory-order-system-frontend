import { useEffect, useState } from "react";
import api from "../api/axios";
import LoadingSpinner from "../components/LoadingSpinner";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllOrders = async () => {
    setLoading(true);
    try {
      const response = await api.get("/orders");
      setOrders(response.data.data);
    } catch (err) {
      alert("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const handleConfirm = async (id) => {
    try {
      await api.put(`/orders/${id}/confirm`);
      alert("Order Confirmed Successfully!");
      fetchAllOrders();
    } catch (err) {
      alert("Could not confirm order");
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container-page">
      <h2 className="text-center mb-4">Manage Orders</h2>
      <div className="table-responsive">
        <table className="table table-bordered bg-white">
          <thead className="table-dark">
            <tr>
              <th>User name</th>
              <th>Order ID</th>
              <th>Status</th>
              <th>Total Amount</th>
              {/* <th>Action</th> */}
            </tr>
          </thead>
          <tbody>
            {orders.map((order,index) => (
              <tr key={order.id}>
                <td>
                    {orders[index].user}
                </td>
                <td>#{order.id}</td>
                <td>
                  <span className={`badge ${order.status === 'pending' ? 'bg-warning' : 'bg-success'}`}>
                    {order.status}
                  </span>
                </td>
                <td>₹{order.total_amount}</td>
                {/* <td>
                  {order.status === 'pending' && (
                    <button className="btn btn-success btn-sm" onClick={() => handleConfirm(order.id)}>
                      Confirm Order
                    </button>
                  )}
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default AdminOrders;