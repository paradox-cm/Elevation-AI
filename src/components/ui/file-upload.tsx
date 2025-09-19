"use client"

import React, { useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Upload, X, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FileUploadProps {
  onFileSelect: (file: File) => void
  onFileUpload: (file: File) => Promise<string>
  accept?: string
  maxSize?: number // in MB
  className?: string
  disabled?: boolean
  label?: string
  description?: string
}

export function FileUpload({ 
  onFileSelect, 
  onFileUpload, 
  accept = "image/*", 
  maxSize = 5,
  className,
  disabled = false,
  label = "Upload Logo",
  description = "PNG, JPG, SVG up to"
}: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [uploadedPath, setUploadedPath] = useState<string>('')
  const [error, setError] = useState<string>('')

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setError('')

    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      setError(`File size must be less than ${maxSize}MB`)
      return
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file')
      return
    }

    setUploadedFile(file)
    onFileSelect(file)

    // Auto-upload the file
    setIsUploading(true)
    try {
      const path = await onFileUpload(file)
      setUploadedPath(path)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setIsUploading(false)
    }
  }

  const handleRemoveFile = () => {
    setUploadedFile(null)
    setUploadedPath('')
    setError('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleButtonClick = () => {
    if (!disabled) {
      fileInputRef.current?.click()
    }
  }

  return (
    <div className={cn("space-y-2", className)}>
      <Input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileSelect}
        className="hidden"
        disabled={disabled}
      />
      
      {!uploadedFile ? (
        <Button
          type="button"
          variant="outline"
          onClick={handleButtonClick}
          disabled={disabled || isUploading}
          className="w-full h-16 border-dashed border-2 hover:border-primary/50"
        >
          <div className="flex items-center gap-3">
            <Upload className="h-5 w-5 text-muted-foreground" />
            <div className="text-left">
              <div className="text-sm font-medium">
                {isUploading ? 'Uploading...' : label}
              </div>
              <div className="text-xs text-muted-foreground">
                {description} {maxSize}MB
              </div>
            </div>
          </div>
        </Button>
      ) : (
        <div className="flex items-center gap-3 p-3 border rounded-lg bg-muted/50">
          <div className="w-12 h-12 bg-background rounded border flex items-center justify-center flex-shrink-0">
            {uploadedFile.type.startsWith('image/') ? (
              <img
                src={URL.createObjectURL(uploadedFile)}
                alt="Preview"
                className="w-10 h-10 object-contain"
              />
            ) : (
              <Upload className="h-5 w-5 text-muted-foreground" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{uploadedFile.name}</p>
            <p className="text-xs text-muted-foreground">
              {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
            </p>
            {uploadedPath && (
              <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                <Check className="h-3 w-3" />
                Uploaded successfully
              </p>
            )}
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleRemoveFile}
            disabled={isUploading}
            className="flex-shrink-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}

      {uploadedPath && (
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">File Path:</Label>
          <Input
            value={uploadedPath}
            readOnly
            className="text-xs font-mono"
          />
        </div>
      )}
    </div>
  )
}
