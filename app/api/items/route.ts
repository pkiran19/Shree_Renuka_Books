import { NextResponse } from 'next/server';
import { getStoredItems } from '@/lib/store';

export const dynamic = 'force-static';

export async function GET() {
  const items = getStoredItems();
  return NextResponse.json({ success: true, count: items.length, items });
}
