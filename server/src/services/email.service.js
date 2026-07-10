import nodemailer from 'nodemailer'
import { logger } from '../middleware/logger.js'

const transporter = nodemailer.createTransport({
  host:   process.env.SMTP_HOST   || 'smtp.gmail.com',
  port:   Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export const sendLeadNotification = async (lead) => {
  if (!process.env.SMTP_USER) {
    logger.warn('SMTP not configured — skipping lead notification email')
    return
  }
  try {
    await transporter.sendMail({
      from:    `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to:      process.env.NOTIFY_EMAIL || process.env.SMTP_USER,
      subject: `📬 New Lead from ${lead.name} — ${lead.service || 'General Inquiry'}`,
      html: `
        <div style="font-family:Inter,sans-serif;background:#07090F;color:#F1F5F9;padding:32px;border-radius:12px;max-width:560px;margin:0 auto">
          <h2 style="color:#6366F1;margin:0 0 20px">New Portfolio Lead</h2>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px 0;color:#64748B;width:120px">Name</td><td style="color:#F1F5F9;font-weight:600">${lead.name}</td></tr>
            <tr><td style="padding:8px 0;color:#64748B">Email</td><td><a href="mailto:${lead.email}" style="color:#22D3EE">${lead.email}</a></td></tr>
            <tr><td style="padding:8px 0;color:#64748B">Service</td><td style="color:#F1F5F9">${lead.service || '—'}</td></tr>
            <tr><td style="padding:8px 0;color:#64748B;vertical-align:top">Message</td>
                <td style="color:#94A3B8;line-height:1.6">${lead.message}</td></tr>
            <tr><td style="padding:8px 0;color:#64748B">Received</td><td style="color:#475569;font-size:12px">${new Date().toLocaleString()}</td></tr>
          </table>
          <div style="margin-top:24px">
            <a href="mailto:${lead.email}" style="background:#6366F1;color:#fff;padding:10px 20px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px">Reply Now →</a>
          </div>
        </div>
      `,
    })
    logger.info(`Lead notification sent for ${lead.email}`)
  } catch (err) {
    logger.error('Failed to send lead notification email', err)
  }
}
