import "./style.css";
import { useEffect, useState } from "react";
// import AccountsAdd from "../accountsAdd";
// import AccountsTable from "../../accoutsTable";
import FormItems from "../../Elements/formItems";
import Button from "../../Elements/button";
import axios from "axios";
import AccountsPos from "../../accoutsTable/pos";
import AccountsPosAdd from "../../accountAddComponents/pos";
import { API, getCookie } from "../../../utils/axios";

const AccPOS = ({ dateset, trigger }) => {
  const [open, setOpen] = useState(false);
  const [openCat, setOpenCat] = useState(false);
  const [openCatSub, setOpenCatSub] = useState(false);
  const [newCat, setNewCat] = useState("");
  const [newSub, setNewSub] = useState({
    budget_category: null,
    budget_sub_category: "",
  });
  const [category, setCategory] = useState([]);
  const [open2, setOpen2] = useState(false);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);

  const head1 = ["Id", "Details", "Expense", "Remark"];
  const head2 = ["Id", "Details", "Income", "Remark"];
  // const data1 =;

  const GetPos = async () => {
    const response = await API.post("/daybook/get_budget/", {
      date: dateset,
    });
    console.log("pos res", response.data.data);
    if (response.data.data) {
      setData1(response.data.data);
      // setData2(response.data.pos_expense);
    } else alert("something went wrong getting Budget data");
  };

  const GetCategory = async () => {
    const res = await API.get("/daybook/get_budget_categories/");

    console.log("my category", res.data.data);
    if (res.data.data) {
      setCategory(res?.data?.data);
    } else alert("something wrong getting budget category");
  };

  const AddCategory = async (e) => {
    e.preventDefault();
    console.log("new cat", newCat);
    const res = await API.post(
      "/daybook/create_budget_category/",
      {
        budget_category: newCat,
      },
      {
        withCredentials: true,
        headers: {
          "X-CSRFToken": getCookie("csrftoken"),
        },
      },
    );
    console.log("success cat", res);
    if (res.data.message) {
      alert("category created please refresh");
      GetCategory();
    } else alert("something went wrong");
  };

  const AddSubCat = async (e) => {
    e.preventDefault();
    console.log("my sub", newSub);
    const res = await API.post("/daybook/create_budget_subcategory/", newSub);
    console.log("succes sub", res);
    if (res.data.status === "success") {
      alert("created SubCategory please refresh");
    } else alert("something went wrong");
  };

  const CatOption = [
    { name: "select category", value: "" },
    ...category.map((i) => ({ name: i.category, value: i.id })),
  ];

  useEffect(() => {
    GetCategory();
  }, []);

  useEffect(() => {
    GetPos();
    // eslint(react-hooks/set-state-in-effect)
  }, [trigger]);

  useEffect(() => {
    console.log("data1", data1);
  }, [data1]);

  return (
    <div className="acc-pos">
      <div>
        {/* <h3>Budget</h3> <br /> */}
        <div className="flex-1">
          <Button
            onClick={() => (
              setOpenCatSub(false),
              setOpen(false),
              setOpenCat(!openCat)
            )}
            child={"Add Category +"}
          ></Button>
          <Button
            onClick={() => (
              setOpen(false),
              setOpenCat(false),
              setOpenCatSub(!openCatSub)
            )}
            child={"Add Subcategory +"}
          ></Button>
          <Button
            onClick={() => (
              setOpenCat(false),
              setOpenCatSub(false),
              setOpen(!open)
            )}
            child={"Create +"}
          />
        </div>
        {open && <AccountsPosAdd type={"IN"} formdate={dateset} />}
        {openCat && (
          <div style={{ width: "fit-content" }} className="add-account-main">
            <form action="">
              <FormItems
                onChange={(e) => setNewCat(e.target.value)}
                placeholder={"Enter Category"}
              ></FormItems>
              <Button onClick={AddCategory} child={"Add"}></Button>
            </form>
          </div>
        )}
        {openCatSub && (
          <div style={{ width: "fit-content" }} className="add-account-main">
            <form action="">
              <FormItems
                onChange={(e) =>
                  setNewSub({
                    ...newSub,
                    budget_category: Number(e.target.value),
                  })
                }
                element="select"
                option={CatOption}
              ></FormItems>
              <FormItems
                onChange={(e) =>
                  setNewSub({ ...newSub, budget_sub_category: e.target.value })
                }
                placeholder={"Enter Subcategory"}
              ></FormItems>
              <Button onClick={AddSubCat} child={"Add"}></Button>
            </form>
          </div>
        )}
        {data1.map((i) => (
          <AccountsPos data={i} />
        ))}
      </div>
      {/* <div>
        <h3>Actual Expense</h3> <br />
        <div className="flex-1">
          <Button onClick={() => setOpen2(!open2)} child={"Create +"} />
        </div>
        {open2 && <AccountsPosAdd type={"EX"} formdate={dateset} />}
        <AccountsPos type={"EX"} head={head2} data={data2} />
      </div> */}
    </div>
  );
};

export default AccPOS;
