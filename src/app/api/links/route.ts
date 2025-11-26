import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { nanoid } from 'nanoid'

// Validation schema
const createLinkSchema = z.object({
  targetUrl: z.string().url('Invalid URL format'),
  code: z
    .string()
    .regex(/^[A-Za-z0-9]{6,8}$/, 'Code must be 6-8 alphanumeric characters')
    .optional(),
})

// POST /api/links - Create new link
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validation = createLinkSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.issues[0].message },
        { status: 400 }
      )
    }

    const { targetUrl, code } = validation.data

    // Generate code if not provided
    const shortCode = code || nanoid(6)

    // Check if code already exists
    const existing = await prisma.link.findUnique({
      where: { code: shortCode },
    })

    if (existing) {
      return NextResponse.json(
        { error: 'Short code already exists' },
        { status: 409 }
      )
    }

    // Create link
    const link = await prisma.link.create({
      data: {
        code: shortCode,
        targetUrl,
      },
    })

    return NextResponse.json(link, { status: 201 })
  } catch (error) {
    console.error('Error creating link:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// GET /api/links - List all links
export async function GET() {
  try {
    const links = await prisma.link.findMany({
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(links, { status: 200 })
  } catch (error) {
    console.error('Error fetching links:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

