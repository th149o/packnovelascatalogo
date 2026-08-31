import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AUTH_COOKIE_NAME, isValidSession } from "@/lib/auth";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get(AUTH_COOKIE_NAME);
  const isAuthenticated = isValidSession(sessionCookie?.value);

  // Rota raiz "/" -> redireciona conforme autenticação
  if (pathname === "/") {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/catalogo", request.url));
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Rota "/catalogo" -> bloqueia e exige autenticação
  if (pathname.startsWith("/catalogo")) {
    if (!isAuthenticated) {
      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  // Rota "/login" -> se já autenticado, vai direto para o catálogo
  if (pathname === "/login") {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/catalogo", request.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/catalogo/:path*"],
};
