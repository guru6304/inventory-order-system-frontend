import { useState } from "react";
import { register } from "../api/AuthApi";
import { useNavigate } from "react-router-dom";

function Register(){
    const navigate = useNavigate();
    const [formData,setFormData] = useState({
        name:"",
        email:"",
        password:""
    });
    const handleInputs = (e)=>{
        setFormData({
            ...formData,[e.target.name]:e.target.value
        });
    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            await register(formData);
            navigate("/login")
        }catch(err){
        alert(err.response?.data?.message || "Register Not Successful");
    }
    
    }
    return (
  <div className="container-page">
    <div className="auth-card">

      <h2 className="text-center mb-4">
        Register
      </h2>

      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label className="form-label">
            Name
          </label>

          <input
            className="form-control"
            type="text"
            name="name"
            placeholder="Enter Name"
            value={formData.name}
            onChange={handleInputs}
          />
        </div>

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
            onChange={handleInputs}
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
            onChange={handleInputs}
          />
        </div>

        <button
          className="btn btn-success w-100"
          type="submit"
        >
          Register
        </button>

      </form>

    </div>
  </div>
);
}
export default Register;