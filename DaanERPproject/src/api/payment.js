import { API } from "../utils/axios";

export const GetPaymentReport = async (form) => {
  return await API.post("/reports/get_payment_report/", {
    hotels: form.hotelsArray,
    from_date: form.prevmonth,
    to_date: form.yesterday,
  });
};
