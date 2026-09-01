/**
 * Teste de simulação de payloads e regras da integração Greenn + Resend
 */

// 1. Simulação das funções puras de parsing
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

function maskEmail(email) {
  if (!email || typeof email !== "string") return "[sem e-mail]";
  const clean = email.trim();
  const atIndex = clean.indexOf("@");
  if (atIndex <= 1) return "***@***";
  const user = clean.substring(0, atIndex);
  const domain = clean.substring(atIndex);
  const maskedUser = user.length > 2 ? `${user.substring(0, 2)}***` : `${user[0]}***`;
  return `${maskedUser}${domain}`;
}

function formatBuyerGreeting(name) {
  if (!name || typeof name !== "string") return "Olá!";
  const clean = name.trim();
  if (!clean || clean.toLowerCase() === "undefined" || clean.toLowerCase() === "null") {
    return "Olá!";
  }
  const firstName = clean.split(" ")[0];
  const capitalized = firstName.charAt(0).toUpperCase() + firstName.slice(1);
  return `Olá, ${capitalized}!`;
}

function validateGreennToken(headerToken, secretToken) {
  if (!secretToken || secretToken.trim() === "") {
    return { isValid: true, reason: "GREENN_WEBHOOK_SECRET não configurado. Validação de token ignorada." };
  }
  if (!headerToken) {
    return { isValid: false, reason: "Header 'X-Webhook-Token' ausente." };
  }
  return headerToken.trim() === secretToken.trim()
    ? { isValid: true }
    : { isValid: false, reason: "Token 'X-Webhook-Token' inválido." };
}

function parseGreennWebhook(body) {
  if (!body || typeof body !== "object") {
    return { isPaid: false, status: "invalid_payload", event: "unknown", buyerEmail: null, buyerName: null, transactionId: null };
  }
  const payload = body;
  const sale = payload.sale || payload.data?.sale || payload.data || {};
  const client = payload.client || sale.client || payload.customer || sale.customer || payload.buyer || sale.buyer || {};

  const event = String(
    payload.event || payload.type || payload.action || payload.notification_type || "saleUpdated"
  ).trim();

  const rawStatus = String(
    payload.currentStatus || sale.currentStatus || payload.status || sale.status || payload.sale_status || payload.order_status || ""
  ).toLowerCase().trim();

  let isPaid = false;
  if (PAID_STATUSES.has(rawStatus)) {
    isPaid = true;
  } else if (!NON_PAID_STATUSES.has(rawStatus)) {
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

  const candidateEmail =
    client.email || sale.email || payload.email || sale.client_email || payload.client_email || payload.buyer_email || payload.customer_email || null;

  let buyerEmail = null;
  if (candidateEmail && typeof candidateEmail === "string") {
    const trimmed = candidateEmail.trim();
    if (trimmed.includes("@") && trimmed.includes(".")) {
      buyerEmail = trimmed.toLowerCase();
    }
  }

  const candidateName =
    client.name || client.fullName || client.first_name || sale.name || payload.name || sale.client_name || payload.client_name || null;

  let buyerName = null;
  if (candidateName && typeof candidateName === "string") {
    const trimmed = candidateName.trim();
    if (trimmed.length > 0 && trimmed.toLowerCase() !== "undefined") {
      buyerName = trimmed;
    }
  }

  const candidateId =
    sale.id || sale.transaction_id || sale.transactionId || payload.id || payload.transaction_id || payload.sale_id || payload.order_id || payload.eventId || null;

  return {
    isPaid,
    status: rawStatus || "unknown",
    event,
    buyerEmail,
    buyerName,
    transactionId: candidateId ? String(candidateId).trim() : null,
  };
}

// Bateria de Testes
let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ PASS: ${message}`);
    passed++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    failed++;
  }
}

console.log("=== EXECUTANDO TESTES UNITÁRIOS DE INTEGRAÇÃO GREENN ===\n");

// Teste 1: Payload oficial da Greenn (Venda Paga)
const p1 = {
  type: "sale",
  event: "saleUpdated",
  oldStatus: "waiting_payment",
  currentStatus: "paid",
  sale: {
    id: "GRN-100293",
    client: {
      name: "Juliana Mendes",
      email: "juliana@example.com",
    },
  },
};
const res1 = parseGreennWebhook(p1);
assert(res1.isPaid === true, "Identifica venda paga na Greenn (currentStatus: 'paid')");
assert(res1.buyerEmail === "juliana@example.com", "Extrai e-mail do cliente (juliana@example.com)");
assert(res1.buyerName === "Juliana Mendes", "Extrai nome do cliente (Juliana Mendes)");
assert(res1.transactionId === "GRN-100293", "Extrai ID da transação (GRN-100293)");

// Teste 2: Payload com Venda Aguardando Pagamento (Boleto/Pix não pago)
const p2 = {
  type: "sale",
  event: "saleUpdated",
  currentStatus: "waiting_payment",
  sale: {
    id: "GRN-100294",
    client: {
      name: "Roberto Rocha",
      email: "roberto@example.com",
    },
  },
};
const res2 = parseGreennWebhook(p2);
assert(res2.isPaid === false, "Ignora venda com status 'waiting_payment'");

// Teste 3: Payload com Compra Recusada ou Estornada
const p3 = {
  type: "sale",
  event: "saleUpdated",
  currentStatus: "refused",
  sale: { id: "GRN-100295", client: { email: "recusado@test.com" } },
};
const res3 = parseGreennWebhook(p3);
assert(res3.isPaid === false, "Ignora venda com status 'refused'");

const p4 = {
  type: "sale",
  event: "saleUpdated",
  currentStatus: "refunded",
  sale: { id: "GRN-100296", client: { email: "reembolso@test.com" } },
};
const res4 = parseGreennWebhook(p4);
assert(res4.isPaid === false, "Ignora venda com status 'refunded'");

// Teste 4: Formatação de Saudação
assert(formatBuyerGreeting("Ana Clara") === "Olá, Ana!", "Saudação com primeiro nome ('Olá, Ana!')");
assert(formatBuyerGreeting(null) === "Olá!", "Saudação fallback sem nome ('Olá!')");
assert(formatBuyerGreeting("") === "Olá!", "Saudação fallback string vazia ('Olá!')");

// Teste 5: Mascaramento de E-mail
assert(maskEmail("comprador@gmail.com") === "co***@gmail.com", "Mascara e-mail para logs seguros");

// Teste 6: Validação de Segurança X-Webhook-Token
assert(validateGreennToken("meu-token", "meu-token").isValid === true, "Aceita token correto");
assert(validateGreennToken("token-invalido", "meu-token").isValid === false, "Rejeita token divergente");
assert(validateGreennToken(null, "").isValid === true, "Permite requisição se segredo não estiver configurado");

console.log(`\n==================================================`);
console.log(`RESULTADOS: ${passed} passaram, ${failed} falharam.`);
console.log(`==================================================\n`);

if (failed > 0) process.exit(1);

