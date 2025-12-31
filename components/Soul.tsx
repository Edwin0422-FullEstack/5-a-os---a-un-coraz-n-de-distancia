import React from 'react';
import { Heart } from 'lucide-react';

interface SoulProps {
  color?: string;
  className?: string;
}

const Soul: React.FC<SoulProps> = ({ color = "text-ut-red", className = "" }) => {
  return (
    <div className={`relative ${className}`}>
        <Heart 
            className={`w-full h-full ${color} fill-current animate-heart-beat drop-shadow-[0_0_10px_rgba(255,0,0,0.7)]`} 
            strokeWidth={0}
        />
    </div>
  );
};

export default Soul;