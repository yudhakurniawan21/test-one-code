import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TypicodeService from "./services/TypicodeService";

const Profile = () => {
  const nav = useNavigate();
  const params = useParams();
  const [user, setUser] = useState();
  useEffect(() => {
    getDataUserById(params.id);
  }, []);

  const getDataUserById = (id) => {
    TypicodeService.getUserById(id)
      .then((response) => {
        console.log(response);
        setUser(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const back = () => {
    nav("/dashboard");
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="m-5">
          <h3>Profile</h3>
        </div>
        <div className="container w-50">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <p className="text-end">Username </p>
            </div>
            <div className="col-md-6">
              <p className="text-start">: {user?.name}</p>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-6">
              <p className="text-end">Email </p>
            </div>
            <div className="col-md-6">
              <p className="text-start">: {user?.email}</p>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-6">
              <p className="text-end">Address </p>
            </div>
            <div className="col-md-6">
              <p className="text-start">: {user?.address.city}</p>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-6">
              <p className="text-end">Phone </p>
            </div>
            <div className="col-md-6">
              <p className="text-start">: {user?.phone}</p>
            </div>
          </div>
        </div>
        <div className="m-5">
          <button
            className="btn btn-outline-secondary"
            type="button"
            id="button-addon3"
            onClick={() => back()}
          >
            Kembali
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
