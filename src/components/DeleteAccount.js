import httpClient from "../http-common.js";
import '../../src/App.css';
import React,{useContext} from 'react';
import AuthContext from "./shared/AuthContext.js";
import { useNavigate } from "react-router";
import Footer from "../components/Footer.js";

const DeleteAccount = () => {

const navigate=useNavigate();

const {userInfo,LogOut} = useContext(AuthContext);

const deleteSubmit1 = async () => {
  const username = userInfo?.sub; // Retrieve the username from userInfo
  console.log(username);

  try {
    const response = await httpClient.delete(`/collaborator/deleteAccount?username=${username}`, { withCredentials: true });
    console.log(response.status);
    console.log(response.data);
    if (response.status === 200 || response.status === 204) {
      setTimeout(() => {
        alert('The account has been deleted. Maybe see you next time!');
        LogOut();
      }, 1000);
      navigate('/about');
    }
  } catch (error) {
    // Handle any errors here
    alert(`Sorry. The account is not finally vanished. Please try again.`);
  }
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
            <h2 style={{ margin: '0 0 0.5em 0' }}>Delete Account</h2>
            <h6 style={{ margin: '0.5em 0 2em 0' }}>
              Once deleted, all the data will be removed from the database.
            </h6>
            <button
              type="submit"
              onClick={deleteSubmit1}
              style={{
                backgroundColor: 'black',
                color: 'white',
                borderRadius: '5px',
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
  </>
  );
};

export default DeleteAccount;
