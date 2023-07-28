import React, { useContext, useRef,useState,useEffect} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import AuthContext from "./shared/AuthContext";
import { useNavigate} from "react-router-dom";
import Footer from "../components/Footer.js";


const Login = () => {

  const { LogIn,LogOut } = useContext(AuthContext);

  const email=useRef("");
  const password = useRef("");
  const navigate = useNavigate();

  const loginSubmit = async () => {
    try {
      let payload = {
        email: email.current.value,
        password: password.current.value,
      };
  
      if (document.cookie.includes("loginToken")) {
        alert("You are already logged in.");
        // setAlertMessage("You are already logged in.");
        // setIsAlertVisible(true);
        navigate("/collaborator/dashboard");
      } else {
        await LogIn(payload);
        navigate("/collaborator/dashboard");
        setTimeout(LogOut, 3600000); // After login, the system will logout in 1 hour.
      }
    } catch (error) {
      //alert(`${error}`);
      console.log(error);
      alert("Oops, the input is incorrect. Please try again.");
      // setAlertMessage("Oops, the input is incorrect. Please try again.");
      // setIsAlertVisible(true);
      navigate("/about");
      return;
    }
  };
  

  const resetPassword=async() =>{
    navigate("/collaborator/resetPassword");
  }


  return (
    <>
      <div className="container">
          <div className="row justify-content-center">
            <div className="col-sm-12 text-center">
                <h2 className="text-center">LOGIN</h2>
            </div>
          </div>

          <div className="row justify-content-center">
              <div className="col-sm-6">
                  <Form.Group className="mb-3" controlId="formEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="email" ref={email} />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" ref={password} />
                  </Form.Group>
                  <div className="text-center">
                    <Button variant="primary" type="button" onClick={loginSubmit} style={{
                              backgroundColor: "black",
                              color: "white",
                              borderRadius: "5px",
                              outline: "none",
                              marginRight: "2em",
                            }}>
                      Login
                    </Button>

                    <Button variant="primary" type="button" onClick={resetPassword} style={{
                              backgroundColor: "black",
                              color: "white",
                              borderRadius: "5px",
                              outline: "none",
                            }}>
                      Reset Password
                    </Button>
                  </div>
                  {/* {isAlertVisible && <Alert message={alertMessage} duration={3500} />} */}
              </div>
          </div>
      </div>
    <Footer/>
    </>  
  );
};

 export default Login;


