import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export async function GET() {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const rows = await sql`
      SELECT player_name, 
             SUM(sips_drunk) as total_sips, 
             SUM(bids_won) as total_wins, 
             SUM(challenges_failed) as total_fails, 
             MAX(highest_bid) as max_bid
      FROM game_stats
      GROUP BY player_name
      ORDER BY total_wins DESC, total_sips DESC
    `;
    return NextResponse.json({ success: true, leaderboards: rows });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { players } = await request.json();
    const sql = neon(process.env.DATABASE_URL!);
    
    for (const p of players) {
      await sql`
        INSERT INTO game_stats (player_name, sips_drunk, bids_won, challenges_failed, total_passes, highest_bid)
        VALUES (${p.name}, ${p.sipsDrunk || 0}, ${p.bidsWon || 0}, ${p.challengesFailed || 0}, ${p.totalPasses || 0}, ${p.highestBidPlaced || 0})
      `;
    }
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
