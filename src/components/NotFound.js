import { useLocation } from "react-router";
import Footer from "../components/Footer.js";

const NotFound  = () => {
    let location=useLocation();
    console.log(location);
    return (
        <>
        <div className="row justify-content-center">
            <div className="col-sm-10 text-center">
                <h2>Resource not found at {location.pathname}</h2>
                <h6>You may need to login first to access. Or the opinion might have been deleted.</h6>
            </div>
        </div>
        <Footer/>
        </>
    );
}
 
export default NotFound ;