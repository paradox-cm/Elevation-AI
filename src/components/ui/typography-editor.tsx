"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { H3, P } from "@/components/ui/typography"
import Icon from "@/components/ui/icon"
import { 
  typeScale, 
  fontWeights, 
  fontFamilies, 
  TypeScaleItem,
  FontWeight,
  FontFamily 
} from "@/lib/typography-config"

interface TypographyEditorProps {
  onConfigChange?: (config: {
    typeScale: TypeScaleItem[]
    fontWeights: FontWeight[]
    fontFamilies: FontFamily[]
  }) => void
  showLivePreview?: boolean
}

export function TypographyEditor({ onConfigChange, showLivePreview = true }: TypographyEditorProps) {
  const [localTypeScale, setLocalTypeScale] = useState<TypeScaleItem[]>(typeScale)
  const [localFontWeights, setLocalFontWeights] = useState<FontWeight[]>(fontWeights)
  const [localFontFamilies, setLocalFontFamilies] = useState<FontFamily[]>(fontFamilies)
  const [activeTab, setActiveTab] = useState<'type-scale' | 'font-weights' | 'font-families'>('type-scale')

  // Update parent component when configuration changes
  useEffect(() => {
    if (onConfigChange) {
      onConfigChange({
        typeScale: localTypeScale,
        fontWeights: localFontWeights,
        fontFamilies: localFontFamilies
      })
    }
  }, [localTypeScale, localFontWeights, localFontFamilies, onConfigChange])

  const updateTypeScaleItem = (index: number, field: keyof TypeScaleItem, value: string) => {
    const updated = [...localTypeScale]
    updated[index] = { ...updated[index], [field]: value }
    setLocalTypeScale(updated)
  }

  const updateFontWeight = (index: number, field: keyof FontWeight, value: string) => {
    const updated = [...localFontWeights]
    updated[index] = { ...updated[index], [field]: value }
    setLocalFontWeights(updated)
  }

  const updateFontFamily = (index: number, field: keyof FontFamily, value: string) => {
    const updated = [...localFontFamilies]
    updated[index] = { ...updated[index], [field]: value }
    setLocalFontFamilies(updated)
  }

  const resetToDefaults = () => {
    setLocalTypeScale(typeScale)
    setLocalFontWeights(fontWeights)
    setLocalFontFamilies(fontFamilies)
  }

  return (
    <div className="space-y-6">
      {/* Editor Header */}
      <div className="flex items-center justify-between">
        <div>
          <H3>Typography Configuration Editor</H3>
          <P className="text-sm text-muted-foreground">
            Edit typography settings in real-time. Changes will be reflected across the entire application.
          </P>
        </div>
        <Button variant="outline" onClick={resetToDefaults}>
          <Icon name="refresh-line" className="h-4 w-4 mr-2" />
          Reset to Defaults
        </Button>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg">
        <Button
          variant={activeTab === 'type-scale' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveTab('type-scale')}
        >
          Type Scale
        </Button>
        <Button
          variant={activeTab === 'font-weights' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveTab('font-weights')}
        >
          Font Weights
        </Button>
        <Button
          variant={activeTab === 'font-families' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveTab('font-families')}
        >
          Font Families
        </Button>
      </div>

      {/* Type Scale Editor */}
      {activeTab === 'type-scale' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="ruler-line" className="h-5 w-5" />
              Type Scale Configuration
            </CardTitle>
            <CardDescription>
              Configure the type scale that defines text sizes, weights, and spacing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {localTypeScale.map((item, index) => (
                <div key={index} className="space-y-4 p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <Label className="font-medium">{item.name}</Label>
                    <Badge variant="outline">{item.component}</Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs">Size Class</Label>
                      <Input
                        value={item.class}
                        onChange={(e) => updateTypeScaleItem(index, 'class', e.target.value)}
                        placeholder="text-6xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs">Weight</Label>
                      <Select value={item.weight} onValueChange={(value) => updateTypeScaleItem(index, 'weight', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {fontWeights.map((weight) => (
                            <SelectItem key={weight.class} value={weight.class}>
                              {weight.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs">Line Height</Label>
                      <Select value={item.lineHeight} onValueChange={(value) => updateTypeScaleItem(index, 'lineHeight', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="leading-none">None</SelectItem>
                          <SelectItem value="leading-tight">Tight</SelectItem>
                          <SelectItem value="leading-snug">Snug</SelectItem>
                          <SelectItem value="leading-normal">Normal</SelectItem>
                          <SelectItem value="leading-relaxed">Relaxed</SelectItem>
                          <SelectItem value="leading-loose">Loose</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs">Tracking</Label>
                      <Select value={item.tracking} onValueChange={(value) => updateTypeScaleItem(index, 'tracking', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tracking-tighter">Tighter</SelectItem>
                          <SelectItem value="tracking-tight">Tight</SelectItem>
                          <SelectItem value="tracking-normal">Normal</SelectItem>
                          <SelectItem value="tracking-wide">Wide</SelectItem>
                          <SelectItem value="tracking-wider">Wider</SelectItem>
                          <SelectItem value="tracking-widest">Widest</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs">Usage Description</Label>
                    <Input
                      value={item.usage}
                      onChange={(e) => updateTypeScaleItem(index, 'usage', e.target.value)}
                      placeholder="Usage description"
                    />
                  </div>

                  {showLivePreview && (
                    <div className="space-y-2">
                      <Label className="text-xs">Live Preview</Label>
                      <div className={`${item.class} ${item.weight} ${item.lineHeight} ${item.tracking} p-3 bg-muted/20 rounded border`}>
                        {item.example}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Font Weights Editor */}
      {activeTab === 'font-weights' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="bold" className="h-5 w-5" />
              Font Weights Configuration
            </CardTitle>
            <CardDescription>
              Configure available font weights for the Helvetica Now variable font
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {localFontWeights.map((weight, index) => (
                <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                  <div className="space-y-2 flex-1">
                    <Label className="text-xs">Weight Value</Label>
                    <Input
                      value={weight.weight}
                      onChange={(e) => updateFontWeight(index, 'weight', e.target.value)}
                      placeholder="400"
                    />
                  </div>
                  <div className="space-y-2 flex-1">
                    <Label className="text-xs">Display Name</Label>
                    <Input
                      value={weight.name}
                      onChange={(e) => updateFontWeight(index, 'name', e.target.value)}
                      placeholder="Regular"
                    />
                  </div>
                  <div className="space-y-2 flex-1">
                    <Label className="text-xs">CSS Class</Label>
                    <Input
                      value={weight.class}
                      onChange={(e) => updateFontWeight(index, 'class', e.target.value)}
                      placeholder="font-normal"
                    />
                  </div>
                  {showLivePreview && (
                    <div className="space-y-2 flex-1">
                      <Label className="text-xs">Preview</Label>
                      <div className={`${weight.class} text-lg p-2 bg-muted/20 rounded border`}>
                        The quick brown fox
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Font Families Editor */}
      {activeTab === 'font-families' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="font-family" className="h-5 w-5" />
              Font Families Configuration
            </CardTitle>
            <CardDescription>
              Configure available font families and their usage guidelines
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {localFontFamilies.map((font, index) => (
                <div key={index} className="space-y-4 p-4 border rounded-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs">Font Name</Label>
                      <Input
                        value={font.name}
                        onChange={(e) => updateFontFamily(index, 'name', e.target.value)}
                        placeholder="Helvetica Now"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs">CSS Class</Label>
                      <Input
                        value={font.class}
                        onChange={(e) => updateFontFamily(index, 'class', e.target.value)}
                        placeholder="font-sans"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-xs">Description</Label>
                    <Input
                      value={font.description}
                      onChange={(e) => updateFontFamily(index, 'description', e.target.value)}
                      placeholder="Description of font usage"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs">Example Text</Label>
                    <Input
                      value={font.example}
                      onChange={(e) => updateFontFamily(index, 'example', e.target.value)}
                      placeholder="Example text to display"
                    />
                  </div>

                  {showLivePreview && (
                    <div className="space-y-2">
                      <Label className="text-xs">Live Preview</Label>
                      <div className={`${font.class} text-lg p-3 bg-muted/20 rounded border`}>
                        {font.example}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Configuration Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="information-line" className="h-5 w-5" />
            Configuration Summary
          </CardTitle>
          <CardDescription>
            Current typography configuration that will be applied globally
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Type Scale Items</Label>
              <Badge variant="secondary">{localTypeScale.length}</Badge>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Font Weights</Label>
              <Badge variant="secondary">{localFontWeights.length}</Badge>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Font Families</Label>
              <Badge variant="secondary">{localFontFamilies.length}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
