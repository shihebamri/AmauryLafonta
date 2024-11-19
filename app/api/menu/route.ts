// app/api/menu/route.ts
export const dynamic = "force-dynamic";

import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

const menuFilePath = path.join(process.cwd(), 'menu.json');
const publicFolderPath = path.join(process.cwd(), 'public');

const readMenuData = () => {
  const fileData = fs.readFileSync(menuFilePath, 'utf8');
  return JSON.parse(fileData);
};

const writeMenuData = (data: any) => {
  fs.writeFileSync(menuFilePath, JSON.stringify(data, null, 2), 'utf8');
};

// GET: Fetch menu data
export async function GET() {
  const data = readMenuData();
  return NextResponse.json(data);
}

// POST: Add a new category or item, or handle image upload
export async function POST(req: Request) {
  const contentType = req.headers.get('content-type');

  // Handle JSON data for menu items or categories
  if (contentType?.includes('application/json')) {
    const { newItem, categoryName, addCategory } = await req.json();
    const data = readMenuData();

    if (addCategory) {
      // Add a new category
      data.categories.push({ name: categoryName, items: [] });
    } else {
      // Add item to existing category
      const category = data.categories.find((cat: any) => cat.name === categoryName);
      if (category) category.items.push(newItem);
    }

    writeMenuData(data);
    return NextResponse.json({ success: true });
  }

  // Handle form data for image uploads
  if (contentType?.includes('multipart/form-data')) {
    const form = await req.formData();
    const file = form.get("file") as File;

    if (file) {
      const randomName = `${uuidv4().substring(0, 9)}.${file.type.split("/")[1]}`;
      const buffer = Buffer.from(await file.arrayBuffer());
      fs.writeFileSync(path.join(publicFolderPath, randomName), buffer);
      return NextResponse.json({ success: true, imageUrl: `/${randomName}` });
    }

    return NextResponse.json({ success: false, error: "File upload failed" });
  }

  return NextResponse.json({ success: false, error: "Unsupported request" });
}

// DELETE: Delete an item or category
export async function DELETE(req: Request) {
  const { categoryIndex, itemIndex } = await req.json();
  const data = readMenuData();

  if (itemIndex !== undefined) {
    // Delete specific item in a category
    data.categories[categoryIndex].items.splice(itemIndex, 1);
  } else {
    // Delete entire category
    data.categories.splice(categoryIndex, 1);
  }

  writeMenuData(data);
  return NextResponse.json({ success: true });
}
