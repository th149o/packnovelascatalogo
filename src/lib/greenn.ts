/**
 * Módulo de Integração e Parsing do Webhook da Greenn
 * 
 * Este módulo lida de forma tolerante e segura com as variações
 * de estrutura do payload enviado pela plataforma Greenn.
 */

export interface ParsedGreennWebhook {
  isPaid: boolean;
  status: string;
  event: string;
  buyerEmail: string | null;
  buyerName: string | null;
  transactionId: string | null;
  rawPayload: Record<string, unknown>;
}

// Lista de termos que indicam status de venda aprovada/paga
const PAID_STATUSES = new Set([
  "paid",
  "pago",
  "approved",
  "aprovado",
  "completed",
  "concluido",
  "concluído",
  "settled",
  "success",
]);

// Lista de termos explicitamente não pagos
const NON_PAID_STATUSES = new Set([
  "waiting_payment",
  "waiting-payment",
  "waitingpayment",
  "aguardando_pagamento",
  "refused",
  "recusado",
  "refunded",
  "reembolsado",
  "chargedback",
  "chargeback",
  "abandoned",
  "abandonado",
  "canceled",
  "cancelled",
  "cancelado",
  "pending",
  "pendente",
  "expired",
  "expirado",
]);

/**
 * Mascara um e-mail para exibição segura nos logs (ex: jo***@gmail.com)
 */
export function maskEmail(email?: string | null): string {
  if (!email || typeof email !== "string") return "[sem e-mail]";
  const clean = email.trim();
  const atIndex = clean.indexOf("@");
  if (atIndex <= 1) return "***@***";
  const user = clean.substring(0, atIndex);
  const domain = clean.substring(atIndex);
  const maskedUser = user.length > 2 ? `${user.substring(0, 2)}***` : `${user[0]}***`;
  return `${maskedUser}${domain}`;
}

/**
 * Normaliza e limpa o nome do comprador, formatando para saudação
 */
export function formatBuyerGreeting(name?: string | null): string {
  if (!name || typeof name !== "string") return "Olá!";
  const clean = name.trim();
  if (!clean || clean.toLowerCase() === "undefined" || clean.toLowerCase() === "null") {
    return "Olá!";
  }
  // Pega apenas o primeiro nome ou nome completo limpo
  const firstName = clean.split(" ")[0];
  const capitalized = firstName.charAt(0).toUpperCase() + firstName.slice(1);
  return `Olá, ${capitalized}!`;
}

/**
 * Valida o token do webhook recebido no header `X-Webhook-Token`
 * Se GREENN_WEBHOOK_SECRET não estiver configurado no servidor, permite o processamento com aviso.
 */
export function validateGreennToken(
  headerToken: string | null | undefined,
  secretToken: string | null | undefined
): { isValid: boolean; reason?: string } {
  // Se não foi configurado um segredo no servidor, permitimos a requisição (útil em testes iniciais)
  if (!secretToken || secretToken.trim() === "") {
    return { isValid: true, reason: "GREENN_WEBHOOK_SECRET não configurado. Validação de token ignorada." };
  }

  if (!headerToken) {
    return { isValid: false, reason: "Header 'X-Webhook-Token' ausente." };
  }

  const cleanHeader = headerToken.trim();
  const cleanSecret = secretToken.trim();

  if (cleanHeader === cleanSecret) {
    return { isValid: true };
  }

  return { isValid: false, reason: "Token 'X-Webhook-Token' inválido." };
}

/**
 * Extrai recursivamente ou por prioridade campos do payload JSON da Greenn
 */
export function parseGreennWebhook(body: unknown): ParsedGreennWebhook {
  if (!body || typeof body !== "object") {
    return {
      isPaid: false,
      status: "invalid_payload",
      event: "unknown",
      buyerEmail: null,
      buyerName: null,
      transactionId: null,
      rawPayload: {},
    };
  }

  const payload = body as Record<string, any>;
  const sale = payload.sale || payload.data?.sale || payload.data || {};
  const client = payload.client || sale.client || payload.customer || sale.customer || payload.buyer || sale.buyer || {};

  // 1. Extração do Evento
  const event = String(
    payload.event ||
    payload.type ||
    payload.action ||
    payload.notification_type ||
    "saleUpdated"
  ).trim();

  // 2. Extração do Status
  const rawStatus = String(
    payload.currentStatus ||
    sale.currentStatus ||
    payload.status ||
    sale.status ||
    payload.sale_status ||
    payload.order_status ||
    (event.toLowerCase().includes("paga") || event.toLowerCase().includes("paid") ? "paid" : "")
  ).toLowerCase().trim();

  // Determina se é uma venda paga
  let isPaid = false;
  if (PAID_STATUSES.has(rawStatus)) {
    isPaid = true;
  } else if (!NON_PAID_STATUSES.has(rawStatus)) {
    // Se o evento ou status contiver indicativo de pagamento aprovado
    if (
      rawStatus.includes("paid") ||
      rawStatus.includes("pago") ||
      rawStatus.includes("approved") ||
      rawStatus.includes("aprovad") ||
      event.toLowerCase().includes("paid") ||
      event.toLowerCase().includes("paga")
    ) {
      isPaid = true;
    }
  }

  // 3. Extração do E-mail do Comprador
  const candidateEmail =
    client.email ||
    sale.email ||
    payload.email ||
    sale.client_email ||
    payload.client_email ||
    payload.buyer_email ||
    payload.customer_email ||
    null;

  let buyerEmail: string | null = null;
  if (candidateEmail && typeof candidateEmail === "string") {
    const trimmed = candidateEmail.trim();
    if (trimmed.includes("@") && trimmed.includes(".")) {
      buyerEmail = trimmed.toLowerCase();
    }
  }

  // 4. Extração do Nome do Comprador
  const candidateName =
    client.name ||
    client.fullName ||
    client.first_name ||
    sale.name ||
    payload.name ||
    sale.client_name ||
    payload.client_name ||
    null;

  let buyerName: string | null = null;
  if (candidateName && typeof candidateName === "string") {
    const trimmed = candidateName.trim();
    if (trimmed.length > 0 && trimmed.toLowerCase() !== "undefined") {
      buyerName = trimmed;
    }
  }

  // 5. Extração do Identificador da Venda/Transação
  const candidateId =
    sale.id ||
    sale.transaction_id ||
    sale.transactionId ||
    payload.id ||
    payload.transaction_id ||
    payload.sale_id ||
    payload.order_id ||
    payload.eventId ||
    null;

  const transactionId = candidateId ? String(candidateId).trim() : null;

  return {
    isPaid,
    status: rawStatus || "unknown",
    event,
    buyerEmail,
    buyerName,
    transactionId,
    rawPayload: payload,
  };
}

