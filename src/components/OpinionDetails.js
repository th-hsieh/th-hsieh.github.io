import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router";
import httpClient from "../http-common.js";
import Footer from "../components/Footer.js";



const OpinionDetails = () => {


  const { id } = useParams();
  const [currentOpinion, setCurrentOpinion] = useState(null);
  const navigate = useNavigate();


  const getOpinion = (id) => {
    console.log("tracing put 2'")//ended up in AddOpinion
    return httpClient.get(`/forum/opinions/${id}`);
  };

  ////remove & delete are the same////
  const removeOpinion = (id) => {   //remove the apiResponse to the handleDelete
    return httpClient.delete(`/forum/opinions/${id}`);
  };

  const handleDelete = () => {
    alert(`Are you sure you want to delete this opinion?`);
    removeOpinion(id)
      .then(async (response) => {
        // alert(`${response.status}`);
        alert(`Deleted!`);
        navigate("/forum/opinions");
      })
      .catch(async (error) => {
        alert(`${error}`);
        alert(`Only the initial author can modify the content.`);
        navigate("/about");
      });
  };
  //////////////////////////////
  const stayOnPage = () => {
    navigate(`/forum/opinions/${id}`);
    console.log(`Is this where put method goes through 6 ?`);
  };

  const handleEdit = () => {
    navigate(`/forum/opinions/edit/${id}`);
    ////
    console.log(`Is this where put method goes through 16 ?`);
  };



  useEffect(() => {
    console.log(`Is this where put method goes through 9 ?`);
    stayOnPage();
  }, []);




  useEffect(() => {
    ////
    console.log(`Is this where put method goes through 10 ?`);
    //////   
    getOpinion(id)
      .then(response => {
        const message = response.status;
        const opinionData = response.data;
        console.log(` opinionData`);
        console.log(opinionData);
        const updatedAt = new Date(opinionData.updatedAt).toUTCString();
        const createdAt = new Date(opinionData.createdAt).toUTCString();

        setCurrentOpinion({
          id: opinionData.id,
          updatedAt,
          createdAt,
          collaborator_name: opinionData.collaboratorName, // is this collaborator_name or collaboratorName?
          category: opinionData.category,
          body: opinionData.body,
          title: opinionData.title,
        });

        if (message === 204) {
          alert(`Apologies. This opinion is deleted.`);
          navigate("/collaborator/dashboard");
        }
        else if (message === 403) {
          alert(`Sorry, you are not authorized to see the content.`);
          navigate("/about");
        } else if (message === 500) {
          alert(`Server-side issues. We'll try to fix it asap.`);
          navigate("/about");
        }

      })
      .catch((error) => {
        console.log(`Is this where put method goes through 11 ?`);
        // alert(`${error}`);
        return;
      });
  }, [id]);

  return (
    <>
      <div className="container">
        <div className="main-content" style={{ maxHeight: "600px", overflow: "auto" }}>
          <div className="row justify-content-center">
            <div className="col-md-8">
              {currentOpinion && (
                <div>
                  <article>
                    <h5 className="text-capitalize primary-color">{currentOpinion.title}</h5>

                    <div className="my-3" style={{ marginBottom: "0.5em", fontWeight: "bolder" }}>
                      <span className="text-capitalize">{currentOpinion.category}</span>
                    </div>
                    <div className="my-3" style={{ marginBottom: "0.5em" }}>
                      {currentOpinion.body}
                    </div>
                    <div className="my-3" style={{ marginBottom: "0.5em" }}>
                      <h6 style={{ fontWeight: "lighter", fontSize: "smaller" }}>Last Updated: {new Date(currentOpinion.updatedAt).toLocaleDateString()}</h6>

                    </div>

                  </article>

                  <button
                    onClick={handleEdit}
                    style={{ backgroundColor: "black", color: "white", borderRadius: "3px" }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={handleDelete}
                    className="ms-3"
                    style={{ backgroundColor: "black", color: "white", borderRadius: "3px" }}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OpinionDetails;
