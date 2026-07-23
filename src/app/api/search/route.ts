import { NextResponse } from 'next/server';
import { getSearchIndex } from '@/lib/search';

export async function GET() {
  try {
    const data = await getSearchIndex();
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
