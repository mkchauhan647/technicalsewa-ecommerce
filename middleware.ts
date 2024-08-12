import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const id = url.searchParams.get('id');

  if (id) {
    const response = NextResponse.next();
    response.headers.set('x-product-id', id);

    url.searchParams.delete('id');

    // const cleanUrl = url.pathname + (url.search ? '?' + url.searchParams.toString() : '');

    // console.log('Redirecting to:', cleanUrl);

      // return NextResponse.redirect(cleanUrl);
      return NextResponse.rewrite(url, response);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}