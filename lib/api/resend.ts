"use server";
import type {Email} from "@/lib/types/email";

import {Resend} from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function SendEmail(data: Email) {
    return resend.emails.send({
        from: "onboarding@resend.dev",
        to: "richardrojo61@gmail.com",
        subject: data.subject,
        html: `<h1><span> From: </span> ${data.email}</h1><p>${data.message}</p>`, 
    })  
}
