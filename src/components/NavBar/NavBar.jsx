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
              {/* <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  { <Link
                    className={
                      "nav-link " +
                      (location.pathname === "/events" && "active")
                    }
                    to="/events"
                  >
                    Home
                  </Link> }
                </li>
                { <li className="nav-item">
                  <Link
                    className={
                      "nav-link " +
                      (location.pathname === "/my-events" && "active")
                    }
                    to="/my-events"
                  >
                    My Events
                  </Link>
                </li> }
                
              </ul> */}
              <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
              <ul className="navbar-nav me-2 mb-2 mb-lg-0">
                <li className="nav-item mx-4">
                  <Link className="btn btn-primary" to="/events/new">
                    Create New Event
                  </Link>
                </li>

                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    User: {user.username}
                  </a>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <a className="dropdown-item" href="#">
                      My Events
                    </a>
                    <a className="dropdown-item" href="#">
                      My Profile
                    </a>
                  </div>
                </li>

                {/* <li className="nav-item me-3">
                  <div className="nav-link">{user.username}</div>
                </li> */}

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
        <nav className="navbar navbar-expand-sm px-3 py-3 mb-4 mt-3">
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
                style={{ position: "absolute", right: "20px" }}
                className="navbar-nav me-auto mb-2 mb-lg-0"
              >
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
                  <button className="nav-link mx-3" onClick={openModal}>
                    Sign In
                  </button>
                </li>
                <li className="nav-item">
                  <Link
                    className={
                      "btn btn-primary " +
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
