import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

type Params = Promise<{ code: string }>

export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
  const { code } = await params

  const link = await prisma.link.findUnique({
    where: { code },
  })

  if (!link) {
    return NextResponse.json(
      { error: 'Link not found' },
      { status: 404 }
    )
  }

  await prisma.link.update({
    where: { code },
    data: {
      totalClicks: { increment: 1 },
      lastClicked: new Date(),
    },
  })

  return NextResponse.redirect(link.targetUrl, { status: 302 })
}
