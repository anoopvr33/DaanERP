import axios from "axios";

export const API = axios.create({
  baseURL: "https://512fe7c16d15.ngrok-free.app",
  headers: {
    "Content-Type": "application/json",
  },
});
