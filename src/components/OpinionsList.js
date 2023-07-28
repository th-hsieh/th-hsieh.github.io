import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "./shared/AuthContext.js";
import httpClient from "../http-common.js";
import Footer from "../components/Footer.js";


const OpinionsList = () => {
  const { userInfo, isAuthenticated } = useContext(AuthContext);
  const [opinions, setOpinions] = useState([]);
  const navigate = useNavigate();

  const getAll = () => {
    return httpClient.get('/forum/opinions', {
      withCredentials: true,
    });
  };

  useEffect(() => {
      getAll()
        .then(response => {
          const opinionsData = response.data;
          console.log("This is response.data from OpinionsList:");
          console.log(response.data);

          if (response.status === 204 || response.status === 403 || response.status === 500 || response.status === 205) {
            alert(`Oops, there are some data fetching issues. Come back later please.`);
            navigate("/about");
            return;
          }

          const updatedOpinions = opinionsData.map(opinionData => {
            // Convert createdAt and updatedAt to string format
            //const updatedAtString = new Date(opinionData.updatedAt).toUTCString();
            const updatedAtString = new Date(opinionData.updatedAt).toLocaleDateString()
            //const createdAtString = new Date(opinionData.createdAt).toUTCString();
            const createdAtString = new Date(opinionData.createdAt).toLocaleDateString()

            return {
              id: opinionData.id,
              updatedAt: updatedAtString,
              createdAt: createdAtString,
              collaboratorName: userInfo?.username,
              category: opinionData.category,
              body: opinionData.body,
              title: opinionData.title
            };
          });
          setOpinions(updatedOpinions);
        })
        .catch(error => {
          //alert(`${error}`);
          alert(`Please log in first to see the content.`);
          console.log('something went wrong', error);
        });
    },[]);

  const opinionBlocks = Object.entries(opinions.reduce((acc, opinion) => {
    if (!acc[opinion.category]) {
      acc[opinion.category] = [];
    }
    acc[opinion.category].push(opinion);
    return acc;
  }, {})).map(([category, opinions]) => (
    <div key={category}>
      <h4 style={{ fontWeight: "bold" }}>{category}</h4>
      {opinions.map(opinion => (
        <div key={opinion.id} style={{ border: "1px solid black", padding: "1em", margin: "1em 0" }}>
          <Link to={`/forum/opinions/${opinion.id}`} className="text-decoration-none">
            <h5 className="text-capitalize" style={{ textDecoration: "underline" }}>{opinion.title}</h5>
            <h6 style={{fontWeight:"normal" }}className="text-capitalize text-center">{opinion.body}</h6>
            <h6 style={{ fontSize: "smaller", fontWeight:"lighter" }}>Last Updated: {opinion.updatedAt}</h6>
          </Link>
        </div>
      ))}
    </div>
  ));

  return (
    <>
    <div className="container" style={{ maxHeight: "600px", overflow: "auto" }}>
      <div className="row justify-content-center">
        <div className="col-sm-6 text-center">
          <h2>OPINIONS</h2>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-sm-6 text-center">
          <div className="d-flex flex-column align-items-center" style={{ width: '100%', margin: '0 auto' }}>
            {isAuthenticated ? (
              opinionBlocks.length > 0 ? (
                opinionBlocks
              ) : (
                <div className="text-center">
                  <h5>No Opinions available.</h5>
                </div>
              )
            ) : (
              <div className="text-center">
                <h5>Please log in to see the contents.</h5>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default OpinionsList;