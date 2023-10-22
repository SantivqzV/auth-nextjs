import {connect} from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";	
import bcryptjs from "bcryptjs";
import User from "@/models/userModel";

connect()

export async function POST(request: NextRequest){

    try {
        const reqBody = await request.json()
        const {token, password} = reqBody
        console.log(token);

        const user = await User.findOne({resetToken: token, resetTokenExpiry: {$gt: Date.now()}});

        if (!user) {
            return NextResponse.json({error: "Invalid token"}, {status: 400})
        }
        
        //Hash Password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        user.password = hashedPassword;
        await user.save();

        return NextResponse.json({
            message: "Password reset successfully",
            success: true
        })


    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }

}