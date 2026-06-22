import { useEffect, useState } from "react";
import { API } from "../../utils/axios";
import "./style.css";
import { IsStaff, IsSuper } from "../../utils";
import VendorEdit from "../accountsEdit/vendorEdit";
import SalaryEdit from "../accountsEdit/salaryEdit";
import { Get_Salary } from "../../api/accountsServices";

const AccountsSalary = ({
  yesterdate,
  trigger,
  prevMonth,
  hotels,
  department,
}) => {
  const [edit, setEdit] = useState(false);
  const [salary, setSalary] = useState([]);

  useEffect(() => {
    const GetSalary = async () => {
      await Get_Salary({
        from_date: prevMonth,
        to_date: yesterdate,
        hotels: hotels,
        departmemt: department,
      })
        .then((res) => setSalary(res?.data?.data))
        .catch((err) => alert(err));
    };
    GetSalary();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <th>Action</th>
        {/* <th>Invoice</th>  */}
      </tr>

      <tbody>
        {salary.length > 0 ? (
          salary.map((item, index) => (
            <>
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
                <td>
                  <i
                    onClick={() => setEdit(index)}
                    class="fa fa-edit"
                    aria-hidden="true"
                  ></i>{" "}
                  <br />
                  <i
                    // onClick={() => Delete(i.id)}
                    style={{
                      display: `${IsSuper() === false || IsStaff() === true ? "none" : ""}`,
                    }}
                    class="fa fa-trash"
                    aria-hidden="true"
                  ></i>
                </td>
              </tr>
              {edit === index && (
                <SalaryEdit
                  name={item.name}
                  _id={item.id}
                  department={item.department}
                  hotel={item.hotel}
                  doj={item.doj}
                  basic_salary={item.basic_salary}
                  month_days={item.month_days}
                  working_days={item.working_days}
                  earning_salary={item.earning_salary}
                  salary_advance={item.salary_advance}
                  net_salary={item.net_salary}
                  setEdit={setEdit}
                ></SalaryEdit>
              )}
            </>
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
