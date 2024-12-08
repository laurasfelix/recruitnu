"use client";
import React from 'react';
import { useRouter } from "next/router";
import {useState } from "react";
import axios from "axios";
import { API_URL } from "../utils/constants";

export default function Register(){
    

    const [email, setEmail] = useState('');
    const [givenName, setGivenName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();

    const handleBack = () => {
        router.push("/welcome");
    };

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        try {
          const res = await axios.post(`${API_URL}/add_user`, {
            given_name: givenName,
            last_name: lastName,
            phone_number: phoneNumber,
            email,
            password,
          },  {
            headers: {
              "Content-Type": "application/json",
            }});
     
          console.log(res.data); 

          if (res.data.token) {
            localStorage.setItem("token", res.data.token);
            console.log("Token stored in localStorage:", res.data.token);
            router.push("/");
          } else {
            console.error("No token received");
            setErrorMessage("No token received. Please try again."); 
            setTimeout(() => router.reload(), 3000);
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

                <form onSubmit={handleRegister} className="form-request">

                    <div className="inputContainer">

                        <label htmlFor="givenName" style={{ display: "block", marginBottom: "5px" }}>
                                given name:
                        </label>

                            <input
                            type="name"
                            value={givenName}
                            placeholder="John"
                            onChange={(ev) => setGivenName(ev.target.value)}
                            className={'inputBox'}
                            size={Math.max(givenName.length, "johnevans1851@u.northwestern.edu".length)}
                            />

                

                    </div>

                    <div className="inputContainer">

                        <label htmlFor="lastName" style={{ display: "block", marginBottom: "5px" }}>
                                last name:
                        </label>

                            <input
                            type="name"
                            value={lastName}
                            placeholder="Evans"
                            onChange={(ev) => setLastName(ev.target.value)}
                            className={'inputBox'}
                            size={Math.max(lastName.length, "johnevans1851@u.northwestern.edu".length)}
                            />

                

                    </div>

                    <div className="inputContainer">

                        <label htmlFor="email" style={{ display: "block", marginBottom: "5px" }}>
                                email:
                        </label>

                            <input
                            type="email"
                            value={email}
                            placeholder="johnevans1851@u.northwestern.edu"
                            onChange={(ev) => setEmail(ev.target.value)}
                            className={'inputBox'}
                            size={Math.max(email.length, "johnevans1851@u.northwestern.edu".length)}
                            />

                

                    </div>

                    <div className="inputContainer">

                        <label htmlFor="phoneNumber" style={{ display: "block", marginBottom: "5px" }}>
                        phone number:
                        </label>

                            <input
                            type="phonenumber"
                            value={phoneNumber}
                            placeholder="(847) 491-374"                            
                            onChange={(ev) => setPhoneNumber(ev.target.value)}
                            className={'inputBox'}
                            size={Math.max(phoneNumber.length, "johnevans1851@u.northwestern.edu".length)}
                            />

                

                    </div>

                    <div className="inputContainer">

                        <label htmlFor="password" style={{ display: "block", marginBottom: "5px" }}>
                                password:
                        </label>

                        <input
                            type="password"
                            value={password}
                            placeholder="williethewildcat"
                            onChange={(ev) => setPassword(ev.target.value)}
                            className={'inputBox'}
                            size={Math.max(password.length, "johnevans1854@u.northwestern.edu".length)}
                        />

                

                    </div>

                    <div className={'inputContainer'}>
                        <button type="submit">
                            <p className="hover:text-lg hover:bg-purple-700">
                            register!
                            </p>
                         
                            </button>
                    </div>
                
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