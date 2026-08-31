import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AUTH_COOKIE_NAME, isValidSession } from "@/lib/auth";

export default function RootPage() {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get(AUTH_COOKIE_NAME);
  const isAuthenticated = isValidSession(sessionCookie?.value);

  if (isAuthenticated) {
    redirect("/catalogo");
  } else {
    redirect("/login");
  }
}
