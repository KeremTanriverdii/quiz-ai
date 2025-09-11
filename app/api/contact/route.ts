import { NextRequest, NextResponse } from "next/server";
import nodemailer from 'nodemailer'

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { fName, lName, email, Message } = body;

    // It's a good practice to validate the input here

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER, // Your Gmail address
            pass: process.env.EMAIL_PASS, // Your Gmail app password
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER, // Your Gmail address
        to: 'ahmetk.tanriverdi@gmail.com', // The address you want to send to
        replyTo: email,
        subject: `New Form Message: ${fName} ${lName}`,
        html: `<p>Name: ${fName} ${lName}</p><p>Email: ${email}</p><p>Message: ${Message}</p>`,
    };

    try {
        await transporter.sendMail(mailOptions);
        return NextResponse.json({ status: 200, message: 'Message sent successfully' });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ status: 500, message: 'Error sending message' });
    }
}
