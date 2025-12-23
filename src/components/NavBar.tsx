import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Code, Github, Linkedin, Home, Sparkles, Briefcase, User, MessageCircle, Terminal, Instagram } from 'lucide-react';

interface NavItem {
    id: string;
    label: string;
    path: string;
    icon: React.FC<any>;
    color: string;
    gradient: string;
}

const navItems: NavItem[] = [
    {
        id: 'home',
        label: 'Inicio',
        path: '/',
        icon: Home,
        color: 'text-sky-400',
        gradient: 'from-sky-400 via-blue-500 to-indigo-500'
    },
    {
        id: 'about',
        label: 'Sobre Mí',
        path: '/sobre-mi',
        icon: User,
        color: 'text-amber-400',
        gradient: 'from-amber-400 via-orange-500 to-rose-500'
    },
    {
        id: 'skills',
        label: 'Habilidades',
        path: '/habilidades',
        icon: Sparkles,
        color: 'text-violet-400',
        gradient: 'from-violet-400 via-purple-500 to-fuchsia-500'
    },
    {
        id: 'projects',
        label: 'Proyectos',
        path: '/proyectos',
        icon: Briefcase,
        color: 'text-emerald-400',
        gradient: 'from-emerald-400 via-teal-500 to-cyan-500'
    },
    {
        id: 'contact',
        label: 'Contacto',
        path: '/contacto',
        icon: MessageCircle,
        color: 'text-pink-400',
        gradient: 'from-pink-400 via-rose-500 to-red-500'
    },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const navRef = useRef<HTMLDivElement>(null);

    // Determinar sección activa basada en la ruta actual
    const getActiveSectionFromPath = (pathname: string) => {
        const item = navItems.find(item => item.path === pathname);
        return item ? item.id : 'home';
    };

    const activeSection = getActiveSectionFromPath(location.pathname);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (navRef.current && !navRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    // Cerrar menú móvil al cambiar de ruta
    useEffect(() => {
        setIsOpen(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [location.pathname]);

    const handleNavClick = () => {
        setIsOpen(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const NavButton: React.FC<{ item: NavItem }> = ({ item }) => {
        const [isHovered, setIsHovered] = useState(false);
        const isActive = activeSection === item.id;
        const Icon = item.icon;

        return (
            <Link
                to={item.path}
                onClick={handleNavClick}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="relative px-4 py-2.5 transition-all duration-500 group"
            >
                <div className={`absolute inset-0 rounded-xl transition-all duration-500 ${isActive
                    ? 'glass-elite-strong shadow-xl scale-105 border border-white/30'
                    : 'glass-elite scale-95 border border-white/15 group-hover:glass-elite-strong group-hover:scale-100'
                    }`}>
                    {isActive && (
                        <>
                            <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${item.gradient} opacity-10`} />
                            <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${item.gradient} opacity-5 animate-pulse-elite`} />
                        </>
                    )}
                </div>

                <div className="relative z-10 flex items-center gap-2">
                    <div className={`relative transition-all duration-500 ${isActive || isHovered ? 'scale-110' : 'scale-100'}`}>
                        <Icon className={`w-4 h-4 transition-all duration-500 ${isActive ? item.color : 'text-slate-400 group-hover:text-slate-200'
                            }`} strokeWidth={2.5} />
                        {isActive && (
                            <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} blur-lg opacity-40 animate-pulse`} />
                        )}
                    </div>
                    <span className={`text-sm font-bold tracking-wide transition-all duration-500 ${isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'
                        }`}>
                        {item.label}
                    </span>
                </div>

                {isActive && (
                    <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${item.gradient} opacity-10 animate-ping-elite`} />
                )}
            </Link>
        );
    };

    const SocialLink: React.FC<{ Icon: React.FC<any>, href: string, label: string, color: string, gradient: string }> = ({ Icon, href, label, color, gradient }) => {
        const [isHovered, setIsHovered] = useState(false);

        return (
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="relative p-2 rounded-lg transition-all duration-500 group"
            >
                <div className={`absolute inset-0 rounded-lg glass-elite transition-all duration-500 ${isHovered ? 'glass-elite-strong scale-110 shadow-lg' : 'scale-100'
                    }`}>
                    <div className={`absolute inset-0 rounded-lg bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                </div>
                <Icon className={`relative w-4 h-4 transition-all duration-500 ${isHovered ? `${color} scale-110` : 'text-slate-400 scale-100'
                    }`} strokeWidth={2.5} />
                {isHovered && (
                    <div className={`absolute inset-0 bg-gradient-to-r ${gradient} blur-lg opacity-30 animate-pulse`} />
                )}
            </a>
        );
    };

    return (
        <>
            <style>{`
        @keyframes pulse-elite {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        .animate-pulse-elite { animation: pulse-elite 2.5s ease-in-out infinite; }

        @keyframes ping-elite {
          0% { transform: scale(1); opacity: 0.3; }
          100% { transform: scale(1.3); opacity: 0; }
        }
        .animate-ping-elite { animation: ping-elite 2s cubic-bezier(0, 0, 0.2, 1) infinite; }

        @keyframes shimmer-elite {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .animate-shimmer-elite { 
          animation: shimmer-elite 2.5s linear infinite; 
          background-size: 200% 100%; 
        }

        @keyframes float-vertical {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(5deg); }
        }
        .animate-float-vertical { animation: float-vertical 3s ease-in-out infinite; }

        @keyframes rotate-slow-elite {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-rotate-slow-elite { animation: rotate-slow-elite 60s linear infinite; }

        @keyframes scale-in-smooth {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-scale-in-smooth { animation: scale-in-smooth 0.8s ease-out forwards; }

        @keyframes glow-pulse-logo {
          0%, 100% { 
            filter: drop-shadow(0 0 10px rgba(139, 92, 246, 0.4)) drop-shadow(0 0 20px rgba(139, 92, 246, 0.2));
          }
          50% { 
            filter: drop-shadow(0 0 20px rgba(139, 92, 246, 0.6)) drop-shadow(0 0 40px rgba(139, 92, 246, 0.4));
          }
        }
        .animate-glow-pulse-logo { animation: glow-pulse-logo 3s ease-in-out infinite; }

        @keyframes text-shimmer-premium {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-text-shimmer-premium { 
          animation: text-shimmer-premium 5s ease infinite; 
          background-size: 200% auto; 
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

            <nav
                ref={navRef}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-1200 ${scrolled ? 'shadow-2xl' : ''
                    }`}
            >
                <div className="absolute top-0 left-0 right-0 h-[1px]">
                    <div className="absolute inset-0 bg-gradient-to-r from-sky-400 via-violet-500 to-pink-500 opacity-50" />
                    <div className="absolute inset-0 bg-gradient-to-r from-sky-400 via-violet-500 to-pink-500 blur-sm animate-pulse" />
                </div>

                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 backdrop-blur-xl bg-slate-950/70 rounded-2xl my-2 border border-white/10">
                    <div className="flex items-center justify-between h-16">
                        <Link
                            to="/"
                            onClick={handleNavClick}
                            className="flex items-center gap-2.5 group relative z-10"
                        >
                            <div className="relative">
                                <div className="absolute -inset-2 rounded-lg border-2 border-violet-400/30 animate-rotate-slow-elite" />
                                <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-sky-400/20 via-violet-400/20 to-pink-400/20 blur-md animate-pulse-elite" />
                                <div className="relative animate-float-vertical animate-glow-pulse-logo">
                                    <Code className="w-8 h-8 text-white group-hover:text-violet-300 transition-all duration-500" strokeWidth={2.5} />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-r from-sky-400 via-violet-400 to-pink-400 rounded-lg blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
                            </div>

                            <div className="flex flex-col">
                                <h1 className="text-xl font-black tracking-tight relative">
                                    <span className="bg-gradient-to-r from-sky-400 via-violet-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg animate-text-shimmer-premium">
                                        FDroots
                                    </span>
                                </h1>
                                <div className="flex items-center gap-1">
                                    <Terminal className="w-2.5 h-2.5 text-violet-400 animate-pulse" strokeWidth={2.5} />
                                    <p className="text-[10px] font-bold tracking-wider uppercase bg-gradient-to-r from-sky-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">
                                        CODE FOR LIFE
                                    </p>
                                </div>
                            </div>
                        </Link>

                        <div className="hidden lg:flex items-center gap-1">
                            {navItems.map((item) => (
                                <NavButton key={item.id} item={item} />
                            ))}
                        </div>

                        <div className="flex items-center gap-2.5">
                            <div className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-lg glass-elite-strong shadow-lg">
                                <SocialLink Icon={Github} href="https://github.com/federasty" label="GitHub" color="text-slate-300" gradient="from-slate-400 to-slate-600" />
                                <div className="w-px h-4 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
                                <SocialLink Icon={Linkedin} href="https://www.linkedin.com/in/federico-daniel-142b22349/" label="LinkedIn" color="text-blue-400" gradient="from-blue-400 to-cyan-400" />
                                <div className="w-px h-4 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
                                <SocialLink Icon={Instagram} href="https://www.instagram.com/fd_roots/" label="Instagram" color="text-purple-400" gradient="from-purple-400 via-pink-500 to-yellow-500" />
                            </div>

                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="lg:hidden relative w-10 h-10 rounded-lg glass-elite-strong hover:scale-105 transition-all duration-500 group shadow-lg"
                                aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
                            >
                                <div className={`relative flex items-center justify-center h-full transition-all duration-500 ${isOpen ? 'rotate-90' : 'rotate-0'}`}>
                                    {isOpen ? (
                                        <X className="w-5 h-5 text-white drop-shadow-lg" strokeWidth={2.5} />
                                    ) : (
                                        <Menu className="w-5 h-5 text-white drop-shadow-lg" strokeWidth={2.5} />
                                    )}
                                </div>
                            </button>
                        </div>
                    </div>
                </div>

                <div className={`lg:hidden transition-all duration-1000 ease-in-out overflow-hidden ${isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                    <div className="relative px-4 sm:px-6 pt-4 pb-6 space-y-2 bg-slate-950 border-t border-white/10 shadow-xl">
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.02)_1px,transparent_1px)] bg-[size:30px_30px]" />

                        {navItems.map((item, index) => {
                            const isActive = activeSection === item.id;
                            const Icon = item.icon;

                            return (
                                <Link
                                    key={item.id}
                                    to={item.path}
                                    onClick={handleNavClick}
                                    className={`relative w-full group overflow-hidden transition-all duration-500 rounded-xl block ${isActive
                                        ? 'glass-elite-strong shadow-xl scale-[1.01] border border-white/30'
                                        : 'glass-elite hover:glass-elite-strong hover:scale-[1.005] border border-white/15'
                                        } animate-scale-in-smooth`}
                                    style={{
                                        animationDelay: `${index * 50}ms`,
                                    }}
                                >
                                    {isActive && (
                                        <>
                                            <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-10 blur-xl`} />
                                            <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-5 animate-pulse-elite`} />
                                            <div className={`absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r ${item.gradient} opacity-60`} />
                                            <div className={`absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r ${item.gradient} opacity-60`} />
                                        </>
                                    )}

                                    <div className="relative flex items-center gap-3 px-4 py-3">
                                        <div className={`relative transition-all duration-500 ${isActive ? 'scale-110' : 'scale-100 group-hover:scale-105'}`}>
                                            <Icon className={`w-5 h-5 transition-all duration-500 ${isActive ? `${item.color} drop-shadow-lg` : 'text-slate-400 group-hover:text-white'
                                                }`} strokeWidth={2.5} />
                                            {isActive && (
                                                <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} blur-lg opacity-50 animate-pulse`} />
                                            )}
                                        </div>
                                        <span className={`font-bold text-sm tracking-wide transition-all duration-500 ${isActive ? 'text-white drop-shadow-lg' : 'text-slate-400 group-hover:text-white'
                                            }`}>
                                            {item.label}
                                        </span>
                                        {isActive && (
                                            <div className="ml-auto">
                                                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${item.gradient} shadow-lg animate-pulse`} />
                                            </div>
                                        )}
                                    </div>
                                </Link>
                            );
                        })}

                        <div className="flex items-center justify-center gap-2 pt-3 mt-2 border-t border-white/10">
                            <SocialLink Icon={Github} href="https://github.com/federasty" label="GitHub" color="text-slate-300" gradient="from-slate-400 to-slate-600" />
                            <SocialLink Icon={Linkedin} href="https://www.linkedin.com/in/federico-daniel-142b22349/" label="LinkedIn" color="text-blue-400" gradient="from-blue-400 to-cyan-400" />
                            <SocialLink Icon={Instagram} href="https://www.instagram.com/fd_roots/" label="Instagram" color="text-purple-400" gradient="from-purple-400 via-pink-500 to-yellow-500" />
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}