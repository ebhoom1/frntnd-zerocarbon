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
// export const BASE_URL = "http://13.126.65.16:5000"; 
// export const BASE_URL = "https://api.esg.ebhoom.com"; 

// Get the token from localStorage
const token = localStorage.getItem("token");

export default axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",  
  },
});
