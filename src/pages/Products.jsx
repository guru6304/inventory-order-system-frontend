import { useEffect, useState } from "react";
import { getProducts } from "../api/ProductApi";
import { Link } from "react-router-dom";
import { addToWishlist } from "../api/WishlistApi";
import LoadingSpinner from "../components/LoadingSpinner";
import { useAuth } from "../context/AuthContext";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { user } = useAuth();
  
  const backendURL = import.meta.env.REACT_APP_API_URL?.replace('/api', '') || "http://localhost:5000";

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await getProducts(page, 10);
        setProducts(response.data.data);
        if (response.data.pagination) {
            setTotalPages(response.data.pagination.totalPages);
        }
      } catch (err) {
        alert(err.response?.data?.message || "Product Fetch Failed");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [page]);

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
              
              {product.file_name && (
                <img 
                  src={`${backendURL}/${product.folder_name}/${product.file_name}`} 
                  alt={product.name} 
                  className="card-img-top" 
                  style={{ height: '200px', objectFit: 'cover' }}
                />
              )}

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

                  {user ? (
                    <button
                      className="btn btn-warning w-100"
                      onClick={() => handleWishlist(product.id)}
                    >
                      ❤️ Add to Wishlist
                    </button>
                  ) : (
                    <Link to="/login" className="btn btn-secondary w-100">
                      Login to Add Wishlist
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-center mt-4">
        <button className="btn btn-secondary me-2" disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
        <span className="align-self-center fw-bold px-3">Page {page} of {totalPages}</span>
        <button className="btn btn-secondary ms-2" disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}
export default Products;