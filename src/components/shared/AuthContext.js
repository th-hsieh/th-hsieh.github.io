import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate} from "react-router-dom";
import React, { createContext, useState, useEffect } from "react";
//import Alert from '../Alert.js';

const AuthContext = createContext();


export const AuthContextProvider = ({ children }) => 
{
    const [isAuthenticated, setAuthentication] = useState();
    const [userInfo, setUserInfo] = useState();
    // const [alertMessage, setAlertMessage] = useState('');
    // const [isAlertVisible, setIsAlertVisible] = useState(false);



    const [user, setUser] = useState(() => {
        const jwtCookie = document.cookie
            ?.split(";")
            ?.find((cookie) => cookie.startsWith("login"));

          if (jwtCookie) {
              const loginToken = jwtCookie.split("=")[1];
              const user=jwt_decode(loginToken).sub;
              setAuthentication(true);
              return user;
            }
          return null;
    });
  
    let navigate=useNavigate();

    const AccessDashboard = async () => {
      const dashboardTokenCookie = document.cookie
        ?.split(";")
        ?.find((cookie) => cookie.trim().startsWith("dashboard"));
        console.log(dashboardTokenCookie);

      if (dashboardTokenCookie) {//clean the previous one. and generate the new one
        console.log("Oh we already have a dashboardTokenCookie!so we need to renew one");
        //const dashboardToken = dashboardTokenCookie.split("=")[1];
        document.cookie = "dashboardToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      }
      //https://public-privacy-app.azurewebsites.net/
      const apiResponse = await axios.get("https://public-privacy-app.azurewebsites.net/collaborator/dashboard", {
        withCredentials: true,
      });

      const dashboardToken = apiResponse.data;

      console.log("apiResponse.data from AccessDashboard" + dashboardToken);

      if (dashboardToken) {

        const expirationTime = new Date();
        expirationTime.setTime(expirationTime.getTime() + 60 * 60 * 1000); // 1 hour from now
        const cookieOptions = `Expires=${expirationTime.toUTCString()}`;
        document.cookie = `dashboardToken=${dashboardToken};${cookieOptions};`;
        setAuthentication(true);
        const decodedInfo = jwt_decode(dashboardToken);
        setUserInfo(decodedInfo);
        console.log("userInfo:", userInfo);
        console.log("decodedInfo:", decodedInfo);
        navigate(`/collaborator/dashboard`);
        return jwt_decode(dashboardToken);
      }
      navigate("/about");
    };

//why is userInfoUndefined?
    useEffect(() => {
      console.log("userInfo at AuthContext line 161:", userInfo);
    }, [userInfo]);


    //function
    const LogIn = async (payload) => {
      
      if ( document.cookie.includes("loginToken")) {
          alert("You are already logged in.");
          // setAlertMessage(`You are already logged in.`);
          // setIsAlertVisible(true);
          navigate("/about");}
        else{  //https://public-privacy-app.azurewebsites.net/
          const apiResponse = await axios.post(
            "https://public-privacy-app.azurewebsites.net/collaborator/login", payload,
            {withCredentials:true}
          );

          const loginToken=apiResponse.data;

          if(apiResponse===400){
            alert(`Oops, the input is incorrect. Please try again.`);
            // setAlertMessage(`Oops, the input is incorrect. Please try again.`);
            // setIsAlertVisible(true);
          }
          if(apiResponse !==200){
            alert(`Loading!`);
            // setAlertMessage(`Loading!`);
            // setIsAlertVisible(true);
            navigate("/about");
          }
        
  
        if (loginToken) {

          const expirationTime = new Date();
          expirationTime.setTime(expirationTime.getTime() + 60 * 60 * 1000); // 1 hour from now
          const cookieOptions = `Expires=${expirationTime.toUTCString()}`;
          document.cookie = `loginToken=${loginToken};${cookieOptions}`;
          setAuthentication(true);

          if(apiResponse.status===200){
            // setAlertMessage(`Login Successfully!`);
            // setIsAlertVisible(true);
            alert(`Login Successfully!`);
          }
          //開始倒數計時 LogOut
          return jwt_decode(loginToken).sub;//email
        }
      
    };}
      

    const LogOut = () => {
      console.log("logging out");
      document.cookie = "loginToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      document.cookie = "dashboardToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      setAuthentication(false);
      setUserInfo(null);
      navigate("/about");
      alert(`logged out!`);
      // setAlertMessage("Logged out!");
      // setIsAlertVisible(true);
    };

    const handleNavbarReload = () => {
      const navbarLinks = document.querySelectorAll(".navbar-link");
      navbarLinks.forEach((link) => {
        link.addEventListener("click", () => {
          window.location.reload();
        });
      });
    };

    useEffect(() => {
      handleNavbarReload();
    }, [isAuthenticated],
    console.log("isAuthenticated ")+ console.log(isAuthenticated));


    return (
      <div>
        <AuthContext.Provider value={{ user, LogIn, LogOut,AccessDashboard,isAuthenticated, userInfo,setUserInfo }}>
          {children}
        </AuthContext.Provider>
      </div>
    );
  };
  
  export default AuthContext;