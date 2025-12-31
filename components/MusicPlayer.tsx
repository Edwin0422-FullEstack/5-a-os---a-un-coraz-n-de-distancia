import React, { useState, useEffect, useRef } from 'react';
import { Music, Play, Pause, X, Heart } from 'lucide-react';
import { LyricLine } from '../types';

const LYRICS: LyricLine[] = [
  { text: "[Intro: Piano suave, notas largas y nostálgicas]", type: 'intro' },
  { text: "Cinco inviernos, cinco primaveras…", type: 'verse' },
  { text: "y tu voz cruzando el mundo para llegar a mí.", type: 'verse' },
  { text: "Entre pantallas te aprendí a mirar,", type: 'verse' },
  { text: "en husos horarios nació la verdad,", type: 'verse' },
  { text: "no fue casualidad, fue destino fiel,", type: 'verse' },
  { text: "dos almas perdidas encontrándose en la red.", type: 'verse' },
  { text: "Desde mi cielo hasta tu ciudad,", type: 'verse' },
  { text: "mil kilómetros no saben amar,", type: 'verse' },
  { text: "pero yo sí, y tú también,", type: 'verse' },
  { text: "hicimos del “algún día” un porvenir.", type: 'verse' },
  { text: "Y aunque el mapa diga que estás lejos,", type: 'verse' },
  { text: "mi corazón nunca te perdió,", type: 'verse' },
  { text: "porque el amor no entiende de fronteras,", type: 'verse' },
  { text: "solo entiende de los dos.", type: 'verse' },
  { text: "A un corazón de distancia te amo igual,", type: 'chorus' },
  { text: "mi voz te alcanza aunque no te pueda tocar,", type: 'chorus' },
  { text: "cinco años venciendo al tiempo y al miedo,", type: 'chorus' },
  { text: "siempre contigo, aunque no estemos cerca.", type: 'chorus' },
  { text: "Si el mundo nos pone mares de por medio,", type: 'chorus' },
  { text: "yo cruzo cada uno por tu paz,", type: 'chorus' },
  { text: "porque este amor nació para quedarse,", type: 'chorus' },
  { text: "y no hay distancia que lo pueda apagar.", type: 'chorus' },
  { text: "Como Chara y Asriel en el Underground,", type: 'verse' },
  { text: "cuidándonos aun en la oscuridad,", type: 'verse' },
  { text: "fuimos luz cuando todo dudó,", type: 'verse' },
  { text: "fuimos hogar donde nadie creyó.", type: 'verse' },
  { text: "Guardé tu risa en cada mensaje,", type: 'verse' },
  { text: "tu nombre en cada despertar,", type: 'verse' },
  { text: "y aunque el reloj se burle de nosotros,", type: 'verse' },
  { text: "nuestro amor siempre llega puntual.", type: 'verse' },
  { text: "A un corazón de distancia… o menos,", type: 'chorus' },
  { text: "porque aquí te siento respirar,", type: 'chorus' },
  { text: "el amor verdadero no se mide en kilómetros,", type: 'chorus' },
  { text: "se mide en no rendirse jamás.", type: 'chorus' },
  { text: "Cinco años… y volvería a elegirte.", type: 'intro' },
];

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false);
  const [currentLine, setCurrentLine] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Simulated audio progress
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentLine((prev) => (prev + 1) % LYRICS.length);
      }, 4000); // Auto scroll lyrics every 4 seconds as a simulation
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => {
    if (showLyrics && scrollRef.current) {
        // Auto scroll
        const activeEl = scrollRef.current.children[currentLine] as HTMLElement;
        if(activeEl) {
            scrollRef.current.scrollTo({
                top: activeEl.offsetTop - 150,
                behavior: 'smooth'
            });
        }
    }
  }, [currentLine, showLyrics]);

  return (
    <>
      {/* Floating Glass Button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {isPlaying && (
            <div className="glass-panel p-3 rounded-lg mb-2 font-pixel text-ut-yellow text-sm animate-fade-in max-w-[250px] text-right border-l-4 border-ut-yellow">
                <span className="opacity-50 text-xs block mb-1">REPRODUCIENDO...</span>
                ♫ {LYRICS[currentLine].text}
            </div>
        )}
        <button 
          onClick={() => {
            setIsPlaying(!isPlaying);
            setShowLyrics(true);
          }}
          className="glass-panel hover:bg-white/10 p-4 rounded-full shadow-lg hover:shadow-[0_0_20px_rgba(255,255,0,0.4)] hover:scale-105 transition-all duration-300 flex items-center gap-3 group border-ut-yellow/50"
        >
          <div className="relative">
             {isPlaying ? <Pause size={20} className="text-ut-yellow fill-current" /> : <Play size={20} className="text-ut-yellow fill-current pl-0.5" />}
             {isPlaying && <div className="absolute inset-0 bg-ut-yellow blur-md opacity-40 animate-ping"></div>}
          </div>
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 font-modern text-sm tracking-widest whitespace-nowrap text-white">
            NUESTRA CANCIÓN
          </span>
        </button>
      </div>

      {/* Modern Glass Lyrics Modal */}
      {showLyrics && (
        <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xl flex flex-col items-center justify-center p-6 animate-fade-in">
          <button 
            onClick={() => setShowLyrics(false)}
            className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors bg-white/5 p-2 rounded-full hover:bg-white/20"
          >
            <X size={24} />
          </button>

          <div className="text-center mb-10 relative">
            <div className="w-20 h-20 bg-gradient-to-tr from-ut-blue to-ut-purple rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg shadow-ut-blue/20">
                <Music size={40} className="text-white" />
            </div>
            <h2 className="font-modern font-bold text-3xl md:text-4xl text-white mb-2 tracking-tight">A un Corazón de Distancia</h2>
            <p className="font-modern text-gray-400 text-xs tracking-[0.3em] uppercase">5 Años Juntos</p>
          </div>

          <div 
            ref={scrollRef}
            className="w-full max-w-3xl h-[50vh] overflow-y-auto space-y-8 text-center px-4 custom-scrollbar relative"
            style={{ maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)' }}
          >
            {LYRICS.map((line, index) => (
              <p 
                key={index}
                className={`transition-all duration-700 font-modern text-2xl md:text-3xl font-light cursor-pointer
                  ${index === currentLine 
                    ? 'text-white scale-100 opacity-100 text-glow font-medium' 
                    : 'text-gray-500 blur-[0.5px] scale-95 opacity-40'
                  }
                  ${line.type === 'chorus' && index === currentLine ? 'text-ut-yellow' : ''}
                `}
                onClick={() => {
                    setCurrentLine(index);
                    setIsPlaying(true);
                }}
              >
                {line.text}
              </p>
            ))}
          </div>

          <div className="mt-12 flex items-center gap-6">
             <button 
                onClick={() => setIsPlaying(!isPlaying)} 
                className="w-16 h-16 rounded-full glass-panel hover:bg-white/20 flex items-center justify-center transition-all hover:scale-110 active:scale-95"
            >
                {isPlaying ? <Pause size={28} fill="white" /> : <Play size={28} fill="white" className="ml-1" />}
             </button>
          </div>
        </div>
      )}
    </>
  );
};

export default MusicPlayer;