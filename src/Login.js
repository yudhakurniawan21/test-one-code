import React, { useState, useEffect } from "react";
import TypicodeService from "./services/TypicodeService";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const nav = useNavigate();
  const [dataUser, setDataUser] = useState([]);
  const [username, setUsername] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    console.log(error);
  }, [error]);

  useEffect(() => {
    if (dataUser) {
      const isUserExist = checkUser(dataUser, username);
      if (isUserExist) {
        const user = getUser(username);
        console.log(user[0]);
        sessionStorage.setItem("user", JSON.stringify(user[0]));
        nav("/dashboard");
        window.location.reload();
      } else {
        setError("Username not exist");
      }
    }
  }, [dataUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.username.value, e.target.password.value);
    setUsername(e.target.username.value);
    if (e.target.username.value && e.target.password.value) {
      TypicodeService.getUsers()
        .then((response) => {
          console.log(response);
          setDataUser(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      setError("Please input username and password");
    }
  };

  const checkUser = (dataUser, username) => {
    return dataUser.some(function (el) {
      return el.username === username;
    });
  };

  const getUser = (username) => {
    return dataUser.filter(function (el) {
      return el.username === username;
    });
  };

  return (
    <div className="container dashboard">
      <div className="row justify-content-center">
        <div className="card" style={{ width: 20 + "rem" }}>
          <div className="card-header">Login Page</div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-floating mb-3">
                <input
                  type="username"
                  name="username"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Username"
                />
                <label htmlFor="floatingInput">Username</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                />
                <label htmlFor="floatingPassword">Password</label>
              </div>
              {error && dataUser.length > 0 && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
