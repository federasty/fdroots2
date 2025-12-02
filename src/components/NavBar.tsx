import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Code, Github, Linkedin, Mail, Home, Sparkles, Briefcase, User, MessageCircle, Terminal, Award, Star } from 'lucide-react';

// --- TIPOS DE NAVEGACIÓN ---
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
        color: 'text-blue-500',
        gradient: 'from-blue-500 to-cyan-500'
    },
    {
        id: 'skills',
        label: 'Habilidades',
        path: '/habilidades',
        icon: Sparkles,
        color: 'text-purple-500',
        gradient: 'from-purple-500 to-pink-500'
    },
    {
        id: 'projects',
        label: 'Proyectos',
        path: '/proyectos',
        icon: Briefcase,
        color: 'text-orange-500',
        gradient: 'from-orange-500 to-red-500'
    },
    {
        id: 'about',
        label: 'Sobre Mí',
        path: '/sobre-mi',
        icon: User,
        color: 'text-green-500',
        gradient: 'from-green-500 to-emerald-500'
    },
    {
        id: 'contact',
        label: 'Contacto',
        path: '/contacto',
        icon: MessageCircle,
        color: 'text-indigo-500',
        gradient: 'from-indigo-500 to-blue-500'
    },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [showBadge, setShowBadge] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    const navRef = useRef<HTMLDivElement>(null);

    // Determinación de la sección activa
    const getActiveSectionFromPath = (path: string) => {
        const item = navItems.find(item => item.path === path);
        return item ? item.id : 'home';
    };

    const [activeSection, setActiveSection] = useState(() => getActiveSectionFromPath(location.pathname));

    useEffect(() => {
        setActiveSection(getActiveSectionFromPath(location.pathname));
    }, [location.pathname]);

    // Manejo de Scroll
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
            // Ocultar badge al hacer scroll
            setShowBadge(window.scrollY < 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Seguimiento del mouse para efectos
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (navRef.current) {
                const rect = navRef.current.getBoundingClientRect();
                setMousePosition({
                    x: ((e.clientX - rect.left) / rect.width) * 100,
                    y: ((e.clientY - rect.top) / rect.height) * 100,
                });
            }
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Cerrar menú al hacer click fuera
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (navRef.current && !navRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    // Manejo de Clic en Navegación
    const handleNavClick = (item: NavItem) => {
        setActiveSection(item.id);
        setIsOpen(false);
        navigate(item.path);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // --- BOTÓN DE NAVEGACIÓN CON ICONOS ANIMADOS ---
    const NavButton: React.FC<{ item: NavItem }> = ({ item }) => {
        const [isHovered, setIsHovered] = useState(false);
        const isActive = activeSection === item.id;
        const Icon = item.icon;

        return (
            <button
                onClick={() => handleNavClick(item)}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="relative px-5 py-3 transition-all duration-300 group"
            >
                {/* Fondo con glassmorphism */}
                <div className={`absolute inset-0 rounded-2xl transition-all duration-500 ${isActive
                        ? 'bg-white/20 dark:bg-white/10 backdrop-blur-xl shadow-lg scale-100'
                        : 'bg-white/0 backdrop-blur-0 scale-95 group-hover:bg-white/10 group-hover:backdrop-blur-xl group-hover:scale-100'
                    }`}>
                    {/* Borde con gradiente */}
                    <div className={`absolute inset-0 rounded-2xl border-2 transition-all duration-500 ${isActive
                            ? `border-transparent bg-gradient-to-r ${item.gradient} bg-clip-border opacity-100`
                            : 'border-white/10 group-hover:border-white/20'
                        }`} style={{
                            WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                            WebkitMaskComposite: 'xor',
                            maskComposite: 'exclude',
                        }} />
                </div>

                {/* Contenido */}
                <div className="relative z-10 flex items-center gap-2.5">
                    {/* Icono con animación */}
                    <div className={`relative transition-all duration-500 ${isActive || isHovered ? 'scale-110 rotate-12' : 'scale-100 rotate-0'
                        }`}>
                        <Icon className={`w-5 h-5 transition-all duration-300 ${isActive ? item.color : 'text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white'
                            }`} strokeWidth={2} />

                        {/* Glow effect en el icono */}
                        {isActive && (
                            <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} blur-lg opacity-50 animate-pulse`} />
                        )}
                    </div>

                    {/* Texto */}
                    <span className={`text-sm font-semibold tracking-wide transition-all duration-300 ${isActive
                            ? 'text-slate-900 dark:text-white'
                            : 'text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white'
                        }`}>
                        {item.label}
                    </span>
                </div>

                {/* Partículas mágicas al hacer hover */}
                {(isHovered || isActive) && (
                    <div className="absolute inset-0 pointer-events-none">
                        {[...Array(6)].map((_, i) => (
                            <div
                                key={i}
                                className={`absolute w-1 h-1 rounded-full bg-gradient-to-r ${item.gradient} animate-sparkle`}
                                style={{
                                    left: `${20 + Math.random() * 60}%`,
                                    top: `${20 + Math.random() * 60}%`,
                                    animationDelay: `${i * 0.15}s`,
                                }}
                            />
                        ))}
                    </div>
                )}

                {/* Efecto de onda en click */}
                {isActive && (
                    <div className="absolute inset-0 rounded-2xl">
                        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${item.gradient} opacity-20 animate-ping-slow`} />
                    </div>
                )}
            </button>
        );
    };

    // --- ENLACE A REDES SOCIALES CON EFECTOS ---
    const SocialLink: React.FC<{ Icon: React.FC<any>, href: string, label: string, color: string }> = ({ Icon, href, label, color }) => {
        const [isHovered, setIsHovered] = useState(false);

        return (
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="relative p-2.5 rounded-xl transition-all duration-300 group"
            >
                {/* Fondo glassmorphism */}
                <div className={`absolute inset-0 rounded-xl bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 ${isHovered ? 'scale-110' : 'scale-100'
                    }`} />

                {/* Icono */}
                <Icon className={`relative w-5 h-5 transition-all duration-500 ${isHovered
                        ? `${color} scale-110 rotate-12`
                        : 'text-slate-600 dark:text-slate-400 scale-100 rotate-0'
                    }`} strokeWidth={2} />

                {/* Efecto de glow */}
                {isHovered && (
                    <div className={`absolute inset-0 ${color} blur-xl opacity-30 animate-pulse`} />
                )}

                {/* Partículas */}
                {isHovered && (
                    <div className="absolute inset-0 pointer-events-none">
                        {[...Array(4)].map((_, i) => (
                            <div
                                key={i}
                                className={`absolute w-1 h-1 rounded-full ${color} bg-current animate-sparkle`}
                                style={{
                                    left: '50%',
                                    top: '50%',
                                    transform: `rotate(${i * 90}deg) translateY(-20px)`,
                                    animationDelay: `${i * 0.1}s`,
                                }}
                            />
                        ))}
                    </div>
                )}
            </a>
        );
    };

    return (
        <>
            <style>{`
        /* Animaciones premium y divertidas */
        @keyframes sparkle {
          0%, 100% { 
            opacity: 0;
            transform: translate(0, 0) scale(0);
          }
          50% { 
            opacity: 1;
            transform: translate(var(--tx, 10px), var(--ty, -10px)) scale(1);
          }
        }
        .animate-sparkle {
          animation: sparkle 1.5s ease-in-out infinite;
        }

        @keyframes float-gentle {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg);
          }
          33% { 
            transform: translateY(-8px) rotate(5deg);
          }
          66% { 
            transform: translateY(-4px) rotate(-5deg);
          }
        }
        .animate-float-gentle {
          animation: float-gentle 4s ease-in-out infinite;
        }

        @keyframes ping-slow {
          0% { 
            transform: scale(1);
            opacity: 0.5;
          }
          100% { 
            transform: scale(1.5);
            opacity: 0;
          }
        }
        .animate-ping-slow {
          animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        @keyframes shimmer-wave {
          0% { 
            background-position: -200% center;
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% { 
            background-position: 200% center;
            opacity: 0;
          }
        }
        .animate-shimmer-wave {
          animation: shimmer-wave 3s ease-in-out infinite;
          background-size: 200% 100%;
        }

        @keyframes bounce-gentle {
          0%, 100% { 
            transform: translateY(0);
          }
          50% { 
            transform: translateY(-10px);
          }
        }
        .animate-bounce-gentle {
          animation: bounce-gentle 2s ease-in-out infinite;
        }

        @keyframes rotate-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-rotate-slow {
          animation: rotate-slow 20s linear infinite;
        }

        @keyframes slide-down {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-down {
          animation: slide-down 0.5s ease-out;
        }

        @keyframes badge-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.5), 0 0 40px rgba(99, 102, 241, 0.3);
          }
          50% {
            box-shadow: 0 0 30px rgba(59, 130, 246, 0.8), 0 0 60px rgba(99, 102, 241, 0.5);
          }
        }
        .animate-badge-glow {
          animation: badge-glow 3s ease-in-out infinite;
        }

        /* Efecto de cristal mejorado */
        .glass-effect {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .glass-effect-strong {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(30px) saturate(200%);
          -webkit-backdrop-filter: blur(30px) saturate(200%);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        /* Gradiente animado de fondo */
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          animation: gradient-shift 15s ease infinite;
          background-size: 200% 200%;
        }

        /* Efecto de swipe en móvil */
        @keyframes swipe-indicator {
          0%, 100% { transform: translateX(0); opacity: 0.5; }
          50% { transform: translateX(10px); opacity: 1; }
        }
        .animate-swipe {
          animation: swipe-indicator 2s ease-in-out infinite;
        }
      `}</style>

            {/* 🏆 BADGE PROFESIONAL SUPERIOR */}
            <div className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ${showBadge ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
                }`}>
                <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 animate-gradient">
                    {/* Efecto de brillo */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer-wave" />

                    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-center gap-3 py-2.5 sm:py-3">
                            {/* Icono de estrella animado */}
                            <div className="relative">
                                <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300 fill-yellow-300 animate-pulse" strokeWidth={2} />
                                <div className="absolute inset-0 bg-yellow-300 blur-md opacity-50 animate-pulse" />
                            </div>

                            {/* Texto del badge */}
                            <p className="text-xs sm:text-sm font-bold text-white tracking-wide">
                                
                                <span className="bg-white/20 px-2 py-0.5 rounded-md">Disponible para Proyectos</span>
                                <span className="hidden sm:inline"> • Analista de Sistemas Certificado</span>
                            </p>

                            {/* Icono de award */}
                            <div className="relative hidden sm:block">
                                <Award className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300" strokeWidth={2} />
                                <div className="absolute inset-0 bg-yellow-300 blur-md opacity-50 animate-pulse" />
                            </div>

                            {/* Botón de cerrar */}
                            <button
                                onClick={() => setShowBadge(false)}
                                className="ml-auto p-1 rounded-lg hover:bg-white/20 transition-colors duration-200"
                                aria-label="Cerrar badge"
                            >
                          
                            </button>
                        </div>
                    </div>

                    {/* Borde inferior con gradiente */}
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                </div>
            </div>

            {/* �🌈 NAVEGACIÓN PRINCIPAL TRASLÚCIDA ULTRA PREMIUM */}
            <nav
                ref={navRef}
                className={`fixed left-0 right-0 z-50 transition-all duration-700 ${showBadge ? 'top-[52px] sm:top-[56px]' : 'top-0'
                    } ${scrolled
                        ? 'glass-effect-strong shadow-2xl shadow-blue-500/10'
                        : 'glass-effect'
                    }`}
            >
                {/* Fondo con gradiente animado */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 animate-gradient" />

                {/* Efecto de luz siguiendo el mouse */}
                <div
                    className="absolute inset-0 pointer-events-none opacity-30 transition-opacity duration-500"
                    style={{
                        background: `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(99, 102, 241, 0.15), transparent 50%)`,
                    }}
                />

                {/* Borde superior con gradiente arcoíris */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-60">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 blur-sm animate-pulse" />
                </div>

                {/* Borde inferior sutil */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                {/* Container más ancho */}
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
                    <div className="flex items-center justify-between h-20 sm:h-24">

                        {/* 🎨 LOGO ULTRA PREMIUM CON EFECTOS */}
                        <Link
                            to="/"
                            onClick={() => handleNavClick(navItems[0])}
                            className="flex items-center gap-3 sm:gap-4 group relative z-10"
                        >
                            {/* Logo Container */}
                            <div className="relative w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center">

                                {/* Anillos decorativos rotativos */}
                                <div className="absolute inset-0 rounded-2xl border-2 border-blue-400/30 group-hover:border-purple-400/50 transition-all duration-700 animate-rotate-slow">
                                    <div className="absolute -top-1 left-1/2 w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full shadow-lg shadow-blue-400/50" />
                                </div>

                                {/* Fondo glassmorphism */}
                                <div className="absolute inset-1 rounded-xl glass-effect group-hover:glass-effect-strong transition-all duration-500">
                                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient" />
                                </div>

                                {/* Icono de código con animación */}
                                <div className="relative z-10 animate-float-gentle">
                                    <Code
                                        className="w-6 h-6 sm:w-8 sm:h-8 text-slate-700 dark:text-white group-hover:text-blue-500 transition-all duration-500 drop-shadow-lg"
                                        strokeWidth={2.5}
                                    />
                                    {/* Glow effect */}
                                    <div className="absolute inset-0 bg-blue-500 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
                                </div>

                                {/* Partículas orbitales */}
                                {[0, 120, 240].map((rotation, i) => (
                                    <div
                                        key={i}
                                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700"
                                        style={{
                                            transform: `rotate(${rotation}deg)`,
                                            transitionDelay: `${i * 100}ms`
                                        }}
                                    >
                                        <div className="absolute -top-1 left-1/2 w-1.5 h-1.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full shadow-lg shadow-blue-400/50 animate-bounce-gentle"
                                            style={{ animationDelay: `${i * 0.3}s` }}
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Nombre y título */}
                            <div className="flex flex-col">
                                <h1 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight relative">
                                    <span className="bg-gradient-to-r from-slate-900 via-blue-600 to-purple-600 dark:from-white dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent drop-shadow-lg">
                                        FDroots
                                    </span>
                                    {/* Efecto de brillo */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer-wave" />
                                </h1>
                                <div className="flex items-center gap-1.5">
                               <Terminal className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-pink-500 animate-pulse" strokeWidth={2.5} />
                                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-semibold tracking-wide">
                                        Analista de Sistemas
                                    </p>
                                </div>
                            </div>
                        </Link>

                        {/* 🎯 NAVEGACIÓN HORIZONTAL (DESKTOP) */}
                        <div className="hidden lg:flex items-center gap-2">
                            {navItems.map((item) => (
                                <NavButton key={item.id} item={item} />
                            ))}
                        </div>

                        {/* 🌟 REDES SOCIALES Y MENÚ */}
                        <div className="flex items-center gap-3 sm:gap-4">

                            {/* Redes sociales (visible en desktop) */}
                            <div className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-2xl glass-effect">
                                <SocialLink
                                    Icon={Github}
                                    href="https://github.com/federasty"
                                    label="GitHub"
                                    color="text-purple-500"
                                />
                                <div className="w-px h-5 bg-white/20" />
                                <SocialLink
                                    Icon={Linkedin}
                                    href="https://www.linkedin.com/in/federico-daniel-142b22349/"
                                    label="LinkedIn"
                                    color="text-blue-500"
                                />
                                <div className="w-px h-5 bg-white/20" />
                                <SocialLink
                                    Icon={Mail}
                                    href="mailto:federicodaniel7@gmail.com"
                                    label="Email"
                                    color="text-orange-500"
                                />
                            </div>

                            {/* Botón de menú móvil mejorado */}
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="lg:hidden relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl glass-effect hover:glass-effect-strong transition-all duration-300 group"
                                aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
                            >
                                {/* Borde con gradiente */}
                                <div className="absolute inset-0 rounded-2xl border-2 border-white/10 group-hover:border-white/30 transition-all duration-300" />

                                {/* Icono con animación mejorada */}
                                <div className={`relative flex items-center justify-center h-full transition-all duration-500 ${isOpen ? 'rotate-180 scale-90' : 'rotate-0 scale-100'
                                    }`}>
                                    {isOpen ? (
                                        <X className="w-6 h-6 sm:w-7 sm:h-7 text-slate-700 dark:text-white" strokeWidth={2.5} />
                                    ) : (
                                        <Menu className="w-6 h-6 sm:w-7 sm:h-7 text-slate-700 dark:text-white" strokeWidth={2.5} />
                                    )}
                                </div>

                                {/* Efecto de glow mejorado */}
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/20 to-pink-500/0 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />

                                {/* Partículas en las esquinas */}
                                <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
                                <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" style={{ animationDelay: '0.1s' }} />
                                <div className="absolute bottom-1 left-1 w-1.5 h-1.5 bg-pink-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" style={{ animationDelay: '0.2s' }} />
                                <div className="absolute bottom-1 right-1 w-1.5 h-1.5 bg-indigo-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" style={{ animationDelay: '0.3s' }} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* 📱 MENÚ MÓVIL MEJORADO */}
                <div
                    className={`lg:hidden transition-all duration-700 ease-out overflow-hidden ${isOpen ? 'max-h-[700px] opacity-100' : 'max-h-0 opacity-0'
                        }`}
                >
                    <div className="relative px-4 sm:px-6 pt-6 pb-8 space-y-3 glass-effect-strong border-t border-white/10">

                        {/* Fondo con gradiente */}
                        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-purple-500/5 to-pink-500/5" />

                        {/* Items del menú con efectos mejorados */}
                        {navItems.map((item, index) => {
                            const isActive = activeSection === item.id;
                            const Icon = item.icon;

                            return (
                                <button
                                    key={item.id}
                                    onClick={() => handleNavClick(item)}
                                    className={`relative w-full group overflow-hidden transition-all duration-500 rounded-2xl ${isActive ? 'glass-effect-strong shadow-lg' : 'hover:glass-effect'
                                        }`}
                                    style={{
                                        animationDelay: `${index * 50}ms`,
                                        opacity: isOpen ? 1 : 0,
                                        transform: isOpen ? 'translateY(0) scale(1)' : 'translateY(-10px) scale(0.95)',
                                        transition: `all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 50}ms`,
                                    }}
                                >
                                    {/* Borde con gradiente */}
                                    {isActive && (
                                        <div className={`absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r ${item.gradient} bg-clip-border animate-badge-glow`} style={{
                                            WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                                            WebkitMaskComposite: 'xor',
                                            maskComposite: 'exclude',
                                        }} />
                                    )}

                                    {/* Efecto de glow */}
                                    {isActive && (
                                        <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-10 blur-xl`} />
                                    )}

                                    <div className="relative flex items-center gap-4 px-5 py-4 sm:py-5">
                                        {/* Icono con efecto mejorado */}
                                        <div className={`relative transition-all duration-500 ${isActive ? 'scale-125 rotate-12' : 'scale-100 rotate-0 group-hover:scale-110 group-hover:rotate-6'
                                            }`}>
                                            <Icon className={`w-6 h-6 sm:w-7 sm:h-7 transition-all duration-300 ${isActive ? item.color : 'text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white'
                                                }`} strokeWidth={2} />
                                            {isActive && (
                                                <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} blur-lg opacity-50 animate-pulse`} />
                                            )}
                                        </div>

                                        {/* Texto */}
                                        <span className={`font-bold text-base sm:text-lg tracking-wide transition-all duration-300 ${isActive
                                                ? 'text-slate-900 dark:text-white'
                                                : 'text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white'
                                            }`}>
                                            {item.label}
                                        </span>

                                        {/* Indicador de activo mejorado */}
                                        {isActive && (
                                            <div className="ml-auto flex items-center gap-2">
                                                <div className={`w-2.5 h-2.5 rounded-full bg-gradient-to-r ${item.gradient} animate-pulse shadow-lg`} />
                                                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">ACTIVO</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Partículas mejoradas */}
                                    {isActive && (
                                        <div className="absolute inset-0 pointer-events-none">
                                            {[...Array(6)].map((_, i) => (
                                                <div
                                                    key={i}
                                                    className={`absolute w-1 h-1 rounded-full bg-gradient-to-r ${item.gradient} animate-sparkle`}
                                                    style={{
                                                        left: `${15 + Math.random() * 70}%`,
                                                        top: `${15 + Math.random() * 70}%`,
                                                        animationDelay: `${i * 0.2}s`,
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </button>
                            );
                        })}

                        {/* Redes sociales en móvil mejoradas */}
                        <div className="flex items-center justify-center gap-4 pt-6 mt-4 border-t border-white/10">
                            <SocialLink
                                Icon={Github}
                                href="https://github.com/federasty"
                                label="GitHub"
                                color="text-purple-500"
                            />
                            <SocialLink
                                Icon={Linkedin}
                                href="https://www.linkedin.com/in/federico-daniel-142b22349/"
                                label="LinkedIn"
                                color="text-blue-500"
                            />
                            <SocialLink
                                Icon={Mail}
                                href="mailto:federicodaniel7@gmail.com"
                                label="Email"
                                color="text-orange-500"
                            />
                        </div>

                        {/* CTA de contacto premium mejorado */}
                        <Link
                            to="/contacto"
                            onClick={() => {
                                setActiveSection('contact');
                                setIsOpen(false);
                            }}
                            className="relative block w-full mt-6 text-center py-4 sm:py-5 overflow-hidden rounded-2xl font-bold text-base sm:text-lg text-white transition-all duration-500 group"
                        >
                            {/* Fondo con gradiente animado */}
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-gradient" />

                            {/* Glassmorphism overlay */}
                            <div className="absolute inset-0 glass-effect" />

                            {/* Borde brillante */}
                            <div className="absolute inset-0 rounded-2xl border-2 border-white/30 group-hover:border-white/50 transition-all duration-300 animate-badge-glow" />

                            {/* Efecto de brillo */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer-wave" />

                            {/* Texto */}
                            <span className="relative z-10 flex items-center justify-center gap-3">
                                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 animate-bounce-gentle" strokeWidth={2.5} />
                                ¡Hablemos!
                                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse" strokeWidth={2.5} />
                            </span>

                            {/* Partículas decorativas mejoradas */}
                            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                {[...Array(12)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="absolute w-1 h-1 rounded-full bg-white animate-sparkle"
                                        style={{
                                            left: `${5 + Math.random() * 90}%`,
                                            top: `${5 + Math.random() * 90}%`,
                                            animationDelay: `${i * 0.1}s`,
                                        }}
                                    />
                                ))}
                            </div>
                        </Link>
                    </div>
                </div>
            </nav>
        </>
    );
}
