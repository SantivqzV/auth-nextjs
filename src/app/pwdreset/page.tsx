"use client";

import axios from "axios";
import Link from "next/link";
import React, {useEffect, useState} from "react";

export default function PwdResetPage(){
    const [token, setToken] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setloading] = useState(false);
    const [error, setError] = useState(false);

    const resetPwd = async () => {
        try {
            await axios.post('/api/users/pwdreset', {token, password})
            setloading(true);    

        } catch (error:any) {
            setError(true);
            console.log(error.response.data);
        }
        finally{
            setloading(false);
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, [])

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? "Processing" : "Reset Password"}</h1>
            <hr /> 
            <input className = "p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-blue-500" type="password" placeholder="New Password" onChange={(e) => setPassword(e.target.value)}/>
            <button onClick={resetPwd}>ResetPwd</button>
            <Link href="/login">Login</Link>
        </div>
    )
}
