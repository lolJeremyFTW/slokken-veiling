import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export async function GET() {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const rows = await sql`SELECT * FROM custom_dares ORDER BY created_at DESC`;
    return NextResponse.json({ success: true, dares: rows });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { id, type, title, description } = await request.json();
    const sql = neon(process.env.DATABASE_URL!);
    await sql`
      INSERT INTO custom_dares (id, type, title, description)
      VALUES (${id}, ${type}, ${title}, ${description})
      ON CONFLICT (id) DO NOTHING
    `;
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
