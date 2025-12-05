import React, { useState, useEffect, useRef } from 'react';
import { Code2, Rocket, Database, Layers, Cpu, Globe, Terminal, ArrowRight, Server, Zap } from 'lucide-react';

export default function Hero() {
    const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
    const [scrollY, setScrollY] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const heroRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (heroRef.current) {
                const rect = heroRef.current.getBoundingClientRect();
                setMousePosition({
                    x: ((e.clientX - rect.left) / rect.width) * 100,
                    y: ((e.clientY - rect.top) / rect.height) * 100,
                });
            }
        };

        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles: Array<{
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
            color: string;
            opacity: number;
        }> = [];

        const colors = [
            'rgba(56, 189, 248, ',   // sky-400
            'rgba(139, 92, 246, ',   // violet-500
            'rgba(236, 72, 153, ',   // pink-500
            'rgba(34, 211, 238, ',   // cyan-400
            'rgba(251, 146, 60, ',   // orange-400
            'rgba(16, 185, 129, ',   // emerald-500
        ];

        // Aumentar partículas a 150 para más densidad
        for (let i = 0; i < 150; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 1.2,  // Velocidad más dinámica
                vy: (Math.random() - 0.5) * 1.2,
                size: Math.random() * 3.5 + 1.5,  // Tamaños más variados
                color: colors[Math.floor(Math.random() * colors.length)],
                opacity: Math.random() * 0.3 + 0.2,  // Opacidad reducida para no tapar texto
            });
        }

        let animationId: number;

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((p, i) => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

                // Dibujar partículas con glow
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

                // Glow effect
                const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
                gradient.addColorStop(0, p.color + p.opacity + ')');
                gradient.addColorStop(0.5, p.color + (p.opacity * 0.5) + ')');
                gradient.addColorStop(1, p.color + '0)');
                ctx.fillStyle = gradient;
                ctx.fill();

                // Dibujar conexiones para formar figuras geométricas
                particles.forEach((p2, j) => {
                    if (i === j) return;
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    // Aumentar distancia de conexión a 250px para más figuras
                    if (dist < 250) {
                        ctx.beginPath();

                        // Líneas más visibles y con gradiente
                        const lineOpacity = 0.15 * (1 - dist / 250);  // Líneas más sutiles
                        const gradient = ctx.createLinearGradient(p.x, p.y, p2.x, p2.y);
                        gradient.addColorStop(0, p.color + lineOpacity + ')');
                        gradient.addColorStop(1, p2.color + lineOpacity + ')');

                        ctx.strokeStyle = gradient;
                        ctx.lineWidth = 1.5;  // Líneas más gruesas
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                });
            });

            animationId = requestAnimationFrame(animate);
        };

        animate();

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const skills = [
        { icon: Code2, label: 'Frontend', gradient: 'from-sky-400 via-blue-500 to-indigo-500', color: 'text-sky-400', bg: 'bg-sky-400/15' },
        { icon: Database, label: 'Backend', gradient: 'from-violet-400 via-purple-500 to-fuchsia-500', color: 'text-violet-400', bg: 'bg-violet-400/15' },
        { icon: Layers, label: 'Full Stack', gradient: 'from-emerald-400 via-teal-500 to-cyan-500', color: 'text-emerald-400', bg: 'bg-emerald-400/15' },
        { icon: Cpu, label: 'Architecture', gradient: 'from-amber-400 via-orange-500 to-rose-500', color: 'text-amber-400', bg: 'bg-amber-400/15' },
        { icon: Globe, label: 'APIs', gradient: 'from-pink-400 via-rose-500 to-red-500', color: 'text-pink-400', bg: 'bg-pink-400/15' },
        { icon: Server, label: 'DevOps', gradient: 'from-cyan-400 via-sky-500 to-blue-500', color: 'text-cyan-400', bg: 'bg-cyan-400/15' },
    ];

    return (
        <>
            <style>{`
        @keyframes float-smooth {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(30px, -30px) rotate(3deg); }
          66% { transform: translate(-20px, 20px) rotate(-2deg); }
        }
        .animate-float-smooth { animation: float-smooth 20s ease-in-out infinite; }

        @keyframes float-smooth-reverse {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(-30px, 30px) rotate(-3deg); }
          66% { transform: translate(20px, -20px) rotate(2deg); }
        }
        .animate-float-smooth-reverse { animation: float-smooth-reverse 25s ease-in-out infinite; }

        @keyframes glow-pulse-elite {
          0%, 100% { 
            box-shadow: 
              0 0 30px rgba(139, 92, 246, 0.4),
              0 0 60px rgba(139, 92, 246, 0.2),
              inset 0 0 20px rgba(139, 92, 246, 0.1);
          }
          50% { 
            box-shadow: 
              0 0 50px rgba(139, 92, 246, 0.6),
              0 0 100px rgba(139, 92, 246, 0.4),
              inset 0 0 30px rgba(139, 92, 246, 0.2);
          }
        }
        .animate-glow-pulse-elite { animation: glow-pulse-elite 3s ease-in-out infinite; }

        @keyframes text-shimmer-premium {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-text-shimmer-premium { 
          animation: text-shimmer-premium 5s ease infinite; 
          background-size: 200% auto; 
        }

        @keyframes bounce-smooth {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        .animate-bounce-smooth { animation: bounce-smooth 2.5s ease-in-out infinite; }

        @keyframes pulse-ring-elite {
          0% { transform: scale(0.9); opacity: 0.9; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        .animate-pulse-ring-elite { animation: pulse-ring-elite 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }

        @keyframes fade-in-up-smooth {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up-smooth { animation: fade-in-up-smooth 1s ease-out forwards; }

        @keyframes gradient-flow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-flow { 
          animation: gradient-flow 6s ease infinite; 
          background-size: 200% 200%; 
        }

        @keyframes shimmer-elite {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .animate-shimmer-elite { 
          animation: shimmer-elite 2.5s linear infinite; 
          background-size: 200% 100%; 
        }

        @keyframes scale-in-smooth {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-scale-in-smooth { animation: scale-in-smooth 0.8s ease-out forwards; }

        @keyframes border-glow {
          0%, 100% { border-color: rgba(139, 92, 246, 0.4); }
          50% { border-color: rgba(139, 92, 246, 0.9); }
        }
        .animate-border-glow { animation: border-glow 2s ease-in-out infinite; }

        .glass-elite {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.06) 100%);
          backdrop-filter: blur(30px) saturate(180%);
          -webkit-backdrop-filter: blur(30px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.18);
        }

        .glass-elite-strong {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.09) 100%);
          backdrop-filter: blur(40px) saturate(200%);
          -webkit-backdrop-filter: blur(40px) saturate(200%);
          border: 1px solid rgba(255, 255, 255, 0.25);
        }

        .text-glow-elite {
          text-shadow: 
            0 0 40px rgba(139, 92, 246, 0.6),
            0 0 80px rgba(139, 92, 246, 0.4),
            0 0 120px rgba(139, 92, 246, 0.2);
        }

        .perspective-elite {
          transform-style: preserve-3d;
          transition: transform 0.7s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .perspective-elite:hover {
          transform: translateY(-15px) rotateX(10deg) scale(1.08);
        }

        @keyframes float-vertical {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        .animate-float-vertical { animation: float-vertical 3s ease-in-out infinite; }

        @keyframes rotate-slow-elite {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-rotate-slow-elite { animation: rotate-slow-elite 60s linear infinite; }

        @keyframes slide-shine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-slide-shine { animation: slide-shine 3s ease-in-out infinite; }
      `}</style>

            <section
                ref={heroRef}
                className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-20 sm:pt-24 md:pt-28"
                style={{
                    transform: `translateY(${scrollY * 0.3}px)`,
                }}
            >
                {/* Canvas de Partículas Premium con Máscara */}
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 pointer-events-none opacity-50"
                    style={{
                        maskImage: 'radial-gradient(ellipse 60% 70% at 50% 50%, transparent 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.8) 70%, black 100%)',
                        WebkitMaskImage: 'radial-gradient(ellipse 60% 70% at 50% 50%, transparent 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.8) 70%, black 100%)',
                    }}
                />

                {/* Fondo Premium Oscuro */}
                <div className="absolute inset-0 overflow-hidden">
                    {/* Grid Pattern Sutil */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
                </div>

                {/* Contenido Principal */}
                <div className={`relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="text-center space-y-5 sm:space-y-6 lg:space-y-7">

                        {/* Badge Premium - Solo Desktop */}
                        <div className="hidden md:flex justify-center animate-fade-in-up-smooth" style={{ animationDelay: '0.2s' }}>
                            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full glass-elite-strong shadow-2xl group hover:scale-110 transition-all duration-500 border border-violet-400/40 animate-glow-pulse-elite">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-violet-400 rounded-full blur-lg opacity-70 animate-pulse" />
                                    <Zap className="relative w-4 h-4 text-violet-400" strokeWidth={3} fill="currentColor" />
                                </div>
                                <span className="text-xs font-black tracking-wider bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                                    DISPONIBLE
                                </span>
                                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-lg shadow-emerald-400/80" />
                            </div>
                        </div>

                        {/* Título Principal Elite */}
                        <div className="space-y-3 sm:space-y-4 animate-fade-in-up-smooth" style={{ animationDelay: '0.3s' }}>
                            <div className="relative inline-block">
                                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight leading-[1.15] px-4">
                                    <span className="block mb-2 bg-gradient-to-r from-sky-400 via-violet-500 to-pink-500 bg-clip-text text-transparent animate-text-shimmer-premium drop-shadow-2xl text-glow-elite">
                                        Full Stack Developer
                                    </span>
                                    <span className="block text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-slate-400">
                                        Arquitecto de
                                    </span>
                                    <span className="block mt-1.5 sm:mt-2 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent animate-text-shimmer-premium text-glow-elite">
                                        Soluciones Digitales
                                    </span>
                                </h1>
                            </div>

                            {/* Línea Decorativa Elite */}
                            <div className="flex justify-center items-center gap-3">
                                <div className="w-16 sm:w-24 h-px bg-gradient-to-r from-transparent via-sky-400/60 to-sky-400" />
                                <div className="relative w-32 sm:w-48 md:w-64 h-1.5 rounded-full overflow-hidden shadow-lg">
                                    <div className="absolute inset-0 bg-gradient-to-r from-sky-500 via-violet-500 to-pink-500 opacity-60" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-sky-400 via-violet-400 to-pink-400 animate-shimmer-elite" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer-elite" style={{ animationDelay: '0.5s' }} />
                                </div>
                                <div className="w-16 sm:w-24 h-px bg-gradient-to-l from-transparent via-pink-400/60 to-pink-400" />
                            </div>
                        </div>

                        {/* Descripción Concisa y Premium */}
                        <div className="max-w-2xl mx-auto px-4 sm:px-6 animate-fade-in-up-smooth" style={{ animationDelay: '0.5s' }}>
                            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-slate-300 leading-relaxed font-semibold">
                                Especializado en <span className="text-white font-black relative inline-block">
                                    desarrollo end-to-end
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-sky-400 to-violet-500 shadow-lg shadow-sky-400/50" />
                                </span>, transformando ideas en{' '}
                                <span className="bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent font-black">productos digitales</span> escalables y de alto rendimiento.
                            </p>
                        </div>

                        {/* CTAs Premium Compactos */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3 px-4 animate-scale-in-smooth" style={{ animationDelay: '0.7s' }}>
                            <button className="relative group w-full sm:w-auto overflow-hidden rounded-xl shadow-2xl hover:shadow-violet-500/50 transition-all duration-500 hover:scale-110 hover:-translate-y-1">
                                <div className="absolute inset-0 bg-gradient-to-r from-sky-500 via-violet-500 to-pink-500 animate-gradient-flow" />
                                <div className="absolute inset-0 bg-gradient-to-r from-sky-400 via-violet-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl" />
                                <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="relative px-5 sm:px-7 py-2.5 sm:py-3 flex items-center justify-center gap-2 backdrop-blur-xl bg-gradient-to-r from-white/10 to-white/5 border border-white/30 rounded-xl">
                                    <span className="text-sm font-black text-white tracking-wide drop-shadow-lg">Proyectos</span>
                                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                                </div>
                            </button>

                            <button className="relative group w-full sm:w-auto rounded-xl glass-elite-strong shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-110 hover:-translate-y-1 border border-violet-400/40">
                                <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-purple-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="absolute inset-0 bg-gradient-to-r from-violet-400/40 to-purple-400/40 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                                <div className="relative px-5 sm:px-7 py-2.5 sm:py-3 flex items-center justify-center gap-2">
                                    <Terminal className="w-4 h-4 text-violet-400 group-hover:text-violet-300 transition-colors duration-500 drop-shadow-lg" strokeWidth={2.5} />
                                    <span className="text-sm font-black text-white tracking-wide">Contacto</span>
                                    
                                </div>
                            </button>
                        </div>

                        {/* Skills Grid Elite Compacto */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 max-w-5xl mx-auto px-4 pt-4 sm:pt-6">
                            {skills.map((skill, index) => {
                                const Icon = skill.icon;
                                return (
                                    <div
                                        key={index}
                                        className="relative group perspective-elite animate-fade-in-up-smooth"
                                        style={{
                                            animationDelay: `${0.9 + index * 0.1}s`,
                                        }}
                                    >
                                        <div className="relative glass-elite rounded-xl p-3 sm:p-4 hover:glass-elite-strong transition-all duration-500 shadow-xl hover:shadow-2xl border border-white/15 hover:border-white/30 overflow-hidden">

                                            {/* Background Gradient Effect Premium */}
                                            <div className={`absolute inset-0 bg-gradient-to-br ${skill.gradient} opacity-0 group-hover:opacity-15 rounded-xl transition-opacity duration-500`} />
                                            <div className={`absolute inset-0 bg-gradient-to-br ${skill.gradient} opacity-0 group-hover:opacity-25 rounded-xl blur-2xl transition-opacity duration-500`} />

                                            {/* Shine Effect Elite */}
                                            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/0 via-white/15 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 skew-x-12" />

                                            <div className="relative flex flex-col items-center gap-2">
                                                <div className={`relative p-2 rounded-lg ${skill.bg} group-hover:scale-125 transition-transform duration-500 shadow-lg`}>
                                                    <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${skill.color} group-hover:drop-shadow-2xl transition-all duration-500 animate-float-vertical`} strokeWidth={2.5} />
                                                    <div className={`absolute inset-0 bg-gradient-to-r ${skill.gradient} opacity-0 group-hover:opacity-70 blur-xl transition-opacity duration-500 rounded-lg`} />
                                                </div>
                                                <span className={`text-xs font-black text-slate-400 group-hover:text-white transition-colors duration-500 text-center tracking-wide`}>
                                                    {skill.label}
                                                </span>
                                            </div>

                                            {/* Corner Accents Elite */}
                                            <div className={`absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 rounded-tr-xl opacity-0 group-hover:opacity-70 transition-opacity duration-500 ${skill.color}`} />
                                            <div className={`absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 rounded-bl-xl opacity-0 group-hover:opacity-70 transition-opacity duration-500 ${skill.color}`} />

                                            {/* Glow Effect */}
                                            <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} style={{ boxShadow: `0 0 40px rgba(139, 92, 246, 0.4)` }} />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
