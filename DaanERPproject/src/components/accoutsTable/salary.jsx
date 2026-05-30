import { useEffect, useState } from "react";
import { API } from "../../utils/axios";
import "./style.css";

const AccountsSalary = ({
  yesterdate,
  trigger,
  prevMonth,
  hotels,
  department,
}) => {
  // const head = data.length > 0 ? Object.keys(data[0]) : [];

  const [salary, setSalary] = useState([]);

  const GetSalary = async () => {
    console.log("salary date", yesterdate, prevMonth, hotels, department);
    const res = await API.post("/daybook/get_salary/", {
      from_date: prevMonth,
      to_date: yesterdate,
      hotels: hotels,
      departmemt: department,
    });
    console.log("salary", res);
    setSalary(res?.data?.data);
  };

  useEffect(() => {
    GetSalary();
  }, [trigger, department]);

  return (
    <table className="daan-table">
      <tr>
        <th>Name</th>
        <th>Departmemt</th>
        <th>Hotel</th>
        {/* <th>Vendor Name</th> */}
        <th>DOJ</th>
        <th>Basic Salary</th>
        <th>Month Days</th>
        <th>Working Days</th>
        <th>Earning Salary</th>
        <th>Salary Advance</th>
        <th>Net Salary</th>
        {/* <th>Invoice</th>  */}
      </tr>

      <tbody>
        {salary.length > 0 ? (
          salary.map((item) => (
            <tr className="accounts-row">
              <td>{item.name}</td>
              <td>{item.department}</td>
              <td>{item.hotel}</td>
              <td>{item.doj}</td>
              <td>{item.basic_salary}</td>
              <td>{item.month_days}</td>
              <td>{item.working_days}</td>
              <td>{item.earning_salary}</td>
              <td>{item.salary_advance}</td>
              <td>{item.net_salary}</td>
            </tr>
          ))
        ) : (
          <tr>
            {" "}
            <td colSpan={9}> Empty Data </td>{" "}
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default AccountsSalary;
