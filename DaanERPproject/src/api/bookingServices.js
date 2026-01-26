import { API } from "../utils/axios";

export const GetBookingDataAPI = async (data) => {
  return await API.post("/bookings/booking_list/", data);
};

export const AddBookingAPI = async (data) => {
  return await API.post("/bookings/booking_create/", data);
};
