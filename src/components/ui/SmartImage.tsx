import React, { useState } from 'react';
import { cn } from '@/src/lib/utils';
import { ImageOff } from 'lucide-react';

interface SmartImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
}

export const SmartImage: React.FC<SmartImageProps> = ({ 
  src, 
  alt, 
  className, 
  fallback = "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=800",
  ...props 
}) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleError = () => {
    setError(true);
    setLoading(false);
  };

  const handleLoad = () => {
    setLoading(false);
  };

  return (
    <div className={cn("relative overflow-hidden bg-surface-base", className)}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-surface-elevated animate-pulse">
           <div className="w-10 h-10 border-4 border-brand-primary/20 border-t-brand-primary rounded-full animate-spin" />
        </div>
      )}
      
      {error ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-surface-elevated text-text-muted p-4 text-center">
          <ImageOff size={32} className="mb-2 opacity-20" />
          <img 
            src={fallback} 
            alt="Fallback" 
            className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-surface-bg/60" />
          <span className="relative z-10 text-[10px] font-black uppercase tracking-widest leading-tight">Visual Anchor Offline</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          onError={handleError}
          onLoad={handleLoad}
          loading="lazy"
          className={cn(
            "w-full h-full object-cover transition-opacity duration-500",
            loading ? "opacity-0" : "opacity-100"
          )}
          referrerPolicy="no-referrer"
          {...props}
        />
      )}
    </div>
  );
};
