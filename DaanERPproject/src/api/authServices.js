import { API } from "../utils/axios";

export const LoginAPI = async (form) => {
  return await API.post("/main/admin_login/", form);
};
