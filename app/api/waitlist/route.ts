import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
    try {
        const { email } = await req.json();

        if (!email || !email.includes('@')) {
            return NextResponse.json(
                { error: 'Invalid email address provided.' },
                { status: 400 }
            );
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_APP_PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: process.env.GMAIL_USER, // Send to yourself
            subject: `[AssembleOne Waitlist] New Sign U: ${email}`,
            text: `You have a new waitlist verification form submission!\n\nEmail: ${email}\nTime: ${new Date().toISOString()}`,
            html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2 style="color: #4f46e5;">New Waitlist Sign Up! 🚀</h2>
          <p>You have received a new waitlist submission for AssembleOne.</p>
          <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; font-size: 16px;"><strong>Email:</strong> ${email}</p>
          </div>
          <p style="color: #6b7280; font-size: 12px;">Submitted at: ${new Date().toLocaleString()}</p>
        </div>
      `
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json(
            { message: 'Email submitted successfully.' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Waitlist API Error:', error);
        return NextResponse.json(
            { error: 'Failed to submit email. Please try again later.' },
            { status: 500 }
        );
    }
}
