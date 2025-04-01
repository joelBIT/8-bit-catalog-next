import { NextResponse, type NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { validateSession } from './auth/session';
import { isAuthenticatedAdmin } from './app/utils/utils';

/**
 * Check if user has an active session. If not, redirect the user when trying to navigate to certain pages.
 */
export async function middleware(request: NextRequest) {
    const cookie = (await cookies()).get("session")?.value ?? null;
    if (!cookie) {
        if (request.nextUrl.pathname.startsWith('/account') || request.nextUrl.pathname.endsWith('/edit')) {
            return redirect(request, '/forbidden');     // Unauthenticated user is not allowed to navigate to account or edit games
        }
    }
    
    if (cookie) {
        const session = await validateSession(cookie);    
        if (session && (request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/register'))) {
            if (request.method === 'GET') {
                return redirect(request, '/forbidden');      // Authenticated user is not allowed to navigate to register or login pages   
            }
        }

        if (session && request.nextUrl.pathname.endsWith('/edit')) {
            const isAdmin = await isAuthenticatedAdmin();
            if (!isAdmin) {
                return redirect(request, '/forbidden');         // Only admin is allowed to navigate to edit pages
            }
        }

        if (!session && !request.nextUrl.pathname.startsWith('/login') && !request.nextUrl.pathname.startsWith('/register')) {
            return redirect(request, '/forbidden');     // Unauthenticated user is not allowed to navigate to account or edit games
        }
    }
}

export const config = {
    matcher: ['/gamedetails/:path/edit', '/account', '/login', '/register']
}

function redirect(request: NextRequest, page: string) {
    const url = request.nextUrl.clone();
    url.pathname = page;
    return NextResponse.redirect(url);
}