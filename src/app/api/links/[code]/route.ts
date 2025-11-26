// src/app/api/links/[code]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Next.js 15/16: params is a Promise in route handlers
type Params = Promise<{ code: string }>

// GET /api/links/:code - Get stats for one code
export async function GET(
  _req: NextRequest,
  context: { params: Params }
) {
  const { code } = await context.params

  try {
    const link = await prisma.link.findUnique({
      where: { code },
    })

    if (!link) {
      return NextResponse.json(
        { error: 'Link not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(link, { status: 200 })
  } catch (error) {
    console.error('Error fetching link:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE /api/links/:code - Delete link
export async function DELETE(
  _req: NextRequest,
  context: { params: Params }
) {
  const { code } = await context.params

  try {
    await prisma.link.delete({
      where: { code },
    })

    return NextResponse.json(
      { message: 'Link deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Link not found' },
      { status: 404 }
    )
  }
}
