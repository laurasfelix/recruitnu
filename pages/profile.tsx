"use client";
import React from 'react';
import { useEffect, useState } from "react";
import { isTokenValid, getName, getUserId } from "../utils/auth";
import { API_URL } from "../utils/constants";
import { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";

export default function Profile() {
    interface Material {
        user_id: string;
        availability: number;
        location: string;
        material_type: string;
        request_type: string;
        quantity: string;
      }
 const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("wildcat");
  const [userId, setUserId] = useState("");
  const [outList, setOutList] = useState<Material[]>([]);
  const [inList, setInList] = useState<Material[]>([]);
  const [doneList, setDoneList] = useState<Material[]>([]);
  const [token, setToken] = useState("invalid");
  const router = useRouter();

  useEffect(() => {
    console.log("setting token");
    const savedToken = localStorage.getItem("token");
    setToken(savedToken || "invalid");
    console.log("token=", token);
  }, [token]);

useEffect(() => {
    const fetchData = async () => {
      if (token) {
        console.log("TOKEN HERE");
        const valid = isTokenValid();
        if (valid) {
          console.log("valid!!");
          setIsLoggedIn(true);
          const user_id = getUserId();
          setUserId(user_id || "");
          const name = await getName();
          setUsername(name);
          await getMaterials();
        } else {
          console.log("NOPE");
          router.push("/welcome");
        }
        setLoading(false);
      }
    };
    console.log("trying");
    fetchData();
  }, [token]);

  const handleLogout = () => {
    localStorage.clear();
    router.push("/welcome");
  };

  const handleBack = () => {
    router.push("/");
};

  const getMaterials = async () => {

    try {
      console.log("TOKEN", token)
      const res = await axios.get(`${API_URL}/get_user_materials`, { params: { user_id: userId },
        headers: {
          "Authorization": `${token}`,
        }});
 
      console.log(res.data); 
      console.log(username, outList, inList, doneList);

      if (res.data) {
        setDoneList(res.data.done || []);
        setInList(res.data.in || []);
        setOutList(res.data.out || []);
      } else {
        console.error("No token received");
      

      }

    } catch (error) {

       console.log(error);
        
      }
  };


  if (loading) {
    return <div className="flex items-center justify-center h-screen">
         <div className="loader"></div>
      </div>
  }

  if (!isLoggedIn) {
    return null; 
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-10 font-[family-name:var(--font-geist-sans)]">

        

      <main className="flex flex-col gap-8 row-start-2 items-center">

      <h1 className="text-2xl hover:text-3xl font-bold shared-hover-effect">{username}&apos;s profile</h1>
        

        {/* Materials Sections */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
      {/* Done Materials */}
      <section className="h-[300px] overflow-y-auto border p-4 rounded-md shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-center profile-effect">Materials Accepted</h2>
        {doneList.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {doneList.map((material, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow"
              >
                 <div className='profilebox'>
                <p>Type: {material.material_type}</p>
                <p>Location: {material.location}</p>
                <p>Quantity: {material.quantity}</p>
              </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center">No accepted materials available.</p>
        )}
      </section>

      {/* In Materials */}
      <section className="h-[300px] overflow-y-auto border p-4 rounded-md  shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-center profile-effect">In Materials</h2>
        {inList.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {inList.map((material, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow"
              >
                <div className='profilebox'>
                <p>Type: {material.material_type}</p>
                <p>Location: {material.location}</p>
                <p>Quantity: {material.quantity}</p>
              </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center">No in materials available.</p>
        )}
      </section>

      {/* Out Materials */}
      <section className="h-[300px] overflow-y-auto border p-4 rounded-md  shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-center profile-effect">Out Materials</h2>
        {outList.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {outList.map((material, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow"
              >
                 <div className='profilebox'>
                <p>Type: {material.material_type}</p>
                <p>Location: {material.location}</p>
                <p>Quantity: {material.quantity}</p>
              </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center">No out materials available.</p>
        )}
      </section>
    </div>

     
      </main>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://www.northwestern.edu/sustainability/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://www.canva.com/design/DAGWyNvu2fA/K4M8egdYClcseIgjKD5XDQ/edit?utm_content=DAGWyNvu2fA&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          guides
        </a>


        <button
        onClick={handleBack}
        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        >
        ← back
        </button>

        <p
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          onClick={handleLogout}
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          logout →
        </p>

      </footer>
      </div>

  );
}