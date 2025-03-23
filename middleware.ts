import { NextResponse, type NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { validateSession } from './auth/session';

/**
 * Check if user has an active session. If not, redirect the user when trying to navigate to certain pages.
 */
export async function middleware(request: NextRequest) {
    const cookie = (await cookies()).get("session")?.value ?? null;
    if (!cookie) {
        const url = request.nextUrl.clone();
        url.pathname = '/login';
        return NextResponse.redirect(url);
    }
      
    const session = await validateSession(cookie);
    if (!session) {
        const url = request.nextUrl.clone();
        url.pathname = '/login';
        return NextResponse.redirect(url);
    }
}

export const config = {
    matcher: ['/gamedetails/:path/edit', '/account']
}