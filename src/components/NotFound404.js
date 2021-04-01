import React from "react";
import "./NotFound404.css";

function NotFound404() {
  return (
    <div>
      {/* <h1>404 Error Page #2</h1>
      <p className="zoom-area">
        <b>CSS</b> animations to make a cool 404 page.{" "}
      </p> */}
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
