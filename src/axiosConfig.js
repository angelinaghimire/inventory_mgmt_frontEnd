import axios from "axios";

const instance = axios.create({
  baseURL: "http://192.168.148.94:3000",
});

export default instance;
