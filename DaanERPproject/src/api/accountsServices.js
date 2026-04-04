import { API } from "../utils/axios";

export const GetAccountsDataAPI = async (data) => {
  return await API.post("/bookings/booking_list/", data);
};

export const AddAccountsAPI = async (data) => {
  return await API.post("/bookings/booking_create/", data);
};
