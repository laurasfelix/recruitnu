"use client";
import React from 'react';
import { useRouter } from "next/router";


export default function Index() {

    const router = useRouter();

    const goToAuth = () => {
        router.push("/auth"); 
    };


    const goToRegister = () => {
        router.push("/register"); 
    };


    

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-10 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center">
                <div className="welcome">
                    <p className="first-phrases text-2xl hover:text-3xl shared-hover-effect">
                    welcome to recruitNU
                    </p>

                    <p className="second-phrases text-xl ">
                    northwestern&apos;s recruiting endpoint
                    </p>
                </div>


                <div className="logs">
                    <div className="login hover:text-lg" onClick={goToAuth}>
                        log in
                    </div>

                    <div className="register hover:text-lg" onClick={goToRegister}>
                        register
                    </div>
                </div>

            </main>

      
        </div>
    );

}