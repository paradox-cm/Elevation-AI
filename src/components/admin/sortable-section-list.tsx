"use client"

import React from 'react'
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { PageSection } from '@/types/cms'
import { 
  GripVertical, 
  Edit, 
  Trash2, 
  FileText, 
  Image, 
  Type, 
  Layout 
} from 'lucide-react'

interface SortableSectionItemProps {
  section: PageSection
  onEdit: (section: PageSection) => void
  onDelete: (section: PageSection) => void
}

function SortableSectionItem({ section, onEdit, onDelete }: SortableSectionItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  const getSectionIcon = (type: string) => {
    switch (type) {
      case 'hero-typewriter': return <Layout className="h-4 w-4" />
      case 'problem-cards': return <FileText className="h-4 w-4" />
      case 'cta': return <Type className="h-4 w-4" />
      case 'platform-features': return <Image className="h-4 w-4" />
      case 'solutions-carousel': return <FileText className="h-4 w-4" />
      case 'logo-carousel': return <Image className="h-4 w-4" />
      case 'introduction-accordion': return <Type className="h-4 w-4" />
      case 'approach-cards': return <FileText className="h-4 w-4" />
      default: return <FileText className="h-4 w-4" />
    }
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors ${
        isDragging ? 'shadow-lg' : ''
      }`}
    >
      <div
        {...attributes}
        {...listeners}
        className="cursor-move p-1 hover:bg-muted rounded"
      >
        <GripVertical className="h-4 w-4 text-muted-foreground" />
      </div>
      
      {getSectionIcon(section.section_type)}
      
      <div className="flex-1">
        <div className="font-medium text-sm">{section.section_type}</div>
        <div className="text-xs text-muted-foreground">
          {section.title || 'Untitled section'}
        </div>
      </div>
      
      <Badge variant="outline" className="text-xs">
        {section.is_published ? 'Published' : 'Draft'}
      </Badge>
      
      <div className="flex items-center space-x-1">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => onEdit(section)}
          title="Edit section"
        >
          <Edit className="h-3 w-3" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-destructive"
          onClick={() => onDelete(section)}
          title="Delete section"
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>
    </div>
  )
}

interface SortableSectionListProps {
  sections: PageSection[]
  onReorder: (sections: PageSection[]) => void
  onEdit: (section: PageSection) => void
  onDelete: (section: PageSection) => void
}

export function SortableSectionList({ 
  sections, 
  onReorder, 
  onEdit, 
  onDelete 
}: SortableSectionListProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event: { active: { id: string }; over: { id: string } }) => {
    const { active, over } = event

    if (active.id !== over.id) {
      const oldIndex = sections.findIndex(section => section.id === active.id)
      const newIndex = sections.findIndex(section => section.id === over.id)
      
      const reorderedSections = arrayMove(sections, oldIndex, newIndex)
      
      // Update section_order for all sections
      const updatedSections = reorderedSections.map((section, index) => ({
        ...section,
        section_order: index + 1
      }))
      
      onReorder(updatedSections)
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={sections.map(s => s.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-3">
          {sections.map((section) => (
            <SortableSectionItem
              key={section.id}
              section={section}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  )
}
