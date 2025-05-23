import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { mkdir } from 'fs/promises';

async function createDirectoryIfNotExists(directory: string) {
  try {
    await mkdir(directory, { recursive: true });
  } catch (error) {
    // Ignore error if directory already exists
    if ((error as NodeJS.ErrnoException).code !== 'EEXIST') {
      throw error;
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    const directory = join(process.cwd(), 'public', 'images', 'custom-projects');
    await createDirectoryIfNotExists(directory);

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create a unique filename
    const timestamp = Date.now();
    const uniqueFilename = `${timestamp}-${file.name.replace(/\s+/g, '_')}`;
    const filePath = join(directory, uniqueFilename);

    await writeFile(filePath, buffer);

    const publicPath = `/images/custom-projects/${uniqueFilename}`;
    return NextResponse.json({ success: true, url: publicPath });
  } catch (error) {
    console.error('Error uploading project image:', error);
    return NextResponse.json(
      { error: 'Failed to upload project image' },
      { status: 500 }
    );
  }
} 