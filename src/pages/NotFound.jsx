import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="container-page">
      <div className="not-found-card">
        <h1>404</h1>

        <h3>Page Not Found</h3>

        <p>Sorry, the page you are looking for does not exist.</p>

        <Link to="/products" className="btn btn-primary mt-3">
          Go to Products
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
