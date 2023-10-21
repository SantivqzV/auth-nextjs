"use client";
import axios from "axios";
import Link from "next/link";
import {toast} from "react-hot-toast";
import React, {useState} from "react";
import {useRouter} from "next/navigation";

export default function ProfilePage() {
    const router = useRouter();
    const [data, setData] = useState("nothing")
    const logout = async () => {
        try {
            await axios.get("/api/users/logout");
            toast.success("Logout success");
            router.push("/login");
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message);
        }
    }

    const getUserDetails = async () => {
        const res = await axios.get('/api/users/me');
        console.log(res.data);
        setData(res.data.data._id);
    }

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p>Profile page</p>
            <h2 className="p-3 rounded bg-green-800">{data === "nothing" ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
            <hr />
            <button onClick={logout}
            className="p-2 border border-gray-300 mt-4 rounded-lg mb-4 focus:outline-none focus:border-blue-500">
                Logout
            </button>

            <button onClick={getUserDetails}
            className="p-2 border border-gray-300 mt-4 rounded-lg mb-4 focus:outline-none focus:border-blue-500">
                User Details
            </button>
        </div>
    )
}