import axios from "axios";
const baseURL = "https://apis.booncontracting.com/api";
const axiosInstance = axios.create({
  baseURL,
});
axiosInstance.interceptors.request.use(async (req) => {
  try {
    let boonAdmin = false;
    // console.log(localStorage.getItem("boonAdmin"));
    if (localStorage.getItem("boonAdmin")) {
      boonAdmin = JSON.parse(localStorage.getItem("boonAdmin"));
    }
    if (boonAdmin) {
      req.headers["x-access-token"] = `${boonAdmin?.data}`;
      req.headers["Content-Type"] = "application/json";
    }
  } catch (error) {
    console.log(error, "in instance error");
  }
  return req;
});

export default axiosInstance;
