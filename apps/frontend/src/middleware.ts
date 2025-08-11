import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // チェックが必要なパスのみで実行
  if (path === '/' || path === '/login' || path === '/signup') {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

    if (token) {
      return NextResponse.redirect(new URL('/entries', request.url));
    }
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
   * - /sw.js, /workbox-*, /manifest.json(PWA関連ファイル)
   * - /icons(PWAアイコン)
   *
   * これらのパスはミドルウェアの対象外となり、ユーザーがアクセスできるようになる。
   */
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|sw.js|workbox-.*|manifest.json|icons).*)',
  ],
};
