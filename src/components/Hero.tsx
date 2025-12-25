import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Code2, Database, Layers, Cpu, Globe, Server, Terminal } from 'lucide-react';

export default function Hero() {
    const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
    const [isVisible, setIsVisible] = useState(false);
    const heroRef = useRef<HTMLDivElement>(null);

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

        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    const skills = [
        { icon: Code2, label: 'Frontend', gradient: 'from-sky-400 via-blue-500 to-indigo-500', color: 'text-sky-400', bg: 'bg-sky-400/10' },
        { icon: Database, label: 'Backend', gradient: 'from-violet-400 via-purple-500 to-fuchsia-500', color: 'text-violet-400', bg: 'bg-violet-400/10' },
        { icon: Layers, label: 'Full Stack', gradient: 'from-emerald-400 via-teal-500 to-cyan-500', color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
        { icon: Cpu, label: 'Architecture', gradient: 'from-amber-400 via-orange-500 to-rose-500', color: 'text-amber-400', bg: 'bg-amber-400/10' },
        { icon: Globe, label: 'APIs', gradient: 'from-pink-400 via-rose-500 to-red-500', color: 'text-pink-400', bg: 'bg-pink-400/10' },
        { icon: Server, label: 'DevOps', gradient: 'from-cyan-400 via-sky-500 to-blue-500', color: 'text-cyan-400', bg: 'bg-cyan-400/10' },
    ];

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <style>{`
        /* ========================================
           ULTRA PREMIUM ANIMATIONS - SUBTLE & REFINED
           ======================================== */
        
        /* Gentle Floating Animation */
        @keyframes float-gentle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .animate-float-gentle { 
          animation: float-gentle 4s ease-in-out infinite; 
        }

        /* Smooth Gradient Shift */
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-shift { 
          animation: gradient-shift 8s ease infinite; 
          background-size: 200% 200%; 
        }

        /* Subtle Glow Pulse */
        @keyframes glow-subtle {
          0%, 100% { 
            box-shadow: 
              0 0 20px rgba(139, 92, 246, 0.15),
              0 0 40px rgba(139, 92, 246, 0.08);
          }
          50% { 
            box-shadow: 
              0 0 30px rgba(139, 92, 246, 0.25),
              0 0 60px rgba(139, 92, 246, 0.12);
          }
        }
        .animate-glow-subtle { 
          animation: glow-subtle 4s ease-in-out infinite; 
        }

        /* Elegant Text Shimmer */
        @keyframes text-shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .animate-text-shimmer { 
          animation: text-shimmer 8s linear infinite; 
          background-size: 200% auto; 
        }

        /* Smooth Fade In Up */
        @keyframes fade-in-up {
          from { 
            opacity: 0; 
            transform: translateY(30px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        .animate-fade-in-up { 
          animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; 
        }

        /* Refined Scale In */
        @keyframes scale-in {
          from { 
            transform: scale(0.96); 
            opacity: 0; 
          }
          to { 
            transform: scale(1); 
            opacity: 1; 
          }
        }
        .animate-scale-in { 
          animation: scale-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; 
        }

        /* Delicate Shine Effect */
        @keyframes shine-delicate {
          0% { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(200%) skewX(-15deg); }
        }
        .animate-shine-delicate { 
          animation: shine-delicate 3s ease-in-out infinite; 
        }

        /* Subtle Border Glow */
        @keyframes border-glow-soft {
          0%, 100% { border-color: rgba(139, 92, 246, 0.2); }
          50% { border-color: rgba(139, 92, 246, 0.4); }
        }
        .animate-border-glow-soft { 
          animation: border-glow-soft 3s ease-in-out infinite; 
        }

        /* Icon Rotate Gentle */
        @keyframes rotate-gentle {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(5deg); }
        }
        .animate-rotate-gentle { 
          animation: rotate-gentle 6s ease-in-out infinite; 
        }

        /* Particle Float */
        @keyframes particle-float {
          0%, 100% { 
            transform: translate(0, 0) scale(1); 
            opacity: 0.3; 
          }
          50% { 
            transform: translate(10px, -10px) scale(1.1); 
            opacity: 0.6; 
          }
        }
        .animate-particle-float { 
          animation: particle-float 5s ease-in-out infinite; 
        }

        /* ========================================
           PREMIUM GLASS MORPHISM
           ======================================== */
        
        .glass-premium {
          background: linear-gradient(
            135deg, 
            rgba(255, 255, 255, 0.08) 0%, 
            rgba(255, 255, 255, 0.04) 100%
          );
          backdrop-filter: blur(24px) saturate(180%);
          -webkit-backdrop-filter: blur(24px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.12);
        }

        .glass-premium-strong {
          background: linear-gradient(
            135deg, 
            rgba(255, 255, 255, 0.12) 0%, 
            rgba(255, 255, 255, 0.06) 100%
          );
          backdrop-filter: blur(32px) saturate(200%);
          -webkit-backdrop-filter: blur(32px) saturate(200%);
          border: 1px solid rgba(255, 255, 255, 0.18);
        }

        /* ========================================
           REFINED TEXT EFFECTS
           ======================================== */
        
        .text-glow-soft {
          text-shadow: 
            0 0 30px rgba(139, 92, 246, 0.3),
            0 0 60px rgba(139, 92, 246, 0.15);
        }

        .text-shadow-premium {
          text-shadow: 
            0 2px 4px rgba(0, 0, 0, 0.1),
            0 4px 8px rgba(0, 0, 0, 0.08);
        }

        /* ========================================
           SOPHISTICATED HOVER EFFECTS
           ======================================== */
        
        .hover-lift {
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .hover-lift:hover {
          transform: translateY(-8px) scale(1.02);
        }

        .hover-glow {
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .hover-glow:hover {
          box-shadow: 
            0 0 30px rgba(139, 92, 246, 0.3),
            0 0 60px rgba(139, 92, 246, 0.15),
            0 20px 40px rgba(0, 0, 0, 0.2);
        }

        /* ========================================
           DECORATIVE ELEMENTS
           ======================================== */
        
        .gradient-border {
          position: relative;
        }

        .gradient-border::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1px;
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.4), rgba(236, 72, 153, 0.4));
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .gradient-border:hover::before {
          opacity: 1;
        }

        /* ========================================
           RESPONSIVE OPTIMIZATIONS
           ======================================== */
        
        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

            <section
                ref={heroRef}
                className="relative w-full h-auto pt-32 pb-16 sm:pt-36 sm:pb-20 md:pt-40 md:pb-24 lg:pt-44 lg:pb-32 xl:min-h-screen xl:flex xl:items-center xl:justify-center overflow-hidden"
            >
                {/* Ambient Background Gradient - Ultra Subtle */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div 
                        className="absolute w-[600px] h-[600px] rounded-full opacity-[0.08] blur-3xl animate-gradient-shift"
                        style={{
                            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)',
                            top: `${mousePosition.y}%`,
                            left: `${mousePosition.x}%`,
                            transform: 'translate(-50%, -50%)',
                            transition: 'top 0.3s ease-out, left 0.3s ease-out',
                        }}
                    />
                    <div 
                        className="absolute w-[500px] h-[500px] rounded-full opacity-[0.06] blur-3xl animate-gradient-shift"
                        style={{
                            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.4) 0%, transparent 70%)',
                            top: `${100 - mousePosition.y}%`,
                            left: `${100 - mousePosition.x}%`,
                            transform: 'translate(-50%, -50%)',
                            transition: 'top 0.3s ease-out, left 0.3s ease-out',
                            animationDelay: '2s',
                        }}
                    />
                </div>

                {/* Floating Particles - Minimal & Elegant */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(8)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-1 h-1 bg-violet-400/20 rounded-full animate-particle-float"
                            style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                animationDelay: `${i * 0.7}s`,
                                animationDuration: `${5 + Math.random() * 3}s`,
                            }}
                        />
                    ))}
                </div>

                {/* Main Content */}
                <div className={`relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="text-center space-y-8 sm:space-y-10 lg:space-y-12">

                       

                        {/* Main Title - Ultra Premium */}
                        <div className="space-y-4 sm:space-y-5 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                            <div className="relative inline-block">
                                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-[1.1] px-4">
                                    <span className="block mb-3 bg-gradient-to-r from-sky-400 via-violet-400 to-pink-400 bg-clip-text text-transparent animate-text-shimmer text-glow-soft">
                                        Full Stack Developer
                                    </span>
                                    <span className="block text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-slate-400/80 mb-2">
                                        Arquitecto de
                                    </span>
                                    <span className="block bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent animate-text-shimmer text-glow-soft">
                                        Soluciones Digitales
                                    </span>
                                </h1>
                            </div>

                            {/* Refined Decorative Line */}
                            <div className="flex justify-center items-center gap-4 mt-6">
                                <div className="w-20 sm:w-32 h-px bg-gradient-to-r from-transparent via-violet-400/40 to-violet-400/60" />
                                <div className="relative w-2 h-2 rounded-full bg-violet-400/60 animate-glow-subtle">
                                    <div className="absolute inset-0 rounded-full bg-violet-400/40 animate-ping" style={{ animationDuration: '3s' }} />
                                </div>
                                <div className="w-20 sm:w-32 h-px bg-gradient-to-l from-transparent via-violet-400/40 to-violet-400/60" />
                            </div>
                        </div>

                        {/* Elegant Description */}
                        <div className="max-w-2xl mx-auto px-4 sm:px-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-300/90 leading-relaxed font-medium text-shadow-premium">
                                Especializado en{' '}
                                <span className="relative inline-block font-bold text-white">
                                    desarrollo end-to-end
                                    <span className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-sky-400/60 to-violet-400/60" />
                                </span>
                                , transformando ideas en{' '}
                                <span className="bg-gradient-to-r from-sky-400 to-violet-400 bg-clip-text text-transparent font-bold">
                                    productos digitales
                                </span>{' '}
                                escalables y de alto rendimiento.
                            </p>
                        </div>

                    
                        {/* Premium Skills Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5 lg:gap-6 max-w-6xl mx-auto px-4 pt-8 sm:pt-12">
                            {skills.map((skill, index) => {
                                const Icon = skill.icon;
                                return (
                                    <div
                                        key={index}
                                        className="relative group animate-fade-in-up"
                                        style={{
                                            animationDelay: `${0.5 + index * 0.08}s`,
                                        }}
                                    >
                                        <div className="relative glass-premium rounded-2xl p-6 sm:p-7 lg:p-8 hover:glass-premium-strong transition-all duration-500 shadow-lg hover:shadow-2xl border border-white/10 hover:border-white/20 overflow-hidden hover-lift gradient-border">

                                            {/* Subtle Background Gradient */}
                                            <div className={`absolute inset-0 bg-gradient-to-br ${skill.gradient} opacity-0 group-hover:opacity-[0.08] rounded-2xl transition-opacity duration-500`} />

                                            {/* Gentle Shine Effect */}
                                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                            <div className="relative flex flex-col items-center gap-3 lg:gap-4">
                                                <div className={`relative p-3 lg:p-4 rounded-xl ${skill.bg} group-hover:scale-110 transition-transform duration-500 shadow-md`}>
                                                    <Icon 
                                                        className={`w-7 h-7 sm:w-8 sm:h-8 lg:w-11 lg:h-11 ${skill.color} transition-all duration-500 animate-float-gentle`} 
                                                        strokeWidth={2.5} 
                                                        style={{ animationDelay: `${index * 0.2}s` }}
                                                    />
                                                    <div className={`absolute inset-0 bg-gradient-to-r ${skill.gradient} opacity-0 group-hover:opacity-40 blur-xl transition-opacity duration-500 rounded-xl`} />
                                                </div>
                                                <span className="text-xs sm:text-sm lg:text-base font-bold text-slate-400 group-hover:text-white transition-colors duration-500 text-center tracking-wide">
                                                    {skill.label}
                                                </span>
                                            </div>

                                            {/* Refined Corner Accents */}
                                            <div className="absolute top-0 right-0 w-10 h-10 lg:w-12 lg:h-12 border-t border-r border-white/0 group-hover:border-white/20 rounded-tr-2xl transition-all duration-500" />
                                            <div className="absolute bottom-0 left-0 w-10 h-10 lg:w-12 lg:h-12 border-b border-l border-white/0 group-hover:border-white/20 rounded-bl-2xl transition-all duration-500" />
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
