import React from "react";
import FormItems from "../Elements/formItems";
import "./style.css";

const DailyLogEdit = ({ setEdit }) => {
  return (
    <div className="account-edit">
      <i
        onClick={() => setEdit(null)}
        style={{ margin: "auto", marginRight: "0px" }}
        class="fa-regular fa-circle-xmark"
      ></i>
      {<h2>Edit Booking</h2>}
      {/* <p>Customer : {customer}</p> */}
      <p>Booking ID :</p> <br />
      <div>
        <FormItems
          type="text"
          labelData={"subCategory"}
          name="sub_category"
          value={"jas"}
        ></FormItems>
        <FormItems
          type="text"
          labelData={"Hotel"}
          name="Hotel"
          value={"jas"}
        ></FormItems>
        <FormItems
          type="text"
          labelData={"Budget Amt"}
          name="Budget Amt"
          value={"jas"}
        ></FormItems>
        <FormItems
          type="text"
          labelData={"Actual Amt"}
          name="Actual Amt"
          value={"jas"}
        ></FormItems>
      </div>
    </div>
  );
};

export default DailyLogEdit;
