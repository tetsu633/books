import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });

  // ログイン済みユーザーがLPページにアクセスした場合
  if (token && request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/entries', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/'],
};
