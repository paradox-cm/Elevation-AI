import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { data: todo, error } = await supabase
      .from('admin_todos')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching todo:', error)
      return NextResponse.json({ error: 'Todo not found' }, { status: 404 })
    }

    return NextResponse.json({ todo })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { title, description, phase, category, status, priority, estimated_effort, tags, dependencies, notes } = body

    const updateData: any = {
      updated_at: new Date().toISOString()
    }

    // Only update fields that are provided
    if (title !== undefined) updateData.title = title
    if (description !== undefined) updateData.description = description
    if (phase !== undefined) updateData.phase = phase
    if (category !== undefined) updateData.category = category
    if (status !== undefined) updateData.status = status
    if (priority !== undefined) updateData.priority = priority
    if (estimated_effort !== undefined) updateData.estimated_effort = estimated_effort
    if (tags !== undefined) updateData.tags = tags
    if (dependencies !== undefined) updateData.dependencies = dependencies
    if (notes !== undefined) updateData.notes = notes

    const { data: todo, error } = await supabase
      .from('admin_todos')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating todo:', error)
      return NextResponse.json({ error: 'Failed to update todo' }, { status: 500 })
    }

    return NextResponse.json({ todo })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { error } = await supabase
      .from('admin_todos')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting todo:', error)
      return NextResponse.json({ error: 'Failed to delete todo' }, { status: 500 })
    }

    return NextResponse.json({ message: 'Todo deleted successfully' })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
