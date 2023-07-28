import React from "react";
 import '../../src/App.css'

const Footer = () => {

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  return (
    <footer style={{ textAlign: "center", marginTop: "2em" , color:"gray"}}>
      <p style={{ color:"gray"}}>
        <em style={{ color:"gray"}}>
          "No empire imposed by force or otherwise has ever been without this feature: control of the indigenous by members
          of their own group."
        </em>{" "}
        <br />- Margaret Atwood, <cite style={{ color:"gray"}}>The Handmaid’s Tale</cite>
      </p>
      <p style={{ fontStyle:"italic", color:"gray"}}>Last Updated: {currentDate}</p>
      <div style={{ marginBottom: "10px" }}></div>
    </footer>
  );
};

export default Footer;
