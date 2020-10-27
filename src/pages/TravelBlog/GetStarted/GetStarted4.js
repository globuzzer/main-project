import React, { useEffect } from "react";
import "./GetStartedModal.css";

const GetStarted4 = ({ setShowHeader }) => {
  //close the modal
  const handleClose = () => {
    window.location.reload();
  };
  useEffect(() => {
    setShowHeader(false);
  }, [setShowHeader]);
  return (
    <React.Fragment>
      <div className="header_box">
        <div className="topic">
          <h2 id="start4">Thank you for choosing globuzzer!</h2>
          <button onClick={handleClose} id="close_thanks">
            X
          </button>
        </div>
      </div>

      <div className="grey_box4">
        <p className="sent_application">Your application has been sent!</p>
        <div className="thanks">
          <p>
            We are so excited that you want to start your <br />
            travel blog! We’ll review your request and get
            <br />
            back to you within 24 hours.
          </p>
        </div>
        <div className="close_wrapper">
          <button className="close4" onClick={handleClose}>
            CLOSE
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default GetStarted4;
