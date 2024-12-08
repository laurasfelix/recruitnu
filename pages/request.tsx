"use client"
import React from 'react';

import {useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { getUserId } from "../utils/auth";


export default function Request() {


    const [userId, setUserId] = useState('');
    const [availability, setAvailability] = useState('');
    const [location, setLocation] = useState('');
    const [materialType, setMaterialType] = useState('');
    const [requestType, setRequestType] = useState('');
    const [quantity, setQuantity] = useState('');
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
          const res = await axios.post(`${API_URL}/add_material`, {
            request_type: requestType,
            material_type: materialType,
            user_id: userId,
            location,
            availability,
            quantity,
          },  {
            headers: {
              "Content-Type": "application/json",
            }});
     
          console.log(res.data); 

          if (res.data.material_type) {
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

                        <label htmlFor="requestType" style={{ display: "block", marginBottom: "5px" }}>
                                are you looking for a material or giving away one?
                        </label>

                        <select className="select" value={requestType} name="requestType" onChange={(ev) => setRequestType(ev.target.value)}>
                           <option value="" disabled>select an option</option>
                            <option value="in">looking for</option>
                            <option value="out">giving away</option>
                        </select>

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

                        <label htmlFor="materialType" style={{ display: "block", marginBottom: "5px" }}>
                                what type of material is it?
                        </label>

                        <select className="select" value={materialType} name="materialType" onChange={(ev) => setMaterialType(ev.target.value)}>
                        <option value="" disabled>select an option</option>
                            <option value="wood">wood</option>
                            <option value="metal">metal</option>
                            <option value="plywood">plywood</option>
                            <option value="aluminum">aluminum</option>
                            <option value="sheet_metal">sheet metal</option>
                            <option value="acrylic">acrylic</option>
                            <option value="foam_core">foam core</option>
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
                            placeholder="Technological Institute"
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
                                what&apos;s the quantity/weight?
                        </label>

                            <input
                            type="name"
                            value={quantity}
                            placeholder="10 kg"
                            onChange={(ev) => setQuantity(ev.target.value)}
                            className={'inputBoxNew'}
                            size={Math.max(quantity.length, "Technological Institute".length)}
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
                        {quantity != "" && <button
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

                        <label htmlFor="availability" style={{ display: "block", marginBottom: "5px" }}>
                        how soon is it available?
                        </label>

                        <select className="select" name="availability" value={availability} onChange={(ev) => setAvailability(ev.target.value)}>
                            <option value="" disabled>select an option</option>
                            <option value="0">now</option>
                            <option value="1">tomorrow</option>
                            <option value="2">this week</option>
                            <option value="3">next week</option>
                            <option value="4">next month</option>
                            <option value="4">next quarter</option>
                        </select>

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