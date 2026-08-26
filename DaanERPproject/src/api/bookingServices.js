import { API } from "../utils/axios";

export const GetBookingDataAPI = async (data) => {
  console.log("filter date", data);
  return await API.post("/bookings/bookings_by_date/", data);
};

export const EditBookingDataAPI = async (data, id) => {
  console.log("edit booking", data, id);
  return await API.post(`/bookings/booking_update/${id}/`, data);
};

export const DeleteBookingDataAPI = async (id) => {
  console.log("delete booking", id);
  return await API.post(`/bookings/booking_delete/${id}/`, {});
};

export const AddBookingAPI = async (data) => {
  console.log("my booking data to add", data);
  return await API.post("/bookings/booking_create/", data);
};

export const AddBooking_CheckIn = async (data) => {
  console.log("my booking checkin", data);
  return await API.post("/bookings/checkin/", data);
};

export const AddBooking_CheckOut = async (data) => {
  console.log("my booking checkout", data);
  return await API.post("/bookings/checkout/", data);
};
