"use client"

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Media } from '@/types/cms'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { LoadingSpinner } from '@/components/ui/loading'
import { Input } from '@/components/ui/input'
import { 
  Plus, 
  Search, 
  Trash2, 
  Image,
  File,
  Download,
  Calendar,
  Upload
} from 'lucide-react'
import NextImage from 'next/image'

export default function MediaPage() {
  const [media, setMedia] = useState<Media[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const supabase = createClient()

  const fetchMedia = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('media')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching media:', error)
      } else {
        setMedia(data || [])
      }
    } catch (error) {
      console.error('Error fetching media:', error)
    } finally {
      setIsLoading(false)
    }
  }, [supabase])

  useEffect(() => {
    fetchMedia()
  }, [fetchMedia])

  const filteredMedia = media.filter(item =>
    item.original_filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.alt_text?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    setIsUploading(true)

    try {
      for (const file of Array.from(files)) {
        // Upload file to Supabase Storage
        const fileExt = file.name.split('.').pop()
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
        const filePath = `media/${fileName}`

        const { error: uploadError } = await supabase.storage
          .from('media')
          .upload(filePath, file)

        if (uploadError) {
          console.error('Error uploading file:', uploadError)
          continue
        }

        // Get public URL
        const { data: urlData } = supabase.storage
          .from('media')
          .getPublicUrl(filePath)

        // Save metadata to database
        const { error: dbError } = await supabase
          .from('media')
          .insert({
            filename: fileName,
            original_filename: file.name,
            mime_type: file.type,
            size: file.size,
            url: urlData.publicUrl,
            uploaded_by: (await supabase.auth.getUser()).data.user?.id || ''
          })

        if (dbError) {
          console.error('Error saving file metadata:', dbError)
        }
      }

      // Refresh the media list
      fetchMedia()
    } catch (error) {
      console.error('Error uploading files:', error)
    } finally {
      setIsUploading(false)
    }
  }

  const handleDeleteMedia = async (mediaId: string, filename: string) => {
    if (!confirm('Are you sure you want to delete this media file?')) return

    try {
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('media')
        .remove([filename])

      if (storageError) {
        console.error('Error deleting from storage:', storageError)
      }

      // Delete from database
      const { error: dbError } = await supabase
        .from('media')
        .delete()
        .eq('id', mediaId)

      if (dbError) {
        console.error('Error deleting from database:', dbError)
        alert('Error deleting media file')
      } else {
        fetchMedia() // Refresh the list
      }
    } catch (error) {
      console.error('Error deleting media:', error)
      alert('Error deleting media file')
    }
  }

  const isImage = (mimeType: string) => {
    return mimeType.startsWith('image/')
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" text="Loading media..." variant="css" />
      </div>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">Media Library</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Manage your uploaded images and files</p>
        </div>
        <div className="relative w-full sm:w-auto">
          <input
            type="file"
            multiple
            onChange={handleFileUpload}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={isUploading}
          />
          <Button disabled={isUploading} className="w-full sm:w-auto">
            {isUploading ? (
              <>
                <Upload className="h-4 w-4 mr-2 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Plus className="h-4 w-4 mr-2" />
                Upload Files
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-4 sm:pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search media files..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Media Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-6">
        {filteredMedia.map((item) => (
          <Card key={item.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="aspect-square bg-muted rounded-lg overflow-hidden mb-3">
                {isImage(item.mime_type) ? (
                  <NextImage
                    src={item.url}
                    alt={item.alt_text || item.original_filename}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <File className="h-12 w-12 text-muted-foreground" />
                  </div>
                )}
              </div>
              <CardTitle className="text-sm line-clamp-2">
                {item.original_filename}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{formatFileSize(item.size)}</span>
                  <span>{item.mime_type.split('/')[1]?.toUpperCase()}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>{formatDate(item.created_at)}</span>
                </div>

                {item.alt_text && (
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {item.alt_text}
                  </p>
                )}

                <div className="flex items-center space-x-2 pt-2">
                  <Button variant="outline" size="sm" asChild className="flex-1">
                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                      <Download className="h-3 w-3 mr-1" />
                      View
                    </a>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDeleteMedia(item.id, item.filename)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredMedia.length === 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              {/* eslint-disable-next-line jsx-a11y/alt-text -- Lucide React icon, not an image */}
              <Image className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                {searchTerm ? 'No media found' : 'No media files yet'}
              </h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm 
                  ? 'Try adjusting your search terms'
                  : 'Upload your first image or file to get started'
                }
              </p>
              {!searchTerm && (
                <div className="relative">
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    disabled={isUploading}
                  />
                  <Button disabled={isUploading}>
                    {isUploading ? (
                      <>
                        <Upload className="h-4 w-4 mr-2 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4 mr-2" />
                        Upload Files
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
