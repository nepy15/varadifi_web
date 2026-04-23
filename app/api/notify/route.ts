import { NextRequest, NextResponse } from "next/server";
import admin from '@/lib/firebaseAdmin';

export async function POST(req: NextRequest) {
    const { topic, title, body, data } = await req.json();

    if (!topic || !title || !body) {
        return NextResponse.json(
            { error : "topic, title and body are required" },
            { status : 400 }
        );
    }

    try {
        const message: admin.messaging.Message = {
            topic,
            notification: { title, body },
            ...(data && { data }),
        };

        const response = await admin.messaging().send(message);

        return NextResponse.json({ success: true, messageId: response });
    } catch (err: any) {
        console.error("FCM error: ", err);

        return NextResponse.json(
            { error: err.message ?? "Failed to send notification" },
            { status: 500 }
        );
    }
}