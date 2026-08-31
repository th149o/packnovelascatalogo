import { NextRequest, NextResponse } from "next/server";
import { AUTH_COOKIE_NAME, AUTH_SESSION_VALUE, validateCredentials } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    const isValid = validateCredentials(username, password);

    if (!isValid) {
      return NextResponse.json(
        { success: false, error: "Usuário ou senha incorretos." },
        { status: 401 }
      );
    }

    const response = NextResponse.json({ success: true });

    // Define o cookie de sessão seguro
    response.cookies.set({
      name: AUTH_COOKIE_NAME,
      value: AUTH_SESSION_VALUE,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 dias
    });

    return response;
  } catch {
    return NextResponse.json(
      { success: false, error: "Ocorreu um erro ao processar o login." },
      { status: 500 }
    );
  }
}

