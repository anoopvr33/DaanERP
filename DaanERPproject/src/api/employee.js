import { API } from "../utils/axios";

export const CreateEmployeeAPI = async (form) => {
  return await API.post("/main/create_user/", form);
};

export const DeleteEmployeeAPI = async (_id) => {
  return await API.post("/main/delete_user/", { id: _id });
};

export const GetEmployeeAPI = async () => {
  return await API.get("/main/show_user/");
};
