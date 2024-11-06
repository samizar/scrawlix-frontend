import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import Progress from './Progress'
import FormatSelector from './FormatSelector'

export default function URLInput({ onSubmit, disabled, loading, progress }) {
  const [url, setUrl] = useState('')
  const [format, setFormat] = useState('pdf')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (url) onSubmit(url, format)
  }

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex w-full items-center space-x-2">
            <Input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter website URL"
              required
              disabled={disabled}
            />
            <Button type="submit" disabled={disabled}>
              Generate {format.toUpperCase()}
            </Button>
          </div>
          
          <FormatSelector 
            format={format} 
            onFormatChange={setFormat}
          />
        </form>

        {loading && <Progress progress={progress} />}
      </CardContent>
    </Card>
  )
} 