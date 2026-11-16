import { NextRequest, NextResponse } from 'next/server';
import { DEFAULT_LOCALE, hasLocalePrefix } from '@/lib/locales';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Rewrite to the default locale if there is no supported locale prefix
  if (!hasLocalePrefix(pathname)) {
    return NextResponse.rewrite(
      new URL(`/${DEFAULT_LOCALE}${pathname === '/' ? '' : pathname}`, request.url)
    );
  }
}

export const config = {
  // Do not localize these paths
  matcher: ['/((?!api/send$|api|_next/static|slice-simulator|favicon.ico|public).*)'],
};
