import React from 'react';
import { Heart, Sword, Gift, MessageCircle, X } from 'lucide-react';

interface ActionButtonProps {
  type: 'AMOR' | 'ACTUAR' | 'RECUERDOS' | 'POEMA';
  onClick: () => void;
  isActive?: boolean;
}

const ActionButton: React.FC<ActionButtonProps> = ({ type, onClick, isActive }) => {
  let colorClass = "border-ut-orange text-ut-orange hover:bg-ut-orange hover:text-black";
  let Icon = Sword;

  switch (type) {
    case 'AMOR':
      colorClass = "border-ut-red text-ut-red hover:bg-ut-red hover:text-white";
      Icon = Heart;
      break;
    case 'ACTUAR':
      colorClass = "border-ut-yellow text-ut-yellow hover:bg-ut-yellow hover:text-black";
      Icon = MessageCircle;
      break;
    case 'RECUERDOS':
      colorClass = "border-ut-green text-ut-green hover:bg-ut-green hover:text-black";
      Icon = Gift;
      break;
    case 'POEMA':
      colorClass = "border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-black";
      Icon = X; // Placeholder, using X or sparkles
      break;
  }

  return (
    <button
      onClick={onClick}
      className={`
        flex-1 border-4 px-2 py-4 md:px-6 md:py-6 font-mono text-xl md:text-2xl font-bold uppercase transition-all
        flex items-center justify-center gap-2
        ${isActive ? 'bg-white/20' : 'bg-black'}
        ${colorClass}
      `}
    >
      <Icon size={24} className={type === 'AMOR' ? 'fill-current' : ''} />
      <span className="hidden md:inline">{type}</span>
    </button>
  );
};

export default ActionButton;