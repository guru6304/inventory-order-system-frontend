import { useEffect, useState } from "react";
import { getProducts } from "../api/ProductApi";
import { Link } from "react-router-dom";
import { addToWishlist } from "../api/WishlistApi";
import LoadingSpinner from "../components/LoadingSpinner";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await getProducts();
        setProducts(response.data.data);
      } catch (err) {
        alert(err.response?.data?.message || "Product Fetch Failed");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);
  const handleWishlist = async (productId) => {
    try {
      await addToWishlist(productId);
      alert("Added to Wishlist Successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Wishlist Failed");
    }
  };
  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <div className="container-page">
      <h2 className="text-center mb-4">Products</h2>

      <div className="row">
        {products.map((product) => (
          <div className="col-md-4 mb-4" key={product.id}>
            <div className="card product-card h-100">
              <div className="card-body d-flex flex-column">
                <h4 className="card-title">{product.name}</h4>

                <p className="card-text">
                  <span className="badge bg-success">₹ {product.price}</span>
                </p>

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

                <div className="mt-auto">
                  <Link
                    to={`/products/${product.id}`}
                    className="btn btn-outline-primary w-100 mb-2"
                  >
                    View Details
                  </Link>

                  <button
                    className="btn btn-warning w-100"
                    onClick={() => handleWishlist(product.id)}
                  >
                    ❤️ Add to Wishlist
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Products;
