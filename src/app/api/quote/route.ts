import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { Resend } from 'resend';

const quoteSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(10),
  email: z.string().email().optional(),
  description: z.string().min(5),
  // photo upload handled client-side; this receives the description + contact info
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = quoteSchema.parse(body);

    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const to = process.env.RESEND_NOTIFICATION_EMAIL ?? 'hello@where2junk.com';
      const from = process.env.RESEND_FROM_EMAIL ?? 'noreply@where2junk.com';

      await resend.emails.send({
        from,
        to,
        subject: `New Quote Request: ${data.name}`,
        text: [
          `Name: ${data.name}`,
          `Phone: ${data.phone}`,
          data.email ? `Email: ${data.email}` : null,
          ``,
          `Job Description:`,
          data.description,
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
