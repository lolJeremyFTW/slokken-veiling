import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export async function GET() {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const rows = await sql`SELECT * FROM custom_categories ORDER BY created_at DESC`;
    return NextResponse.json({ success: true, categories: rows });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { id, title, categoryName, description, defaultTimeSeconds } = await request.json();
    const sql = neon(process.env.DATABASE_URL!);
    await sql`
      INSERT INTO custom_categories (id, title, category_name, description, default_time_seconds)
      VALUES (${id}, ${title}, ${categoryName}, ${description}, ${defaultTimeSeconds || 15})
      ON CONFLICT (id) DO NOTHING
    `;
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
