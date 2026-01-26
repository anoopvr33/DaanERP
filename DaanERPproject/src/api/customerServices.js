import { API } from "../utils/axios";

export const GetCustomerDataAPI = async () => {
  return await API.post("/customers/filter_customers_order/");
};
