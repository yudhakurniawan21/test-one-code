import React, { useState, useEffect } from "react";
import TypicodeService from "./services/TypicodeService";
import Pagination from "./components/Pagination";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const nav = useNavigate();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);

  useEffect(() => {
    getAllPosts();
  }, []);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(data.length / recordsPerPage);

  const getAllPosts = async () => {
    setIsLoading(true);
    await TypicodeService.getAllPosts()
      .then((response) => {
        // console.log(response);
        setData(
          response.data.map((item) => ({
            body: item.body,
            id: item.id,
            title: item.title,
            userId: item.userId,
          }))
        );
      })
      .catch((e) => {
        setIsLoading(false);
        console.log(e);
      });
  };

  const getTotalComment = async (id) => {
    // setIsLoading(true);
    await TypicodeService.getCommentById(id)
      .then((response) => {
        data.map((record) => (record.comments = response.data.length));
        // setIsLoading(false);
      })
      .catch((e) => {
        // setIsLoading(false);
        console.log(e);
      });
  };

  const getDataUser = async (id) => {
    // setIsLoading(true);
    await TypicodeService.getUserById(id)
      .then((response) => {
        // console.log(response);
        data.map((record) => (record.username = response.data.username));
        // setIsLoading(false);
      })
      .catch((e) => {
        // setIsLoading(false);
        console.log(e);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    currentRecords.forEach((item) => {
      getTotalComment(item.id);
      getDataUser(item.userId);
    });

    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, [currentPage]);

  useEffect(() => {
    currentRecords.forEach((item) => {
      getTotalComment(item.id);
      getDataUser(item.userId);
    });
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, [currentRecords]);

  const seeDetail = (item) => {
    console.log(item);
    nav(`/detail/${item.id}`, { state: { item } });
  };

  return (
    <div className="container">
      <div className="row">
        <h3 className="mt-3">Posts</h3>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="button-addon2"
          />
          <button
            className="btn btn-outline-secondary"
            type="button"
            id="button-addon2"
          >
            Search
          </button>
        </div>
        {!isLoading ? (
          currentRecords?.map((item, index) => (
            <div className="list-group mb-3" key={index}>
              <a href="#" className="list-group-item list-group-item-action">
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">{item.username}</h5>
                </div>
                <h3 className="mb-1">{item.title}</h3>
                <small className="text-muted">{item.body}</small>
                <p className="text-muted mt-2">
                  <i className="bi bi-chat-dots"></i> {item.comments}
                </p>
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  id="button-addon3"
                  onClick={(e) => seeDetail(item)}
                >
                  Detail
                </button>
              </a>
            </div>
          ))
        ) : (
          <div className="d-flex justify-content-center my-5">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        <Pagination
          nPages={nPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default Dashboard;
