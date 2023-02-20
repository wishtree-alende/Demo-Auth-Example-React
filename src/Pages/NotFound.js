import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const NotFound = ({ authUser }) => {
  const navigate = useNavigate();
  console.log("AUthuser", authUser);
  return (
    <>
      <div className="not-found-wrapper">
        <section>
          <div className="container">
            <div className="not-found-block">
              <div className="not-found-content">
                <img src="not-found.svg" />
                <div className="not-found-text">
                  <p className="oops">OOPS...</p>
                  {authUser == undefined ? (
                    <>
                      <p className="error-status">401</p>
                      <p className="page-not-found">Unauthorized User</p>
                    </>
                  ) : (
                    <>
                      <p className="error-status">404</p>
                      <p className="page-not-found">PAGE NOT FOUND</p>
                    </>
                  )}
                  <div class="form-btn text-center nfnd-btn">
                    <button onClick={() => navigate("/")} className="smt-btn">
                      Back to Home
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default NotFound;
