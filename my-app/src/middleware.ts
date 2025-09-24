import { NextResponse, NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const token = await getToken({req:request})
  if(token?.accessToken){
    NextResponse.next();
  }else{
    const loginUrl=new URL('/auth/login',request.url);
    loginUrl.searchParams.set('callbackUrl',request.nextUrl.pathname+request.nextUrl.search)
  return NextResponse.redirect(loginUrl);
  }
}
 
export const config = {
  matcher: '/cart',
}