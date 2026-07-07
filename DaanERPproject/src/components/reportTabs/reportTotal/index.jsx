import { useEffect, useState } from "react";

import AccountsHotelAdd from "../../accountAddComponents/hotel";
import { API } from "../../../utils/axios";
import TotalReciept from "../../reportTable/total";
import TotalRecieptSub from "../../reportTable/totalsub";

const ReportTotalTab = ({ formattedDate }) => {
  const [open, setOpen] = useState(false);
  const [data1, setData1] = useState([
    {
      room: "123",
      guest: "Anoop",
      amount: "5000",
      invoice: "INV-001",
      folioNo: "FOL-001",
      payAmount: "2222",
      mode: "cash",
      time: "12:00 PM",
      comments: "Checked Out",
    },
  ]);
  const [data2, setData2] = useState([
    { payment: "Bill Payment", value: "1233" },
  ]);

  const GetHotel = async () => {
    const response = await API.post("/daybook/get_hotelops/", {
      date: formattedDate,
    });
    setData1(response.data.hotelops);
  };

  return (
    <div>
      <div className="flex-1"></div>
      {open && <AccountsHotelAdd formdate={formattedDate}></AccountsHotelAdd>}
      <h3></h3>
      <TotalRecieptSub data={data2}></TotalRecieptSub>
      <TotalReciept data={data1} />
    </div>
  );
};

export default ReportTotalTab;
