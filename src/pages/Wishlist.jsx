import { useEffect, useState } from "react";
import { getWishlist } from "../api/WishlistApi";
import LoadingSpinner from "../components/LoadingSpinner";

function Wishlist() {
  const [wishlistItems, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      setLoading(true);
      try {
        const response = await getWishlist();
        setWishlist(response.data.data);
      } catch (err) {
        alert(err.response?.data?.message || "Wishlist Fetch Failed");
      } finally {
        setLoading(false);
      }
    };
    fetchWishlist();
  }, []);
  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <div className="container-page">
      <h2 className="text-center mb-4">My Wishlist</h2>

      <div className="row">
        {wishlistItems.map((item) => (
          <div className="col-md-4 mb-4" key={item.id}>
            <div className="card product-card h-100">
              <div className="card-body d-flex flex-column">
                <h4 className="card-title">{item.product_name}</h4>

                <p>
                  <span className="badge bg-success">
                    ₹ {item.product_price}
                  </span>
                </p>

                <p>
                  <span className="badge bg-primary">
                    Stock : {item.stock_quantity}
                  </span>
                </p>

                <button className="btn btn-outline-danger mt-auto">
                  ❤️ Wishlist
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;
