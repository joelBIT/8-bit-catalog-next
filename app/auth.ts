import { betterAuth, User } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { Resend } from "resend";
import { databaseClient } from "./_db/db";
import ResetPasswordEmail from "./_components/email/ResetPasswordEmail";
import ActivationEmail from "./_components/email/ActivationEmail";
import * as verificationSchema from "./_db/schema/auth/verifications";
import * as sessionSchema from "./_db/schema/auth/sessions";
import * as accountSchema from "./_db/schema/auth/accounts";
import * as userSchema from "./_db/schema/auth/users";
import * as profileSchema from "./_db/schema/profiles";
import * as addressesSchema from "./_db/schema/addresses";
import { profilesTable } from "./_db/schema/profiles";
import { addressesTable } from "./_db/schema/addresses";
import { DEFAULT_PROFILE_IMAGE } from "./_utils/utils";
import { copyDefaultProfileImageToFolder } from "./_db/files-db";

const resend = new Resend(process.env.RESEND_API_KEY as string);

export const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL,
    database: drizzleAdapter(databaseClient, {
        provider: "pg",
        schema: {
            ...addressesSchema,
            ...profileSchema,
            ...sessionSchema,
            ...verificationSchema,
            ...userSchema,
            ...accountSchema
        },
        usePlural: true
    }),
    databaseHooks: {
        user: {
            create: {
                after: async (user, ctx) => {
                    await databaseClient.insert(profilesTable).values({
                        userId: user.id,
                        image: DEFAULT_PROFILE_IMAGE
                    });
                    await databaseClient.insert(addressesTable).values({
                        userId: user.id
                    });
                    await copyDefaultProfileImageToFolder(`${user.id}/${DEFAULT_PROFILE_IMAGE}`)
                }
            }
        }
    },
    emailAndPassword: { 
        enabled: true,
        revokeSessionsOnPasswordReset: true,
        requireEmailVerification: true,
        customSyntheticUser: ({ coreFields, additionalFields, id }) => ({
            ...coreFields,
            // Admin plugin fields (in schema order)
            role: "user", // or the configured defaultRole
            banned: false,
            banReason: null,
            banExpires: null,
            ...additionalFields,
            id
        }),
        sendResetPassword: async ({ user, url, token }: { user: User, url: string, token: string }, request: any) => {
            await resend.emails.send({
                from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM_ADDRESS}>`,
                to: user.email,
                subject: 'Password Reset',
                react: ResetPasswordEmail(url, user.email, token)
            });
        }
    },
    emailVerification: {
        sendOnSignUp: true,
        autoSignInAfterVerification: true,
        sendVerificationEmail: async ( { user, url, token }: { user: User, url: string, token: string }, request: any) => {
            await resend.emails.send({
                from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM_ADDRESS}>`,
                to: user.email,
                subject: 'Finish registration',
                react: ActivationEmail(url)
            });
        }
    },
    minPasswordLength: 8,
    session: {
        expiresIn: 60 * 60 * 24 * 7,        // 7 days
        updateAge: 60 * 60 * 24             // 1 day (every 1 day the session expiration is updated)
    },
    socialProviders: {
        google: {
            accessType: "offline",
            prompt: "select_account consent",
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }
    },
    plugins: [
        admin({
            defaultRole: "user", // role assigned to new users
            adminRoles: ["admin"], // which roles count as "admin"
        }),
        nextCookies()       // make sure this is the last plugin in the array
    ]
});