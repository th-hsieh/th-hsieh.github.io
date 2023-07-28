import Footer from "./Footer.js";

const SelectedEssays = () => {
  return (
    <>
      <div className="row justify-content-center">
        <div className="col-sm-8 text-center">
          <h2>Selected References</h2>
          <h6>
            One wants to protect him/herself, at the same time interlocuting as honestly as possible---on the Internet. These practical law guides are the way out.
          </h6>
          <br/>
          <h4>Books and Essays</h4>
        </div>

        <div className="col-sm-8 text-center" style={{ margin: "0.5em 0 1em 0" }}>
          <h6>Dive into the practical details of content moderation</h6>
          <h6 style={{color:"gray"}}>
            - Tarleton Gillepsie, <cite style={{color:"gray"}}>Custodians of the Internet</cite>
          </h6>
        </div>

        <div className="col-sm-8 text-center" style={{ margin: "0.5em 0 1em 0" }}>
          <h6>A Judicial History of Internet Free Speech Management and Regulation</h6>
          <h6 style={{color:"gray"}}>
            - Kate Klonick, <cite style={{color:"gray"}}>The New Governors in Harvard Review</cite>
          </h6>
          <h6 style={{color:"gray"}}>
            - Nic Suzor, <cite style={{color:"gray"}}>Lawless</cite>
          </h6>
        </div>

        <div className="col-sm-8 text-center" style={{ margin: "1em 0 1em 0" }}>
          <h6>A Manifesto for the Way of Social Media Management</h6>
          <h6 style={{color:"gray"}}>
            - Rebecca MacKinnon, <cite style={{color:"gray"}}>Consent of the Networked</cite>
          </h6>
        </div>

        <div className="col-sm-8 text-center" style={{ margin: "1em 0 1em 0" }}>
          <h6>How social media is eroding democracy</h6>
          <h6 style={{color:"gray"}}> 
            - Sarah T. Roberts, <cite style={{color:"gray"}}>Anti-social Media</cite>
          </h6>
        </div>

        <div className="col-sm-8 text-center" style={{ margin: "1em 0 1em 0" }}>
          <h6 >Exploring the Impact of Content Moderation on Workers</h6>
          <h6 style={{color:"gray"}}>
            - Siva Vaidyanathan, <cite style={{color:"gray"}}>Behind the Screen</cite>
          </h6>
        </div>
      </div>

    <div className="row justify-content-center">
        <div className="col-sm-8 text-center">
          {/* <h6>
            One wants to protect him/herself, at the same time interlocuting as honestly as possible---on the Internet. These practical law guides are the way out.
          </h6> */}
          <br/>
          <h4>Laws</h4>
          <h6 style={{color:"gray"}}>Volksverhetzung, Germany</h6>
          <h6 style={{color:"gray"}}>NetzDG(Network Enforcement Act), Germany</h6>
        </div>
    </div>
    <br/>
    <br/>
    <Footer />
    </>
  );
};

export default SelectedEssays;
