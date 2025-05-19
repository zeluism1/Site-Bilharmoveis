import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'bilharmoveis'; // Store hashed in a real app!
const COOKIE_NAME = 'admin_session';

interface SessionData {
  username: string;
  loggedInAt: number;
}

async function setSessionCookie(data: SessionData) {
  const cookieStore = await cookies();
  const sessionToken = Buffer.from(JSON.stringify(data)).toString('base64');
  cookieStore.set(COOKIE_NAME, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });
}

async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

async function getSessionData(): Promise<SessionData | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) {
    return null;
  }
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    return JSON.parse(decoded) as SessionData;
  } catch (error) {
    console.error('Error parsing session token:', error);
    return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const sessionData: SessionData = {
        username,
        loggedInAt: Date.now(),
      };
      await setSessionCookie(sessionData);
      return NextResponse.json({ success: true, message: 'Login successful' }, { status: 200 });
    } else {
      return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
    }
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ success: false, message: 'An error occurred during login' }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    await clearSessionCookie();
    return NextResponse.json({ success: true, message: 'Logout successful' }, { status: 200 });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json({ success: false, message: 'An error occurred during logout' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await getSessionData();
    if (session && session.username === ADMIN_USERNAME) {
      return NextResponse.json({ authenticated: true, user: { username: session.username } }, { status: 200 });
    } else {
      // If session is invalid or not present, clear any potentially malformed cookie
      const cookieStore = await cookies();
      if (cookieStore.get(COOKIE_NAME)?.value) {
        await clearSessionCookie();
      }
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }
  } catch (error) {
    console.error('Session check error:', error);
    return NextResponse.json({ authenticated: false, message: 'An error occurred checking session' }, { status: 500 });
  }
} 