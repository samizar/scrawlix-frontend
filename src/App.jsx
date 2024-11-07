import React, { useState } from 'react'
import URLInput from './components/URLInput'
import Controls from './components/Controls'
import { getFilenameFromUrl } from './utils/filename';
import FunProgress from './components/FunProgress';

function App() {
  const [loading, setLoading] = useState(false)
  const [options, setOptions] = useState({
    crawlDepth: 1,
    maxPages: 10,
    fontSize: 'medium',
    margin: 'medium',
    excludePaths: [],
    includePaths: []
  })
  const [progress, setProgress] = useState(null)
  const [error, setError] = useState(null)

  const handleSubmit = async (url, format) => {
    setLoading(true);
    setError(null);
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      const response = await fetch(`${API_URL}/api/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url,
          format,
          ...options
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Generation failed');
      }

      const data = await (format === 'pdf' ? response.blob() : response.json());
      
      if (format === 'pdf') {
        const downloadUrl = window.URL.createObjectURL(data);
        const filename = url.replace(/[^a-zA-Z0-9]/g, '-');
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = `${filename}.pdf`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(downloadUrl);
      } else {
        const jsonStr = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonStr], { type: 'application/json' });
        const downloadUrl = window.URL.createObjectURL(blob);
        const filename = url.replace(/[^a-zA-Z0-9]/g, '-');
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = `${filename}.json`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(downloadUrl);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="container max-w-3xl mx-auto space-y-6">
        <div className="relative flex items-center justify-between mb-8">
          <div className="text-center flex-1 space-y-4">
            <img 
              src="/logo.svg" 
              alt="Scrawlix Logo" 
              className="h-16 mx-auto mb-2"
            />
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              Scrawlix
            </h1>
            <p className="text-muted-foreground">
              Transform websites into beautiful documents with intelligent crawling
            </p>
            {loading && <FunProgress />}
          </div>
          
          <a
            href="https://www.buymeacoffee.com/azgsami"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute right-0 top-0 hover:opacity-90 transition-opacity"
          >
            <img
              src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
              alt="Buy Me A Coffee"
              className="h-10 p- pt-8""
            />
          </a>
        </div>
        
        <URLInput 
          onSubmit={handleSubmit} 
          disabled={loading}
          loading={loading}
          progress={progress}
        />
        
        <Controls 
          options={options} 
          onChange={setOptions} 
          disabled={loading} 
        />

        {error && (
          <div className="p-4 text-sm text-destructive bg-destructive/10 rounded-md">
            {error}
          </div>
        )}
      </div>
    </div>
  )
}

export default App
