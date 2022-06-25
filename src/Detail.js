import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TypicodeService from "./services/TypicodeService";

const Detail = () => {
  const nav = useNavigate();
  const params = useParams();
  const [data, setData] = useState({});
  const [username, setUsername] = useState();
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [seeComments, setSeeComments] = useState(false);

  useEffect(() => {
    getDetailPost(params.id);
  }, []);

  const getTotalComment = async (id) => {
    // setIsLoading(true);
    await TypicodeService.getCommentById(id)
      .then((response) => {
        setComments(response.data);
        // data.map((record) => (record.comments = response.data.length));
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
        setUsername(response.data.username);
        // data.map((record) => (record.username = response.data.username));
        // setIsLoading(false);
      })
      .catch((e) => {
        // setIsLoading(false);
        console.log(e);
      });
  };

  useEffect(() => {
    data["comments"] = comments.length;
    data["allComments"] = comments;
  }, [data, comments]);

  useEffect(() => {
    data["username"] = username;
  }, [data, username]);

  const getDetailPost = (id) => {
    setIsLoading(true);
    TypicodeService.getPostById(id)
      .then((response) => {
        setData(response.data);
        getTotalComment(response.data.id);
        getDataUser(response.data.userId);
        setTimeout(() => {
          setIsLoading(false);
        }, 3000);
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
      });
  };

  const back = () => {
    nav("/dashboard");
  };

  const seeAllComments = () => {
    console.log("seeAllComments");
    setSeeComments((see) => !see);
  };

  return (
    <div className="container m-5">
      <div className="row justify-content-center">
        {!isLoading ? (
          <div className="list-group mb-3">
            <a href="#" className="list-group-item list-group-item-action">
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{data.username}</h5>
              </div>
              <h3 className="mb-1">{data.title}</h3>
              <small className="text-muted">{data.body}</small>
              {!seeComments ? (
                <p className="text-muted mt-2" onClick={() => seeAllComments()}>
                  <i className="bi bi-chat-dots m-2"></i>
                  {data.comments}
                </p>
              ) : (
                <p className="text-muted mt-2" onClick={() => seeAllComments()}>
                  All Comments
                </p>
              )}
              {seeComments &&
                data.allComments.map((item, index) => (
                  <div className="container w-50" key={index}>
                    <div className="row">
                      <div className="col-md-5">
                        <p className="text-start">{item.email}</p>
                      </div>
                      <div className="col-md-7">
                        <p className="text-start">{item.body}</p>
                      </div>
                    </div>
                  </div>
                ))}
              <button
                className="btn btn-outline-secondary"
                type="button"
                id="button-addon3"
                onClick={() => back()}
              >
                Kembali
              </button>
            </a>
          </div>
        ) : (
          <div className="d-flex justify-content-center my-5">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Detail;
