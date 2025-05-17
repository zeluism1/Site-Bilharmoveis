"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

type ColorOption = {
  name: string
  hex: string
  available: boolean
}

type ColorSelectorProps = {
  productId: string
  colors: ColorOption[]
}

export default function ColorSelector({ productId, colors }: ColorSelectorProps) {
  const [selectedColor, setSelectedColor] = useState<string>(
    colors.find(color => color.available)?.hex || colors[0].hex
  )
  const [showColorInfo, setShowColorInfo] = useState(false)
  
  const handleColorSelect = (color: string) => {
    setSelectedColor(color)
    // Here we would trigger the parent component to update the product images
    // based on the selected color
  }
  
  // Find the color name for the selected hex
  const selectedColorName = colors.find(c => c.hex === selectedColor)?.name || ''
  
  return (
    <div>
      <div className="flex flex-wrap items-center gap-3 mb-3">
        {colors.map((color) => (
          <button
            key={color.hex}
            className={`
              w-8 h-8 rounded-full flex items-center justify-center
              ${!color.available ? 'opacity-50 cursor-not-allowed' : ''}
              ${selectedColor === color.hex ? 'ring-2 ring-orange-500 ring-offset-2' : 'hover:ring-1 hover:ring-gray-300 hover:ring-offset-1'}
            `}
            disabled={!color.available}
            onClick={() => color.available && handleColorSelect(color.hex)}
            aria-label={`Select ${color.name} color`}
          >
            <span 
              className="block w-6 h-6 rounded-full" 
              style={{ backgroundColor: color.hex }}
            />
          </button>
        ))}
        
        <button 
          onClick={() => setShowColorInfo(!showColorInfo)}
          className="text-sm text-gray-500 hover:text-gray-900 flex items-center"
          aria-expanded={showColorInfo}
        >
          Color info
          <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${showColorInfo ? 'rotate-180' : ''}`} />
        </button>
      </div>
      
      {showColorInfo && (
        <div className="text-sm bg-gray-50 p-4 rounded-md mb-4">
          <p className="font-medium mb-2">Current selection: {selectedColorName}</p>
          <ul className="space-y-1">
            {colors.map(color => (
              <li key={color.hex} className="flex items-center gap-2">
                <span 
                  className="block w-4 h-4 rounded-full" 
                  style={{ backgroundColor: color.hex }}
                />
                <span>{color.name}</span>
                {!color.available && (
                  <span className="text-xs text-gray-500">(Out of stock)</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="text-sm text-gray-500">
        <p>Selected color: <span className="font-medium text-gray-900">{selectedColorName}</span></p>
      </div>
    </div>
  )
} 