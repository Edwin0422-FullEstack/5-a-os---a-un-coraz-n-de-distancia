import React, { useRef, useEffect, useState } from 'react';
import { Sparkles, Play, RefreshCw } from 'lucide-react';

// Images
const ASRIEL_IMG = "https://i.imgur.com/kS5xJ1o.png"; 
const SPRITE_SHEET = "https://i.imgur.com/gK6BqLd.png"; // Contains Chara/Asriel

const MEMORY_MESSAGES = [
  "2020: El encuentro. Cuando ni sabíamos que nuestras almas ya estaban conectadas.",
  "2021: La promesa. Aunque el mundo se detuvo, nosotros seguimos avanzando.",
  "2022: La constancia. Entre videollamadas y sueños, construimos un hogar.",
  "2023: La aventura. Cada vez más cerca, rompiendo cada kilómetro.",
  "2024: La certeza. Saber que eres tú, que siempre fuiste tú."
];

const MiniGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<'START' | 'PLAYING' | 'MESSAGE' | 'WON'>('START');
  const [currentMessage, setCurrentMessage] = useState("");
  const [score, setScore] = useState(0);
  
  // Images Refs
  const asrielRef = useRef<HTMLImageElement | null>(null);
  
  // Game State Refs
  const gameData = useRef({
    playerX: 160,
    playerY: 200,
    targetX: 160,
    targetY: 200,
    items: [] as {x: number, y: number, id: number, angle: number}[],
    particles: [] as {x: number, y: number, life: number, vx: number, vy: number}[],
    frameCount: 0
  });

  const CANVAS_WIDTH = 320;
  const CANVAS_HEIGHT = 240;

  useEffect(() => {
    // Preload Asriel Image
    const img = new Image();
    img.src = ASRIEL_IMG;
    asrielRef.current = img;
  }, []);

  const startGame = () => {
    gameData.current = {
      playerX: CANVAS_WIDTH / 2,
      playerY: CANVAS_HEIGHT / 2,
      targetX: CANVAS_WIDTH / 2,
      targetY: CANVAS_HEIGHT / 2,
      items: [],
      particles: [],
      frameCount: 0
    };
    spawnFragment(0);
    setScore(0);
    setGameState('PLAYING');
  };

  const spawnFragment = (index: number) => {
    // Spawn somewhat away from player
    const padding = 40;
    const x = Math.random() * (CANVAS_WIDTH - padding * 2) + padding;
    const y = Math.random() * (CANVAS_HEIGHT - padding * 2) + padding;
    gameData.current.items = [{ x, y, id: index, angle: 0 }];
  };

  useEffect(() => {
    if (gameState !== 'PLAYING') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;

    const loop = () => {
      const state = gameData.current;
      state.frameCount++;

      // 1. Clear & Background - Transparent/Dark
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      
      // Draw grid moving effect
      ctx.strokeStyle = '#222';
      ctx.lineWidth = 1;
      const offset = (state.frameCount * 0.5) % 20;
      ctx.beginPath();
      for(let i=0; i<CANVAS_WIDTH; i+=20) { ctx.moveTo(i,0); ctx.lineTo(i, CANVAS_HEIGHT); }
      for(let i=0; i<CANVAS_HEIGHT; i+=20) { ctx.moveTo(0,i + offset); ctx.lineTo(CANVAS_WIDTH, i + offset); }
      ctx.stroke();

      // 2. Physics - Smooth Movement (Lerp)
      state.playerX += (state.targetX - state.playerX) * 0.1;
      state.playerY += (state.targetY - state.playerY) * 0.1;

      // 3. Particles Trail
      if (state.frameCount % 5 === 0) {
        state.particles.push({
            x: state.playerX,
            y: state.playerY + 10,
            life: 1.0,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() * 0.5)
        });
      }

      // Draw Particles
      state.particles.forEach((p, i) => {
        p.life -= 0.05;
        p.x += p.vx;
        p.y += p.vy;
        ctx.fillStyle = `rgba(255, 255, 255, ${p.life})`;
        ctx.fillRect(p.x, p.y, 2, 2);
      });
      state.particles = state.particles.filter(p => p.life > 0);

      // 4. Draw Fragment (The Goal)
      state.items.forEach(item => {
        item.angle += 0.05;
        const floatY = Math.sin(state.frameCount * 0.1) * 3;
        
        ctx.save();
        ctx.translate(item.x, item.y + floatY);
        ctx.rotate(item.angle);
        
        // Draw 7-pointed Star (Fragment)
        ctx.beginPath();
        ctx.fillStyle = `hsl(${(state.frameCount * 2) % 360}, 100%, 50%)`; // Rainbow effect
        for(let i=0; i<7; i++) {
             ctx.lineTo(Math.cos((i*51)*Math.PI/180)*12, Math.sin((i*51)*Math.PI/180)*12);
             ctx.lineTo(Math.cos((25+i*51)*Math.PI/180)*5, Math.sin((25+i*51)*Math.PI/180)*5);
        }
        ctx.closePath();
        ctx.fill();
        // Glow
        ctx.shadowBlur = 15;
        ctx.shadowColor = "white";
        ctx.stroke();
        ctx.shadowBlur = 0;
        ctx.restore();

        // Collision Check
        const dist = Math.hypot(state.playerX - item.x, state.playerY - item.y);
        if (dist < 25) {
            handleCollect(item.id);
        }
      });

      // 5. Draw Asriel
      if (asrielRef.current) {
        const bob = Math.sin(state.frameCount * 0.15) * 2;
        const width = 30; // Aspect ratio of sprite
        const height = 42; 
        
        ctx.save();
        ctx.translate(state.playerX, state.playerY + bob);
        
        // Shadow
        ctx.fillStyle = 'rgba(0,0,0,0.5)';
        ctx.beginPath();
        ctx.ellipse(0, height/2 + 5, 10, 3, 0, 0, Math.PI*2);
        ctx.fill();

        // Image
        ctx.drawImage(asrielRef.current, -width/2, -height/2, width, height);
        ctx.restore();
      } else {
        // Fallback if image fails loading
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(state.playerX, state.playerY, 10, 0, Math.PI*2);
        ctx.fill();
      }

      animationId = requestAnimationFrame(loop);
    };

    animationId = requestAnimationFrame(loop);

    // Input Handling
    const updateTarget = (clientX: number, clientY: number) => {
        const rect = canvas.getBoundingClientRect();
        const scaleX = CANVAS_WIDTH / rect.width;
        const scaleY = CANVAS_HEIGHT / rect.height;
        gameData.current.targetX = (clientX - rect.left) * scaleX;
        gameData.current.targetY = (clientY - rect.top) * scaleY;
    };

    const onTouch = (e: TouchEvent) => { e.preventDefault(); updateTarget(e.touches[0].clientX, e.touches[0].clientY); };
    const onMouse = (e: MouseEvent) => { updateTarget(e.clientX, e.clientY); };

    canvas.addEventListener('touchmove', onTouch, { passive: false });
    canvas.addEventListener('touchstart', onTouch, { passive: false }); // Added touchstart for instant reaction
    canvas.addEventListener('mousemove', onMouse);

    return () => {
      cancelAnimationFrame(animationId);
      canvas.removeEventListener('touchmove', onTouch);
      canvas.removeEventListener('touchstart', onTouch);
      canvas.removeEventListener('mousemove', onMouse);
    };
  }, [gameState]);

  const handleCollect = (id: number) => {
    setGameState('MESSAGE');
    setCurrentMessage(MEMORY_MESSAGES[id]);
    const newScore = score + 1;
    setScore(newScore);
  };

  const nextLevel = () => {
    if (score >= MEMORY_MESSAGES.length) {
        setGameState('WON');
    } else {
        spawnFragment(score);
        setGameState('PLAYING');
    }
  };

  return (
    <div className="w-full mx-auto font-pixel relative">
        <div className="text-center mb-6">
             <h2 className="text-3xl text-white drop-shadow-md">Recupera los Recuerdos</h2>
             <p className="text-gray-400 text-sm font-modern uppercase tracking-widest">Fragmentos: {score} / 5</p>
        </div>

        <div className="relative mx-auto max-w-[480px] rounded-lg overflow-hidden border border-white/20 shadow-xl bg-black">
            <canvas 
                ref={canvasRef} 
                width={320} 
                height={240} 
                className="w-full h-auto block bg-black touch-none cursor-pointer"
                style={{ imageRendering: 'pixelated' }}
            />

            {/* Start Screen */}
            {gameState === 'START' && (
                <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center p-6 text-center backdrop-blur-sm z-20">
                    <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4 animate-bounce border border-white/20">
                        <img src={ASRIEL_IMG} className="w-10 h-auto pixelated" alt="Asriel" />
                    </div>
                    <p className="text-white text-lg mb-6 leading-tight">Ayuda a Asriel a encontrar los 5 fragmentos perdidos.</p>
                    <button 
                        onClick={startGame}
                        className="bg-white text-black px-6 py-2 text-xl font-bold hover:scale-105 transition-transform flex items-center gap-2 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                    >
                        <Play size={20} fill="black" /> COMENZAR
                    </button>
                </div>
            )}

            {/* Message Overlay (Undertale Dialog Box) */}
            {gameState === 'MESSAGE' && (
                <div className="absolute inset-x-0 bottom-0 top-auto md:top-auto p-2 z-30">
                    <div className="bg-black/90 backdrop-blur border-2 border-white rounded-lg p-4 flex gap-4 items-start animate-slide-up shadow-2xl">
                        {/* Chara Portrait Container - Cropped via CSS */}
                        <div className="hidden md:block w-16 h-16 border-2 border-white rounded shrink-0 overflow-hidden relative bg-gray-900">
                             {/* Trying to target Chara's face from the sprite sheet roughly */}
                             <img 
                                src={SPRITE_SHEET} 
                                alt="Chara"
                                className="absolute max-w-none w-[200%] h-auto pixelated"
                                style={{ 
                                    top: '-10%', 
                                    left: '-90%', // Shift to show right side (Chara)
                                    filter: 'contrast(1.2)' 
                                }} 
                             />
                        </div>
                        
                        <div className="flex-1">
                            <h4 className="text-ut-yellow text-sm mb-1 font-modern tracking-widest uppercase">* Recuerdo {score}</h4>
                            <p className="text-white text-lg leading-snug">{currentMessage}</p>
                            <button 
                                onClick={nextLevel}
                                className="mt-3 text-gray-400 text-xs hover:text-white animate-pulse font-modern uppercase tracking-widest"
                            >
                                [ Pulsa para continuar ]
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Win Screen */}
            {gameState === 'WON' && (
                <div className="absolute inset-0 bg-black/95 flex flex-col items-center justify-center text-center p-6 z-40">
                    <Sparkles className="text-ut-yellow w-16 h-16 mb-4 animate-spin-slow" />
                    <h3 className="text-3xl text-white mb-2">¡LÍNEA TEMPORAL RESTAURADA!</h3>
                    <p className="text-gray-300 mb-8 max-w-xs mx-auto leading-relaxed">
                        Gracias por estos 5 años. Eres mi mejor partida guardada.
                    </p>
                    <button 
                        onClick={startGame}
                        className="text-ut-blue hover:text-white underline flex items-center gap-2"
                    >
                        <RefreshCw size={16} /> Volver a jugar
                    </button>
                </div>
            )}
        </div>
        
        <p className="text-center mt-4 text-gray-500 text-xs uppercase tracking-widest opacity-60">
            {gameState === 'PLAYING' ? "Toca la pantalla para mover a Asriel" : "..."}
        </p>
    </div>
  );
};

export default MiniGame;