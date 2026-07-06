import { useEffect, useState } from "react";
import { deleteProduct } from "../api/AdminProductApi";
import { getProducts } from "../api/ProductApi";
import LoadingSpinner from "../components/LoadingSpinner";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await getProducts();
      setProducts(response.data.data);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to Fetch Products");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  const handleDelete = async (productId) => {
    
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );
        if (!confirmDelete) {
            return;
        }
    try {
      await deleteProduct(productId);
      alert("Deleted Product Successfully");
      await fetchProducts();
    } catch (err) {
      alert(err.response?.data?.message || "Delete Product Failed");
    }
  };
  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <div className="container-page">
      <h2 className="text-center mb-4">Admin Products</h2>

      <div className="row">
        {products.map((product) => (
          <div className="col-md-4 mb-4" key={product.id}>
            <div className="card product-card h-100">
              <div className="card-body d-flex flex-column">
                <h4 className="card-title">{product.name}</h4>

                <p>
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

                <button
                  className="btn btn-danger mt-auto"
                  onClick={() => handleDelete(product.id)}
                >
                  <i className="bi bi-trash"></i> Delete Product
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminProducts;
