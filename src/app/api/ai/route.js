import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { userQuery } = await request.json();
    console.log('Received user query:', userQuery);

    // Simulate an AI response
    const aiAnswer = `Hello! You asked: "${userQuery}". This is a simulated AI response.`;

    return NextResponse.json({ answer: aiAnswer });
  } catch (error) {
    console.error('Error processing AI request:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}