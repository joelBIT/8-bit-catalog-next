import 'server-only';
import { z } from 'zod';

// Validate that these environment variables exist on startup
const schema = z.object({
    DATABASE_URL: z.string().min(1),
    SUPABASE_URL: z.url(),
    SUPABASE_KEY: z.string().min(1),
    RESEND_API_KEY: z.string().min(1),
    EMAIL_FROM_NAME: z.string().min(1),
    EMAIL_FROM_ADDRESS: z.email(),
    CONTACT_EMAIL: z.email(),
    BETTER_AUTH_URL: z.url(),
    GOOGLE_CLIENT_ID: z.string().min(1),
    GOOGLE_CLIENT_SECRET: z.string().min(1)
});

const result = schema.safeParse(process.env);

if (!result.success) {
    const problems = result.error.issues.map(issue => `  - ${issue.path.join('.')}: ${issue.message}`).join('\n');
    throw new Error(`Invalid environment variables:\n${problems}`);
}

export const env = result.data;