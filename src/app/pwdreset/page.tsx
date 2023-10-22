"use client";

import axios from "axios";
import Link from "next/link";
import React, {useEffect, useState} from "react";

export default function PwdResetPage(){
    const [token, setToken] = useState("");
    const [password, setPassword] = useState("");
    const [reset, setReset] = useState(false);
    const [error, setError] = useState(false);

    const resetPwd = async () => {
        try {
            await axios.post('/api/users/pwdreset', {token, password})
            setReset(true);    

        } catch (error:any) {
            setError(true);
            console.log(error.response.data);
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, [])

    return(
        <div>
            <h1>ResetPwd</h1>
            <input type="password" placeholder="New Password" onChange={(e) => setPassword(e.target.value)}/>
            <button onClick={resetPwd}>ResetPwd</button>
            <Link href="/login">Login</Link>
        </div>
    )
}
