import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Button } from "./ui/button"
import { X, HelpCircle } from "lucide-react"
import { useState } from "react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip"

export default function PathFilter({ 
  label, 
  paths, 
  onPathsChange, 
  disabled 
}) {
  const [inputValue, setInputValue] = useState("")

  const helpText = {
    "Exclude Paths": "Patterns to exclude from crawling:\n• /about* - Excludes /about and all subpages\n• /docs/** - Excludes /docs and all nested paths",
    "Include Only Paths": "Patterns to include in crawling:\n• /blog* - Only crawls /blog and direct subpages\n• /api/** - Only crawls /api and all nested paths"
  }

  const handleAdd = () => {
    if (inputValue.trim()) {
      onPathsChange([...paths, inputValue.trim()])
      setInputValue("")
    }
  }

  const handleRemove = (index) => {
    onPathsChange(paths.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Label>{label}</Label>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <HelpCircle className="h-4 w-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent className="whitespace-pre-line">
              {helpText[label]}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="flex gap-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="e.g., blog/*, /about/*"
          disabled={disabled}
        />
        <Button 
          onClick={handleAdd} 
          disabled={disabled || !inputValue.trim()}
        >
          Add
        </Button>
      </div>
      
      {paths.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {paths.map((path, index) => (
            <div 
              key={index}
              className="flex items-center gap-1 bg-secondary px-2 py-1 rounded-md"
            >
              <span className="text-sm">{path}</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0"
                onClick={() => handleRemove(index)}
                disabled={disabled}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
} 