import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const nav = useNavigate();
  const [dataUser, setDataUser] = useState();

  useEffect(() => {
    const user = sessionStorage.getItem("user");
    console.log(user);
    if (user) {
      setDataUser(JSON.parse(user));
    }
  }, []);

  const login = () => {
    nav("/login");
  };

  const seeProfile = (id) => {
    nav(`/profile/${id}`);
  };

  const signOut = () => {
    nav("/");
    sessionStorage.clear();
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <a className="navbar-brand" href="#">
            Cinta Coding
          </a>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {dataUser && (
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  onClick={() => (dataUser ? nav("/dashboard") : nav("/"))}
                >
                  Home
                </a>
              </li>
            )}
          </ul>
          {dataUser ? (
            // <div className="d-flex">Welcome, {dataUser.username}</div>
            <div className="dropdown">
              <a
                className="btn btn-secondary dropdown-toggle"
                href="#"
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Welcome, {dataUser.username}
              </a>

              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="dropdownMenuLink"
              >
                <li>
                  <a
                    className="dropdown-item"
                    onClick={() => seeProfile(dataUser.id)}
                  >
                    Detail Profile
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" onClick={() => signOut()}>
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
          ) : (
            <form className="d-flex">
              <button
                className="btn btn-outline-primary"
                onClick={() => login()}
              >
                Login
              </button>
            </form>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
