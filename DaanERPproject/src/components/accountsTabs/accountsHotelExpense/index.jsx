import React, { useEffect, useState } from "react";
import FormItems from "../../Elements/formItems";
import Button from "../../Elements/button";
// import AccountsAdd
import AccountsTable from "../../accoutsTable";
import AccountsHotel from "../../accoutsTable/hotel";
import AccountsHotelAdd from "../../accountAddComponents/hotel";
import { API } from "../../../utils/axios";

const AccHotelExpense = ({ dateset }) => {
  const [open, setOpen] = useState(false);
  const [data1, setData1] = useState([]);

  const GetHotel = async () => {
    const response = await API.post("/daybook/get_hotelexpense/", {
      date: dateset,
    });
    console.log("hotel res", response);
    setData1(response.data);
  };

  useEffect(() => {
    GetHotel();
    console.log("my date", dateset);
    // eslint(react-hooks/set-state-in-effect)
  }, [dateset]);

  return (
    <div>
      <div className="flex-1">
        {/* <FormItems option={Count} element="select"></FormItems>{" "} */}
        {/* <Button onClick={() => setOpen(!open)} child={"create +"}></Button> */}
      </div>
      {open && <AccountsHotelAdd formdate={dateset}></AccountsHotelAdd>}
      <AccountsHotel data={data1} />
    </div>
  );
};

export default AccHotelExpense;
