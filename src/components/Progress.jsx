import { Card, CardContent } from "@/components/ui/card"

export default function Progress({ progress }) {
  if (!progress) return null;

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex justify-between text-sm">
            <span>Pages processed: {progress.pagesProcessed}</span>
            <span>Current depth: {progress.currentDepth}</span>
          </div>
          
          <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
            <div 
              className="bg-primary h-full transition-all duration-300"
              style={{ width: `${(progress.pagesProcessed / progress.maxPages) * 100}%` }}
            />
          </div>
          
          <p className="text-sm text-muted-foreground truncate">
            Currently processing: {progress.currentUrl}
          </p>
        </div>
      </CardContent>
    </Card>
  )
} 