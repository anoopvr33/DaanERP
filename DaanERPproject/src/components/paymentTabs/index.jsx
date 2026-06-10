import "./style.css";
import { useEffect, useState } from "react";
import PaymentDetails from "./bill_company";
import BillCompanyTab from "./bill_company";
import UpiCompanyTab from "./upi_company";
import UpiCurrentTab from "./upi_current";
import CashPayTab from "./cash_pay";
import { API, getCookie } from "../../utils/axios";
import BankTransferTab from "./bank_transfer";
import OutstandingTab from "./out_standing";
import ComplementaryTab from "./complementary";
import PaymentLink from "./paymentLink";

const PaymentTabs = ({ yesterday, prevmonth, hotelsArray, trigger }) => {
  const [tab, setTab] = useState(0);
  const [loading, setLoading] = useState(false);

  const BillCompany = {
    borderRadius: "20px 20px 0px 0px",
    background: tab == 0 && "    hsl(0, 0%, 100%)",
    color: tab == 0 && "#026e7e",
    borderBottomRightRadius: tab - 1 == 0 && "20px",
    borderBottomLeftRadius: tab + 1 == 0 && "20px",
  };
  const UpiCom = {
    borderRadius: "20px 20px 0px 0px",
    background: tab == 1 && "    hsl(0, 0%, 100%)",
    color: tab == 1 && "#026e7e",
    borderBottomRightRadius: tab - 1 == 1 && "20px",
    borderBottomLeftRadius: tab + 1 == 1 && "20px",
  };
  const UpiCurent = {
    borderRadius: "20px 20px 0px 0px",
    background: tab == 2 && "    hsl(0, 0%, 100%)",
    color: tab == 2 && "#026e7e",
    borderBottomRightRadius: tab - 1 == 2 && "20px",
    borderBottomLeftRadius: tab + 1 == 2 && "20px",
  };
  const Cash = {
    borderRadius: "20px 20px 0px 0px",
    background: tab == 3 && "    hsl(0, 0%, 100%)",
    color: tab == 3 && "#026e7e",
    borderBottomRightRadius: tab - 1 == 3 && "20px",
    borderBottomLeftRadius: tab + 1 == 3 && "20px",
  };
  const bank_transfer = {
    borderRadius: "20px 20px 0px 0px",
    background: tab == 4 && "    hsl(0, 0%, 100%)",
    color: tab == 4 && "#026e7e",
    borderBottomRightRadius: tab - 1 == 4 && "20px",
    borderBottomLeftRadius: tab + 1 == 4 && "20px",
  };
  const outstanding = {
    borderRadius: "20px 20px 0px 0px",
    background: tab == 5 && "    hsl(0, 0%, 100%)",
    color: tab == 5 && "#026e7e",
    borderBottomRightRadius: tab - 1 == 5 && "20px",
    borderBottomLeftRadius: tab + 1 == 5 && "20px",
  };
  const complementary = {
    borderRadius: "20px 20px 0px 0px",
    background: tab == 6 && "    hsl(0, 0%, 100%)",
    color: tab == 6 && "#026e7e",
    borderBottomRightRadius: tab - 1 == 6 && "20px",
    borderBottomLeftRadius: tab + 1 == 6 && "20px",
  };
  const payment = {
    borderRadius: "20px 20px 0px 0px",
    background: tab == 7 && "    hsl(0, 0%, 100%)",
    color: tab == 7 && "#026e7e",
    borderBottomRightRadius: tab - 1 == 7 && "20px",
    borderBottomLeftRadius: tab + 1 == 7 && "20px",
  };
  const None = {
    borderRadius: "20px 20px 0px 0px",
    // background: tab == 0 && "    hsl(0, 0%, 100%)",
    color: tab == 8 && "#026e7e",
    borderBottomRightRadius: tab - 1 == 8 && "20px",
    borderBottomLeftRadius: tab + 1 == 8 && "20px",
  };

  const TabArray = [
    {
      id: 0,
      name: "Bill to Company",
      link: "pos",
      style: BillCompany,
    },
    {
      id: 1,
      name: "UPI to Company",
      link: "pos",
      style: UpiCom,
    },
    {
      id: 2,
      name: "UPI to Current",
      link: "pos",
      style: UpiCurent,
    },
    {
      id: 3,
      name: "Cash",
      link: "pos",
      style: Cash,
    },
    {
      id: 4,
      name: "Bank Transfer",
      link: "pos",
      style: bank_transfer,
    },
    {
      id: 5,
      name: "Outstanding",
      link: "pos",
      style: outstanding,
    },
    {
      id: 6,
      name: "Complementary",
      link: "pos",
      style: complementary,
    },
    {
      id: 7,
      name: "Payment Link Mode",
      link: "pos",
      style: payment,
    },
    {
      id: 8,
      name: "",
      link: "",
      style: None,
    },
  ];

  const [data, setData] = useState([]);
  const GetPos = async () => {
    if (hotelsArray.length === 0) return setLoading(true);

    try {
      setLoading(true);
      const response = await API.post(
        "/reports/get_payment_report/",
        {
          hotels: hotelsArray,
          from_date: prevmonth,
          to_date: yesterday,
        },
        {
          withCredentials: true,
          headers: {
            "X-CSRFToken": getCookie("csrftoken"),
          },
        },
      );
      // console.log("payemtn res", response);
      if (response.data.report) {
        setData(response.data.report);
      } else alert("some error");
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    GetPos();
  }, [trigger, hotelsArray]);

  return (
    <div className="payment-tabs">
      <div className="payment-tabs-flex">
        {TabArray.map((item, index) => (
          <p
            key={index}
            style={{
              borderBottomLeftRadius: tab + 1 === index ? "20px" : "0px",
              borderBottomRightRadius: tab - 1 === index ? "20px" : "0px",
            }}
            onClick={() => setTab(index)}
          >
            <text style={item?.style}>{item?.name}</text>
          </p>
        ))}
      </div>
      <div
        style={{ borderRadius: tab === 0 && "0px 20px 20px 20px" }}
        className="payment-tabs-container"
      >
        {tab === 0 && (
          <BillCompanyTab
            loading={loading}
            result={data?.bill_to_company}
          ></BillCompanyTab>
        )}
        {tab === 1 && (
          <UpiCompanyTab result={data?.upi_company}></UpiCompanyTab>
        )}
        {tab === 2 && (
          <UpiCurrentTab result={data?.upi_current}></UpiCurrentTab>
        )}
        {tab === 3 && <CashPayTab result={data?.cash}></CashPayTab>}
        {tab === 4 && (
          <BankTransferTab result={data?.bank_transfer}></BankTransferTab>
        )}
        {tab === 5 && (
          <OutstandingTab result={data?.outstanding}></OutstandingTab>
        )}
        {tab === 6 && (
          <ComplementaryTab result={data?.complementary}></ComplementaryTab>
        )}
        {tab === 7 && (
          <PaymentLink result={data?.payment_link_mode}></PaymentLink>
        )}
      </div>
      <br />

      <div className="payment-tabs-container">
        <h3>Total Amounts</h3> <br />
        <p>
          <b>bill_to_company</b>: {data?.total_amount?.bill_to_company}
        </p>{" "}
        <br />
        <p>
          <b>upi_current</b>: {data?.total_amount?.upi_current}
        </p>{" "}
        <br />
        <p>
          <b>upi_company</b>: {data?.total_amount?.upi_company}
        </p>{" "}
        <br />
        <p>
          <b>cash</b>: {data?.total_amount?.cash}
        </p>
        <p>
          <b>bank_transfer</b>: {data?.total_amount?.bank_transfer}
        </p>{" "}
        <p>
          <b>outstanding</b>: {data?.total_amount?.outstanding}
        </p>{" "}
        <p>
          <b>complementary</b>: {data?.total_amount?.complementary}
        </p>
        <p>
          <b>payment_link_mode</b>: {data?.total_amount?.payment_link_mode}
        </p>
      </div>
    </div>
  );
};

export default PaymentTabs;
