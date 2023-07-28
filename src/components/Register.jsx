import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Footer from "../components/Footer.js";
// import Alert from './Alert.js';



function Register() {

  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  ////這兩個是給Alert用的
  // const [alertMessage, setAlertMessage] = useState('');
  // const [isAlertVisible, setIsAlertVisible] = useState(false);


  function reloadForm() {
    setUsername('');
    setEmail('');
    setPassword('');
  }

  async function register(event) {
    event.preventDefault();
    try {  //https://public-privacy-app.azurewebsites.net/
      const apiReponse=await axios.post("https://public-privacy-app.azurewebsites.net/collaborator/register",{
      //const apiReponse=await axios.post("http://localhost:8080/collaborator/register", {
        username: username,
        email: email,
        password: password
      });
      if (apiReponse.status!==201){
        alert(`Sorry. Either the name or email is already taken. Please use another one.`);
        // setAlertMessage("An error occurred. Please try again.");
        // setIsAlertVisible(true);
      }

      ////先試試看alert-popup
       alert(`Now you are a Collaborator, ${username}!`);
       alert(`An email has been sent to the provided address. Please confirm the link in 1 hour. `);
      // setAlertMessage(`Now you are a Collaborator, ${username}!`);
      // setIsAlertVisible(true);
      // setAlertMessage(`An email has been sent to the provided address. Please confirm the link in 1 hour.`);
      // setIsAlertVisible(true);
      
      //when successful
      setTimeout(() => {
        navigate('/collaborator/login');
      }, 50); // 0.05 second delay
    } catch (err) {
      setErrorMessage(err.response.data);

      console.log(`errorMessage`+errorMessage);
      if (err.response) {
        alert(`Either the email address or the name is already taken. Please register with another one.`);
        // setAlertMessage(`Either the email address or the name is already taken. Please register with another one.`);
        // setIsAlertVisible(true);
        if (err.response.data === "An email address can only be registered for an account.") {
          alert("An email address can only be registered for an account.");
          // setAlertMessage(`An email address can only be registered for an account.`);
          // setIsAlertVisible(true);
          reloadForm();
          navigate('/collaborator/register');
        } else if (err.response.data === "Username already exists") {
          alert("Username already exists");
          // setAlertMessage(`Username already exists`);
          // setIsAlertVisible(true);
          reloadForm();
          navigate('/collaborator/register');
        } else if (err.response.data === "The fields are required to be filled.") {
          alert("The fields are required to be filled.");
          // setAlertMessage(`The fields are required to be filled.`);
          // setIsAlertVisible(true);
          reloadForm();
          navigate('/collaborator/register');
        }
      } else {
        alert("An error occurred. Please try again.");
        // setAlertMessage(`An error occurred. Please try again.`);
        // setIsAlertVisible(true);
        reloadForm();
        navigate('/collaborator/register');
      }
      reloadForm();
      navigate('/collaborator/register');
    }

    reloadForm();
    navigate('/collaborator/register');
  }

  return (
  <>
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-sm-12 text-center">
          <h2 className="text-center">Come Join As Collaborator!</h2>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-sm-6">
          <form onSubmit={register}>
            <div className="form-group">
              <label htmlFor="collaborator_name">How should we call you?</label>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Name"
                value={username}
                onChange={(event) => setUsername(event.target.value)} />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email         <small className="reminder-text">(Please provide a valid email address for activating the account)</small></label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)} />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)} />
            </div>

            <br />

            <div className="text-center">
              <button
                type="submit"
                style={{
                  backgroundColor: "black",
                  color: "white",
                  borderRadius: "5px",
                }}>
                Submit
              </button>
            </div>
          </form>
          {/* {isAlertVisible && (<Alert message={alertMessage} duration={3500} />)} */}
        </div>
      </div>
    </div>
  <Footer/>
  </>  
  )}

export default Register;