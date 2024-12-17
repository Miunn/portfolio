import { NextResponse, type NextRequest } from 'next/server'
import { tokenValidation } from './lib/auth'
 
export const config = {
  matcher: '/login',
}
 
export async function middleware(request: NextRequest) {
  
  const token = request.cookies.get('jwt_session');

  if (!token) {
    console.log("No token, should not redirect");
      return NextResponse.next({
        request: request
      });
  }

  const validToken = await tokenValidation(token.value);

  if (validToken) {
    return NextResponse.redirect(new URL('/resources', request.url))
  }

  console.log("Token invalid, should not redirect");
  return NextResponse.next({
    request: request
  })
}