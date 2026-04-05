import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { Resend } from 'resend';

const contactSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(7),
  email: z.string().email().optional(),
  message: z.string().min(10),
  serviceType: z.string().optional(),
  timeline: z.string().optional(),
  volume: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = contactSchema.parse(body);

    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const to = process.env.RESEND_NOTIFICATION_EMAIL ?? 'hello@where2junk.com';
      const from = process.env.RESEND_FROM_EMAIL ?? 'noreply@where2junk.com';

      await resend.emails.send({
        from,
        to,
        subject: `New Contact Form: ${data.name}`,
        text: [
          `Name: ${data.name}`,
          `Phone: ${data.phone}`,
          data.email ? `Email: ${data.email}` : null,
          ``,
          `Message:`,
          data.message,
          ``,
          `Service Type: ${data.serviceType || 'not specified'}`,
          `Timeline: ${data.timeline || 'not specified'}`,
          `Volume: ${data.volume || 'not specified'}`,
        ]
          .filter((l) => l !== null)
          .join('\n'),
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
