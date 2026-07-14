import { useEffect, useState } from "react";
import { getWishlist, deleteWishlist } from "../api/WishlistApi";
import LoadingSpinner from "../components/LoadingSpinner";

function Wishlist() {
  const [wishlistItems, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = async () => {
    setLoading(true);
    try {
      const response = await getWishlist();
      setWishlist(response.data.data || []);
    } catch (err) {
      alert(err.response?.data?.message || "Wishlist Fetch Failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const handleRemove = async (productId) => {
    try {
      await deleteWishlist(productId);
      // Remove item from UI state immediately
      setWishlist(wishlistItems.filter((item) => item.product_id !== productId));
      alert("Item Removed from Wishlist");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to remove item");
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container-page">
      <h2 className="text-center mb-4">My Wishlist</h2>
      
      {wishlistItems.length === 0 ? (
        <div className="alert alert-info text-center">
          No products found in your wishlist.
        </div>
      ) : (
        <div className="row">
          {wishlistItems.map((item) => (
            <div className="col-md-4 mb-4" key={item.product_id}>
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

                  <div className="mt-auto">
                    <button 
                      className="btn btn-danger w-100" 
                      onClick={() => handleRemove(item.product_id)}
                    >
                      <i className="bi bi-trash"></i> Remove from Wishlist
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;