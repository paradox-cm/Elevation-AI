import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData()
    const file: File | null = data.get('file') as unknown as File

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'File must be an image' }, { status: 400 })
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'File size must be less than 5MB' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Create filename with timestamp to avoid conflicts
    const timestamp = Date.now()
    const extension = file.name.split('.').pop()
    const filename = `${timestamp}.${extension}`
    
    // Ensure the blog directory exists
    const blogDir = join(process.cwd(), 'public', 'images', 'blog')
    if (!existsSync(blogDir)) {
      await mkdir(blogDir, { recursive: true })
    }

    // Save file to public/images/blog
    const path = join(blogDir, filename)
    await writeFile(path, buffer)

    // Return the public URL path
    const publicPath = `/images/blog/${filename}`

    return NextResponse.json({ 
      success: true, 
      path: publicPath,
      filename: filename 
    })

  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Failed to upload file' }, 
      { status: 500 }
    )
  }
}
