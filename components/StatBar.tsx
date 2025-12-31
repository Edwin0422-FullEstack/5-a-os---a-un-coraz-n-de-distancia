import React from 'react';

interface StatBarProps {
  name: string;
  lv: number;
  hp: number;
  maxHp: number;
}

const StatBar: React.FC<StatBarProps> = ({ name, lv, hp, maxHp }) => {
  return (
    <div className="flex flex-wrap items-center gap-4 font-mono text-xl md:text-2xl mb-6 select-none">
      <span className="font-bold uppercase">{name}</span>
      <span>LV {lv}</span>
      <div className="flex items-center gap-2">
        <span className="text-sm">HP</span>
        <div className="w-32 h-6 bg-ut-red/30 border border-ut-white relative">
          <div 
            className="h-full bg-ut-yellow transition-all duration-1000 ease-out" 
            style={{ width: `${(hp / maxHp) * 100}%` }}
          />
        </div>
        <span>{hp} / {maxHp}</span>
      </div>
    </div>
  );
};

export default StatBar;