import { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";

const STATUS_MESSAGES = [
  { icon: "🕷️", text: "Sending friendly spiders to explore..." },
  { icon: "🎨", text: "Painting your PDF masterpiece..." },
  { icon: "🔍", text: "Discovering hidden treasures in the HTML..." },
  { icon: "🌳", text: "Growing the document tree..." },
  { icon: "🧪", text: "Mixing the perfect PDF potion..." },
  { icon: "🎭", text: "Transforming web chaos into beauty..." },
  { icon: "🎪", text: "Juggling HTML elements..." },
  { icon: "🚀", text: "Preparing for PDF liftoff..." },
  { icon: "🎯", text: "Targeting the important content..." },
  { icon: "✨", text: "Sprinkling some magic dust..." }
];

export default function FunProgress() {
  const [messageIndex, setMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % STATUS_MESSAGES.length);
    }, 2000);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) return prev;
        return prev + Math.random() * 15;
      });
    }, 1000);

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
    };
  }, []);

  const currentMessage = STATUS_MESSAGES[messageIndex];

  return (
    <Card className="mt-6 mb-6">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{currentMessage.icon}</span>
            <p className="text-sm text-muted-foreground animate-fade-in">
              {currentMessage.text}
            </p>
          </div>
          
          <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
            <div 
              className="bg-primary h-full transition-all duration-300 relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/50 to-primary animate-shimmer" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 
