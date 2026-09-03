import nodemailer from "nodemailer";
import { Resend } from "resend";
import { formatBuyerGreeting } from "./greenn";

// Configurações e constantes de acesso
export const CATALOG_URL = "https://packnovelascatalogo.vercel.app/";
export const ACCESS_LOGIN = "novela1";
export const ACCESS_PASSWORD = "novelas:1";
export const EMAIL_SUBJECT = "Sua compra foi confirmada — Seu acesso às novelas";
export const DEFAULT_GMAIL_ADDRESS = "paginacerta.contato@gmail.com";

/**
 * Gera o corpo do e-mail em texto puro (fallback para leitores que desabilitam HTML)
 */
export function generatePlainTextEmail(buyerName?: string | null): string {
  const greeting = formatBuyerGreeting(buyerName);

  return `${greeting}

Sua compra foi confirmada com sucesso.

Seu acesso ao catálogo de novelas já está disponível.

==================================================
DADOS DE ACESSO AO CATÁLOGO:
==================================================

Link de Acesso: ${CATALOG_URL}
Login: ${ACCESS_LOGIN}
Senha: ${ACCESS_PASSWORD}

==================================================

Você pode acessar o catálogo a qualquer momento pelo computador ou direto no seu celular.

Bom entretenimento!

Pack Novelas
${CATALOG_URL}`;
}

/**
 * Gera o template HTML do e-mail de confirmação e acesso
 */
export function generateHtmlEmail(buyerName?: string | null): string {
  const greeting = formatBuyerGreeting(buyerName);

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${EMAIL_SUBJECT}</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #0d0e12;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #e2e8f0;
      line-height: 1.6;
    }
    .wrapper {
      width: 100%;
      background-color: #0d0e12;
      padding: 40px 16px;
    }
    .container {
      max-width: 580px;
      margin: 0 auto;
      background: #13141c;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
    }
    .header {
      background: linear-gradient(135deg, #181926 0%, #20132b 100%);
      padding: 32px 24px;
      text-align: center;
      border-bottom: 1px solid rgba(238, 57, 158, 0.2);
    }
    .brand-badge {
      display: inline-block;
      padding: 4px 12px;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #ee399e;
      background: rgba(238, 57, 158, 0.12);
      border: 1px solid rgba(238, 57, 158, 0.3);
      border-radius: 9999px;
      margin-bottom: 12px;
    }
    .title {
      margin: 0;
      font-size: 24px;
      font-weight: 800;
      color: #ffffff;
      letter-spacing: -0.5px;
    }
    .content {
      padding: 32px 28px;
    }
    .greeting {
      font-size: 18px;
      font-weight: 600;
      color: #ffffff;
      margin-top: 0;
      margin-bottom: 16px;
    }
    .text {
      color: #cbd5e1;
      font-size: 15px;
      margin-bottom: 20px;
    }
    .credentials-box {
      background: #090a0f;
      border: 1px solid rgba(254, 38, 65, 0.3);
      border-radius: 12px;
      padding: 20px;
      margin: 28px 0;
      text-align: left;
    }
    .credentials-title {
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #fe2641;
      margin-bottom: 12px;
      display: block;
    }
    .credential-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    }
    .credential-row:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }
    .credential-label {
      color: #94a3b8;
      font-size: 14px;
    }
    .credential-value {
      color: #38bdf8;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-weight: 700;
      font-size: 15px;
      background: rgba(56, 189, 248, 0.1);
      padding: 2px 8px;
      border-radius: 6px;
    }
    .btn-container {
      text-align: center;
      margin: 32px 0 24px;
    }
    .btn {
      display: inline-block;
      background: linear-gradient(135deg, #ee399e 0%, #fe2641 100%);
      color: #ffffff !important;
      text-decoration: none;
      font-weight: 700;
      font-size: 16px;
      padding: 16px 36px;
      border-radius: 12px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      box-shadow: 0 8px 24px rgba(238, 57, 158, 0.35);
    }
    .device-note {
      text-align: center;
      font-size: 13px;
      color: #64748b;
      margin-top: 12px;
    }
    .footer {
      background: #090a0f;
      padding: 24px;
      text-align: center;
      border-top: 1px solid rgba(255, 255, 255, 0.06);
      font-size: 12px;
      color: #64748b;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <span class="brand-badge">Acesso Confirmado</span>
        <h1 class="title">Pack Novelas Verticais</h1>
      </div>

      <div class="content">
        <p class="greeting">${greeting}</p>
        <p class="text">
          Sua compra foi confirmada com sucesso!
        </p>
        <p class="text">
          Seu acesso completo ao nosso catálogo de novelas já está liberado. Você pode assistir a todos os episódios completos direto pelo celular ou computador.
        </p>

        <!-- Caixa de Credenciais -->
        <div class="credentials-box">
          <span class="credentials-title">🔑 Seus Dados de Acesso</span>
          <div class="credential-row">
            <span class="credential-label">Login:</span>
            <span class="credential-value">${ACCESS_LOGIN}</span>
          </div>
          <div class="credential-row">
            <span class="credential-label">Senha:</span>
            <span class="credential-value">${ACCESS_PASSWORD}</span>
          </div>
        </div>

        <!-- Botão de Acesso -->
        <div class="btn-container">
          <a href="${CATALOG_URL}" class="btn" target="_blank" rel="noopener noreferrer">
            ACESSAR CATÁLOGO AGORA
          </a>
        </div>

        <p class="device-note">
          📱 Otimizado para visualização vertical no celular.
        </p>
      </div>

      <div class="footer">
        <p style="margin: 0 0 8px 0;">Bom entretenimento!</p>
        <p style="margin: 0; font-weight: 600; color: #94a3b8;">Pack Novelas</p>
      </div>
    </div>
  </div>
</body>
</html>`;
}

/**
 * Envia o e-mail via Gmail SMTP (100% Gratuito) usando Nodemailer
 */
async function sendViaGmail({
  to,
  buyerName,
  user,
  pass,
}: {
  to: string;
  buyerName?: string | null;
  user: string;
  pass: string;
}): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user,
        pass: pass.replace(/\s+/g, ""), // Remove espaços caso o usuário copie com espaços do Google
      },
    });

    const fromAddress = process.env.EMAIL_FROM || `Pack Novelas <${user}>`;
    const htmlContent = generateHtmlEmail(buyerName);
    const textContent = generatePlainTextEmail(buyerName);

    const info = await transporter.sendMail({
      from: fromAddress,
      to,
      subject: EMAIL_SUBJECT,
      text: textContent,
      html: htmlContent,
    });

    return {
      success: true,
      id: info.messageId,
    };
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || "Erro desconhecido ao enviar pelo Gmail SMTP",
    };
  }
}

/**
 * Envia o e-mail via Resend (caso configurado)
 */
async function sendViaResend({
  to,
  buyerName,
  apiKey,
}: {
  to: string;
  buyerName?: string | null;
  apiKey: string;
}): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    const resend = new Resend(apiKey);
    const from = process.env.EMAIL_FROM || "Pack Novelas <onboarding@resend.dev>";
    const htmlContent = generateHtmlEmail(buyerName);
    const textContent = generatePlainTextEmail(buyerName);

    const { data, error } = await resend.emails.send({
      from,
      to: [to],
      subject: EMAIL_SUBJECT,
      html: htmlContent,
      text: textContent,
    });

    if (error) {
      return {
        success: false,
        error: error.message || "Erro desconhecido no Resend",
      };
    }

    return {
      success: true,
      id: data?.id,
    };
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || "Exceção inesperada no envio via Resend",
    };
  }
}

/**
 * Função principal de envio de e-mail de acesso.
 * Prioriza Gmail SMTP (gratuito) se GMAIL_APP_PASSWORD estiver configurado.
 * Fallback para Resend se RESEND_API_KEY estiver configurado.
 */
export async function sendAccessEmail({
  to,
  buyerName,
}: {
  to: string;
  buyerName?: string | null;
}): Promise<{ success: boolean; id?: string; provider?: string; error?: string }> {
  const gmailUser = process.env.GMAIL_USER || DEFAULT_GMAIL_ADDRESS;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;
  const resendApiKey = process.env.RESEND_API_KEY;

  // 1. Se tiver senha de app do Gmail configurada, envia pelo Gmail
  if (gmailPass && gmailPass.trim() !== "") {
    const result = await sendViaGmail({
      to,
      buyerName,
      user: gmailUser,
      pass: gmailPass,
    });
    return { ...result, provider: "Gmail SMTP" };
  }

  // 2. Se tiver chave do Resend configurada, envia pelo Resend
  if (resendApiKey && resendApiKey.trim() !== "") {
    const result = await sendViaResend({
      to,
      buyerName,
      apiKey: resendApiKey,
    });
    return { ...result, provider: "Resend" };
  }

  // 3. Nenhuma credencial de envio configurada
  return {
    success: false,
    error:
      "Nenhum serviço de envio configurado. Configure GMAIL_APP_PASSWORD (para Gmail gratuito) ou RESEND_API_KEY.",
  };
}
