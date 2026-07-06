import { useEffect, useState } from "react";
import { deleteCategory, getCategories } from "../api/AdminCategoryApi";
import LoadingSpinner from "../components/LoadingSpinner";

function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await getCategories();
      setCategories(response.data.data);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to Fetch Categories");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  const handleDelete = async (categoryId) => {
    const confirmDelete = window.confirm(
        "Are you sure you want to delete this category?"
    );
    if (!confirmDelete) {
        return;
    }
    try {
      await deleteCategory(categoryId);
      alert("Deleted Category Successfully");
      await fetchCategories();
    } catch (err) {
      alert(err.response?.data?.message || "Delete Category Failed");
    }
  };
  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <div className="container-page">
      <h2 className="text-center mb-4">Admin Categories</h2>

      <div className="row">
        {categories.map((category) => (
          <div className="col-md-4 mb-4" key={category.id}>
            <div className="card product-card h-100">
              <div className="card-body d-flex flex-column justify-content-between">
                <div>
                  <h4 className="card-title">{category.name}</h4>

                  <p className="text-muted">Category ID : {category.id}</p>
                </div>

                <button
                  className="btn btn-danger mt-3"
                  onClick={() => handleDelete(category.id)}
                >
                  <i className="bi bi-trash"></i> Delete Category
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminCategories;
