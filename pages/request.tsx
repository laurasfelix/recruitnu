"use client"
import React from 'react';

import {useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { getUserId } from "../utils/auth";

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });


export default function Request() {


    const [userId, setUserId] = useState('');
    const [jobLink, setJobLink] = useState('');
    const [location, setLocation] = useState('');
    const [jobType, setjobType] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [description, setDescription] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [transitionState, setTransitionState] = useState("active");
    const router = useRouter();

    const [questionCounter, setQuestionCounter] = useState(0);

    const handleBack = () => {
        router.push("/");
    };

    const handlePrevious = () =>{
        setTransitionState("exit");
        setTimeout(() => {
        setQuestionCounter(questionCounter - 1);
        setTransitionState("active");
        }, 300);
    };

    const handleNext = () =>{
        setTransitionState("exit");
        setTimeout(() => {
        setQuestionCounter(questionCounter + 1);
        setTransitionState("active");
        }, 300);
    };

    useEffect(() => {
        const fetchData = async () => {
          const user = getUserId();
          if (user) {
            setUserId(user);
          } else {
            setErrorMessage("Something went wrong! Please try again."); 
            setTimeout(() => router.reload(), 3000);
          }
        };
      
        fetchData(); 
      }, [router]);

    

    const handleRequest = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        try {
          const res = await axiosInstance.post(`/add_job`, {
            job_type: jobType,
            user_id: userId,
            location,
            description,
            job_link: jobLink,
            company_name: companyName, 
          },  {
            headers: {
              "Content-Type": "application/json",
            }});
     
          console.log(res.data); 

          if (res.data.job_type) {
            console.log("worked")
            router.push("/");
          } else {
            console.error("did not work");
            setErrorMessage("Something went wrong! Please try again."); 
        
          }

        } catch (error) {
            if (axios.isAxiosError(error)) {
                const backendError = error.response?.data?.error || "An unexpected error occurred";
                setErrorMessage(backendError);
              
            } else {
             
                setErrorMessage("An unexpected error occurred");
             
            }

            setTimeout(() => router.reload(), 3000);
          }
      };
    

    return (

        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-10 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center">
            {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message */}

                <form onSubmit={handleRequest} className="form">

                    {questionCounter == 0 && <div className={`inputNew ${transitionState}`}>

                        <label htmlFor="companyName" style={{ display: "block", marginBottom: "5px" }}>
                                what&apos;s the company&apos;s name?
                        </label>

                        <input
                            type="name"
                            value={companyName}
                            placeholder="Google"
                            onChange={(ev) => setCompanyName(ev.target.value)}
                            className={'inputBoxNew'}
                            size={Math.max(location.length, "Technological Institute".length)}
                        />

                        <div className="first-button">

                            <div>

                            </div>

                            <div>
                                <button
                                 type="button"
                                    onClick={handleNext}
                                    className=" hover:underline hover:underline-offset-4"
                                    >
                                    → next
                                </button>

                            </div>

                        </div>

                    </div>}

                    {questionCounter == 1 && <div className={`inputNew ${transitionState}`}>

                        <label htmlFor="jobType" style={{ display: "block", marginBottom: "5px" }}>
                                what type of job is it?
                        </label>

                        <select className="select" value={jobType} name="jobType" onChange={(ev) => setjobType(ev.target.value)}>
                        <option value="" disabled>select an option</option>
                            <option value="new grad">new grad</option>
                            <option value="internship">internship</option>
                            <option value="externship">externship</option>
                        </select>

                        <div className="normal-button">
                    

                            <div>

                                <button
                                 type="button"
                                        onClick={handlePrevious}
                                        className=" hover:underline hover:underline-offset-4"
                                        >
                                        ← back
                                </button>

                            </div>

                            <div>

                            </div>

                            <div>
                                <button
                                 type="button"
                                    onClick={handleNext}
                                    className=" hover:underline hover:underline-offset-4"
                                    >
                                    → next
                                </button>

                            </div>

                        </div>


                    </div>}

                    {questionCounter == 2 && <div className={`inputNew ${transitionState}`}>

                        <label htmlFor="location" style={{ display: "block", marginBottom: "5px" }}>
                                where is it located?
                        </label>

                            <input
                            type="name"
                            value={location}
                            placeholder="Pasadena, CA"
                            onChange={(ev) => setLocation(ev.target.value)}
                            className={'inputBoxNew'}
                            size={Math.max(location.length, "Technological Institute".length)}
                            />

                    <div className="normal-button">
                    

                    <div>

                        <button
                                onClick={handlePrevious}
                                type="button"
                                className=" hover:underline hover:underline-offset-4"
                                >
                                ← back
                        </button>

                    </div>

                    <div>

                    </div>

                    <div>
                        {location != "" && <button
                            onClick={handleNext}
                            type="button"
                            className=" hover:underline hover:underline-offset-4"
                            >
                            → next
                        </button>}

                    </div>

                </div>



                    </div>}

                    {questionCounter == 3 && <div className={`inputNew ${transitionState}`}>

                        <label htmlFor="quantity" style={{ display: "block", marginBottom: "5px" }}>
                                what&apos;s the job description? feel free to paste it there
                        </label>

                            <input
                            type="name"
                            value={description}
                            placeholder="bla bla bla"
                            onChange={(ev) => setDescription(ev.target.value)}
                            className={'inputBoxNew'}
                            size={Math.max(description.length, "Technological Institute".length)}
                            />


                    <div className="normal-button">
                    

                    <div>

                        <button
                                onClick={handlePrevious}
                                type="button"
                                className=" hover:underline hover:underline-offset-4"
                                >
                                ← back
                        </button>

                    </div>

                    <div>

                    </div>

                    <div>
                        {description != "" && <button
                         type="button"
                            onClick={handleNext}
                            className=" hover:underline hover:underline-offset-4"
                            >
                            → next
                        </button>}

                    </div>

                </div>





                    </div>}

                    {questionCounter == 4 && <div className={`inputNew ${transitionState}`}>

                        <label htmlFor="jobLink" style={{ display: "block", marginBottom: "5px" }}>
                        what&apos;s the link?
                        </label>

                        <input
                            type="name"
                            value={jobLink}
                            placeholder="google.com/internship"
                            onChange={(ev) => setJobLink(ev.target.value)}
                            className={'inputBoxNew'}
                            size={Math.max(description.length, "Technological Institute".length)}
                            />


                        <div className="normal-button">
                    

                    <div>

                    <button
                                onClick={handlePrevious}
                                type="button"
                                className=" hover:underline hover:underline-offset-4"
                                >
                                ← back
                        </button>

                    </div>

                    <div>

                    </div>

                    <div>
                        <button
                            type="submit"
                            className=" hover:underline hover:underline-offset-4"
                            >
                             <p className="hover:bg-yellow-300 hover:text-black">
                            submit!
                            </p>
                        
                        </button>

                    </div>

                </div>





                    </div>}

                  

                </form>


                </main>
                <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
                <button
                onClick={handleBack}
                className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                >
                ← back
                </button>
                </footer>
        </div>
    );



}