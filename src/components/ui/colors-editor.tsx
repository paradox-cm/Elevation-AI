"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useColorsConfig } from '@/hooks/use-colors-config'
import { ColorPalette, SemanticColor } from '@/lib/colors-config'

interface ColorsEditorProps {
  onConfigChange?: (config: { 
    colorPalettes: ColorPalette[]
    semanticColors: SemanticColor[]
  }) => void
  showLivePreview?: boolean
}

export function ColorsEditor({ onConfigChange, showLivePreview = true }: ColorsEditorProps) {
  const {
    colorPalettes,
    semanticColors,
    updateColorPalettes,
    updateSemanticColors,
    resetToDefaults
  } = useColorsConfig()

  const [editingPalettes, setEditingPalettes] = useState<ColorPalette[]>(colorPalettes)
  const [editingSemanticColors, setEditingSemanticColors] = useState<SemanticColor[]>(semanticColors)

  // Update local state when config changes
  const handlePaletteChange = (updatedPalettes: ColorPalette[]) => {
    setEditingPalettes(updatedPalettes)
    updateColorPalettes(updatedPalettes)
    onConfigChange?.({
      colorPalettes: updatedPalettes,
      semanticColors: editingSemanticColors
    })
  }

  const handleSemanticColorChange = (updatedColors: SemanticColor[]) => {
    setEditingSemanticColors(updatedColors)
    updateSemanticColors(updatedColors)
    onConfigChange?.({
      colorPalettes: editingPalettes,
      semanticColors: updatedColors
    })
  }

  const updatePaletteShade = (paletteIndex: number, shadeIndex: number, hex: string) => {
    const updatedPalettes = [...editingPalettes]
    updatedPalettes[paletteIndex].shades[shadeIndex].hex = hex
    handlePaletteChange(updatedPalettes)
  }

  const updatePaletteProperty = (paletteIndex: number, property: keyof ColorPalette, value: string | boolean) => {
    const updatedPalettes = [...editingPalettes]
    const palette = updatedPalettes[paletteIndex]
    
    if (property === 'name' && typeof value === 'string') {
      palette.name = value
    } else if (property === 'hex' && typeof value === 'string') {
      palette.hex = value
    } else if (property === 'description' && typeof value === 'string') {
      palette.description = value
    } else if (property === 'usage' && typeof value === 'string') {
      palette.usage = value
    } else if (property === 'isPrimary' && typeof value === 'boolean') {
      palette.isPrimary = value
    } else if (property === 'isBrand' && typeof value === 'boolean') {
      palette.isBrand = value
    }
    
    handlePaletteChange(updatedPalettes)
  }

  const updateSemanticColorProperty = (colorIndex: number, property: keyof SemanticColor, value: string) => {
    const updatedColors = [...editingSemanticColors]
    const color = updatedColors[colorIndex]
    
    if (property === 'name') {
      color.name = value
    } else if (property === 'class') {
      color.class = value
    } else if (property === 'description') {
      color.description = value
    } else if (property === 'usage') {
      color.usage = value
    } else if (property === 'lightValue') {
      color.lightValue = value
    } else if (property === 'darkValue') {
      color.darkValue = value
    }
    
    handleSemanticColorChange(updatedColors)
  }

  const handleReset = () => {
    resetToDefaults()
    setEditingPalettes(colorPalettes)
    setEditingSemanticColors(semanticColors)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Colors Configuration Editor</h3>
          <p className="text-sm text-muted-foreground">
            Edit color palettes and semantic colors. Changes are applied in real-time.
          </p>
        </div>
        <Button variant="outline" onClick={handleReset}>
          Reset to Defaults
        </Button>
      </div>

      <Tabs defaultValue="palettes" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="palettes">Color Palettes</TabsTrigger>
          <TabsTrigger value="semantic">Semantic Colors</TabsTrigger>
        </TabsList>

        <TabsContent value="palettes" className="space-y-6">
          <div className="grid gap-6">
            {editingPalettes.map((palette, paletteIndex) => (
              <Card key={palette.color}>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-6 h-6 rounded border"
                      style={{ backgroundColor: palette.hex }}
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Input
                          value={palette.name}
                          onChange={(e) => updatePaletteProperty(paletteIndex, 'name', e.target.value)}
                          className="w-48"
                        />
                        <Input
                          value={palette.hex}
                          onChange={(e) => updatePaletteProperty(paletteIndex, 'hex', e.target.value)}
                          className="w-24"
                          placeholder="#000000"
                        />
                        {palette.isPrimary && <Badge variant="secondary">Primary</Badge>}
                        {palette.isBrand && <Badge variant="outline">Brand</Badge>}
                      </div>
                      <Input
                        value={palette.description || ''}
                        onChange={(e) => updatePaletteProperty(paletteIndex, 'description', e.target.value)}
                        placeholder="Description"
                        className="mt-2"
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-10 gap-2">
                    {palette.shades.map((shade, shadeIndex) => (
                      <div key={shade.shade} className="space-y-2">
                        <div className="text-xs text-center font-mono text-muted-foreground">
                          {shade.shade}
                        </div>
                        <div 
                          className="h-16 rounded-md border cursor-pointer"
                          style={{ backgroundColor: shade.hex }}
                          onClick={() => {
                            const newHex = prompt(`Enter hex for ${palette.name} ${shade.shade}:`, shade.hex)
                            if (newHex) {
                              updatePaletteShade(paletteIndex, shadeIndex, newHex)
                            }
                          }}
                        />
                        <Input
                          value={shade.hex}
                          onChange={(e) => updatePaletteShade(paletteIndex, shadeIndex, e.target.value)}
                          className="text-xs h-6"
                          placeholder="#000000"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="semantic" className="space-y-6">
          <div className="grid gap-4">
            {editingSemanticColors.map((color, colorIndex) => (
              <Card key={color.class}>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <Label className="w-20 text-sm">Name:</Label>
                        <Input
                          value={color.name}
                          onChange={(e) => updateSemanticColorProperty(colorIndex, 'name', e.target.value)}
                          className="flex-1"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <Label className="w-20 text-sm">Class:</Label>
                        <Input
                          value={color.class}
                          onChange={(e) => updateSemanticColorProperty(colorIndex, 'class', e.target.value)}
                          className="flex-1"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-xs text-muted-foreground">Light:</div>
                      <Input
                        value={color.lightValue}
                        onChange={(e) => updateSemanticColorProperty(colorIndex, 'lightValue', e.target.value)}
                        className="w-20"
                        placeholder="#000000"
                      />
                      <div className="text-xs text-muted-foreground">Dark:</div>
                      <Input
                        value={color.darkValue}
                        onChange={(e) => updateSemanticColorProperty(colorIndex, 'darkValue', e.target.value)}
                        className="w-20"
                        placeholder="#000000"
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Input
                      value={color.description}
                      onChange={(e) => updateSemanticColorProperty(colorIndex, 'description', e.target.value)}
                      placeholder="Description"
                    />
                    <Input
                      value={color.usage}
                      onChange={(e) => updateSemanticColorProperty(colorIndex, 'usage', e.target.value)}
                      placeholder="Usage guidelines"
                    />
                  </div>
                  {showLivePreview && (
                    <div className="mt-4 p-4 rounded-lg border">
                      <div className="text-sm font-medium mb-2">Preview:</div>
                      <div className="flex items-center gap-4">
                        <div 
                          className="w-16 h-8 rounded border"
                          style={{ backgroundColor: color.lightValue }}
                        />
                        <span className="text-xs">Light theme</span>
                        <div 
                          className="w-16 h-8 rounded border"
                          style={{ backgroundColor: color.darkValue }}
                        />
                        <span className="text-xs">Dark theme</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
