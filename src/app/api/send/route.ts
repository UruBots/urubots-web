import {EmailTemplate} from "@/components/EmailTemplate";
import { Resend } from 'resend';
import {NextRequest, NextResponse} from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(req: NextRequest) {
    return NextResponse.json(
        { message: "this is a get request" },
        { status: 200 }
    );
}

export async function POST(request: NextRequest) {
    try {
        const { name, email, message } = await request.json();
        const { data, error } = await resend.emails.send({
            from: 'admin urubot <admin@urubots.uy>',
            to: ['urubots.itrn@gmail.com'],
            subject: 'Nuevo Mensaje desde UruBots.uy',
            react: EmailTemplate({ name, email, message }),
        });

        if (error) {
            return NextResponse.json({ error }, { status: 500 });
        }

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}
