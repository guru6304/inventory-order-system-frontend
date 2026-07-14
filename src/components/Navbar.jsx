import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/products">
          Inventory System
        </Link>

        <div className="navbar-nav ms-auto align-items-center">
          <Link className="nav-link" to="/products">
            Products
          </Link>

          {user ? (
            <>
              {/* Admin Specific Links */}
              {user.role === "admin" ? (
                <>
                  <Link className="nav-link" to="/admin/products">
                    Manage Products
                  </Link>
                  <Link className="nav-link" to="/admin/categories">
                    Manage Categories
                  </Link>
                  <Link className="nav-link" to="/admin/orders">
                    Manage Orders
                  </Link>
                </>
              ) : (
                /* Customer Specific Links */
                <>
                  <Link className="nav-link" to="/orders">
                    My Orders
                  </Link>
                  <Link className="nav-link" to="/wishlist">
                    Wishlist
                  </Link>
                </>
              )}

              <button className="btn btn-danger ms-3" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="nav-link" to="/login">
                Login
              </Link>
              <Link className="nav-link" to="/register">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;