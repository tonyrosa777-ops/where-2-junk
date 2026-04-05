import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, phone, email, answers, resultKey } = body;

  if (!name || !phone) {
    return NextResponse.json({ error: 'Name and phone are required' }, { status: 422 });
  }

  const resendKey  = process.env.RESEND_API_KEY;
  const notifyEmail = process.env.RESEND_NOTIFICATION_EMAIL || 'hello@where2junk.com';

  const answersText = Object.entries(answers as Record<string, string | string[]>)
    .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(', ') : v}`)
    .join('\n');

  if (!resendKey) {
    console.log('[quiz] No RESEND_API_KEY — logging lead:');
    console.log({ name, phone, email, resultKey, answers });
    return NextResponse.json({ ok: true });
  }

  const resend = new Resend(resendKey);

  // Owner notification
  await resend.emails.send({
    from: 'quiz@where2junk.com',
    to: notifyEmail,
    subject: `New Quiz Lead: ${name} — matched to ${resultKey}`,
    text: [
      'New quiz lead',
      '',
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Email: ${email || 'not provided'}`,
      `Matched service: ${resultKey}`,
      '',
      'Answers:',
      answersText,
    ].join('\n'),
  });

  // Guest auto-reply (only if email provided)
  if (email) {
    await resend.emails.send({
      from: 'josh@where2junk.com',
      to: email,
      subject: `Your Where2 Junk recommendation, ${name}`,
      text: [
        `Hi ${name},`,
        '',
        `Thanks for taking the quiz. Based on your answers, we recommend our ${resultKey.replace(/-/g, ' ')} service.`,
        '',
        `Josh or a member of our crew will reach out to you at ${phone} shortly to confirm your appointment.`,
        '',
        'In the meantime, you can book directly at where2junk.com/booking.',
        '',
        'Thanks,',
        'Josh Ortega',
        'Where2 Junk Removal',
        '(603) 406-3724',
      ].join('\n'),
    });
  }

  return NextResponse.json({ ok: true });
}
