import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const COOKIE_NAME = 'admin_session';

// Function to verify the session token (simplified for this example)
// In a real app, you'd decode and validate the token more thoroughly
async function verifyAdminSession(token: string | undefined): Promise<boolean> {
  if (!token) {
    return false;
  }
  try {
    // Simple check for presence and basic structure (base64 encoded JSON)
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    const session = JSON.parse(decoded);
    return !!session.username; // Check if username exists
  } catch (error) {
    return false; // Invalid token
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(COOKIE_NAME)?.value;

  // Protect all /admin routes except /admin/login
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const isAuthenticated = await verifyAdminSession(sessionToken);
    if (!isAuthenticated) {
      // If not authenticated, redirect to the login page
      const loginUrl = new URL('/admin/login', request.url);
      // Preserve search params if any, e.g., for a `redirect_url`
      loginUrl.search = request.nextUrl.search;
      return NextResponse.redirect(loginUrl);
    }
  }

  // Allow the request to proceed if authenticated or not an admin route
  return NextResponse.next();
}

// Specify which paths the middleware should run on
export const config = {
  matcher: ['/admin/:path*', '/admin'],
}; 