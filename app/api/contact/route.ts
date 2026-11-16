import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, company, email, phone, product, inquiryType, message } = body;

    // Validate required fields
    if (!fullName || !company || !email || !phone || !message) {
      return NextResponse.json(
        { error: 'Please provide all required fields (Name, Company, Email, Phone, Message).' },
        { status: 400 }
      );
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address provided.' },
        { status: 400 }
      );
    }

    const inquiryRef = `SRT-${Date.now().toString(36).toUpperCase()}`;

    // Log the lead for administrative & test verification
    console.log('--- NEW SRTRONIX INQUIRY RECEIVED ---');
    console.log(`Reference: ${inquiryRef}`);
    console.log(`From: ${fullName} (${email}, ${phone})`);
    console.log(`Company / Institution: ${company}`);
    console.log(`Product: ${product || 'General / Multi-Instrument'}`);
    console.log(`Type: ${inquiryType}`);
    console.log(`Message: ${message}`);
    console.log('--------------------------------------');

    // If an email provider (such as Resend or SendGrid) is configured, trigger it here:
    if (process.env.RESEND_API_KEY) {
      try {
        const resendRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: process.env.CONTACT_FROM_EMAIL || 'inquiries@srtronix.com',
            to: process.env.CONTACT_TO_EMAIL || 'sales@srtronix.com',
            subject: `[SRTRONIX Inquiry ${inquiryRef}] ${inquiryType} from ${company}`,
            html: `
              <h2>New SRTRONIX Instrument Inquiry</h2>
              <p><strong>Reference:</strong> ${inquiryRef}</p>
              <p><strong>Full Name:</strong> ${fullName}</p>
              <p><strong>Company / Institution:</strong> ${company}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${phone}</p>
              <p><strong>Product Interested In:</strong> ${product || 'General / Multi'}</p>
              <p><strong>Inquiry Type:</strong> ${inquiryType}</p>
              <p><strong>Message:</strong><br />${message.replace(/\n/g, '<br />')}</p>
            `,
          }),
        });
        if (!resendRes.ok) {
          console.warn('Resend email trigger failed status:', resendRes.status);
        }
      } catch (emailErr) {
        console.error('Error forwarding to email service:', emailErr);
      }
    }

    return NextResponse.json(
      {
        success: true,
        reference: inquiryRef,
        message: 'Your inquiry has been received by SRTRONIX Instruments.',
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error('Inquiry API error:', error);
    return NextResponse.json(
      { error: 'An unexpected server error occurred while processing your request.' },
      { status: 500 }
    );
  }
}

