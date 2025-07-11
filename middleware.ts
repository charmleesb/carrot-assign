// middleware.ts
import { NextRequest, NextResponse } from "next/server"
import getSession from "./lib/session"

interface Routes {
  [key: string]: boolean
}

const publicOnlyUrls: Routes = {
  "/log-in": true,
  "/create-account": true,
}

export function middleware(request: NextRequest) {
  const cookie = request.cookies.get("delicious-carrot")?.value
  const isPublicPage = publicOnlyUrls[request.nextUrl.pathname];
  
  if (!cookie && !isPublicPage) {
    // 로그인 안 했고 보호된 경로면 → 로그인 페이지로 리다이렉트
    return NextResponse.redirect(new URL("/log-in", request.url));
  }
  // 로그인된 유저가 public 페이지에 접근 시 홈으로 리디렉션
  if (cookie && isPublicPage) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}