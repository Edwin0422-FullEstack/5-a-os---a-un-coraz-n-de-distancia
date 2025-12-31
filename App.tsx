import React, { useState, useEffect } from 'react';
import { AppState } from './types';
import IntroGift from './components/IntroGift';
import MusicPlayer from './components/MusicPlayer';
import GeminiMessage from './components/GeminiMessage';
import MiniGame from './components/MiniGame';
import Soul from './components/Soul';
import { Eye, Brain, Sun, BookOpen, Star, Shield, Zap } from 'lucide-react';
import Typewriter from './components/Typewriter';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>('GIFT');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleOpenGift = () => {
    setState('OPENING');
    setTimeout(() => {
      setState('LANDING');
    }, 1500); // Allow explosion animation time
  };

  if (state === 'GIFT') {
    return <IntroGift onOpen={handleOpenGift} />;
  }

  return (
    <div className={`min-h-screen bg-ut-bg text-white transition-opacity duration-1000 ${state === 'LANDING' ? 'opacity-100' : 'opacity-0'} font-modern selection:bg-ut-yellow selection:text-black`}>
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
         <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(20,20,40,1)_0%,_rgba(0,0,0,1)_100%)]"></div>
         <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-ut-blue/10 rounded-full blur-[100px] animate-pulse"></div>
         <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-ut-red/10 rounded-full blur-[100px] animate-pulse [animation-delay:2s]"></div>
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
      </div>

      <MusicPlayer />

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center p-6 z-10 overflow-hidden">
        
        {/* Animated Souls */}
        <div className="absolute top-1/3 left-1/4 animate-float opacity-60 blur-sm">
           <Soul color="text-ut-blue" className="w-12 h-12 md:w-16 md:h-16" />
        </div>
        <div className="absolute top-1/4 right-1/4 animate-float [animation-delay:1.5s] opacity-60 blur-sm">
           <Soul color="text-ut-red" className="w-12 h-12 md:w-16 md:h-16" />
        </div>

        <div className="text-center space-y-6 relative glass-panel p-12 rounded-3xl border-t border-white/20 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          <div className="inline-block border border-white/20 bg-white/5 px-4 py-1 rounded-full text-xs font-modern tracking-[0.3em] uppercase text-gray-300 mb-4 animate-slide-up shadow-inner backdrop-blur-md">
            2020 - 2025
          </div>
          
          <h1 className="font-pixel text-7xl md:text-9xl font-bold text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.3)] animate-slide-up [animation-delay:0.2s] leading-none">
            5 AÑOS
          </h1>
          
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-ut-yellow to-transparent mx-auto opacity-70"></div>
          
          <h2 className="font-modern text-xl md:text-3xl text-gray-200 font-light tracking-wide animate-slide-up [animation-delay:0.4s]">
            A UN CORAZÓN DE DISTANCIA
          </h2>
        </div>

        <div className="absolute bottom-12 animate-bounce opacity-50">
          <span className="font-pixel text-white text-lg tracking-widest">▼ SCROLL ▼</span>
        </div>
      </section>

      {/* "Lo que Adoro de Ti" Grid */}
      <section className="max-w-6xl mx-auto px-6 py-24 relative z-10">
        <h2 className="text-center font-pixel text-4xl md:text-5xl mb-16 text-white text-glow">
          LO QUE ADORO DE TI
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1: Eyes */}
          <div className="glass-panel glass-panel-hover rounded-2xl p-8 transition-all duration-500 group relative overflow-hidden border-t border-white/10">
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity transform group-hover:rotate-12 duration-700">
                <Eye size={140} />
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-ut-blue/20 to-transparent rounded-xl flex items-center justify-center mb-6 backdrop-blur-sm group-hover:scale-110 transition-transform border border-ut-blue/30 shadow-[0_0_15px_rgba(68,170,255,0.2)]">
              <Eye className="text-ut-blue w-8 h-8" />
            </div>
            <h3 className="font-pixel text-3xl mb-4 text-white group-hover:text-ut-blue transition-colors">Tu Mirada</h3>
            <p className="font-modern text-gray-300 leading-relaxed text-lg font-light">
              Adoro tus ojos. Son mi ventana favorita, el lugar donde el caos del mundo desaparece y solo quedamos nosotros.
            </p>
          </div>

          {/* Card 2: Essence */}
          <div className="glass-panel glass-panel-hover rounded-2xl p-8 transition-all duration-500 group relative overflow-hidden border-t border-white/10">
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity transform group-hover:rotate-12 duration-700">
                <Zap size={140} />
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-ut-yellow/20 to-transparent rounded-xl flex items-center justify-center mb-6 backdrop-blur-sm group-hover:scale-110 transition-transform border border-ut-yellow/30 shadow-[0_0_15px_rgba(255,255,0,0.2)]">
              <Brain className="text-ut-yellow w-8 h-8" />
            </div>
            <h3 className="font-pixel text-3xl mb-4 text-white group-hover:text-ut-yellow transition-colors">Tu Esencia</h3>
            <p className="font-modern text-gray-300 leading-relaxed text-lg font-light">
              Esa forma de ser tan tuya: algo tonta para hacerme reír hasta doler, pero increíblemente lógica cuando necesito razón. Eres mi equilibrio perfecto.
            </p>
          </div>

          {/* Card 3: Light */}
          <div className="glass-panel glass-panel-hover rounded-2xl p-8 transition-all duration-500 group relative overflow-hidden border-t border-white/10">
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity transform group-hover:rotate-12 duration-700">
                <Shield size={140} />
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-ut-orange/20 to-transparent rounded-xl flex items-center justify-center mb-6 backdrop-blur-sm group-hover:scale-110 transition-transform border border-ut-orange/30 shadow-[0_0_15px_rgba(255,170,0,0.2)]">
              <Sun className="text-ut-orange w-8 h-8" />
            </div>
            <h3 className="font-pixel text-3xl mb-4 text-white group-hover:text-ut-orange transition-colors">Tu Luz</h3>
            <p className="font-modern text-gray-300 leading-relaxed text-lg font-light">
              Pese a tus propias tormentas y situaciones difíciles, siempre encuentras esa fuerza mágica para sacarme de la tristeza. Eres mi faro.
            </p>
          </div>

          {/* Card 4: Mind */}
          <div className="glass-panel glass-panel-hover rounded-2xl p-8 transition-all duration-500 group relative overflow-hidden border-t border-white/10">
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity transform group-hover:rotate-12 duration-700">
                <BookOpen size={140} />
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-ut-green/20 to-transparent rounded-xl flex items-center justify-center mb-6 backdrop-blur-sm group-hover:scale-110 transition-transform border border-ut-green/30 shadow-[0_0_15px_rgba(68,255,68,0.2)]">
              <BookOpen className="text-ut-green w-8 h-8" />
            </div>
            <h3 className="font-pixel text-3xl mb-4 text-white group-hover:text-ut-green transition-colors">Tu Mente</h3>
            <p className="font-modern text-gray-300 leading-relaxed text-lg font-light">
              Adoro tu mente. Tienes una capacidad única y preciosa para crear historias que no solo entretienen, sino que tocan el alma.
            </p>
          </div>

        </div>
      </section>

      {/* Mini Game Section */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-4xl mx-auto glass-panel p-4 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.6)]">
             <MiniGame />
        </div>
      </section>

      {/* Interactive Element: The Save Point */}
      <section className="py-24 text-center relative z-10">
        <div className="w-24 h-24 mx-auto mb-8 relative group cursor-pointer">
          <div className="absolute inset-0 bg-ut-yellow blur-[60px] opacity-20 group-hover:opacity-60 transition-opacity duration-500 animate-pulse"></div>
          <Star className="w-full h-full text-ut-yellow relative z-10 animate-float drop-shadow-[0_0_15px_rgba(255,255,0,0.8)] transform group-hover:rotate-180 transition-transform duration-1000" fill="currentColor" />
        </div>
        <h2 className="font-pixel text-4xl md:text-5xl mb-6 text-glow">Punto de Guardado</h2>
        <p className="font-modern text-gray-400 max-w-md mx-auto mb-8 text-lg">
          Verte a ti... me llena de <strong>DETERMINACIÓN</strong>.
        </p>
      </section>

      {/* AI Generator */}
      <section className="px-6 relative z-10 pb-24">
         <GeminiMessage />
      </section>

      {/* Footer */}
      <footer className="py-12 text-center border-t border-white/5 relative z-10 bg-black/80 backdrop-blur-xl">
        <Soul className="w-8 h-8 mx-auto mb-4 text-ut-red" />
        <p className="font-pixel text-gray-500 text-lg">Hecho con amor (y código) para ti.</p>
        <p className="font-modern text-gray-600 mt-2 text-xs uppercase tracking-widest opacity-50">2020 - ∞</p>
      </footer>
    </div>
  );
};

export default App;