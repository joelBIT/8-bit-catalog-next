import { NextResponse, type NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { validateSession } from './auth/session';
import { isAuthenticatedAdmin } from './app/_session/utils';
import { URL_DASHBOARD_PAGE, URL_FILTERS_PAGE, URL_FORBIDDEN_PAGE, URL_GAME_DETAILS_PAGE, URL_LOGIN_PAGE, URL_REGISTER_PAGE } from './utils/utils';

/**
 * Check if user has an active session. If not, redirect the user when trying to navigate to certain pages.
 */
export async function middleware(request: NextRequest) {
    const cookie = (await cookies()).get("session")?.value ?? null;
    if (!cookie) {
        if (request.nextUrl.pathname.startsWith(URL_DASHBOARD_PAGE) || request.nextUrl.pathname.endsWith('/edit')) {
            return redirect(request, URL_FORBIDDEN_PAGE);     // Unauthenticated user is not allowed to navigate to account or edit games
        }
    }
    
    if (cookie) {
        const session = await validateSession(cookie);
        if (session) {      // User is authenticated
            if ((request.nextUrl.pathname.startsWith(URL_LOGIN_PAGE) || request.nextUrl.pathname.startsWith(URL_REGISTER_PAGE))) {
                if (request.method === 'GET') {
                    return redirect(request, URL_FORBIDDEN_PAGE);      // Authenticated user is not allowed to navigate to register or login pages   
                }
            }
    
            if (request.nextUrl.pathname.endsWith('/edit') || request.nextUrl.pathname.startsWith(URL_FILTERS_PAGE)) {
                const isAdmin = await isAuthenticatedAdmin();
                if (!isAdmin) {
                    return redirect(request, URL_FORBIDDEN_PAGE);         // Only admin is allowed to navigate to edit pages
                }
            }
        } else {
            if (!request.nextUrl.pathname.startsWith(URL_LOGIN_PAGE) && !request.nextUrl.pathname.startsWith(URL_REGISTER_PAGE)) {
                return redirect(request, URL_FORBIDDEN_PAGE);     // Unauthenticated user is not allowed to navigate to account or edit games
            }
        }
    }
}

export const config = {
    matcher: [`${URL_GAME_DETAILS_PAGE}/:path/edit`, URL_DASHBOARD_PAGE, `${URL_DASHBOARD_PAGE}/:path`, URL_LOGIN_PAGE, URL_REGISTER_PAGE]
}

function redirect(request: NextRequest, page: string) {
    const url = request.nextUrl.clone();
    url.pathname = page;
    return NextResponse.redirect(url);
}