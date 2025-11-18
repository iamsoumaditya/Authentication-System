import { connect } from "@/dbconfig/dbConfig"
import User from "@/models/userModel.js"
import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { sendEmail } from "@/helpers/mailer"


connect()

export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json()
        const { username, email, password } = reqBody

        const user = await User.findOne({ email })

        if (user) {
            return NextResponse.json({error:"User already exists"},{status:400})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        const saveduser = await newUser.save()

        
        try {
            await sendEmail({ username, email, emailType: "VERIFY", userId: saveduser._id })
        } catch (error:any) {
            await User.deleteOne({ _id: saveduser._id })
            console.log("Error occurred user deleted successfully",error.message)
            throw new Error(error.message)
        }
        
        return NextResponse.json({
            message: "User created successfully",
            success: true,
            saveduser
        })
    } catch (error: any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}