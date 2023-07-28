import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import httpClient from "../http-common.js";
import '../../src/App.css';
import Footer from "../components/Footer.js";


const ResetPassword = () => {

  const email = useRef("");
  const newPassword = useRef("");
  const navigate = useNavigate();

  const resetPasswordSubmit = async(e) => {
    e.preventDefault();

    console.log(`newPassword`);
    console.log(newPassword);
    console.log(`email`);
    console.log(email);

    e.preventDefault();

    const payload = {
      email: email.current.value,
      newPassword:newPassword.current.value,
    };
    console.log(email.current.value);
    console.log(newPassword.current.value);

    const response = httpClient.put(`/collaborator/resetPassword`, payload, {withCredentials:true});
      if (response.status === 200) {
        alert(`The password has been modified!`);
      }else{
        alert(`Password reset successfully!`);
      }
      navigate("/about");
  };



  return (
    <>
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-sm-6">
          <div
            className="d-flex flex-column align-items-center"
            style={{ width: '100%', margin: '0 auto' }}
          >
            <h2 style={{ margin: '0 0 0.5em 0' }}>Reset Password</h2>
            <h6 style={{ margin: '0.5em 0 2em 0' }}>
              It happens, we all forget our passwords sometimes.
            </h6>

            <div className="row justify-content-center">
              <div className="col-sm-6">
                <form onSubmit={resetPasswordSubmit}>
                  <div className="mb-3" controlId="formEmail">
                    <label>Email</label>
                    <input type="email" ref={email} />
                  </div>

                  <div className="mb-3" controlId="formPassword">
                    <label>New Password</label>
                    <input type="password" ref={newPassword} />
                  </div>

                  <button
                    type="submit"
                    style={{
                      backgroundColor: 'black',
                      color: 'white',
                      borderRadius: '5px',
                    }}
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
  </>  
  );
};

export default ResetPassword;
