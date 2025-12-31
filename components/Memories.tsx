import React from 'react';
import { Memory } from '../types';

const MEMORIES: Memory[] = [
  { id: 1, year: 2019, title: "El Inicio", description: "Donde todo comenzó. Nuestro primer encuentro.", imageUrl: "https://picsum.photos/400/300?random=1" },
  { id: 2, year: 2020, title: "La Aventura", description: "Superando obstáculos juntos, más fuertes que nunca.", imageUrl: "https://picsum.photos/400/300?random=2" },
  { id: 3, year: 2021, title: "Crecimiento", description: "Aprendiendo el uno del otro cada día.", imageUrl: "https://picsum.photos/400/300?random=3" },
  { id: 4, year: 2022, title: "Viajes", description: "Explorando nuevos mundos de la mano.", imageUrl: "https://picsum.photos/400/300?random=4" },
  { id: 5, year: 2023, title: "Consolidación", description: "Construyendo un futuro lleno de determinación.", imageUrl: "https://picsum.photos/400/300?random=5" },
];

const Memories: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4 h-64 overflow-y-auto pr-2 custom-scrollbar">
      {MEMORIES.map((mem) => (
        <div key={mem.id} className="border-4 border-white p-2 flex flex-col gap-2 hover:border-ut-yellow transition-colors group">
          <div className="relative overflow-hidden h-32 w-full bg-gray-800">
             <img src={mem.imageUrl} alt={mem.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
             <div className="absolute top-0 right-0 bg-black text-white px-2 py-1 font-mono text-sm border-l-2 border-b-2 border-white">
               {mem.year}
             </div>
          </div>
          <h3 className="text-ut-yellow font-mono text-xl uppercase font-bold">{mem.title}</h3>
          <p className="font-mono text-sm md:text-base leading-tight">{mem.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Memories;