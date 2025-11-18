import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath =
    path === "/login" ||
    path === "/signup" ||
    path === "/resetpassword" ||
    path === "/forgetpassword";

  const isPrivatePath = path === "/profile/:path*" || path === "/profile";

  const token = request.cookies.get("token")?.value || "";
  if (isPublicPath && token) {
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as {
      username: string;
    };

    return NextResponse.redirect(
      new URL(`/profile/${decodedToken?.username}`, request.nextUrl)
    );
  }
  if (isPrivatePath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

export const config = {
  matcher: [
    "/",
    "/profile",
    "/login",
    "/signup",
    "/profile/:path*",
    "/forgotpassword",
    "/resetpassword",
    "/forgetpassword",
  ],
};
