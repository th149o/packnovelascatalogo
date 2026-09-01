import {
  parseGreennWebhook,
  validateGreennToken,
  formatBuyerGreeting,
  maskEmail,
} from "../src/lib/greenn.ts";
import {
  isDuplicateTransaction,
  markTransactionProcessed,
  clearIdempotencyCache,
} from "../src/lib/idempotency.ts";
import {
  generateHtmlEmail,
  generatePlainTextEmail,
  CATALOG_URL,
  ACCESS_LOGIN,
  ACCESS_PASSWORD,
} from "../src/lib/email.ts";
import { validateCredentials } from "../src/lib/auth.ts";

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

console.log("=== INICIANDO BATERIA DE TESTES DA INTEGRAÇÃO GREENN ===\n");

// 1. Testes de Parsing de Webhook da Greenn
console.log("1. Testes de Parsing do Payload da Greenn:");

const payloadPadrãoGreenn = {
  type: "sale",
  event: "saleUpdated",
  oldStatus: "waiting_payment",
  currentStatus: "paid",
  sale: {
    id: "GRN-982341",
    client: {
      name: "Maria da Silva",
      email: "maria.silva@exemplo.com",
    },
  },
};

const parsed1 = parseGreennWebhook(payloadPadrãoGreenn);
assert(parsed1.isPaid === true, "Identifica corretamente venda com status 'paid'");
assert(parsed1.buyerEmail === "maria.silva@exemplo.com", "Extrai e-mail do cliente corretamente");
assert(parsed1.buyerName === "Maria da Silva", "Extrai nome do cliente corretamente");
assert(parsed1.transactionId === "GRN-982341", "Extrai ID da transação corretamente");

// Payload com status recusado / pendente
const payloadPendente = {
  type: "sale",
  event: "saleUpdated",
  currentStatus: "waiting_payment",
  sale: {
    id: "GRN-982342",
    client: {
      name: "João Santos",
      email: "joao@exemplo.com",
    },
  },
};
const parsedPendente = parseGreennWebhook(payloadPendente);
assert(parsedPendente.isPaid === false, "Ignora corretamente venda pendente ('waiting_payment')");

const payloadRecusado = {
  type: "sale",
  event: "saleUpdated",
  currentStatus: "refused",
  sale: {
    id: "GRN-982343",
    client: {
      name: "Carlos Lima",
      email: "carlos@exemplo.com",
    },
  },
};
const parsedRecusado = parseGreennWebhook(payloadRecusado);
assert(parsedRecusado.isPaid === false, "Ignora corretamente venda recusada ('refused')");

// Payload alternativo com campos no topo
const payloadAlternativo = {
  event: "venda_paga",
  status: "aprovado",
  id: "TRANS-555",
  name: "Ana Paula",
  email: "ana@exemplo.com",
};
const parsedAlt = parseGreennWebhook(payloadAlternativo);
assert(parsedAlt.isPaid === true, "Reconhece venda aprovada em formato alternativo");
assert(parsedAlt.buyerEmail === "ana@exemplo.com", "Extrai e-mail em formato alternativo");
assert(parsedAlt.buyerName === "Ana Paula", "Extrai nome em formato alternativo");
assert(parsedAlt.transactionId === "TRANS-555", "Extrai ID em formato alternativo");

// 2. Testes de Saudação e Mascaramento
console.log("\n2. Testes de Saudação e Mascaramento:");
assert(formatBuyerGreeting("Maria Silva") === "Olá, Maria!", "Formata primeiro nome com saudação");
assert(formatBuyerGreeting(null) === "Olá!", "Usa 'Olá!' quando nome for nulo");
assert(formatBuyerGreeting("undefined") === "Olá!", "Usa 'Olá!' quando nome for 'undefined'");
assert(maskEmail("contato@novelas.com.br") === "co***@novelas.com.br", "Mascara e-mail para exibição segura nos logs");

// 3. Testes de Segurança de Token
console.log("\n3. Testes de Segurança do Token X-Webhook-Token:");
const valSemSecret = validateGreennToken("qualquer-coisa", "");
assert(valSemSecret.isValid === true, "Permite requisição se segredo não estiver configurado");

const valCorreta = validateGreennToken("meu-token-secreto-123", "meu-token-secreto-123");
assert(valCorreta.isValid === true, "Valida token correto");

const valIncorreta = validateGreennToken("token-errado", "meu-token-secreto-123");
assert(valIncorreta.isValid === false, "Bloqueia token incorreto");

const valAusente = validateGreennToken(null, "meu-token-secreto-123");
assert(valAusente.isValid === false, "Bloqueia requisição sem header X-Webhook-Token");

// 4. Testes de Idempotência
console.log("\n4. Testes de Idempotência:");
clearIdempotencyCache();
const transacaoId = "VENDA-ABC-123";
assert(isDuplicateTransaction(transacaoId) === false, "Primeira notificação NÃO é considerada duplicada");
markTransactionProcessed(transacaoId);
assert(isDuplicateTransaction(transacaoId) === true, "Segunda notificação do mesmo ID é detectada como DUPLICADA");
assert(isDuplicateTransaction("OUTRA-VENDA") === false, "Outra venda não é bloqueada");

// 5. Testes de Template de E-mail
console.log("\n5. Testes de Template de E-mail:");
const html = generateHtmlEmail("Fernanda");
assert(html.includes("Olá, Fernanda!"), "HTML contém a saudação personalizada");
assert(html.includes(ACCESS_LOGIN), `HTML contém o login (${ACCESS_LOGIN})`);
assert(html.includes(ACCESS_PASSWORD), `HTML contém a senha (${ACCESS_PASSWORD})`);
assert(html.includes(CATALOG_URL), `HTML contém a URL do catálogo (${CATALOG_URL})`);
assert(html.includes("ACESSAR CATÁLOGO"), "HTML contém o botão de chamada para ação");

const text = generatePlainTextEmail("Fernanda");
assert(text.includes("Olá, Fernanda!"), "Texto simples contém a saudação");
assert(text.includes(ACCESS_LOGIN), "Texto simples contém o login");
assert(text.includes(ACCESS_PASSWORD), "Texto simples contém a senha");

// 6. Testes de Autenticação no Catálogo
console.log("\n6. Testes de Credenciais de Acesso ao Catálogo:");
assert(validateCredentials("novela1", "novelas:1") === true, "Aceita login com 'novela1' e senha 'novelas:1'");
assert(validateCredentials("novelas1", "novelas:1") === true, "Aceita login com 'novelas1' e senha 'novelas:1'");
assert(validateCredentials("novela1", "senha-errada") === false, "Rejeita senha incorreta");
assert(validateCredentials("usuario_invalido", "novelas:1") === false, "Rejeita usuário incorreto");

console.log(`\n==================================================`);
console.log(`RESULTADO DOS TESTES: ${passed} passaram, ${failed} falharam.`);
console.log(`==================================================\n`);

if (failed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}

