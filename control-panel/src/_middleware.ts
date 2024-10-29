// pages/_middleware.ts
import { NextResponse, NextRequest } from 'next/server';
import { middleware as checkPermissions } from './checkPermision';

export const config = {
  matcher: ['/Dashboard/:path*'],
};

export default async function middleware(req: NextRequest) {

  const response = await checkPermissions(req);

  
  if (response) {
    return response;
  }
  return NextResponse.next();
}
