import { NextRequest, NextResponse } from "next/server";

export const middleware = async (req: NextRequest) => {
  const permissionsString = req.cookies.get('permissions')?.value;  
  console.log('Permissions string:', permissionsString); 
  const permissions = permissionsString ? JSON.parse(permissionsString) : [];
  console.log('Parsed permissions:', permissions); 
  const requiredPermission = 'nnnn';

  if (!permissions.includes(requiredPermission)) {
    console.log('Redirecting to unauthorized page');
    return NextResponse.redirect(new URL('/unauthorized', req.url));
  }

  return null;
};