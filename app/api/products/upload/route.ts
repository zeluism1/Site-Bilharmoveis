import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const category = formData.get('category') as string;
    const subcategory = formData.get('subcategory') as string;
    const modelName = formData.get('modelName') as string;

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Create the directory path based on category structure
    const directory = join(process.cwd(), 'public', 'images', 'products', category, subcategory, modelName);
    
    // Convert the file to a Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Ensure the directory exists
    await createDirectoryIfNotExists(directory);

    // Write the file
    const filePath = join(directory, file.name);
    await writeFile(filePath, buffer);

    // Return the public URL
    const publicPath = `/images/products/${category}/${subcategory}/${modelName}/${file.name}`;

    return NextResponse.json({ url: publicPath });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}

async function createDirectoryIfNotExists(directory: string) {
  const { mkdir } = await import('fs/promises');
  try {
    await mkdir(directory, { recursive: true });
  } catch (error) {
    if ((error as any).code !== 'EEXIST') {
      throw error;
    }
  }
} 