import axios from "axios";

const instance = axios.create({
  baseURL: "https://movieapi.cyberlearn.vn/api",
});

export default instance;
