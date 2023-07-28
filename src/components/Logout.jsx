import '../../src/App.css'
import React, { useContext,useState } from 'react';
import AuthContext from '../components/shared/AuthContext';
import Button from "react-bootstrap/Button";
import Footer from "../components/Footer.js";
// import Alert from './Alert.js';


const Logout = () => {

  const { LogOut } = useContext(AuthContext);
  // const [alertMessage, setAlertMessage] = useState('');
  // const [isAlertVisible, setIsAlertVisible] = useState(false);

  return (
  <>
    <div className="container">
          <div className="row justify-content-center">
              <div className="col-sm-6">
                  <h2 className="text-center">Leave us now?</h2>
              </div>
          </div>

          <div className="row justify-content-center">
              <div className="col-sm-6">
                  <div className="text-center">
                    <Button variant="primary" type="button" onClick={LogOut} style={{
                              backgroundColor: "black",
                              color: "white",
                              borderRadius: "5px",
                              outline: "none",
                            }}>
                      Logout
                    </Button>
                    {/* {isAlertVisible && <Alert message={alertMessage} duration={2000} />} */}
                  </div>
              </div>
          </div>
    </div>
  <Footer/>  
  </>
  );
};

export default Logout;
