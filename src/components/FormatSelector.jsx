import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function FormatSelector({ format, onFormatChange }) {
  return (
    <Tabs defaultValue={format} onValueChange={onFormatChange} className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="pdf">PDF Document</TabsTrigger>
        <TabsTrigger value="json">JSON Response</TabsTrigger>
      </TabsList>
    </Tabs>
  )
} 