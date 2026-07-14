import { useEffect, useState } from "react";
import { deleteProduct, createProduct } from "../api/AdminProductApi";
import { getProducts } from "../api/ProductApi";
import LoadingSpinner from "../components/LoadingSpinner";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({ category_id: "", name: "", description: "", price: "", stock_quantity: "" });

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

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (file) data.append("image", file);

    try {
      await createProduct(data);
      alert("Product Added Successfully");
      fetchProducts();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add product");
    }
  };

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

      <div className="card-box mb-4">
        <h4>Add New Product</h4>
        <form onSubmit={handleAddProduct} className="row g-3">
          <div className="col-md-6">
            <input className="form-control" placeholder="Product Name" onChange={e => setFormData({...formData, name: e.target.value})} required />
          </div>
          <div className="col-md-6">
            <input className="form-control" placeholder="Category ID" type="number" onChange={e => setFormData({...formData, category_id: e.target.value})} required />
          </div>
          <div className="col-md-4">
            <input className="form-control" placeholder="Price" type="number" onChange={e => setFormData({...formData, price: e.target.value})} required />
          </div>
          <div className="col-md-4">
            <input className="form-control" placeholder="Stock Quantity" type="number" onChange={e => setFormData({...formData, stock_quantity: e.target.value})} required />
          </div>
          <div className="col-md-4">
            <input className="form-control" type="file" onChange={handleFileChange} />
          </div>
          <div className="col-12">
            <input className="form-control" placeholder="Description" onChange={e => setFormData({...formData, description: e.target.value})} required />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary">Add Product</button>
          </div>
        </form>
      </div>

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