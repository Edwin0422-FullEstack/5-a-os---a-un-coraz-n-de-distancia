import React, { useState } from 'react';
import { generateLoveNote } from '../services/geminiService';
import Soul from './Soul';
import Typewriter from './Typewriter';
import { Heart, Search, Sparkles, Clock } from 'lucide-react';

const GeminiMessage: React.FC = () => {
  const [mode, setMode] = useState<'SELECT' | 'ACTING' | 'RESULT'>('SELECT');
  const [message, setMessage] = useState<string>("¡Un 5º Aniversario salvaje apareció!");
  const [loading, setLoading] = useState(false);

  const handleAction = async (action: 'check' | 'flirt' | 'future') => {
    setMode('ACTING');
    setLoading(true);
    
    let loadingText = "";
    switch(action) {
        case 'check': loadingText = "* Comprobando estadísticas..."; break;
        case 'flirt': loadingText = "* Intentando coquetear..."; break;
        case 'future': loadingText = "* Mirando la línea temporal..."; break;
    }
    setMessage(loadingText);

    const note = await generateLoveNote(action);
    setMessage(note);
    setLoading(false);
    setMode('RESULT');
  };

  const reset = () => {
    setMode('SELECT');
    setMessage("* ¿Qué harás ahora?");
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-12 mb-12 font-pixel">
      
      {/* Game Container - Glassmorphism Update */}
      <div className="glass-panel rounded-xl overflow-hidden relative shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-white/10">
        
        {/* Enemy / Visual Area */}
        <div className="h-56 md:h-72 flex flex-col items-center justify-center border-b border-white/10 relative overflow-hidden bg-gradient-to-b from-gray-900/50 to-black/50">
             {/* Background Grid effect */}
             <div className="absolute inset-0 grid grid-cols-[repeat(20,minmax(0,1fr))] opacity-10 pointer-events-none">
                {Array.from({ length: 400 }).map((_, i) => (
                    <div key={i} className="border-[0.5px] border-white/20"></div>
                ))}
             </div>

             <div className="z-10 flex flex-col items-center animate-float">
                <Soul className="w-24 h-24 md:w-32 md:h-32 text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.6)]" />
             </div>
             
             <div className="mt-8 flex gap-4 text-xl md:text-2xl z-10 items-center font-bold">
                <span className="text-white drop-shadow-md tracking-widest">NOSOTROS</span>
                <div className="w-40 h-6 bg-red-900/30 border border-white/30 relative rounded-full overflow-hidden backdrop-blur-sm shadow-inner">
                    <div className="absolute top-0 left-0 bottom-0 bg-ut-yellow w-full animate-pulse shadow-[0_0_10px_#FFFF00]"></div>
                    <span className="absolute inset-0 flex items-center justify-center text-xs text-black font-bold tracking-widest z-10">HP 2020 / 2025</span>
                </div>
             </div>
        </div>

        {/* Dialogue Box */}
        <div className="min-h-[180px] p-8 text-xl md:text-3xl leading-relaxed text-white relative bg-black/40 backdrop-blur-sm">
            <span className="absolute top-8 left-6 animate-pulse text-ut-yellow">*</span>
            <div className="ml-8 h-full">
                {loading ? (
                    <span className="animate-pulse text-gray-300">{message}</span>
                ) : (
                    <Typewriter text={message} speed={30} />
                )}
            </div>
            {mode === 'RESULT' && !loading && (
                <button 
                    onClick={reset}
                    className="absolute bottom-6 right-6 text-ut-yellow text-xl animate-bounce hover:underline decoration-2 tracking-widest"
                >
                    [ CONTINUAR ] ▼
                </button>
            )}
        </div>

        {/* Action Buttons Area */}
        {mode !== 'RESULT' && (
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10 border-t border-white/10">
                <button 
                    onClick={() => handleAction('check')}
                    disabled={loading}
                    className="p-6 flex items-center justify-center gap-3 text-2xl transition-all hover:bg-white/10 active:scale-95 group uppercase font-bold text-ut-orange hover:text-white"
                >
                    <Search className="w-6 h-6 group-hover:animate-spin" />
                    <span>ANALIZAR</span>
                </button>

                <button 
                    onClick={() => handleAction('flirt')}
                    disabled={loading}
                    className="p-6 flex items-center justify-center gap-3 text-2xl transition-all hover:bg-white/10 active:scale-95 group uppercase font-bold text-ut-yellow hover:text-white"
                >
                    <Heart className="w-6 h-6 group-hover:animate-heart-beat fill-current" />
                    <span>COQUETEAR</span>
                </button>

                <button 
                    onClick={() => handleAction('future')}
                    disabled={loading}
                    className="p-6 flex items-center justify-center gap-3 text-2xl transition-all hover:bg-white/10 active:scale-95 group uppercase font-bold text-ut-blue hover:text-white"
                >
                    <Clock className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" />
                    <span>FUTURO</span>
                </button>
            </div>
        )}
      </div>
      
      <div className="text-center mt-6 text-gray-500 text-xs md:text-sm font-modern uppercase tracking-[0.2em] opacity-60">
         * La determinación te permite moldear el destino
      </div>
    </div>
  );
};

export default GeminiMessage;