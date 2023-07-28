import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import AuthContext from "./shared/AuthContext.js";
import httpClient from "../http-common.js";
import '../../src/App.css';
import Footer from "../components/Footer.js";
// import Alert from './Alert.js';

const AddOpinion = () => {

  ////attributes 

  const { userInfo } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [collaboratorName, setCollaboratorName] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState('gender equality');
  const [createdAt, setCreatedAt] = useState('');
  const [updatedAt, setUpdatedAt] = useState('');
  const [errors, setErrors] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [remainingWords, setRemainingWords] = useState(501);
  // const [alertMessage, setAlertMessage] = useState('');
  // const [isAlertVisible, setIsAlertVisible] = useState(false);


  useEffect(() => {
    // Update remaining words count whenever the body changes
    setRemainingWords(501 - body.trim().split(/\s+/).length);
  }, [body]);


  ////functions
  useEffect(() => {

      setCollaboratorName(userInfo?.sub);

      const get = (id) => {
        ////////VERY IMPORTANT
      console.log(`Is this where put method goes through 5 ?`);
      //////
        const response=httpClient.get(`/forum/opinions/${id}`);
        return response;
        //////////////////////
      };

    const fetchData = async () => {
        try {
          if (id) {
            ////
            console.log(`Is this where put method goes through 4?`);
            //////
            const response = await get(id);
            const opinion = response.data;
            setTitle(opinion.title);
            setBody(opinion.body);
            setCategory(opinion.category);
            setCreatedAt(opinion.createdAt);
            setUpdatedAt(opinion.updatedAt);
            setCollaboratorName(opinion.CollaboratorName);
          }
        } catch (error) {
           ////
          console.log(`Is this where put method goes through 3?`);
           //////
          console.log(userInfo);
          console.log('Something went wrong', error);
        }
      };

      fetchData();
  }, [id]);

  const create = (data) => {
    console.log(`data in create method`);
    console.log(data);
    console.log("data in create");
    console.log(data);
    return httpClient.post("/forum/opinions", data, {
      withCredentials: true,
    });
  };

  //Update
  const update = (data) => {
     ////
     console.log(`Is this where put method goes through 1 ?`);
     //////
    console.log(`update method in Addopinion`);
    console.log(`data in update method in AddOpinion`);
    console.log(data);
    navigate(`/forum/opinions/edit/${id}`);

    return httpClient.put('/forum/opinions', data, {
        withCredentials: true, 
    });
  };

  const saveOpinion = (e) => {

    e.preventDefault();

    if (!title || !body) {
      setErrors(true);
      return;
    }

    let opinion = {
      title,
      body,
      category,
      id,
      collaboratorName: userInfo?.username,
      createdAt,
      updatedAt
    };

//edit or create
if(id){
    ////
    console.log(`Is this where put method goes through 2 ?`);
    //////
  console.log("opinion before update:");
  console.log(opinion);
  update(opinion)
      .then(response => {
          if(response.status===200){
            alert(`updated successfully!`);
            // setAlertMessage(`updated successfully!`);
            // setIsAlertVisible(true);
            navigate("/forum/opinions");
          }
          else if(response.status===205){
            // setAlertMessage(`updated successfully!`);
            // setIsAlertVisible(true);
           alert(`updated successfully!`);
            navigate("/forum/opinions");
          }
          else if(response.status===403){
            // setAlertMessage(`Oops! not authorized to modify the content!`);
            // setIsAlertVisible(true);
            alert(`Oops! not authorized to modify the content!`);
            navigate("/forum/opinions");
          }
          else if(response.status===500){
            alert(`Apologies. Server-side issues. We'll fix it asap.`);
            // setAlertMessage(`Apologies. Server-side issues. We'll fix it asap.`);
            // setIsAlertVisible(true);
            navigate("/forum/opinions");
          }
          console.log("Opinion updated sucessfully");
          console.log("response.data");
          console.log(response?.data);
      })
      .catch(error =>{
          console.log("Something went wrong", error);
    })
  }else
  {
    console.log("opinion before create:"+opinion);
    create(opinion)
    .then((response) => {
      if (response.status === 201) {
        alert(`Opinion shared successfully!`);
        // setAlertMessage(`Opinion shared successfully!`);
        // setIsAlertVisible(true);
        navigate("/forum/opinions");
      }
    })
    .catch(error => {
      // setAlertMessage(`${error}`);
      // setIsAlertVisible(true);
      alert(`${error}`);
      // setAlertMessage(`Apologies. Server-side issues. We'll fix it asap.`);
      // setIsAlertVisible(true);
      alert(`Apologies. Server-side issues. We'll fix it asap.`);
      navigate("/forum/opinions");
    });
}};

  return (
  <>
    <div className="container" style={{ maxHeight: "600px", overflow: "auto" }}>
      <div className="row justify-content-center">
        <div className="col-sm-12 text-center">
          <h2>{id ? "Update an Opinion" : "Share Your Opinion"}</h2>
          {errors && <span style={{ color: 'red', fontStyle: 'italic' }}>Please enter the mandatory fields</span>}
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-sm-6">
          <form>
            <div className="form-group">
              <label htmlFor="title">
                Opinion Title: <sup>*</sup>
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)} />
            </div>

            <div className="form-group">
              <label htmlFor="body">
                Opinion Description: <sup>*</sup>
              </label>
              <textarea
                name="body"
                className="form-control"
                value={body}
                onChange={(e) => setBody(e.target.value)}
              ></textarea>
                <small>{remainingWords} words remaining</small>
            </div>

            <div className="form-group">
              <label htmlFor="category">Opinion Category: </label>
              <select
                id="category"
                className="form-control"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="gender equality">Gender Equality</option>
                <option value="health care">Health Care</option>
                <option value="educational system">Educational System</option>
              </select>
            </div>
            <br />
            <div className="text-center">
              <button
                type="button"
                onClick={(e) => saveOpinion(e)}
                style={{
                  backgroundColor: "black",
                  color: "white",
                  borderRadius: "5px"
                }}
              >
                {(id)? `Update Your Opinion`:`Share your Opinion`}
              </button>
            </div>
          </form>
          {/* {isAlertVisible && (<Alert message={alertMessage} duration={3500} />)} */}
        </div>
      </div>
    </div>
    <Footer/>
  </>  
  );
};

export default AddOpinion;
