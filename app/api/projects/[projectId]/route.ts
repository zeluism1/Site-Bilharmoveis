import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '../../../../src/generated/prisma/client';
import { z } from 'zod';
import { unlink } from 'fs/promises';
import path from 'path';

const prisma = new PrismaClient();

// Zod schema for project update (all fields optional for partial updates)
const projectUpdateSchema = z.object({
  titlePT: z.string().optional().nullable(),
  titleEN: z.string().optional().nullable(),
  titleES: z.string().optional().nullable(),
  imageUrl: z.string().min(1, 'Image URL is required').optional(),
  location: z.string().optional().nullable(),
  descriptionPT: z.string().optional().nullable(),
  descriptionEN: z.string().optional().nullable(),
  descriptionES: z.string().optional().nullable(),
});

interface RouteContext {
  params: {
    projectId: string;
  }
}

export async function GET(req: NextRequest, { params }: RouteContext) {
  const { projectId } = params;
  if (!projectId) {
    return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
  }

  try {
    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }
    return NextResponse.json({ data: project });
  } catch (error) {
    console.error(`Error fetching project ${projectId}:`, error);
    return NextResponse.json({ error: `Failed to fetch project ${projectId}` }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: RouteContext) {
  const { projectId } = params;
  if (!projectId) {
    return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
  }

  try {
    const body = await req.json();
    const validation = projectUpdateSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ error: validation.error.format() }, { status: 400 });
    }
    
    const dataToUpdate = validation.data;

    const updatedProject = await prisma.project.update({
      where: { id: projectId },
      data: {
        titlePT: dataToUpdate.titlePT, // Allow setting to null/undefined
        titleEN: dataToUpdate.titleEN,
        titleES: dataToUpdate.titleES,
        ...(dataToUpdate.imageUrl && { imageUrl: dataToUpdate.imageUrl }),
        location: dataToUpdate.location,
        descriptionPT: dataToUpdate.descriptionPT,
        descriptionEN: dataToUpdate.descriptionEN,
        descriptionES: dataToUpdate.descriptionES,
      },
    });
    return NextResponse.json({ success: true, project: updatedProject });
  } catch (error) {
    console.error(`Error updating project ${projectId}:`, error);
    return NextResponse.json({ error: `Failed to update project ${projectId}` }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: RouteContext) {
  const { projectId } = params;
  if (!projectId) {
    return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
  }

  try {
    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    // Delete the project from the database
    await prisma.project.delete({
      where: { id: projectId },
    });

    // Delete the associated image file if it's a local file
    if (project.imageUrl.startsWith('/images/custom-projects/')) {
      const publicDir = path.join(process.cwd(), 'public');
      const fullImagePath = path.join(publicDir, project.imageUrl);
      try {
        await unlink(fullImagePath);
        console.log(`Deleted image file: ${fullImagePath}`);
      } catch (fileError) {
        console.error(`Failed to delete image file ${fullImagePath}:`, fileError);
        // Log error but don't fail the whole delete operation if only file deletion fails
      }
    }

    return NextResponse.json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    console.error(`Error deleting project ${projectId}:`, error);
    return NextResponse.json({ error: `Failed to delete project ${projectId}` }, { status: 500 });
  }
} 