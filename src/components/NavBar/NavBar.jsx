import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthedUserContext } from "../App";
import { useContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Modal from "../Modal/Modal";
import SigninForm from "../SigninForm/SigninForm";
import SearchBar from "../serachBar/SearchBar";
import SignupForm from "../SignupForm/SignupForm";

const NavBar = ({ handleSignout, setUser, handleSearch }) => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const navigate = useNavigate();

  const user = useContext(AuthedUserContext);
  const location = useLocation();

  const handleOnSignIn = (user) => {
    setUser(user);
    setShowSignIn(false);
    navigate("/");
  };

  const handleOnSignUp = (user) => {
    setUser(user);
    setShowSignUp(false);
    navigate("/");
  };

  return (
    <>
      {user ? (
        <nav className="navbar navbar-expand-sm px-3 py-3">
          <div className="container-fluid px-5 py-3">
            <Link className="navbar-brand" to="/">
              Events
            </Link>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <div style={{ minWidth: "30rem" }}>
                <SearchBar handleSearch={handleSearch} />
              </div>
              <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
              <ul className="navbar-nav me-2 mb-2 mb-lg-0">
                <li className="nav-item mx-4">
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate("/events/new")}
                  >
                    Create New Event
                  </button>
                </li>
                <li className="nav-item">
                  <Link
                    className={
                      "nav-link button-link " +
                      (location.pathname === "/my-events" && "active")
                    }
                    to="/my-events"
                  >
                    My Events
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link button-link">@{user.username}</Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link button-link"
                    to="/"
                    onClick={handleSignout}
                  >
                    Sign out
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      ) : (
        <nav className="navbar navbar-expand-sm px-3 py-3 mb-4 mt-3 px-5">
          <Link className="navbar-brand" to="/">
            Events
          </Link>
          <div style={{ minWidth: "30rem" }}>
            <SearchBar handleSearch={handleSearch} />
          </div>
          <div className="container-fluid px-5 py-3">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul
                style={{ position: "absolute", right: "5rem" }}
                className="navbar-nav me-auto mb-2 mb-lg-0"
              >
                <li className="nav-item">
                  <button
                    className="nav-link mx-3 button-link"
                    onClick={() => setShowSignIn(true)}
                  >
                    Sign In
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-primary"
                    onClick={() => setShowSignUp(true)}
                  >
                    Sign Up
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      )}
      <Modal isOpen={showSignIn} onClose={() => setShowSignIn(false)}>
        <SigninForm
          onSignIn={handleOnSignIn}
          onCancel={() => setShowSignIn(false)}
        />
      </Modal>

      <Modal isOpen={showSignUp} onClose={() => setShowSignUp(false)}>
        <SignupForm
          onSignUp={handleOnSignUp}
          onCancel={() => setShowSignUp(false)}
        />
      </Modal>
    </>
  );
};
export default NavBar;
