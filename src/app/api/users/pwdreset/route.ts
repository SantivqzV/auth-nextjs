import {connect} from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {token, password} = reqBody
        console.log(reqBody);

        const user = await User.findOne({resetToken: token, resetTokenExpiry: {$gt: Date.now()}});
        console.log(user)

        if (!user){
            return NextResponse.json({error: "Invalid token"}, {status: 400})
        }

        //Hash Password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        user.password = hashedPassword;
        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({
            message: "Password reset successfully",
            success: true
        })

    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}