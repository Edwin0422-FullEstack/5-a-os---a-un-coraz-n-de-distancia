import React, { useState } from 'react';
import { Gift, Sparkles } from 'lucide-react';

interface IntroGiftProps {
  onOpen: () => void;
}

const IntroGift: React.FC<IntroGiftProps> = ({ onOpen }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const handleClick = () => {
    setIsClicking(true);
    setTimeout(() => {
      onOpen();
    }, 800);
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-black relative overflow-hidden">
      {/* Background Particles */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute bg-white w-1 h-1 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <div className={`transition-all duration-700 ${isClicking ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}>
        <div 
          className="relative cursor-pointer group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleClick}
        >
          {/* Glow effect */}
          <div className={`absolute inset-0 bg-ut-red blur-3xl transition-opacity duration-500 ${isHovered ? 'opacity-40' : 'opacity-0'}`}></div>
          
          {/* The Box */}
          <div className={`w-40 h-40 md:w-64 md:h-64 border-4 border-white bg-black relative flex items-center justify-center pixel-corners transition-transform duration-300 ${isHovered ? 'animate-shake' : ''}`}>
            <Gift size={80} className={`text-ut-red transition-all duration-300 ${isHovered ? 'scale-110' : 'scale-100'}`} strokeWidth={1.5} />
            
            {/* Ribbon horizontal */}
            <div className="absolute w-full h-4 bg-white/20 top-1/2 -translate-y-1/2 pointer-events-none"></div>
            {/* Ribbon vertical */}
            <div className="absolute h-full w-4 bg-white/20 left-1/2 -translate-x-1/2 pointer-events-none"></div>
          </div>

          <div className="mt-8 text-center">
            <p className="font-pixel text-2xl text-white tracking-widest animate-pulse">
              {isClicking ? "* ABRIENDO..." : "* TIENES UN REGALO"}
            </p>
            <p className="font-modern text-xs text-gray-500 mt-2 uppercase tracking-widest">
              5º Aniversario (2020 - 2025)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroGift;