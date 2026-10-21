import { Resend } from 'resend';

type VercelRequest = {
  method?: string;
  body?: unknown;
};

type VercelResponse = {
  status: (statusCode: number) => VercelResponse;
  json: (body: unknown) => void;
  setHeader: (name: string, value: string) => void;
};

type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

const invalidRequestMessage = 'Please provide a valid name, email, and message.';
const serverErrorMessage = 'Something went wrong. Please try again.';
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const maxLengths = {
  name: 100,
  email: 254,
  message: 5000,
};

function getPayload(body: unknown): ContactPayload | null {
  if (!body || typeof body !== 'object') return null;

  const payload = body as Record<string, unknown>;
  const name = typeof payload.name === 'string' ? payload.name.trim() : '';
  const email = typeof payload.email === 'string' ? payload.email.trim() : '';
  const message = typeof payload.message === 'string' ? payload.message.trim() : '';

  if (
    !name ||
    name.length > maxLengths.name ||
    !email ||
    email.length > maxLengths.email ||
    !emailPattern.test(email) ||
    !message ||
    message.length > maxLengths.message
  ) {
    return null;
  }

  return { name, email, message };
}

// Escapes HTML-significant characters so visitor-supplied text can never
// break out of the markup it's interpolated into.
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Escapes, then turns newlines into <br> so the visitor's line breaks
// survive in the rendered email.
function escapeHtmlPreserveBreaks(value: string): string {
  return escapeHtml(value).split('\n').join('<br>');
}

function buildContactEmailHtml(payload: ContactPayload): string {
  const safeName = escapeHtml(payload.name);
  const safeEmail = escapeHtml(payload.email);
  const safeMessage = escapeHtmlPreserveBreaks(payload.message);

  const bg = '#0a0a0a';
  const panel = '#141414';
  const border = '#2a2a2a';
  const paper = '#f5f3ef';
  const muted = '#9a9a9a';
  const orange = '#ff6a2b';
  const green = '#3ddc84';
  const font =
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
  const mono = "'Courier New', Courier, monospace";

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="color-scheme" content="dark" />
    <title>New Portfolio Contact</title>
  </head>
  <body style="margin:0; padding:0; background-color:${bg}; font-family:${font};">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${bg};">
      <tr>
        <td align="center" style="padding:32px 16px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px; background-color:${bg};">

            <!-- Header -->
            <tr>
              <td style="padding:0 8px 24px 8px; border-bottom:2px solid ${border};">
                <div style="font-family:${mono}; font-size:11px; letter-spacing:2px; color:${orange}; text-transform:uppercase; margin-bottom:8px;">
                  PORTFOLIO / CONTACT
                </div>
                <div style="font-family:${font}; font-size:24px; font-weight:800; letter-spacing:1px; color:${paper}; text-transform:uppercase;">
                  KARTHIK VIJAY
                </div>
              </td>
            </tr>

            <!-- Intro -->
            <tr>
              <td style="padding:28px 8px 24px 8px;">
                <div style="font-family:${font}; font-size:20px; font-weight:800; color:${paper}; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:8px;">
                  NEW MESSAGE RECEIVED
                </div>
                <div style="font-family:${font}; font-size:13px; color:${muted};">
                  Someone reached out through your portfolio.
                </div>
              </td>
            </tr>

            <!-- Sender details -->
            <tr>
              <td style="padding:0 8px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding:14px 0; border-top:1px solid ${border};">
                      <div style="font-family:${mono}; font-size:10px; letter-spacing:2px; color:${green}; text-transform:uppercase; margin-bottom:4px;">
                        NAME
                      </div>
                      <div style="font-family:${font}; font-size:15px; color:${paper};">
                        ${safeName}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:14px 0; border-top:1px solid ${border};">
                      <div style="font-family:${mono}; font-size:10px; letter-spacing:2px; color:${green}; text-transform:uppercase; margin-bottom:4px;">
                        EMAIL
                      </div>
                      <div style="font-family:${font}; font-size:15px; color:${paper};">
                        ${safeEmail}
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Message -->
            <tr>
              <td style="padding:22px 8px 8px 8px;">
                <div style="font-family:${mono}; font-size:10px; letter-spacing:2px; color:${green}; text-transform:uppercase; margin-bottom:10px;">
                  MESSAGE
                </div>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${panel}; border:1px solid ${border}; border-left:3px solid ${orange};">
                  <tr>
                    <td style="padding:18px 16px; font-family:${font}; font-size:14px; line-height:1.65; color:${paper};">
                      ${safeMessage}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding:28px 8px 0 8px; border-top:1px solid ${border}; margin-top:24px;">
                <div style="font-family:${mono}; font-size:11px; color:${muted}; letter-spacing:0.5px; margin-bottom:6px;">
                  Received via Karthik Vijay Portfolio
                </div>
                <div style="font-family:${mono}; font-size:11px; color:${muted}; letter-spacing:0.5px;">
                  Reply directly to this email to respond to the sender.
                </div>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function buildContactEmailText(payload: ContactPayload): string {
  return `NEW PORTFOLIO MESSAGE

Name:
${payload.name}

Email:
${payload.email}

Message:
${payload.message}`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ success: false, message: 'Method not allowed.' });
    return;
  }

  const payload = getPayload(req.body);
  if (!payload) {
    res.status(400).json({ success: false, message: invalidRequestMessage });
    return;
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !toEmail || !fromEmail) {
    console.error('Contact email configuration is incomplete.');
    res.status(500).json({ success: false, message: serverErrorMessage });
    return;
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: payload.email,
      subject: `New Portfolio Contact — ${payload.name}`,
      html: buildContactEmailHtml(payload),
      text: buildContactEmailText(payload),
    });

    if (error) {
      console.error('Resend rejected the contact email.');
      res.status(500).json({ success: false, message: serverErrorMessage });
      return;
    }

    res.status(200).json({ success: true, message: 'Message sent successfully.' });
  } catch {
    console.error('Unexpected contact email error.');
    res.status(500).json({ success: false, message: serverErrorMessage });
  }
}