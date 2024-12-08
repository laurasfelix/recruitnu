import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "jwt-decode";
import { API_URL } from "./constants";
import axios from "axios";


const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

export interface CustomJwtPayload extends JwtPayload {
  user_id?: string;
}

export function isTokenValid() {
  const token = localStorage.getItem("token");
  console.log(token);
  if (!token) return false;

  try {
    const decodedToken = jwtDecode<CustomJwtPayload>(token);
    console.log(decodedToken);
    const currentTime = Date.now() / 1000; 
    return decodedToken.exp || 0 > currentTime; 
  } catch (e) {
    console.error("Invalid token:", e);
    return false;
  }
}

export function getUserId() {
  const token = localStorage.getItem("token");
  console.log(token);
  if (!token) return false;

  try {
    const decodedToken = jwtDecode<CustomJwtPayload>(token);
    return decodedToken.user_id || ""; 
  } catch (e) {
    console.error("Invalid token:", e);
    return false;
  }
}

export async function getName(){
  const token = localStorage.getItem("token");
  console.log("NAME and token", token);
  if (!token) return "wildcat";
  console.log("passed");
  const decodedToken = jwtDecode<CustomJwtPayload>(token);
  const user_id = decodedToken.user_id || "";
  

  try {
    const res = await axiosInstance.get(`/get_user`, {
      params:{
      user_id, 
      }
    });

    if (res.data && res.data.user) {
      console.log("NAME",res.data);
      return res.data.user.given_name;
    }
    

  } catch (error) {
    console.log("error", error);
    }


  return "wildcat";
}