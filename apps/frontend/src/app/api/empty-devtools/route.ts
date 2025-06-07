import { NextResponse } from 'next/server'

export async function GET() {
    // Return an empty response for the DevTools request
    return new NextResponse(null, { status: 204 })
}
