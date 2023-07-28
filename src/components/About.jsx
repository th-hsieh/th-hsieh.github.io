import React from "react";
import Footer from "../components/Footer.js";

const About = () => {
  return (
    <>
      <div className="container" style={{ overflow: "auto", maxHeight: "calc(100vh - 300px)" }}>
        <div className="row justify-content-center">
          <div className="col-sm-8">
            <div className="d-flex flex-column align-items-center">
              <h2 style={{ margin: "0em" }}>ABOUT</h2>
              <h6 style={{ margin: "0.5em 0em 2em 0em" }}>
                As a female physicist and engineer who was born and educated in Taiwan, further studied and worked in over
                8 countries, I know very well that gender inequality in the STEM domain persists as a global problem.
                public+privacy emphasizes providing an inclusive discussion forum, where each voice is equally displayed.
                This way, our next generations in STEM can have true gender equality.
              </h6>
            </div>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-sm-8">
            <div className="d-flex flex-column align-items-center">
              <h5 style={{ margin: "0em" }}>Mission Statement</h5>
              <h6 style={{ margin: "0.5em 0em 1.5em 0em" }}>
                What is public, what is private? We started sharing our private experiences on healthcare, gender equality,
                and the educational system publicly so that individuals who have the same experiences will know that they
                are not alone. public+privacy bears this mission in mind to serve as a channel for building a better
                environment for the next STEM generation.
              </h6>
            </div>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-sm-8">
            <div className="d-flex flex-column align-items-center">
              <h5 style={{ margin: "0em" }}>Collaboration</h5>
              <h6 style={{ margin: "0.5em 0em 1.5em 0em" }}>Come Join as Collaborators and share your experiences!</h6>
            </div>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-sm-8">
            <div className="d-flex flex-column align-items-center">
              <h5 style={{ margin: "0em" }}>Contact</h5>
              <h6 style={{ margin: "0.5em 0em 1.5em 0em" }}>t.hsuanhsieh@gmail.com</h6>
            </div>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-sm-8">
            <div className="d-flex flex-column align-items-center">
              <h5 style={{ margin: "0em" }}>Selected References</h5>
              <h6 style={{ margin: "0.5em 0em 1.5em 0em" }}>
                Relevant Research References from NGO, and my essays will be updated bi-weekly.
              </h6>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;

