import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getMe, login } from "../api/AuthApi";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(formData);

      localStorage.setItem("token", response.data.token);

      const userResponse = await getMe();

      setUser(userResponse.data.data);

      navigate("/products");
    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
    }
  };
  return (
  <div className="container-page">
    <div className="auth-card">

      <h2 className="text-center mb-4">
        Login
      </h2>

      <form onSubmit={handleSubmit}>

        <div className="mb-3">

          <label className="form-label">
            Email
          </label>

          <input
            className="form-control"
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
          />

        </div>

        <div className="mb-4">

          <label className="form-label">
            Password
          </label>

          <input
            className="form-control"
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
          />

        </div>

        <button
          className="btn btn-primary w-100"
          type="submit"
        >
          Login
        </button>

      </form>

    </div>
  </div>
);
}
export default Login;
