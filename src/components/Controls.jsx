import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { 
  Accordion, 
  AccordionItem, 
  AccordionTrigger, 
  AccordionContent 
} from "@/components/ui/accordion"
import PathFilter from './PathFilter'
import LabelWithTooltip from './LabelWithTooltip'
import { Separator } from "@/components/ui/separator"

export default function Controls({ options, onChange, disabled }) {
  const tooltips = {
    crawlDepth: "How deep the crawler should go from the starting page:\n• 1 - Only crawl the initial page\n• 2 - Crawl linked pages\n• 3+ - Continue following links at each level",
    maxPages: "Maximum number of pages to crawl (1-50).\nLimits the total pages processed to prevent excessive crawling.",
    fontSize: "Text size in the generated PDF:\n• Small - 14px\n• Medium - 16px\n• Large - 18px",
    margin: "PDF page margins:\n• None - No margins\n• Small - 0.5 inch\n• Medium - 1 inch\n• Large - 1.5 inches"
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <Accordion type="single" collapsible defaultValue="">
          <AccordionItem value="options">
            <AccordionTrigger>Advanced Options</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-6">
                {/* Crawling Options */}
                <div className="space-y-4">
                  <h3 className="font-medium">Crawling Options</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {/* Crawl Depth and Max Pages inputs */}
                    <div className="space-y-2">
                      <LabelWithTooltip 
                        label="Crawl Depth"
                        tooltip={tooltips.crawlDepth}
                      />
                      <Select
                        disabled={disabled}
                        value={options.crawlDepth.toString()}
                        onValueChange={(value) => onChange({ ...options, crawlDepth: Number(value) })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select depth" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5].map(num => (
                            <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <LabelWithTooltip 
                        label="Max Pages"
                        tooltip={tooltips.maxPages}
                      />
                      <Input
                        type="number"
                        min="1"
                        max="50"
                        value={options.maxPages}
                        onChange={(e) => onChange({ ...options, maxPages: Number(e.target.value) })}
                        disabled={disabled}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* PDF Options */}
                <div className="space-y-4">
                  <h3 className="font-medium">PDF Options</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <LabelWithTooltip 
                        label="Font Size"
                        tooltip={tooltips.fontSize}
                      />
                      <Select
                        disabled={disabled}
                        value={options.fontSize}
                        onValueChange={(value) => onChange({ ...options, fontSize: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent>
                          {['small', 'medium', 'large'].map(size => (
                            <SelectItem key={size} value={size}>{size}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <LabelWithTooltip 
                        label="Margin"
                        tooltip={tooltips.margin}
                      />
                      <Select
                        disabled={disabled}
                        value={options.margin}
                        onValueChange={(value) => onChange({ ...options, margin: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select margin" />
                        </SelectTrigger>
                        <SelectContent>
                          {['none', 'small', 'medium', 'large'].map(size => (
                            <SelectItem key={size} value={size}>{size}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Path Filtering */}
                <div className="space-y-4">
                  <h3 className="font-medium">Path Filtering</h3>
                  <div className="space-y-4">
                    <PathFilter
                      label="Exclude Paths"
                      paths={options.excludePaths}
                      onPathsChange={(paths) => onChange({ ...options, excludePaths: paths })}
                      disabled={disabled}
                    />
                    <PathFilter
                      label="Include Only Paths"
                      paths={options.includePaths}
                      onPathsChange={(paths) => onChange({ ...options, includePaths: paths })}
                      disabled={disabled}
                    />
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  )
} 