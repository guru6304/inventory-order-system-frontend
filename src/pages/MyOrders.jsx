import { useEffect, useState } from "react";
import { getOrders } from "../api/OrderApi";
import LoadingSpinner from "../components/LoadingSpinner";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await getOrders();
        setOrders(response.data.data);
      } catch (err) {
        alert(err.response?.data?.message || "Orders Fetch Failed");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);
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
          {orders.map((item) => (
            <div className="col-md-4 mb-4" key={item.id}>
              <div className="card product-card h-100">
                <div className="card-body d-flex flex-column">
                  <h4 className="card-title">{item.product_name}</h4>

                  <p>
                    <span className="badge bg-success">₹ {item.price}</span>
                  </p>

                  <p>
                    <span className="badge bg-primary">
                      Quantity : {item.quantity}
                    </span>
                  </p>

                  <p>
                    <span className="badge bg-dark">
                      Total : ₹ {item.total_price}
                    </span>
                  </p>

                  <button className="btn btn-success mt-auto" disabled>
                    ✓ Ordered
                  </button>
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
