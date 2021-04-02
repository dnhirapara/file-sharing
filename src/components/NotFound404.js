import React from "react";
import "./NotFound404.css";

function NotFound404(props) {
  return (
    <div>
      {props.message ? <h1>{props.message} Not Found</h1> : null}
      <section className="error-container">
        <span className="four">
          <span className="screen-reader-text">4</span>
        </span>
        <span className="zero">
          <span className="screen-reader-text">0</span>
        </span>
        <span className="four">
          <span className="screen-reader-text">4</span>
        </span>
      </section>
      <div className="link-container">
        <a href="/" className="more-link">
          Go To Home Page
        </a>
      </div>
    </div>
  );
}

export default NotFound404;
