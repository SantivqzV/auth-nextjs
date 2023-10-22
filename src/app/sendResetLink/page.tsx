"use client";

import axios from "axios";
import Link from "next/link";
import React, {useEffect, useState} from "react";

export default function sendResetLinkPage(){
    const [email, setEmail] = useState("");
    const [sent, setSent] = useState(false);
    const [error, setError] = useState(false);

    const sendResetLink = async () => {
        try {
            await axios.post('api/users/sendResetLink', {email})
        } catch (error: any) {
            setError(true);
            console.log(error.response.data);
        }
    }

    return (
        <div>
            <h1>Send Reset Link</h1>
            <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
            <button onClick={sendResetLink}>Send Reset Link</button>
            {sent && <p>Reset link sent</p>}
            {error && <p>Error</p>}
            <Link href="/login">Login</Link>
        </div>
    )
}