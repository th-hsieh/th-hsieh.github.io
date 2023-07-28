import React, { useEffect, useContext, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AuthContext from "./shared/AuthContext.js";
import Footer from "../components/Footer.js";
import '../../src/App.css'


const Dashboard = () => {
  const { id } = useParams();
  const username = useRef("");
  const email = useRef("");
  const password = useRef("");
  const [opinionsArray, setOpinionsArray] = useState([]);
  const { AccessDashboard, userInfo } = useContext(AuthContext);

  const HealthCareArray = [];
  const GenderEqualityArray = [];
  const EducationalSystemArray = [];

  const navigate = useNavigate();

  const categorizedOpinions = {
    'health care': [],
    'gender equality': [],
    'educational system': [],
  };

  useEffect(() => {
    const accessDashboardSubmit = async () => {
      await AccessDashboard();
    };
    accessDashboardSubmit();
  }, [id]);

  useEffect(() => {
    if (userInfo) {
      username.current = userInfo.username;
      email.current = userInfo.email;
      password.current = userInfo.password;
      setOpinionsArray(userInfo.opinionsList);
    }
  }, [userInfo]);

  opinionsArray.forEach((opinion) => {
    if (opinion.category === "Health Care") {
      HealthCareArray.push(opinion);
    } else if (opinion.category === "Gender Equality") {
      GenderEqualityArray.push(opinion);
    } else if (opinion.category === "Educational System") {
      EducationalSystemArray.push(opinion);
    }
  });

  console.log(HealthCareArray);
  console.log(GenderEqualityArray);
  console.log(EducationalSystemArray);

  opinionsArray.forEach((opinion) => {
    if (categorizedOpinions[opinion.category]) {
      categorizedOpinions[opinion.category].push(opinion);
    }
  });
  console.log(categorizedOpinions);

  const resetPassword = () => {
    navigate(`/collaborator/resetPassword`);
  };

  const deleteAccount = () => {
    navigate(`/collaborator/deleteAccount`);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-sm-6 text-center">
              <div className="d-flex flex-column align-items-center" style={{ width: "100%" }}>
                <div className="d-flex flex-column" style={{ width: "100%", margin: "0 auto" }}>
                  <h2 style={{ margin: "0.5em 0" }}>Collaborator Dashboard</h2>
                  <br />
                  <h4 style={{ margin: "0" }}>Collaborator Info</h4>
                  <h6 style={{ color: "rgb(64,64,64)", margin: "0.5em 0", fontWeight: "normal" }}>
                    Name: {username.current}
                  </h6>
                  <h6 style={{ color: "rgb(64,64,64)", margin: "0.5em 0", fontWeight: "normal" }}>
                    Email: {email.current}
                  </h6>
                  <h6 style={{ color: "rgb(64,64,64)", margin: "0.5em 0", fontWeight: "normal" }}>
                    Password: {password.current}
                  </h6>
                  <h6>
                    <button
                      type="button"
                      onClick={resetPassword}
                      style={{
                        backgroundColor: "white",
                        color: "rgb(64,64,64)",
                        borderRadius: 0,
                        outline: "none",
                        margin: "auto",
                        textDecoration: "underline",
                      }}
                    >
                      Reset Password
                    </button>
                  </h6>
                  <h6>
                    <button
                      type="button"
                      onClick={deleteAccount}
                      style={{
                        backgroundColor: "white",
                        color: "black",
                        borderRadius: 0,
                        outline: "none",
                        margin: "auto",
                        textDecoration: "underline",
                      }}
                    >
                      Delete Account
                    </button>
                  </h6>
                </div>
              </div>
            </div>
          </div>

          <br />
          <div className="row justify-content-center">
            <div className="col-sm-6 text-center">
              <div className="d-flex flex-column align-items-center" style={{ width: "100%" }}>
                <h4 style={{ margin: "1em 0" }}>Shared Opinions</h4>
              </div>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-sm-6 text-center">
              <div className="d-flex flex-column align-items-center" style={{ width: "100%" }}>
                {Object.entries(categorizedOpinions).map(([category, opinions], index) => (
                  <React.Fragment key={category}>
                    {index !== 0 && <div style={{ margin: "1em" }}></div>}
                    <h5 style={{ fontWeight: "bold" }}>
                      {category.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
                    </h5>
                    <h6 style={{ fontWeight: "normal" }}>{opinions.length > 0 ? "" : "No Opinions For Now"}</h6>
                    {opinions.length > 0 && (
                      <div>
                        {opinions.map((opinion) => (
                          <div
                            key={opinion.id}
                            style={{ margin: "0.5em", border: "1px solid black", padding: "1em" }}
                          >
                            <Link to={`/forum/opinions/${opinion.id}`} className="text-decoration-none">
                              <h6
                                className="text-capitalize"
                                style={{ textDecoration: "underline", margin: "0em 1em 0.5em 1.1em", fontWeight: "bolder" }}
                              >
                                {opinion.title}
                              </h6>
                              <h6 style={{ margin: "0em 1em 0.5em 1.1em", fontWeight: "normal" }}>{opinion.body}</h6>
                              <h6 style={{ margin: "0em 1em 0.5em 1.1em", fontWeight: "lighter", fontSize: "smaller" }}>
                                Updated At: {new Date(opinion.updatedAt).toLocaleDateString()}
                                <br />
                              </h6>
                            </Link>
                          </div>
                        ))}
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
