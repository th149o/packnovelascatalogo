import { NextRequest, NextResponse } from "next/server";
import {
  parseGreennWebhook,
  validateGreennToken,
  maskEmail,
} from "@/lib/greenn";
import {
  isDuplicateTransaction,
  markTransactionProcessed,
} from "@/lib/idempotency";
import { sendAccessEmail } from "@/lib/email";

export const dynamic = "force-dynamic";

/**
 * Endpoint para recebimento de webhooks da Greenn
 * POST /api/webhooks/greenn
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Validação de Segurança (Header X-Webhook-Token)
    const webhookToken = request.headers.get("x-webhook-token");
    const secretToken = process.env.GREENN_WEBHOOK_SECRET;

    const tokenValidation = validateGreennToken(webhookToken, secretToken);
    if (!tokenValidation.isValid) {
      console.warn(`[GREENN WEBHOOK] Acesso negado: ${tokenValidation.reason}`);
      return NextResponse.json(
        { success: false, error: "Acesso não autorizado." },
        { status: 401 }
      );
    }

    if (tokenValidation.reason) {
      console.log(`[GREENN WEBHOOK] [AVISO] ${tokenValidation.reason}`);
    }

    // 2. Leitura do corpo da requisição (JSON)
    let body: any;
    try {
      body = await request.json();
    } catch {
      console.error("[GREENN WEBHOOK] Payload inválido ou não é um JSON válido.");
      return NextResponse.json(
        { success: false, error: "Payload inválido. Esperado formato JSON." },
        { status: 400 }
      );
    }

    console.log("[GREENN WEBHOOK] Evento recebido da Greenn.");

    // 3. Extração e interpretação do payload
    const parsed = parseGreennWebhook(body);

    console.log(
      `[GREENN WEBHOOK] Dados extraídos -> Evento: "${parsed.event}" | Status: "${parsed.status}" | ID: "${parsed.transactionId || "N/A"}"`
    );

    // 4. Verificação se a venda está efetivamente paga/aprovada
    if (!parsed.isPaid) {
      console.log(
        `[GREENN WEBHOOK] Status "${parsed.status}" não representa venda paga/aprovada. Ignorando envio de e-mail.`
      );
      return NextResponse.json(
        {
          success: true,
          message: `Evento recebido, porém ignorado (status '${parsed.status}' não é venda paga).`,
        },
        { status: 200 }
      );
    }

    console.log("[GREENN WEBHOOK] Venda paga identificada com sucesso!");

    // 5. Verificação de Idempotência (evitar disparos repetidos para a mesma venda)
    if (parsed.transactionId && isDuplicateTransaction(parsed.transactionId)) {
      console.log(
        `[GREENN WEBHOOK] Transação ${parsed.transactionId} já processada anteriormente. Ignorando reenvio.`
      );
      return NextResponse.json(
        {
          success: true,
          message: "Notificação já processada anteriormente (idempotência).",
        },
        { status: 200 }
      );
    }

    // 6. Verificação do e-mail do comprador
    if (!parsed.buyerEmail) {
      console.error(
        "[GREENN WEBHOOK] ERRO: Venda paga identificada, mas nenhum e-mail válido foi encontrado no payload."
      );
      return NextResponse.json(
        {
          success: false,
          error: "E-mail do comprador não encontrado no payload da Greenn.",
        },
        { status: 422 }
      );
    }

    console.log(
      `[GREENN WEBHOOK] E-mail do comprador encontrado: ${maskEmail(parsed.buyerEmail)} | Nome: ${parsed.buyerName || "[Não informado]"}`
    );

    // 7. Envio do e-mail com as credenciais via Resend
    console.log(`[GREENN EMAIL] Enviando dados de acesso para ${maskEmail(parsed.buyerEmail)}...`);
    const emailResult = await sendAccessEmail({
      to: parsed.buyerEmail,
      buyerName: parsed.buyerName,
    });

    if (!emailResult.success) {
      console.error(`[GREENN EMAIL] ERRO ao enviar e-mail: ${emailResult.error}`);
      return NextResponse.json(
        {
          success: false,
          error: `Falha ao enviar e-mail de acesso: ${emailResult.error}`,
        },
        { status: 500 }
      );
    }

    // 8. Marca a transação como processada no cache de idempotência
    if (parsed.transactionId) {
      markTransactionProcessed(parsed.transactionId);
    }

    console.log(
      `[GREENN EMAIL] E-mail enviado com sucesso para ${maskEmail(parsed.buyerEmail)} via ${emailResult.provider || "Email"} (ID: ${emailResult.id || "N/A"}).`
    );

    return NextResponse.json(
      {
        success: true,
        message: "Webhook processado e e-mail de acesso enviado com sucesso.",
        emailId: emailResult.id,
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("[GREENN WEBHOOK] Exceção não tratada ao processar webhook:", err?.message || err);
    return NextResponse.json(
      { success: false, error: "Erro interno no processamento do webhook." },
      { status: 500 }
    );
  }
}

/**
 * Suporte a requisições OPTIONS (útil para preflights ou validações externas)
 */
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      Allow: "POST, OPTIONS",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, X-Webhook-Token",
    },
  });
}

