// import axios from "axios";

// export const BASE_URL="http://localhost:5000";

// export default axios.create({
//     baseURL: BASE_URL,
//     headers: {
//       "Content-Type": "application/json",
      
//     },
//   });


import axios from "axios";

export const BASE_URL = "http://localhost:5000";

// Get the token from localStorage
const token = localStorage.getItem("token");

export default axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",  
  },
});
