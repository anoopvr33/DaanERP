import { API, getCookie } from "../utils/axios";

const credentials = {
  withCredentials: true,
  headers: {
    "X-CSRFToken": getCookie("csrftoken"),
  },
};
// Get budget --------------------------------------
// API.post("/daybook/get_budget/", {
//       date: dateset,
//     });

export const CreateBudget = async (form) => {
  return await API.post("/daybook/create_budget/", form, credentials);
};

export const GetBudget = async (form) => {
  return await API.post("/daybook/get_budget/", form);
};

export const GetBudget_Category = async () => {
  return await API.get("/daybook/get_budget_categories/");
};

export const AddBudget_Category = async (data) => {
  return await API.post(
    "/daybook/create_budget_category/",
    {
      budget_category: data,
    }.credentials,
  );
};

export const AddBudgetSub_Category = async (data) => {
  return await API.post(
    "/daybook/create_budget_subcategory/",
    data,
    credentials,
  );
};

export const GetBudgetSub_Category = async (data) => {
  return await API.post("/daybook/get_budget_subcategories/", {
    budget_category_id: data,
  });
};

///////////////////////////////////////////////////////// daily log
export const Get_DailyLog = async (data) => {
  return await API.post("daybook/get_daybook_log/", data);
};

export const Get_DailyLog_Category = async () => {
  return await API.get("/daybook/get_categories/");
};

export const Add_DailyLog_Category = async (data) => {
  return await API.post(
    "/daybook/create_category/",
    {
      category: data,
    },
    credentials,
  );
};

export const Add_DailyLog_SubCategory = async (data) => {
  return await API.post("/daybook/create_subcategory/", data, credentials);
};

export const Add_DailyLog = async (data) => {
  return await API.post("/daybook/add_daybook_log/", data, credentials);
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

////////////////////////////////////////////// Vendor Payout

export const Get_Vendor = async (data) => {
  return await API.post("/daybook/get_vendor_payout/", {
    from_date: data.prevMonth,
    to_date: data.yesterdate,
    hotel: data.hotels,
  });
};

export const Add_Vendor = async (dataa) => {
  return await API.post("/daybook/add_vendor_payout/", dataa, {
    withCredentials: true,
    headers: {
      "X-CSRFToken": getCookie("csrftoken"),
      "Content-Type": "multipart/form-data", // 👈 add this
    },
    transformRequest: [(data) => data], // 👈 bypass JSON transform
  });
};

export const Get_Salary = async (data) => {
  return await API.post("/daybook/get_salary/", {
    from_date: data.prevMonth,
    to_date: data.yesterdate,
    hotels: data.hotels,
    departmemt: data.department,
  });
};

export const Add_Salary = async (data) => {
  return await API.post("/daybook/add_salary/", data, {
    withCredentials: true,
    headers: {
      "X-CSRFToken": getCookie("csrftoken"),
      // "Content-Type": "multipart/form-data", // 👈 add this
    },
  });
};
