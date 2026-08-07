import axios from 'axios';

const API_BASE_URL =
  import.meta.env?.VITE_API_URL ||
  (window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
    ? "http://localhost:3000"
    : "https://chat-app-jrjq.onrender.com");

export const axiosInstance=axios.create({
    baseURL:API_BASE_URL,
    withCredentials:true
})

export const apiConnector=(method,url,bodyData,headers,params)=>{
    return axiosInstance({
        method:`${method}`,
        url:`${url}`,
        data:bodyData?bodyData:null,
        headers:headers?headers:null,
        params:params?params:null
    });
}