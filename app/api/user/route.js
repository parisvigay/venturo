import User from "@/models/users"
import dbConnect from "@/config/database"
import { NextResponse } from "next/server"

export async function POST(req) {
    try {
        await dbConnect()
        // Check whether user exists
        const userReq = await req.json()
        const user = await User.findOne({ email: userReq.email })
        
        // If so, return data
        if (user) return NextResponse.json({ status: 200, data: user })
        
        // If not, create new user
        const newUser = new User(userReq)
        await newUser.save()
        return NextResponse.json({ status: 200, created: newUser })

    } catch (error) {
        return NextResponse.json({ status: 400, error: error })
    }
}

export async function PUT(req) {
    try {
        await dbConnect()
        const userReq = await req.json()
        // console.log(`Updated Object ${JSON.stringify(userReq)}`)
        const user = await User.findOneAndUpdate({ email: userReq.email },{location: userReq.locationObject})
        
        return NextResponse.json({ status: 200, data: user })

    } catch (error) {
        return NextResponse.json({ status: 400, error: error })
    }
}