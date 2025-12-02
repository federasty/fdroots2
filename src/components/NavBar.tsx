import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Code, Github, Linkedin, Mail, ArrowRight } from 'lucide-react';

// --- TIPOS DE NAVEGACIÓN ---
interface NavItem {
    id: string;
    label: string;
    path: string;
}

const navItems: NavItem[] = [
    { id: 'home', label: 'Inicio', path: '/' },
    { id: 'skills', label: 'Habilidades', path: '/habilidades' },
    { id: 'projects', label: 'Proyectos', path: '/proyectos' },
    { id: 'about', label: 'Sobre Mí', path: '/sobre-mi' },
    { id: 'contact', label: 'Contacto', path: '/contacto' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
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
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Seguimiento del mouse para efectos sutiles
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

    // --- BOTÓN DE NAVEGACIÓN MINIMALISTA PREMIUM ---
    const NavButton: React.FC<{ item: NavItem }> = ({ item }) => {
        const isActive = activeSection === item.id;

        return (
            <button
                onClick={() => handleNavClick(item)}
                className="relative px-5 py-2.5 text-sm font-medium tracking-wide transition-all duration-300 group"
            >
                {/* Texto */}
                <span className={`relative z-10 transition-all duration-300 ${isActive
                        ? 'text-slate-900 dark:text-white font-semibold'
                        : 'text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white'
                    }`}>
                    {item.label}
                </span>

                {/* Indicador inferior minimalista */}
                <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-500 ease-out ${isActive
                        ? 'w-full opacity-100'
                        : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'
                    }`}>
                    {isActive && (
                        <div className="absolute inset-0 bg-blue-500 blur-sm animate-pulse" />
                    )}
                </div>

                {/* Efecto de brillo sutil en hover */}
                <div className={`absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isActive ? 'opacity-100' : ''
                    }`} />
            </button>
        );
    };

    // --- ENLACE A REDES SOCIALES MINIMALISTA ---
    const SocialLink: React.FC<{ Icon: React.FC<any>, href: string, label: string }> = ({ Icon, href, label }) => {
        return (
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="relative p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all duration-300 group"
            >
                {/* Fondo sutil en hover */}
                <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Icono */}
                <Icon className="relative w-5 h-5 transition-transform duration-300 group-hover:scale-110" strokeWidth={1.5} />

                {/* Efecto de brillo */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-blue-500/10 to-indigo-500/0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </a>
        );
    };

    return (
        <>
            <style>{`
        /* Animaciones minimalistas y elegantes */
        @keyframes gentle-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-3px); }
        }
        .animate-gentle-float {
          animation: gentle-float 3s ease-in-out infinite;
        }

        @keyframes rotate-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-rotate-slow {
          animation: rotate-slow 20s linear infinite;
        }

        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .animate-shimmer {
          animation: shimmer 8s ease-in-out infinite;
          background-size: 200% 100%;
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out forwards;
        }

        /* Smooth gradient background */
        .gradient-mesh {
          background: 
            radial-gradient(at 0% 0%, rgba(59, 130, 246, 0.05) 0px, transparent 50%),
            radial-gradient(at 100% 0%, rgba(99, 102, 241, 0.05) 0px, transparent 50%),
            radial-gradient(at 100% 100%, rgba(139, 92, 246, 0.05) 0px, transparent 50%),
            radial-gradient(at 0% 100%, rgba(59, 130, 246, 0.05) 0px, transparent 50%);
        }
      `}</style>

            {/* 💎 NAVEGACIÓN PRINCIPAL MINIMALISTA PREMIUM */}
            <nav
                ref={navRef}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                        ? 'bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl shadow-lg shadow-slate-200/50 dark:shadow-slate-900/50 border-b border-slate-200/50 dark:border-slate-800/50'
                        : 'bg-white/60 dark:bg-slate-950/60 backdrop-blur-md border-b border-slate-200/30 dark:border-slate-800/30'
                    }`}
            >
                {/* Efecto de luz siguiendo el mouse (muy sutil) */}
                <div
                    className="absolute inset-0 pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-700"
                    style={{
                        background: `radial-gradient(800px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.03), transparent 50%)`,
                    }}
                />

                {/* Gradiente superior sutil */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 sm:h-20">

                        {/* LOGO MINIMALISTA PREMIUM */}
                        <Link
                            to="/"
                            onClick={() => handleNavClick(navItems[0])}
                            className="flex items-center gap-3 group"
                        >
                            {/* Logo Icon */}
                            <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">

                                {/* Círculo de fondo con gradiente sutil */}
                                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 group-hover:from-blue-500/20 group-hover:to-indigo-500/20 transition-all duration-500" />

                                {/* Borde decorativo */}
                                <div className="absolute inset-0 rounded-xl border border-slate-200 dark:border-slate-800 group-hover:border-blue-500/30 transition-all duration-500" />

                                {/* Icono de código */}
                                <Code
                                    className="relative w-5 h-5 sm:w-6 sm:h-6 text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all duration-500 animate-gentle-float"
                                    strokeWidth={2}
                                />

                                {/* Punto de acento */}
                                <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <div className="absolute inset-0 bg-blue-400 rounded-full blur-sm animate-pulse" />
                                </div>
                            </div>

                            {/* Nombre y título */}
                            <div className="flex flex-col">
                                <h1 className="text-lg sm:text-xl font-bold tracking-tight">
                                    <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-white dark:via-slate-100 dark:to-white bg-clip-text text-transparent">
                                        FDroots
                                    </span>
                                </h1>
                                <p className="text-xs text-slate-600 dark:text-slate-400 font-medium tracking-wide">
                                    Analista de Sistemas
                                </p>
                            </div>
                        </Link>

                        {/* NAVEGACIÓN HORIZONTAL (DESKTOP) */}
                        <div className="hidden lg:flex items-center gap-1">
                            {navItems.map((item) => (
                                <NavButton key={item.id} item={item} />
                            ))}
                        </div>

                        {/* REDES SOCIALES Y MENÚ */}
                        <div className="flex items-center gap-2 sm:gap-3">

                            {/* Redes sociales (visible en desktop) */}
                            <div className="hidden sm:flex items-center gap-1 mr-2">
                                <SocialLink
                                    Icon={Github}
                                    href="https://github.com/federasty"
                                    label="GitHub"
                                />
                                <SocialLink
                                    Icon={Linkedin}
                                    href="https://www.linkedin.com/in/federico-daniel-142b22349/"
                                    label="LinkedIn"
                                />
                                <SocialLink
                                    Icon={Mail}
                                    href="mailto:federicodaniel7@gmail.com"
                                    label="Email"
                                />
                            </div>

                            {/* Separador */}
                            <div className="hidden sm:block w-px h-6 bg-slate-200 dark:bg-slate-800" />

                            {/* Botón de menú móvil */}
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="lg:hidden relative w-10 h-10 sm:w-11 sm:h-11 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 group"
                                aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
                            >
                                {/* Fondo */}
                                <div className="absolute inset-0 bg-slate-100 dark:bg-slate-900 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                {/* Icono */}
                                <div className="relative flex items-center justify-center h-full">
                                    {isOpen ? (
                                        <X className="w-5 h-5 text-slate-700 dark:text-slate-300" strokeWidth={2} />
                                    ) : (
                                        <Menu className="w-5 h-5 text-slate-700 dark:text-slate-300" strokeWidth={2} />
                                    )}
                                </div>
                            </button>
                        </div>
                    </div>
                </div>

                {/* MENÚ MÓVIL MINIMALISTA */}
                <div
                    className={`lg:hidden transition-all duration-500 ease-out overflow-hidden ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                        }`}
                >
                    <div className="px-4 sm:px-6 pt-4 pb-6 space-y-1 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-t border-slate-200/50 dark:border-slate-800/50">

                        {/* Items del menú */}
                        {navItems.map((item, index) => {
                            const isActive = activeSection === item.id;

                            return (
                                <button
                                    key={item.id}
                                    onClick={() => handleNavClick(item)}
                                    className={`w-full group relative overflow-hidden transition-all duration-300 rounded-lg ${isActive
                                            ? 'bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30'
                                            : 'hover:bg-slate-50 dark:hover:bg-slate-900/50'
                                        }`}
                                    style={{
                                        animationDelay: `${index * 50}ms`,
                                        opacity: isOpen ? 1 : 0,
                                        transform: isOpen ? 'translateY(0)' : 'translateY(-10px)',
                                        transition: `all 0.3s ease-out ${index * 50}ms`,
                                    }}
                                >
                                    {/* Borde izquierdo */}
                                    <div className={`absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-r-full transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'
                                        }`} />

                                    <div className="relative flex items-center justify-between px-4 py-3.5">
                                        {/* Texto */}
                                        <span className={`font-medium text-sm transition-all duration-300 ${isActive
                                                ? 'text-slate-900 dark:text-white font-semibold'
                                                : 'text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white'
                                            }`}>
                                            {item.label}
                                        </span>

                                        {/* Flecha indicadora */}
                                        <ArrowRight className={`w-4 h-4 transition-all duration-300 ${isActive
                                                ? 'text-blue-600 dark:text-blue-400 opacity-100 translate-x-0'
                                                : 'text-slate-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
                                            }`} strokeWidth={2} />
                                    </div>
                                </button>
                            );
                        })}

                        {/* Redes sociales en móvil */}
                        <div className="flex items-center justify-center gap-2 pt-6 mt-4 border-t border-slate-200 dark:border-slate-800">
                            <SocialLink
                                Icon={Github}
                                href="https://github.com/federasty"
                                label="GitHub"
                            />
                            <SocialLink
                                Icon={Linkedin}
                                href="https://www.linkedin.com/in/federico-daniel-142b22349/"
                                label="LinkedIn"
                            />
                            <SocialLink
                                Icon={Mail}
                                href="mailto:federicodaniel7@gmail.com"
                                label="Email"
                            />
                        </div>

                        {/* CTA de contacto */}
                        <Link
                            to="/contacto"
                            onClick={() => {
                                setActiveSection('contact');
                                setIsOpen(false);
                            }}
                            className="relative block w-full mt-4 text-center py-3.5 overflow-hidden rounded-lg font-semibold text-sm text-white transition-all duration-300 group"
                        >
                            {/* Fondo con gradiente */}
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 group-hover:from-blue-700 group-hover:to-indigo-700 transition-all duration-300" />

                            {/* Brillo sutil */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />

                            {/* Texto */}
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                Iniciar Conversación
                                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2} />
                            </span>
                        </Link>
                    </div>
                </div>
            </nav>
        </>
    );
}