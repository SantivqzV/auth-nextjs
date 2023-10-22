"use client";
import Link from "next/link";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function ResetpwdPage(){
    const router = useRouter();
    const [token, setToken] = useState("");
    const [password, setPassword] = useState("");

    const onReset = async ()=> {
        try {
            const response = await axios.post("/api/users/reset", {token, password});
            console.log("Reset Success", response.data);
            router.push("/login");
        }
        catch (error:any) {
            console.log("Reset Failed", error.message);
            toast.error(error.message);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <label htmlFor="password">password</label>
            <input className="p-2 border bodrder-gray-300 rounded-lg mb-4 focus:outline-none focus:border-blue-500" 
            id="password" 
            type="password" 
            value={password} 
            onChange={(e)=> setPassword(e.target.value)}
            placeholder="password"
            />
            <button onClick={onReset} className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-blue-500">Reset</button>
        </div>
    )
}