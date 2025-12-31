import React, { useState, useEffect } from 'react';

interface TypewriterProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
  className?: string;
}

const Typewriter: React.FC<TypewriterProps> = ({ text, speed = 50, onComplete, className = '' }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  // Reset when text changes
  useEffect(() => {
    setDisplayedText('');
    setIndex(0);
    setIsComplete(false);
  }, [text]);

  useEffect(() => {
    if (index < text.length) {
      const timeoutId = setTimeout(() => {
        setDisplayedText((prev) => prev + text.charAt(index));
        setIndex((prev) => prev + 1);
        
        // Play sound effect placeholder (optional, not implemented here to avoid audio policy issues)
      }, speed);
      return () => clearTimeout(timeoutId);
    } else if (!isComplete) {
      setIsComplete(true);
      if (onComplete) onComplete();
    }
  }, [index, text, speed, onComplete, isComplete]);

  return (
    <div className={`font-mono text-xl md:text-2xl leading-relaxed whitespace-pre-wrap ${className}`}>
      {displayedText}
      {!isComplete && <span className="animate-pulse inline-block w-3 h-6 bg-ut-white ml-1 align-middle"></span>}
    </div>
  );
};

export default Typewriter;