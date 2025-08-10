import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  const authPages = ['/login', '/signup'];
  const lpPages = ['/'];

  // ログイン済みユーザーがLPページ, login, signupページにアクセスした場合
  if (
    token &&
    (lpPages.includes(request.nextUrl.pathname) || authPages.includes(request.nextUrl.pathname))
  ) {
    return NextResponse.redirect(new URL('/entries', request.url));
  }

  return NextResponse.next();
}

export const config = {
  /**
   * 以下から始まるリクエストパスを除くすべてのパスにマッチ:
   * - /api(APIルート)
   * - /_next/static(Next.jsの静的ファイル)
   * - /_next/image(Next.jsの画像最適化)
   * - /favicon.ico, sitemap.xml, robots.txt(メタデータファイル)
   *
   * これらのパスはミドルウェアの対象外となり、ユーザーがアクセスできるようになる。
   */
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
};
