import React, { useEffect, useState } from "react";
import FormItems from "../../Elements/formItems";
import Button from "../../Elements/button";
// import AccountsAdd from "../accountsAdd";
import AccountsTable from "../../accoutsTable";
import axios from "axios";
import AccountsDailyAdd from "../../accountAddComponents";
import { API } from "../../../utils/axios";
import { Get_DailyLog_CatSub } from "../../../api/accountsServices";

const AccDailyLog = ({ dateset, trigger, hotels, prevMonth }) => {
  const [open, setOpen] = useState(false);
  const [openCat, setOpenCat] = useState(false);
  const [openCatSub, setOpenCatSub] = useState(false);
  const [cat, setCat] = useState(false);
  const [sub, setSub] = useState(false);
  const [data, setData] = useState({});
  const [list, setList] = useState(false);

  const [category, setCategory] = useState([]);
  const [catsub, setCatSub] = useState([]);
  const [newcat, setNewcat] = useState("");
  const [subcat, setSubcat] = useState({ category: null, sub_category: "" });

  const GetPos = async () => {
    console.log("get daily", hotels, dateset, prevMonth);

    if (hotels.length === 0) return;

    try {
      const response = await API.post("daybook/get_daybook_log/", {
        from_date: prevMonth,
        to_date: dateset,
        // date: dateset,
        hotel: hotels,
      });
      if (response.data.data) {
        setData(response.data.data);
      } else {
        alert("something went wrong ");
      }
    } catch (error) {
      alert("something went wrong getting daily log");
    }
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
    Get_DailyLog_CatSub()
      .then((res) => {
        console.log("my cat sub", res.data);
        if (res.data) setCatSub(res.data);
      })
      .catch((err) => {
        alert("something went wrong getting category and subcategory");
      });
  }, []);

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
            setOpenCat(!openCat),
            setList(false)
          )}
          child={"New Category +"}
        ></Button>
        <Button
          onClick={() => (
            setOpen(false),
            setOpenCat(false),
            setOpenCatSub(!openCatSub),
            setList(false)
          )}
          child={"New Subcategory +"}
        ></Button>

        <Button
          onClick={() => (
            setOpenCat(false),
            setOpenCatSub(false),
            setOpen(false),
            setList(!list)
          )}
          child={
            <>
              {" "}
              List Categories{" "}
              <i class="fa fa-angle-down" aria-hidden="true"></i>{" "}
            </>
          }
        />
        <Button
          onClick={() => (
            setOpenCat(false),
            setOpenCatSub(false),
            setOpen(!open),
            setList(false)
          )}
          child={"New Daily Log +"}
          className={"add-dailylog"}
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

      {list && (
        <div
          style={{
            width: "500px",
            height: "fit-content",
            maxHeight: "300px",
            overflowY: "scroll",
            border: "1px solid #d9d9d9",
            borderRadius: "20px",
            padding: "15px",
          }}
          className="add-account-main"
        >
          {/* {catsub.map((i) => (
            <div style={{ marginBottom: "10px" }}>
              <b>{i.category}</b>
              <ul>
                {i.sub_category.map((j) => (
                    <li>{j.sub_category}</li>
                  ))}
              </ul>
            </div>
          ))} */}

          <h1>Category & Subcategory</h1>
          <br />
          <div>
            {Object.entries(catsub).map(([key, values]) => (
              <div key={key}>
                <h4 style={{ textDecoration: "underline" }}>{key}</h4>
                <ul style={{ padding: "10px 20px" }}>
                  {values.length === 0
                    ? "no data"
                    : values?.map((sub) => (
                        <li style={{ fontSize: "13px" }} key={sub.id}>
                          {sub.sub}
                        </li>
                      ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      <p>
        <br />
        <b>Date : </b> {dateset}{" "}
      </p>
      <AccountsTable data={data}></AccountsTable>
    </div>
  );
};

export default AccDailyLog;
