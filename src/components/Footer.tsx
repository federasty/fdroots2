import React, { useState, useEffect } from 'react';
import { Heart, Code, Coffee, Github, Linkedin, Instagram, Terminal } from 'lucide-react';

export default function Footer() {
    const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth) * 100,
                y: (e.clientY / window.innerHeight) * 100,
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const SocialLink: React.FC<{ Icon: React.FC<any>, href: string, label: string, color: string, gradient: string }> =
        ({ Icon, href, label, color, gradient }) => {
            const [isHovered, setIsHovered] = useState(false);

            return (
                <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className="relative p-2.5 rounded-xl transition-all duration-500 group"
                >
                    <div className={`absolute inset-0 rounded-xl transition-all duration-500 ${isHovered ? 'glass-elite-strong scale-110 shadow-xl' : 'glass-elite scale-100'
                        }`}>
                        <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-15 transition-opacity duration-500`} />
                    </div>
                    <Icon className={`relative w-4.5 h-4.5 transition-all duration-500 ${isHovered ? `${color} scale-110` : 'text-slate-400 scale-100'
                        }`} strokeWidth={2.5} />
                    {isHovered && (
                        <div className={`absolute inset-0 bg-gradient-to-r ${gradient} blur-xl opacity-40 animate-pulse`} />
                    )}
                </a>
            );
        };

    return (
        <>
            <style>{`
        @keyframes float-particle {
          0% { 
            transform: translateY(100vh) translateX(0px) rotate(0deg);
            opacity: 0;
          }
          10% { opacity: 0.4; }
          50% { 
            transform: translateY(50vh) translateX(20px) rotate(180deg);
            opacity: 0.6;
          }
          90% { opacity: 0.2; }
          100% { 
            transform: translateY(-50px) translateX(-10px) rotate(360deg);
            opacity: 0;
          }
        }

        .animate-float-particle {
          animation: float-particle 20s ease-in-out infinite;
        }

        @keyframes glow-pulse-footer {
          0%, 100% { 
            opacity: 0.4; 
            transform: scale(1); 
          }
          50% { 
            opacity: 0.8; 
            transform: scale(1.05); 
          }
        }

        .animate-glow-pulse-footer {
          animation: glow-pulse-footer 6s ease-in-out infinite;
        }

        @keyframes divider-shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        .animate-divider-shimmer {
          animation: divider-shimmer 3s linear infinite;
          background-size: 200% 100%;
        }

        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }

        .animate-heartbeat {
          animation: heartbeat 1.5s ease-in-out infinite;
        }

        @keyframes logo-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }

        .animate-logo-float {
          animation: logo-float 3s ease-in-out infinite;
        }

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
      `}</style>

            <footer className="relative py-10 sm:py-12 overflow-hidden bg-slate-950">
                {/* Ambient Background Orbs */}
                <div
                    className="absolute -bottom-20 left-20 w-[500px] h-[500px] bg-gradient-to-r from-sky-500/8 via-violet-500/6 to-pink-500/8 rounded-full blur-3xl pointer-events-none animate-glow-pulse-footer"
                    style={{
                        transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
                    }}
                    aria-hidden="true"
                />
                <div
                    className="absolute -bottom-20 right-20 w-[450px] h-[450px] bg-gradient-to-r from-emerald-500/7 via-cyan-500/5 to-blue-500/7 rounded-full blur-3xl pointer-events-none animate-glow-pulse-footer"
                    style={{
                        transform: `translate(${-mousePosition.x * 0.02}px, ${-mousePosition.y * 0.02}px)`,
                        animationDelay: '2s',
                    }}
                    aria-hidden="true"
                />

                {/* Floating Particles */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
                    {[...Array(12)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-1 h-1 rounded-full animate-float-particle"
                            style={{
                                left: `${(i * 8 + 5) % 100}%`,
                                background: [
                                    'radial-gradient(circle, #10B981, transparent)',
                                    'radial-gradient(circle, #00CFFF, transparent)',
                                    'radial-gradient(circle, #FF6B9D, transparent)',
                                    'radial-gradient(circle, #C471ED, transparent)',
                                ][i % 4],
                                boxShadow: [
                                    '0 0 8px rgba(16, 185, 129, 0.4)',
                                    '0 0 8px rgba(0, 207, 255, 0.4)',
                                    '0 0 8px rgba(255, 107, 157, 0.4)',
                                    '0 0 8px rgba(196, 113, 237, 0.4)',
                                ][i % 4],
                                animationDelay: `${i * -1.5}s`,
                                animationDuration: `${18 + i * 2}s`,
                            }}
                        />
                    ))}
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Top Decorative Divider */}
                    <div className="mb-8">
                        <div className="h-px w-full bg-gradient-to-r from-transparent via-sky-400/30 through-violet-400/30 to-transparent" />
                        <div
                            className="h-px w-full bg-gradient-to-r from-sky-400 via-violet-500 to-pink-500 opacity-60 animate-divider-shimmer"
                            style={{ marginTop: '-1px' }}
                        />
                    </div>

                    {/* Main Content */}
                    <div className="space-y-7">
                        {/* Logo Section */}
                        <div className="flex flex-col items-center gap-4">
                            {/* Logo */}
                            <div className="flex items-center gap-3 group">
                                <div className="relative animate-logo-float">
                                    <div className="absolute -inset-2 rounded-xl border-2 border-violet-400/20 animate-pulse" />
                                    <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-sky-400/20 via-violet-400/20 to-pink-400/20 blur-lg" />
                                    <Code className="relative w-8 h-8 text-white group-hover:text-violet-300 transition-all duration-500" strokeWidth={2.5} />
                                    <div className="absolute inset-0 bg-gradient-to-r from-sky-400 via-violet-400 to-pink-400 rounded-xl blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
                                </div>

                                <div className="flex flex-col">
                                    <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                                        <span className="bg-gradient-to-r from-sky-400 via-violet-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg">
                                            FDroots
                                        </span>
                                    </h2>
                                    <div className="flex items-center gap-1.5">
                                        <Terminal className="w-2.5 h-2.5 text-violet-400 animate-pulse" strokeWidth={2.5} />
                                        <p className="text-[10px] font-bold tracking-wider uppercase bg-gradient-to-r from-sky-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">
                                            CODE FOR LIFE
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Social Links */}
                            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl glass-elite-strong shadow-xl">
                                <SocialLink
                                    Icon={Github}
                                    href="https://github.com/federasty"
                                    label="GitHub"
                                    color="text-slate-300"
                                    gradient="from-slate-400 to-slate-600"
                                />
                                <div className="w-px h-5 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
                                <SocialLink
                                    Icon={Linkedin}
                                    href="https://www.linkedin.com/in/federico-daniel-142b22349/"
                                    label="LinkedIn"
                                    color="text-blue-400"
                                    gradient="from-blue-400 to-cyan-400"
                                />
                                <div className="w-px h-5 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
                                <SocialLink
                                    Icon={Instagram}
                                    href="https://www.instagram.com/fd_roots/"
                                    label="Instagram"
                                    color="text-pink-400"
                                    gradient="from-purple-400 via-pink-500 to-yellow-500"
                                />
                            </div>
                        </div>

                        {/* Bottom Section */}
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
                            {/* Copyright */}
                            <div className="text-center sm:text-left">
                                <p className="text-xs sm:text-sm text-slate-400">
                                    © 2025{' '}
                                    <span className="bg-gradient-to-r from-sky-400 via-violet-400 to-pink-400 bg-clip-text text-transparent font-bold">
                                        Federico Daniel
                                    </span>
                                    {' '}— Todos los derechos reservados.
                                </p>
                            </div>

                            {/* Made With Love */}
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg glass-elite">
                                <span className="text-xs sm:text-sm text-slate-400">Hecho con</span>
                                <Heart className="w-3.5 h-3.5 text-pink-400 animate-heartbeat" fill="currentColor" strokeWidth={2} />
                                <span className="text-xs sm:text-sm text-slate-400">y</span>
                                <Coffee className="w-3.5 h-3.5 text-amber-400" strokeWidth={2.5} />
                                <Code className="w-3.5 h-3.5 text-emerald-400" strokeWidth={2.5} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Glow */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-24 bg-gradient-to-t from-violet-500/10 via-transparent to-transparent pointer-events-none" aria-hidden="true" />
            </footer>
        </>
    );
}
