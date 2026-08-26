import { API, getCookie } from "../utils/axios";

export const deleteAccount = async (URL, _id) => {
  const confirmed = window.confirm("Are you sure want to delete this data?");

  if (!confirmed) return;
  return await API.post(URL, { id: _id })
    .then((res) => alert(res.data.status))
    .catch((err) => alert(err));
};

export const CreateBudgetAPI = async (form) => {
  return await API.post("/daybook/create_budget/", form);
};

export const Edit_Budget = async (data) => {
  return await API.post("/daybook/update_budget/", data);
};

export const Get_Budget_CatSub = async () => {
  return await API.get("/daybook/get_budget_catsub/");
};

export const GetBudgetAPI = async (form) => {
  return await API.post("/daybook/get_budget/", form);
};

export const GetBudget_CategoryAPI = async () => {
  return await API.get("/daybook/get_budget_categories/");
};

export const AddBudget_Category = async (data) => {
  return await API.post("/daybook/create_budget_category/", data);
};

export const AddBudgetSub_CategoryAPI = async (data) => {
  return await API.post("/daybook/create_budget_subcategory/", data);
};

export const GetBudgetSub_Category = async (data) => {
  return await API.post("/daybook/get_budget_subcategories/", {
    budget_category_id: data,
  });
};

export const Edit_Budget_Category = async (data) => {
  return await API.post("/daybook/edit_budget_category", data);
};

export const Delete_Budget_Category = async (data) => {
  // return await API.post("/daybook/delete_budget_category", data);
  const confirmed = window.confirm("Are you sure want to delete this data?");

  if (!confirmed) return;
  return await API.post("/daybook/delete_budget_category/", data)
    .then((res) => alert(res.data.status))
    .catch((err) => alert(err));
};

export const Edit_Budget_SubCategory = async (data) => {
  return await API.post("/daybook/edit_budget_subcategory", data);
};

export const Delete_Budget_SubCategory = async (data) => {
  // return await API.post("/daybook/delete_budget_subcategory", data);

  const confirmed = window.confirm("Are you sure want to delete this data?");

  if (!confirmed) return;
  return await API.post("/daybook/delete_budget_subcategory/", data)
    .then((res) => alert(res.data.status))
    .catch((err) => alert(err));
};

export const Export_Budget_Excel = async (data) => {
  if (!data.hotel.length > 0) {
    return alert("Something went wrong");
  }

  console.log("daily excel", data);

  await API.post("/daybook/export_budget_excel/", data)
    .then((res) => {
      alert(res.data.status);
      console.log("budget export", res);
    })
    .catch((err) => alert(err));
};

/////////////////////////////////////////////////////////

// ----------------------------------------------------------------------  daily log

//////////////////////////////////////////////////////////////////
export const Get_DailyLog = async (data) => {
  return await API.post("daybook/get_daybook_log/", data);
};

export const Edit_DailyLog = async (data) => {
  return await API.post("/daybook/update_daybook_log/", data);
};

export const Get_DailyLog_CatSub = async () => {
  return await API.get("/daybook/get_dailyLog_catsub/");
};

export const Get_DailyLog_CategoryAPI = async () => {
  return await API.get("/daybook/get_categories/");
};

export const Add_DailyLog_CategoryAPI = async (data) => {
  console.log("api area categ", data);

  return await API.post("/daybook/create_category/", {
    category: data,
  });
};

export const Add_DailyLog_SubCategory = async (data) => {
  return await API.post("/daybook/create_subcategory/", data);
};

export const Add_DailyLog = async (data) => {
  return await API.post("/daybook/add_daybook_log/", data);
};

export const Delete_Daily_Category = async (data) => {
  const confirmed = window.confirm("Are you sure want to delete this data?");

  if (!confirmed) return;
  return await API.post("/daybook/delete_category/", data)
    .then((res) => alert(res.data.status))
    .catch((err) => alert(err));
};

export const Delete_Daily_SubCategory = async (data) => {
  const confirmed = window.confirm("Are you sure want to delete this data?");

  if (!confirmed) return;
  return await API.post("/daybook/delete_subcategory/", data)
    .then((res) => alert(res.data.status))
    .catch((err) => alert(err));
};

export const Export_Daily_Excel = async (data) => {
  if (!data.hotel.length > 0) {
    return alert("Something went wrong");
  }

  console.log("daily excel", data);

  await API.post("/daybook/export_daybook_log_excel/", data)
    .then((res) => {
      alert(res.data.status);
      console.log("dayly export", res);
    })
    .catch((err) => alert(err));
};

///////////////////////////////////////// hotel ops

export const Get_HotelOps = async (data) => {
  return await API.post("/daybook/get_hotelexpense/", data);
};
export const Get_HotelOps_Category = async () => {
  return await API.get("/daybook/get_categories/");
};
export const Get_HotelOps_SubCategory = async (data) => {
  return await API.post("/daybook/get_subcategories/", {
    category_id: data,
  });
};
export const Add_HotelOps = async (data) => {
  return await API.post("/daybook/add_hotelops/", data);
};

export const Export_Hotel_Excel = async (data) => {
  if (!data.hotel.length > 0) {
    return alert("Something went wrong");
  }

  console.log("daily excel", data);

  await API.post("/daybook/export_hotelexpense_excel/", data)
    .then((res) => {
      alert(res.data.status);
      console.log("budget export", res);
    })
    .catch((err) => alert(err));
};

////////////////////////////////////////////// Vendor Payout

export const Get_Vendor_API = async (data) => {
  return await API.post("/daybook/get_vendor_payout/", {
    from_date: data.prevMonth,
    to_date: data.yesterdate,
    hotel: data.hotels,
  });
};

export const Edit_Vendor = async (data) => {
  return await API.post("/daybook/update_vendor_payout/", data);
};

export const Add_Vendor_API = async (dataa) => {
  return await API.post("/daybook/add_vendor_payout/", dataa, {
    withCredentials: true,
    headers: {
      "X-CSRFToken": getCookie("csrftoken"),
      "Content-Type": "multipart/form-data",
    },

    transformRequest: [(data) => data], //  bypass JSON transform
  });
};

export const Export_Vendor_Excel = async (data) => {
  if (!data.hotel.length > 0) {
    return alert("Something went wrong");
  }

  console.log("daily excel", data);

  await API.post("/daybook/export_vendor_payout_excel/", data)
    .then((res) => {
      alert(res.data.status);
      console.log("budget export", res);
    })
    .catch((err) => alert(err));
};

//////////////////////////////////////////////// salary

export const Get_Salary = async (data) => {
  return await API.post("/daybook/get_salary/", {
    from_date: data.prevMonth,
    to_date: data.yesterdate,
    hotels: data.hotels,
    departmemt: data.department,
  });
};
export const Edit_Salary = async (data) => {
  return await API.post("/daybook/update_salary/", data);
};

export const Add_Salary = async (data) => {
  return await API.post("/daybook/add_salary/", data);
};

export const Export_Salary_Excel = async (data) => {
  if (!data.hotel.length > 0) {
    return alert("Something went wrong");
  }

  console.log("daily excel", data);

  await API.post("/daybook/export_salary_excel/", data)
    .then((res) => {
      alert(res.data.status);
      console.log("budget export", res);
    })
    .catch((err) => alert(err));
};
