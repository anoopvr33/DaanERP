import React from "react";

const ErrorPage = () => {
  return (
    <div style={{ textAlign: "center" }}>
      {/* <img
        style={{ width: "300px", borderRadius: "20px" }}
        src="/error-icon.jpg"
        alt=""
      /> */}
      <h2>Error occured!</h2>
      <h4
        style={{
          textAlign: "center",
          color: "rgb(67, 67, 67)",
          fontWeight: "400",
          fontSize: "16px",
        }}
      >
        Something went wrong. Please try again later.
      </h4>{" "}
      <br />
      <button
        style={{ padding: "5px 20px" }}
        onClick={() => window.location.reload()}
      >
        Refresh
      </button>
    </div>
  );
};

export default ErrorPage;
