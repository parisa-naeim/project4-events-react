import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as authService from "../../services/authService";

const SigninForm = (props) => {
  const [message, setMessage] = useState([""]);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const updateMessage = (msg) => {
    setMessage(msg);
  };

  const handleChange = (e) => {
    updateMessage("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await authService.signin(formData);
      props.onSignIn(user);
    } catch (err) {
      updateMessage(err.message);
    }
  };

  return (
    <main
      className="min-width-400 d-flex flex-column justify-content-center align-items-center height-70vh"
      style={{ backgroundColor: "white" }}
    >
      <h1 className="mb-5">Sign In</h1>
      <p>{message}</p>
      <form
        autoComplete="off"
        onSubmit={handleSubmit}
        className="d-flex flex-column align-items-center w-25 min-width-400"
      >
        <div className="mb-3 w-100">
          <label htmlFor="username-input" className="form-label">
            Username:
          </label>
          <input
            type="text"
            autoComplete="off"
            id="username-input"
            className="form-control"
            value={formData.username}
            name="username"
            required
            onChange={handleChange}
          />
        </div>
        <div className="mb-3 w-100">
          <label htmlFor="password-input" className="form-label">
            Password:
          </label>
          <input
            type="password"
            autoComplete="off"
            id="password-input"
            className="form-control"
            value={formData.password}
            name="password"
            required
            onChange={handleChange}
          />
        </div>
        <div className="d-flex gap-5 mt-3">
          <div>
            <button className="btn px-4 py-2 btn-primary">Log In</button>
          </div>
          <div>
            <Link to="/">
              <button className="btn px-4 py-2 btn-primary">Cancel</button>
            </Link>
          </div>
        </div>
      </form>
    </main>
  );
};

export default SigninForm;
