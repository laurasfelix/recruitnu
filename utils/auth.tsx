import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "jwt-decode";
import { API_URL } from "./constants";
import axios from "axios";

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
  if (!token) return "wildcat";
  const decodedToken = jwtDecode<CustomJwtPayload>(token);
  const user_id = decodedToken.user_id || "";

  try {
    const res = await axios.get(`${API_URL}/get_user`, {
      params:{
      user_id, 
      }
    });

    if (res.data && res.data.user && res.data.user[0]?.given_name) {
      console.log(res.data);
      return res.data.user[0].given_name;
    }
    

  } catch (error) {
    console.log("error", error);
    }


  return "wildcat";
}