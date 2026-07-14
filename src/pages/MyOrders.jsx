import { useEffect, useState } from "react";
import { getOrders } from "../api/OrderApi";
import api from "../api/axios";
import LoadingSpinner from "../components/LoadingSpinner";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await getOrders();
      setOrders(response.data.data || []);
    } catch (err) {
      alert(err.response?.data?.message || "Orders Fetch Failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCancelOrder = async (orderId) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this order?");
    if (!confirmCancel) return;

    try {
      await api.put(`/orders/${orderId}/cancel`);
      alert("Order cancelled successfully");
      fetchOrders(); // Refresh the list to show updated status
    } catch (err) {
      alert(err.response?.data?.message || "Failed to cancel order");
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container-page">
      <h2 className="text-center mb-4">My Orders</h2>
      
      {orders.length === 0 ? (
        <div className="alert alert-info text-center">No orders found.</div>
      ) : (
        <div className="row">
          {orders.map((order) => (
            <div className="col-md-6 mb-4" key={order.id}>
              <div className="card shadow-sm h-100">
                {/* Order Header */}
                <div className="card-header d-flex justify-content-between align-items-center bg-light">
                  <h5 className="mb-0 fw-bold">Order #{order.id}</h5>
                  <span 
                    className={`badge ${
                      order.status === "pending" ? "bg-warning text-dark" : 
                      order.status === "cancelled" ? "bg-danger" : "bg-success"
                    }`}
                  >
                    {order.status.toUpperCase()}
                  </span>
                </div>

                {/* Order Items */}
                <div className="card-body">
                  <p className="text-muted small mb-3">
                    Placed on: {new Date(order.reserved_at).toLocaleString()}
                  </p>
                  
                  <ul className="list-group list-group-flush mb-3">
                    {order.items.map((item, index) => (
                      <li className="list-group-item px-0 d-flex justify-content-between align-items-center" key={index}>
                        <div>
                          <h6 className="mb-0">{item.product_name}</h6>
                          <small className="text-muted">Qty: {item.quantity} x ₹{item.price_at_purchase}</small>
                        </div>
                        <span className="fw-bold">
                          ₹{(item.quantity * Number(item.price_at_purchase)).toFixed(2)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Order Footer */}
                <div className="card-footer bg-white d-flex justify-content-between align-items-center border-top-0 pt-0">
                  <h5 className="mb-0 fw-bold text-dark">
                    Total: ₹{Number(order.total_amount).toFixed(2)}
                  </h5>
                  
                  {order.status === "pending" && (
                    <button 
                      className="btn btn-outline-danger btn-sm fw-bold"
                      onClick={() => handleCancelOrder(order.id)}
                    >
                      Cancel Order
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyOrders;