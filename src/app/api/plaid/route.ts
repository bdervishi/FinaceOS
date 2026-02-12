import { NextRequest, NextResponse } from 'next/server'

// Plaid API configuration
const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID
const PLAID_SECRET = process.env.PLAID_SECRET
const PLAID_ENV = process.env.PLAID_ENV || 'sandbox'

const PLAID_BASE_URL = PLAID_ENV === 'production'
  ? 'https://production.plaid.com'
  : PLAID_ENV === 'development'
  ? 'https://development.plaid.com'
  : 'https://sandbox.plaid.com'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { endpoint, data } = body

    const response = await fetch(`${PLAID_BASE_URL}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: PLAID_CLIENT_ID,
        secret: PLAID_SECRET,
        ...data,
      }),
    })

    const result = await response.json()

    if (!response.ok) {
      return NextResponse.json({ error: result }, { status: response.status })
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Plaid API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Plaid API endpoint. Use POST to make requests.',
    available_endpoints: [
      'link/token/create',
      'item/public_token/exchange',
      'accounts/get',
      'transactions/get',
      'investments/holdings/get',
    ],
  })
}
