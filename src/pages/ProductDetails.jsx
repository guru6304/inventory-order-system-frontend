import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../api/ProductApi";
import { addToWishlist } from "../api/WishlistApi";
import { createOrder } from "../api/OrderApi";
import { useAuth } from "../context/AuthContext";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const { user } = useAuth();

  // Resolve the backend URL for displaying the product image
  const rawApiUrl =
    process.env.REACT_APP_API_URL
  const backendURL = rawApiUrl.replace(/\/api\/?$/, "");

  useEffect(() => {
    const fetchProductById = async () => {
      try {
        const response = await getProductById(id);
        setProduct(response.data.data);
      } catch (err) {
        alert(err.response?.data?.message || "Product Fetch Failed");
      }
    };

    fetchProductById();
  }, [id]);

  const handleWishlist = async () => {
    try {
      await addToWishlist(product.id);
      alert("Added to Wishlist Successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Wishlist Failed");
    }
  };

  const handleOrder = async () => {
    const confirmOrder = window.confirm(
      `Warning: You are about to place an order for ${product.name} at ₹${product.price}. Do you want to confirm?`
    );

    if (confirmOrder) {
      try {
        const payload = [{ product_id: product.id, quantity: 1 }];
        await createOrder(payload);
        alert("Order Confirmed Successfully! Check 'My Orders' for details.");
      } catch (err) {
        alert(err.response?.data?.message || "Order Failed to Process");
      }
    }
  };

  return (
    <div className="container-page">
      <div className="card product-details-card">
        <div className="card-body">
          {product && (
            <>
              {/* Product Image */}
              {product.file_name && (
                <div className="text-center mb-4">
                  <img
                    src={`${backendURL}/${product.folder_name}/${product.file_name}`}
                    alt={product.name}
                    className="img-fluid rounded shadow-sm"
                    style={{ maxHeight: "350px", objectFit: "cover" }}
                  />
                </div>
              )}

              <h2 className="mb-4">{product.name}</h2>

              <h4 className="text-success mb-3">₹ {product.price}</h4>

              <p>
                <span className="badge bg-primary">
                  Stock : {product.stock_quantity}
                </span>
              </p>

              <p>
                <span className="badge bg-secondary">
                  {product.category_name}
                </span>
              </p>

              <hr />

              <h5>Description</h5>

              <p className="description-text">{product.description}</p>

              {/* Action Buttons Section */}
              <div className="d-flex flex-wrap gap-3 mt-5 pt-3 border-top">
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => navigate("/products")}
                >
                  <i className="bi bi-arrow-left"></i> Back to Products
                </button>

                {user ? (
                  <>
                    <button
                      className="btn btn-warning"
                      onClick={handleWishlist}
                    >
                      ❤️ Add to Wishlist
                    </button>
                    
                    <button
                      className="btn btn-success"
                      onClick={handleOrder}
                    >
                      🛍️ Order Now
                    </button>
                  </>
                ) : (
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate("/login")}
                  >
                    Login to Order or Add to Wishlist
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;