import React from "react";

const ErrorPage = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <img
        style={{ width: "300px", borderRadius: "20px" }}
        src="/error-icon.jpg"
        alt=""
      />
      <h2
        style={{
          textAlign: "center",
          color: "rgb(247, 39, 39)",
          fontWeight: "500",
          fontSize: "20px",
        }}
      >
        Error Occured !
      </h2>
    </div>
  );
};

export default ErrorPage;
