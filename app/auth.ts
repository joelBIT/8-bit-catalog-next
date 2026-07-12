import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { Resend } from "resend";
import { databaseClient } from "./_db/db";
import ResetPasswordEmail from "./_components/email/ResetPasswordEmail";

const resend = new Resend(process.env.RESEND_API_KEY as string);

export const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL, 
    database: drizzleAdapter(databaseClient, {
        provider: "pg"
    }),
    emailAndPassword: { 
        enabled: true,
        revokeSessionsOnPasswordReset: true,
        minPasswordLength: 8,
        sendResetPassword: async ({ user, url, token }, request) => {
            // Send the reset link (url) to the user's email
            await resend.emails.send({
                from: '8bit <onboarding@joel-rollny.eu>',
                to: user.email,
                subject: 'Password Reset',
                react: ResetPasswordEmail(url, user.email, token),
            });
        }
    },
    socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }
    },
    session: {
        expiresIn: 60 * 60 * 24 * 7,        // 7 days
        updateAge: 60 * 60 * 24             // 1 day (every 1 day the session expiration is updated)
    },
    plugins: [
        nextCookies()       // make sure this is the last plugin in the array
    ]
});