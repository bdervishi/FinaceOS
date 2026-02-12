import { NextRequest, NextResponse } from 'next/server'

const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY
const FINNHUB_BASE_URL = 'https://finnhub.io/api/v1'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const symbol = searchParams.get('symbol') || 'AAPL'
    const endpoint = searchParams.get('endpoint') || 'quote'

    const response = await fetch(
      `${FINNHUB_BASE_URL}/${endpoint}?symbol=${symbol}&token=${FINNHUB_API_KEY}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    const result = await response.json()

    if (!response.ok) {
      return NextResponse.json({ error: result }, { status: response.status })
    }

    return NextResponse.json({
      symbol,
      endpoint,
      data: result,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Finnhub API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { symbols } = await request.json()

    if (!symbols || !Array.isArray(symbols)) {
      return NextResponse.json(
        { error: 'Symbols array is required' },
        { status: 400 }
      )
    }

    const quotes = await Promise.all(
      symbols.map(async (symbol: string) => {
        const response = await fetch(
          `${FINNHUB_BASE_URL}/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`
        )
        const data = await response.json()
        return { symbol, ...data }
      })
    )

    return NextResponse.json({ quotes })
  } catch (error) {
    console.error('Portfolio API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
