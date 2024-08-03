import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthedUserContext } from "../App";
import { useContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Modal from "../Modal/Modal";
import SigninForm from "../SigninForm/SigninForm";
import SearchBar from "../serachBar/SearchBar";

const NavBar = ({ handleSignout, setUser, handleSearch }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const user = useContext(AuthedUserContext);
  const location = useLocation();

  const handleOnSignIn = (user) => {
    setUser(user);
    closeModal();
    navigate("/");
  };

  return (
    <>
      {user ? (
        <nav className="navbar navbar-expand-sm px-3 py-3">
          <Link className="navbar-brand" to="/">
            Events
          </Link>
          <SearchBar handleSearch={handleSearch} />
          <div className="container-fluid max-width">
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
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  {/* <Link
                    className={
                      "nav-link " +
                      (location.pathname === "/events" && "active")
                    }
                    to="/events"
                  >
                    Home
                  </Link> */}
                </li>
                <li className="nav-item">
                  <Link
                    className={
                      "nav-link " +
                      (location.pathname === "/my-events" && "active")
                    }
                    to="/my-events"
                  >
                    My Events
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={
                      "nav-link " +
                      (location.pathname === "/events/new" && "active")
                    }
                    to="/events/new"
                  >
                    Create New Event
                  </Link>
                </li>
              </ul>
              <ul className="navbar-nav me-2 mb-2 mb-lg-0">
                <li className="nav-item me-3">
                  <div className="nav-link">{user.username}</div>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/" onClick={handleSignout}>
                    Sign out
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      ) : (
        <nav className="navbar navbar-expand-sm px-3 py-3">
          <Link className="navbar-brand" to="/">
            Events
          </Link>
          <SearchBar handleSearch={handleSearch} />
          <div className="container-fluid max-width">
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
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  {/* <Link
                    className={
                      "nav-link " +
                      (location.pathname === "/signin" && "active")
                    }
                    aria-current="page"
                    to="/signin"
                  >
                    Sign In
                  </Link> */}
                  <button onClick={openModal}>Sign In</button>
                </li>
                <li className="nav-item">
                  <Link
                    className={
                      "nav-link " +
                      (location.pathname === "/signup" && "active")
                    }
                    to="/signup"
                  >
                    Sign Up
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      )}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <SigninForm onSignIn={handleOnSignIn} />
      </Modal>
    </>
  );
};
export default NavBar;
