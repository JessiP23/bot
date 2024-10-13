import { NextResponse } from 'next/server';
import { executeTrade } from '@/app/lib/tradingBot';

export async function POST(request) {
  const { symbol, amount } = await request.json();
  const result = await executeTrade(symbol, amount);
  return NextResponse.json(result);
}