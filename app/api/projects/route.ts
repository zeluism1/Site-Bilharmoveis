import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '../../../src/generated/prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

// Zod schema for project creation/update
const projectSchema = z.object({
  titlePT: z.string().optional().nullable(),
  titleEN: z.string().optional().nullable(),
  titleES: z.string().optional().nullable(),
  imageUrl: z.string().min(1, 'Image URL is required'),
  location: z.string().optional().nullable(),
  descriptionPT: z.string().optional().nullable(),
  descriptionEN: z.string().optional().nullable(),
  descriptionES: z.string().optional().nullable(),
});

export async function GET(req: NextRequest) {
  try {
    const projects = await prisma.project.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json({ data: projects });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = projectSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ error: validation.error.format() }, { status: 400 });
    }

    const data = validation.data;
    const newProject = await prisma.project.create({
      data: {
        titlePT: data.titlePT,
        titleEN: data.titleEN,
        titleES: data.titleES,
        imageUrl: data.imageUrl,
        location: data.location,
        descriptionPT: data.descriptionPT,
        descriptionEN: data.descriptionEN,
        descriptionES: data.descriptionES,
      },
    });
    return NextResponse.json({ success: true, project: newProject }, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
} 