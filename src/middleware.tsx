import { NextRequest, NextResponse } from 'next/server';
import { DEFAULT_LOCALE, shouldLocalize } from '@/lib/locales';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Rewrite to the default locale if there is no supported locale prefix
  if (shouldLocalize(pathname)) {
    return NextResponse.rewrite(
      new URL(`/${DEFAULT_LOCALE}${pathname === '/' ? '' : pathname}`, request.url)
    );
  }
}

export const config = {
  // Do not localize these paths
  matcher: ['/((?!api|_next|slice-simulator|favicon.ico|.*\\..*).*)'],
};
