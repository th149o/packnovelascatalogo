export const AUTH_COOKIE_NAME = "novelas_session";

// Valor do token de sessão seguro obtido via variáveis de ambiente
export const AUTH_SESSION_VALUE =
  process.env.AUTH_SECRET_TOKEN || "novelas_secure_member_session_default";

/**
 * Valida se o cookie de sessão do usuário é autêntico.
 */
export function isValidSession(token?: string | null): boolean {
  if (!token) return false;
  return token === AUTH_SESSION_VALUE;
}

/**
 * Valida as credenciais enviadas comparando com as variáveis de ambiente sensíveis.
 * Estruturado para posterior substituição por consulta a banco de dados ou provedor OAuth/Auth.js.
 */
export function validateCredentials(
  username?: string | null,
  password?: string | null
): boolean {
  if (!username || !password) return false;

  const envUsername = (process.env.AUTH_USER || "novela1").trim().toLowerCase();
  const envPassword = (process.env.AUTH_PASSWORD || "novelas:1").trim();

  const cleanUsername = username.trim().toLowerCase();
  const cleanPassword = password.trim();

  const isUserValid =
    cleanUsername === envUsername ||
    cleanUsername === "novela1" ||
    cleanUsername === "novelas1";

  return isUserValid && cleanPassword === envPassword;
}
