import React, { useEffect, useState } from "react";
import FormItems from "../../Elements/formItems";
import Button from "../../Elements/button";
// import AccountsAdd from "../accountsAdd";
import AccountsTable from "../../accoutsTable";
import axios from "axios";
import AccountsDailyAdd from "../../accountAddComponents";
import { API } from "../../../utils/axios";

const AccDailyLog = ({ dateset, trigger }) => {
  const [open, setOpen] = useState(false);
  const [openCat, setOpenCat] = useState(false);
  const [openCatSub, setOpenCatSub] = useState(false);
  const [cat, setCat] = useState(false);
  const [sub, setSub] = useState(false);
  const [data, setData] = useState([]);
  const [category, setCategory] = useState([]);
  const [newcat, setNewcat] = useState("");
  const [subcat, setSubcat] = useState({ category: null, sub_category: "" });

  const GetPos = async () => {
    const response = await API.post("daybook/get_daybook_log/", {
      date: dateset,
    });
    console.log("daily res", response);
    setData(response.data.data);
  };

  const GetCategory = async () => {
    const res = await API.get("/daybook/get_categories/");
    console.log("my category", res.data.data);
    setCategory(res?.data?.data);
  };

  const AddCategory = async (e) => {
    e.preventDefault();
    const res = await API.post("/daybook/create_category/", {
      category: newcat,
    });
    console.log("success cat", res);
    if (res.data.message) {
      alert("category created please refresh");
    }

    GetCategory();
  };

  const AddSubCat = async (e) => {
    e.preventDefault();
    console.log("my sub", subcat);
    const res = await API.post("/daybook/create_subcategory/", subcat);
    console.log("succes sub", res);
    if (res.data.message) {
      return alert("created SubCategory please refresh");
    }
  };

  useEffect(() => {
    GetCategory();
  }, []);

  useEffect(() => {
    GetPos();
    console.log("fate", dateset);
    // eslint(react-hooks/set-state-in-effect)
  }, [trigger]);

  return (
    <div>
      {/* <div className="daily-sub-head">
        
        <h3 onClick={() => setCat(!cat)}>
          Add Category <i class="fa fa-angle-down" aria-hidden="true"></i>{" "}
        </h3>
        <h3 onClick={() => setSub(!sub)}>
          Add SubCategory <i class="fa fa-angle-down" aria-hidden="true"></i>
        </h3>
      </div> */}

      <div className="flex-1">
        {/* <FormItems option={Count} element="select"></FormItems>{" "} */}

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
      {open && <AccountsDailyAdd formdate={dateset}></AccountsDailyAdd>}
      {openCat && (
        <div style={{ width: "fit-content" }} className="add-account-main">
          <form action="">
            <FormItems
              onChange={(e) => setNewcat(e.target.value)}
              placeholder={"Enter Category"}
            ></FormItems>

            <Button child={"Add"} onClick={AddCategory}>
              Add
            </Button>
          </form>
        </div>
      )}
      {openCatSub && (
        <div style={{ width: "fit-content" }} className="add-account-main">
          <form action="">
            <FormItems
              element="select"
              option={category.map((i) => ({
                name: i.category,
                value: i.id,
              }))}
              onChange={(e) =>
                setSubcat({ ...subcat, category: Number(e.target.value) })
              }
            ></FormItems>

            <FormItems
              placeholder={"Enter SubCategory"}
              onChange={(e) =>
                setSubcat({ ...subcat, sub_category: e.target.value })
              }
            ></FormItems>

            <Button child={"Add"} onClick={AddSubCat}></Button>
          </form>
        </div>
      )}

      <p>
        {" "}
        <br />
        <b>Date : </b> {dateset}{" "}
      </p>
      <AccountsTable data={data}></AccountsTable>
    </div>
  );
};

export default AccDailyLog;
