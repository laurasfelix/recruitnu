"use client";
import React from 'react';
import { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import { isTokenValid, getName, getUserId } from "../utils/auth";
import { API_URL } from "../utils/constants";



export default function Home() {

  interface Job {
    user_id: string;
    location: string;
    job_type: string;
    job_id: string;
    description: string;
    job_link: string;
    job_image: string;
    company_name: string;
  
  }

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("wildcat");
  const [userId, setUserId] = useState("");
  const [outList, setOutList] = useState<Job[]>([]);
  const [token, setToken] = useState("invalid");
  const router = useRouter();



  useEffect(() => {
    console.log("setting token");
    const savedToken = localStorage.getItem("token");
    setToken(savedToken || "invalid");
    console.log("token=", token);
  }, [token]);

  const handleBack = () => {
    localStorage.clear();
    router.push("/welcome");
  };

  const handleAccept = async (job_id: string, user_id: string) => {

      try {
        console.log("TOKEN", token);
        console.log("user_id:", user_id);
        console.log("new user_id:", userId);
        const res = await axios.put(`${API_URL}/apply_job`, {
          user_id: user_id, 
          job_id: job_id,
        }, {
          headers: {
            "Authorization": `${token}`,
          }});
   
        console.log(res.data); 
  
        if (res.data) {
          console.log("worked");
          router.reload();
        } else {
          console.error("No token received");
        
  
        }
  
      } catch (error) {
  
         console.log(error);
          
        }
    };

  const goToRequest = () => {
    router.push("/request");
  };

  // Authorization: `${token}`
  const getOutjobs = async () => {

    try {
      console.log("TOKEN", token)
      const res = await axios.get(`${API_URL}/get_jobs_field`, { params: { user_id: userId },
        headers: {
          "Authorization": `${token}`,
        }});
 
      console.log(res.data); 

      if (res.data.outjobs) {
        setOutList(res.data.outjobs);
      } else {
        console.error("No token received");
      

      }

    } catch (error) {

       console.log(error);
        
      }
  };


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
          await getOutjobs();
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

        <div className="profile-button-container">
          <button className="profile-button" onClick={() => router.push(`/profile`)}>
            {`${username}'s profile`}
          </button>
        </div>

        <div className="title">

        <div></div>

          <div className="welcome">
              
              <div>

                <p className="first-phrases text-2xl hover:text-3xl shared-hover-effect">
                  welcome to recruitNU, <span className="username-welcome"> {username} </span>
                </p>

                <p className="second-phrases text-xl ">
                northwestern&apos;s recruiting endpoint
                </p>

                
              </div>
          </div>

          <div className="right-column">

            <div className="add-jobs">

              <button className="button-add flex items-center gap-2" onClick={goToRequest}>

                <Image
                  aria-hidden
                  src="/plus.svg"
                  alt="plus icon"
                  width={40}
                  height={40}
                /> 

                <span className="request-text">add a job</span>

              </button>

            </div>
          </div>

        </div>



        <div className="boards">

          <div className="outboard-text text-lg hover:text-xl shared-hover-effect">

            <p>
              jobs in your field
            </p>

            <div className="outboard">

              {outList.map((item, index)=>{
             {
                return (
                  <div className="job-icon-wrapper">
                    <div key={index} className="job-icon">
            
                        <Image
                          aria-hidden
                          src={`/${item.job_image}.svg`}
                          alt={`/${item.company_name} logo`}
                          width={32}
                          height={32}
                        />
                
                      <div className="infobox">
                        <p> company_name: {item.company_name} </p>
                        <p> location: {item.location} </p>
                        <p> type: {item.job_type} </p>
                      </div>

                      <div className="accept" onClick={() => handleAccept(item.job_id, item.user_id)}>

                        <p> apply </p>

                      </div>

                    </div>
                  </div>
                );
              }}
              
              )}



            </div>

          </div>


        </div>




      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://www.northwestern.edu/careers/jobs-internships/"
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
          href="https://www.northwestern.edu/careers/"
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
        <p
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          onClick={handleBack}
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
