import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as authService from "../../services/authService";

const SignupForm = (props) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState([""]);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    passwordConf: "",
  });

  const updateMessage = (msg) => {
    setMessage(msg);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUserResponse = await authService.signup(formData);
      props.setUser(newUserResponse.user);
      navigate("/");
    } catch (err) {
      updateMessage(err.message);
    }
  };

  const { username, password, passwordConf } = formData;

  const isFormInvalid = () => {
    return !(username && password && password === passwordConf);
  };

  return (
    <main className="min-width-400 d-flex flex-column justify-content-center align-items-center height-70vh">
      <h1 className="mb-5">Sign Up</h1>
      <p>{message}</p>
      <form onSubmit={handleSubmit} className="w-25 min-width-400">
        <div className="mb-3 w-100">
          <label className="form-label" htmlFor="username-input">
            Username:
          </label>
          <input
            type="text"
            id="username-input"
            value={username}
            name="username"
            required
            className="form-control"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3 w-100">
          <label className="form-label" htmlFor="password-input">
            Password:
          </label>
          <input
            type="password"
            id="password-input"
            className="form-control"
            required
            value={password}
            name="password"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3 w-100">
          <label className="form-label" htmlFor="confirm-input">
            Confirm Password:
          </label>
          <input
            type="password"
            id="confirm-input"
            required
            value={passwordConf}
            className="form-control"
            name="passwordConf"
            onChange={handleChange}
          />
        </div>
        <div className="d-flex gap-5 mt-3">
          <div>
            <button
              className="btn px-4 py-2 btn-primary"
              disabled={isFormInvalid()}
            >
              Sign Up
            </button>
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

export default SignupForm;
