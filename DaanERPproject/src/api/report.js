import { API } from "../utils/axios";

export const Get_Night_Audit_Report = async (data) => {
  return await API.post("/reports/get_nightaudit_report/", {
    hotels: data.hotels,
    from_date: data.from_date,
    to_date: data.to_date,
  });
};
