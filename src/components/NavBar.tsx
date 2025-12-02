
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Code, Monitor, Zap, Mail, Github, Linkedin, Sparkles, Terminal, Cpu } from 'lucide-react';

// --- TIPOS DE NAVEGACIÓN ---
interface NavItem {
  id: string;
  label: string;
  path: string;
  icon?: React.FC<any>;
}

const navItems: NavItem[] = [
  { id: 'home', label: 'Inicio', path: '/', icon: Terminal },
  { id: 'skills', label: 'Habilidades', path: '/habilidades', icon: Cpu },
  { id: 'projects', label: 'Proyectos', path: '/proyectos', icon: Code },
  { id: 'about', label: 'Sobre Mí', path: '/sobre-mi', icon: Sparkles },
  { id: 'contact', label: 'Contacto', path: '/contacto', icon: Mail },
];

// --- MAPEO DE CLASES SEGURAS ---
const socialClassesMap = {
  white: {
    hoverBorder: 'group-hover:border-white/50',
    hoverBgGlow: 'bg-gradient-to-r from-white/30',
    hoverShadow: 'group-hover:shadow-white/50',
  },
  blue: {
    hoverBorder: 'group-hover:border-blue-500/50',
    hoverBgGlow: 'bg-gradient-to-r from-blue-500/30',
    hoverShadow: 'group-hover:shadow-blue-500/50',
  },
  yellow: {
    hoverBorder: 'group-hover:border-yellow-500/50',
    hoverBgGlow: 'bg-gradient-to-r from-yellow-500/30',
    hoverShadow: 'group-hover:shadow-yellow-500/50',
  }
};

type SocialColorKey = keyof typeof socialClassesMap;

// --- COMPONENTE DE PARTÍCULAS FLOTANTES ---
const FloatingParticles: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400/30 rounded-full animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${5 + Math.random() * 10}s`,
          }}
        />
      ))}
    </div>
  );
};

// --- COMPONENTE DE ESCANEO LÁSER ---
const LaserScan: React.FC<{ isActive: boolean }> = ({ isActive }) => {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none transition-opacity duration-1000 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent animate-scan" />
    </div>
  );
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isScanning, setIsScanning] = useState(false);
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
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Seguimiento del mouse para efectos holográficos
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

  // Efecto de escaneo periódico
  useEffect(() => {
    const interval = setInterval(() => {
      setIsScanning(true);
      setTimeout(() => setIsScanning(false), 2000);
    }, 10000);
    return () => clearInterval(interval);
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

  // --- BOTÓN DE NAVEGACIÓN ULTRA PREMIUM ---
  const NavButton: React.FC<{ item: NavItem }> = ({ item }) => {
    const [isHovered, setIsHovered] = useState(false);
    const isActive = activeSection === item.id;
    const Icon = item.icon;

    return (
      <button
        onClick={() => handleNavClick(item)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative px-4 py-3 text-xs font-bold tracking-[0.2em] uppercase transition-all duration-500 group overflow-hidden"
      >
        {/* Fondo con efecto de onda */}
        <div className={`absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 transition-all duration-700 ${isActive || isHovered ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`} />
        
        {/* Borde superior animado */}
        <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent transition-all duration-500 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
          <div className={`absolute inset-0 bg-cyan-400 blur-sm ${isActive ? 'animate-pulse' : ''}`} />
        </div>

        {/* Contenido del botón */}
        <div className="relative z-10 flex items-center gap-2">
          {Icon && (
            <Icon className={`w-3.5 h-3.5 transition-all duration-300 ${isActive ? 'text-cyan-400' : 'text-gray-500 group-hover:text-cyan-300'}`} />
          )}
          <span className={`transition-all duration-300 ${isActive ? 'text-cyan-300 drop-shadow-[0_0_8px_rgba(0,255,255,0.8)]' : 'text-gray-400 group-hover:text-white'}`}>
            {item.label}
          </span>
        </div>

        {/* Indicador inferior con efecto neón */}
        <div className={`absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 transition-all duration-500 ${isActive ? 'w-full shadow-[0_0_15px_rgba(0,255,255,1)]' : 'w-0 group-hover:w-full group-hover:shadow-[0_0_10px_rgba(0,255,255,0.6)]'}`}>
          {isActive && <div className="absolute inset-0 bg-cyan-400 blur-md animate-pulse" />}
        </div>

        {/* Partículas al hacer hover */}
        {isHovered && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-particle-burst"
                style={{
                  left: `${50 + (Math.random() - 0.5) * 100}%`,
                  top: `${50 + (Math.random() - 0.5) * 100}%`,
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>
        )}
      </button>
    );
  };

  // --- ENLACE A REDES SOCIALES PREMIUM ---
  const SocialLink: React.FC<{ Icon: React.FC<any>, href: string, color: SocialColorKey }> = ({ Icon, href, color }) => {
    const [isHovered, setIsHovered] = useState(false);
    const classes = socialClassesMap[color];

    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative p-2.5 rounded-full border border-gray-700/50 transition-all duration-500 group overflow-hidden ${classes.hoverBorder}`}
      >
        {/* Efecto de glow pulsante */}
        <div className={`absolute inset-0 ${classes.hoverBgGlow} blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
        
        {/* Anillo rotatorio */}
        <div className={`absolute inset-0 rounded-full border-2 border-transparent ${classes.hoverBorder} transition-all duration-700 ${isHovered ? 'rotate-180 scale-110' : 'rotate-0 scale-100'}`} />
        
        {/* Icono */}
        <Icon className={`relative w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-white transition-all duration-300 ${isHovered ? 'scale-110 rotate-12' : 'scale-100 rotate-0'}`} />
        
        {/* Partículas de energía */}
        {isHovered && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-0.5 h-0.5 bg-cyan-400 rounded-full animate-energy-pulse"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: `rotate(${i * 45}deg) translateY(-15px)`,
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
        /* Animaciones personalizadas ultra premium */
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
          50% { transform: translateY(-20px) translateX(10px); opacity: 0.6; }
        }
        .animate-float {
          animation: float linear infinite;
        }

        @keyframes scan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        .animate-scan {
          animation: scan 3s ease-in-out;
        }

        @keyframes particle-burst {
          0% { transform: translate(0, 0) scale(1); opacity: 1; }
          100% { transform: translate(var(--tx, 20px), var(--ty, -20px)) scale(0); opacity: 0; }
        }
        .animate-particle-burst {
          --tx: calc((random() - 0.5) * 40px);
          --ty: calc((random() - 0.5) * 40px);
          animation: particle-burst 0.6s ease-out forwards;
        }

        @keyframes energy-pulse {
          0%, 100% { opacity: 0; transform: rotate(var(--rotation, 0deg)) translateY(-10px) scale(0); }
          50% { opacity: 1; transform: rotate(var(--rotation, 0deg)) translateY(-20px) scale(1); }
        }
        .animate-energy-pulse {
          animation: energy-pulse 1s ease-out infinite;
        }

        @keyframes hologram-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-hologram {
          animation: hologram-shift 8s ease infinite;
          background-size: 200% 200%;
        }

        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
          100% { transform: translate(0); }
        }
        .animate-glitch {
          animation: glitch 0.3s ease-in-out;
        }

        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 5px rgba(0, 255, 255, 0.5), 0 0 10px rgba(0, 255, 255, 0.3); }
          50% { box-shadow: 0 0 20px rgba(0, 255, 255, 0.8), 0 0 30px rgba(0, 255, 255, 0.5); }
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        @keyframes rotate-gradient {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-rotate-gradient {
          animation: rotate-gradient 10s linear infinite;
        }

        /* Efecto de grid holográfico */
        .holographic-grid {
          background-image: 
            linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>

      {/* 💎 NAVEGACIÓN PRINCIPAL ULTRA PREMIUM */}
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 border-b ${
          scrolled
            ? 'bg-gray-950/98 backdrop-blur-3xl shadow-[0_20px_80px_rgba(0,0,0,0.9),0_0_100px_rgba(0,255,255,0.1)] border-cyan-500/30'
            : 'bg-black/95 backdrop-blur-2xl border-gray-800/60'
        }`}
      >
        {/* Partículas flotantes de fondo */}
        <FloatingParticles />
        
        {/* Efecto de escaneo láser */}
        <LaserScan isActive={isScanning} />

        {/* Grid holográfico de fondo */}
        <div className="absolute inset-0 holographic-grid opacity-30 pointer-events-none" />

        {/* Gradiente animado superior */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-60">
          <div className="absolute inset-0 bg-cyan-400 blur-sm animate-pulse" />
        </div>

        {/* Efecto de luz siguiendo el mouse */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20 transition-opacity duration-300"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(0, 255, 255, 0.15), transparent 40%)`,
          }}
        />

        {/* BARRA SUPERIOR - STATUS Y REDES SOCIALES */}
        <div className="hidden lg:block relative overflow-hidden border-b border-gray-800/60 bg-gradient-to-r from-gray-950/80 via-gray-900/80 to-gray-950/80">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center justify-between h-10">
              
              {/* Indicador de tiempo/fecha */}
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(0,255,0,0.8)]" />
                  <span className="font-mono">SISTEMA ONLINE</span>
                </div>
                <span className="text-gray-700">|</span>
                <span className="font-mono">{new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
              </div>

              <div className="flex items-center gap-6">
                {/* Status profesional */}
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30">
                  <Monitor className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-xs font-bold tracking-wider text-cyan-300">
                    DISPONIBLE PARA PROYECTOS
                  </span>
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(0,255,255,1)]" />
                </div>

                {/* Redes sociales */}
                <div className="flex items-center gap-2">
                  <SocialLink Icon={Github} href="https://github.com/tu-usuario" color="white" />
                  <SocialLink Icon={Linkedin} href="https://linkedin.com/in/tu-usuario" color="blue" />
                  <SocialLink Icon={Mail} href="mailto:tu.email@ejemplo.com" color="yellow" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BARRA DE NAVEGACIÓN PRINCIPAL */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 sm:h-24">

            {/* LOGO ULTRA PREMIUM CON EFECTOS HOLOGRÁFICOS */}
            <Link
              to="/"
              onClick={() => handleNavClick(navItems[0])}
              className="flex items-center gap-4 group relative"
            >
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
                
                {/* Anillo exterior con gradiente rotatorio */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-700 animate-rotate-gradient" />
                
                {/* Anillo medio animado */}
                <div className="absolute inset-1 rounded-full border-2 border-gray-800/80 group-hover:border-cyan-400/60 transition-all duration-700">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-hologram" />
                </div>

                {/* Partículas orbitales */}
                {[0, 120, 240].map((rotation, i) => (
                  <div
                    key={i}
                    className="absolute inset-0 transition-transform duration-1000 group-hover:rotate-180"
                    style={{ transform: `rotate(${rotation}deg)` }}
                  >
                    <div className="absolute top-0 left-1/2 w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(0,255,255,1)] -translate-x-1/2" />
                  </div>
                ))}

                {/* Icono central con efecto de profundidad */}
                <div className="relative z-10">
                  <Code className="w-8 h-8 sm:w-10 sm:h-10 text-cyan-400 group-hover:text-white transition-all duration-500 drop-shadow-[0_0_15px_rgba(0,255,255,0.8)]" strokeWidth={2.5} />
                  <div className="absolute inset-0 bg-cyan-400 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
                </div>

                {/* Hexágono de fondo */}
                <div className="absolute inset-2 opacity-20 group-hover:opacity-40 transition-opacity duration-700">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <polygon
                      points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-cyan-400"
                    />
                  </svg>
                </div>
              </div>

              {/* Título con efecto de glitch */}
              <div className="relative">
                <h1 className="text-2xl sm:text-3xl font-black tracking-tighter leading-none relative">
                  <span className="bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] group-hover:drop-shadow-[0_0_25px_rgba(0,255,255,0.8)] transition-all duration-300">
                    [ TU NOMBRE ]
                  </span>
                  {/* Efecto de glitch en hover */}
                  <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent opacity-0 group-hover:opacity-100 group-hover:animate-glitch transition-opacity duration-300">
                    [ TU NOMBRE ]
                  </span>
                </h1>
                
                <div className="flex items-center gap-2 mt-1.5">
                  <Zap className="w-3.5 h-3.5 text-cyan-500 animate-pulse" />
                  <p className="text-[10px] sm:text-xs text-gray-400 font-bold tracking-[0.3em] uppercase">
                    <span className="bg-gradient-to-r from-gray-400 via-cyan-400 to-gray-400 bg-clip-text text-transparent">
                      ANALISTA DE SISTEMAS
                    </span>
                  </p>
                  <div className="h-3 w-[1px] bg-gradient-to-b from-transparent via-cyan-500 to-transparent" />
                  <p className="text-[9px] text-cyan-500/70 font-mono">v2.0.25</p>
                </div>
              </div>
            </Link>

            {/* NAVEGACIÓN HORIZONTAL (DESKTOP) */}
            <div className="hidden lg:flex items-center gap-1 px-4 py-2 rounded-full bg-gray-900/50 border border-gray-800/60 backdrop-blur-xl">
              {navItems.map((item) => (
                <NavButton key={item.id} item={item} />
              ))}
            </div>

            {/* BOTÓN DE MENÚ MÓVIL PREMIUM */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden relative w-14 h-14 sm:w-16 sm:h-16 border-2 border-gray-700/50 hover:border-cyan-500/60 backdrop-blur-xl transition-all duration-500 group rounded-xl overflow-hidden"
              aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {/* Fondo con gradiente animado */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-gray-900/80 group-hover:from-cyan-900/30 group-hover:via-blue-900/30 group-hover:to-cyan-900/30 transition-all duration-500" />
              
              {/* Efecto de glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/20 to-cyan-500/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
              
              {/* Icono con animación */}
              <div className="relative flex items-center justify-center h-full transition-transform duration-300 group-hover:scale-110">
                {isOpen ? (
                  <X className="w-7 h-7 text-cyan-400 drop-shadow-[0_0_10px_rgba(0,255,255,0.8)]" strokeWidth={2.5} />
                ) : (
                  <Menu className="w-7 h-7 text-white group-hover:text-cyan-400 transition-colors duration-300" strokeWidth={2.5} />
                )}
              </div>

              {/* Partículas en las esquinas */}
              <div className="absolute top-1 left-1 w-1 h-1 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute top-1 right-1 w-1 h-1 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-1 left-1 w-1 h-1 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-1 right-1 w-1 h-1 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>
        </div>

        {/* MENÚ MÓVIL DESPLEGABLE ULTRA PREMIUM */}
        <div
          className={`lg:hidden transition-all duration-700 ease-in-out overflow-hidden ${
            isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="relative px-4 sm:px-6 pt-6 pb-8 space-y-2 bg-gradient-to-b from-gray-950/98 via-gray-900/98 to-black/98 border-t border-cyan-500/20">
            
            {/* Grid holográfico de fondo */}
            <div className="absolute inset-0 holographic-grid opacity-20 pointer-events-none" />

            {/* Items del menú */}
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  className={`w-full group relative overflow-hidden transition-all duration-500 rounded-xl ${
                    isActive ? 'bg-gradient-to-r from-cyan-900/40 via-blue-900/40 to-cyan-900/40' : 'hover:bg-gray-800/60'
                  }`}
                  style={{
                    animationDelay: `${index * 50}ms`,
                    opacity: isOpen ? 1 : 0,
                    transform: isOpen ? 'translateX(0)' : 'translateX(-20px)',
                    transition: `all 0.5s ease-out ${index * 50}ms`,
                  }}
                >
                  {/* Borde izquierdo con efecto neón */}
                  <div className={`absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-cyan-400 via-blue-500 to-cyan-400 transition-all duration-500 ${
                    isActive ? 'opacity-100 shadow-[0_0_15px_rgba(0,255,255,1)]' : 'opacity-0 group-hover:opacity-70'
                  }`} />

                  {/* Efecto de glow en hover */}
                  <div className={`absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                    isActive ? 'opacity-100' : ''
                  }`} />

                  <div className="relative flex items-center gap-4 px-5 py-4">
                    {/* Icono */}
                    {Icon && (
                      <div className="relative">
                        <Icon className={`w-5 h-5 transition-all duration-300 ${
                          isActive ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(0,255,255,0.8)]' : 'text-gray-500 group-hover:text-cyan-300'
                        }`} />
                        {isActive && (
                          <div className="absolute inset-0 bg-cyan-400 blur-md opacity-50" />
                        )}
                      </div>
                    )}

                    {/* Texto */}
                    <span className={`font-bold tracking-[0.15em] uppercase text-sm transition-all duration-300 ${
                      isActive ? 'text-cyan-300 drop-shadow-[0_0_5px_rgba(0,255,255,0.6)]' : 'text-gray-300 group-hover:text-white'
                    }`}>
                      {isActive ? `> ${item.label}` : item.label}
                    </span>

                    {/* Indicador de activo */}
                    {isActive && (
                      <div className="ml-auto flex items-center gap-2">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(0,255,255,1)]" />
                        <span className="text-[10px] text-cyan-400 font-mono">ACTIVO</span>
                      </div>
                    )}
                  </div>

                  {/* Borde inferior con gradiente */}
                  <div className={`absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent transition-opacity duration-300 ${
                    isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'
                  }`} />
                </button>
              );
            })}

            {/* CTA de Contacto Premium */}
            <Link
              to="/contacto"
              onClick={() => {
                setActiveSection('contact');
                setIsOpen(false);
              }}
              className="relative block w-full mt-6 text-center py-4 overflow-hidden rounded-xl font-bold tracking-widest text-sm text-white transition-all duration-500 group"
            >
              {/* Fondo con gradiente animado */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-blue-600 to-cyan-600 animate-hologram" />
              
              {/* Borde con efecto neón */}
              <div className="absolute inset-0 border-2 border-cyan-400/50 rounded-xl group-hover:border-cyan-300 transition-colors duration-300 animate-pulse-glow" />
              
              {/* Efecto de glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/30 to-cyan-500/0 blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Texto */}
              <span className="relative z-10 flex items-center justify-center gap-2">
                <Mail className="w-4 h-4" />
                {'[ INICIAR CONVERSACIÓN ]'}
                <Sparkles className="w-4 h-4 animate-pulse" />
              </span>
            </Link>

            {/* Redes sociales en móvil */}
            <div className="flex items-center justify-center gap-4 pt-6 border-t border-gray-800/60">
              <SocialLink Icon={Github} href="https://github.com/tu-usuario" color="white" />
              <SocialLink Icon={Linkedin} href="https://linkedin.com/in/tu-usuario" color="blue" />
              <SocialLink Icon={Mail} href="mailto:tu.email@ejemplo.com" color="yellow" />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
