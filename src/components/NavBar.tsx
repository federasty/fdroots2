import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Code, Monitor, Zap, User, Briefcase, Mail, Github, Linkedin } from 'lucide-react';

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

// --- CORRECCIÓN CRÍTICA: Mapeo de Clases Seguras para Tailwind JIT ---
const socialClassesMap = {
    white: { 
        hoverBorder: 'group-hover:border-white/50', 
        hoverBgGlow: 'bg-gradient-to-r from-white/30', 
    },
    blue: {
        hoverBorder: 'group-hover:border-blue-500/50',
        hoverBgGlow: 'bg-gradient-to-r from-blue-500/30', 
    },
    yellow: {
        hoverBorder: 'group-hover:border-yellow-500/50',
        hoverBgGlow: 'bg-gradient-to-r from-yellow-500/30',
    }
};

type SocialColorKey = keyof typeof socialClassesMap;

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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

  // 1. Manejo de Scroll para Fondo Opaco
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. Cerrar menú al hacer click fuera (Mobile)
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

  // 3. Manejo de Clic en Navegación
  const handleNavClick = (item: NavItem) => {
    setActiveSection(item.id);
    setIsOpen(false);
    navigate(item.path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- Botón de Navegación Premium con Efecto Glitch/Neón ---
  const NavButton: React.FC<{ item: NavItem }> = ({ item }) => {
    const isActive = activeSection === item.id;
    const baseClasses = "relative px-3 py-2 text-xs font-bold tracking-[0.2em] uppercase transition-all duration-500 group overflow-hidden";
    const activeStyles = 'text-cyan-400 border-b-2 border-cyan-400/80 shadow-[0_0_15px_rgba(0,255,255,0.4)]';
    const hoverStyles = 'hover:text-white/90';

    return (
      <button
        key={item.id}
        onClick={() => handleNavClick(item)}
        className={`${baseClasses} ${isActive ? activeStyles : hoverStyles}`}
      >
        {/* Fondo animado de Glitch/Ruido */}
        <div className={`absolute inset-0 transition-opacity duration-300 ${isActive ? 'opacity-10' : 'opacity-0 group-hover:opacity-[0.05]'}`}>
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>
          {/* Símil Ruido/Plasma - La sintaxis SVG es segura */}
          <div className={`absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><filter id="noise"><feTurbulence baseFrequency="0.6" numOctaves="3" type="fractalNoise"/></filter><rect width="100" height="100" filter="url(%23noise)" opacity="0.1"/></svg>')]`}></div>
        </div>

        {/* Texto del Botón */}
        <span className={`relative z-10 transition-colors duration-300 ${isActive ? 'text-cyan-300' : 'text-gray-400 group-hover:text-white'}`}>
          {item.label}
        </span>

        {/* Indicador inferior de Neón/Cian (Seguro) */}
        <div className={`absolute bottom-0 left-0 h-[2px] bg-cyan-400 transition-all duration-500 ${isActive ? 'w-full shadow-[0_0_10px_rgba(0,255,255,0.8)]' : 'w-0 group-hover:w-full group-hover:shadow-[0_0_5px_rgba(0,255,255,0.4)]'}`}></div>
      </button>
    );
  };
  
  // --- Enlace a Redes (Social Icons) ---
  // Ahora requiere un color predefinido (SocialColorKey)
  const SocialLink: React.FC<{ Icon: React.FC<any>, href: string, color: SocialColorKey }> = ({ Icon, href, color }) => {
    const classes = socialClassesMap[color];
    
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        // CLASES SEGURAS: Usando clases.hoverBorder y clases.hoverBgGlow
        className={`p-2.5 rounded-full border border-gray-700/50 transition-all duration-500 group relative overflow-hidden ${classes.hoverBorder}`}
      >
        {/* Glow effect - Usando la clase predefinida para el fondo */}
        <div className={`absolute inset-0 ${classes.hoverBgGlow} blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
        {/* Icono */}
        <Icon className={`relative w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-white transition-colors duration-300`} />
        {/* Borde animado - ELIMINAMOS la clase dinámica group-hover:border-${color}/50 */}
        <div className={`absolute inset-0 border-2 border-transparent ${classes.hoverBorder} rounded-full transition-all duration-500`}></div>
      </a>
    );
  };

  return (
    <>
      <style>{`
        /* Animaciones CSS personalizadas (seguras) */
        @keyframes subtle-pulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.05); opacity: 1; }
        }
        .animate-subtle-pulse {
          animation: subtle-pulse 5s infinite ease-in-out;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 15s linear infinite;
        }
      `}</style>
      
      {/* 💻 Navegación Principal: Contenedor con Efecto de Placa Metálica */}
      <nav ref={navRef} className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 border-b ${scrolled
          ? 'bg-gray-950/95 backdrop-blur-2xl shadow-[0_10px_60px_rgba(0,0,0,0.8)] border-cyan-800/50'
          : 'bg-black/90 backdrop-blur-xl border-gray-800/80'
        }`}>

        {/* Barra Superior con Información de Estado/Contacto Rápido */}
        <div className="hidden lg:block relative overflow-hidden border-b border-gray-800/80 bg-gradient-to-r from-gray-950/50 via-gray-900/50 to-gray-950/50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center justify-end h-9">
              
              <div className="flex items-center gap-6"> 
                {/* Estatus - "Abierto a Oportunidades" */}
                <div className="flex items-center gap-2">
                  <Monitor className="w-4 h-4 text-cyan-500/80" />
                  <span className="text-xs font-semibold tracking-wider text-gray-300">
                    <span className="text-cyan-400 font-bold mr-1">STATUS:</span> Abierto a Oportunidades
                  </span>
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(0,255,255,0.8)]"></div>
                </div>
                
                {/* Redes Sociales (Asegúrate de que los colores 'white', 'blue', 'yellow' coincidan con SocialColorKey) */}
                <div className="flex items-center gap-2">
                  <SocialLink Icon={Github} href="https://github.com/tu-usuario" color="white" />
                  <SocialLink Icon={Linkedin} href="https://linkedin.com/in/tu-usuario" color="blue" />
                  <SocialLink Icon={Mail} href="mailto:tu.email@ejemplo.com" color="yellow" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Barra de Navegación Principal */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 sm:h-24">

            {/* Logo de Portafolio: "Code Geometría" */}
            <Link to="/" onClick={() => handleNavClick(navItems[0])} className="flex items-center gap-3 group">
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center">
                
                {/* Anillo exterior animado - Metálico/Cian */}
                <div className="absolute inset-0 rounded-full border-2 border-gray-800/80 group-hover:border-cyan-500/40 transition-all duration-700 animate-spin-slow" style={{ animationDuration: '10s' }}>
                  <div className="absolute top-0 left-1/2 w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(0,255,255,1)]"></div>
                </div>

                {/* Icono Central */}
                <Code className="relative w-7 h-7 sm:w-8 sm:h-8 text-cyan-400 group-hover:text-white transition-all duration-500 animate-subtle-pulse" strokeWidth={2.5} />
                
                {/* Punto de Luz Inferior */}
                <div className="absolute bottom-1 w-2 h-0.5 bg-cyan-400 rounded-full blur-sm"></div>
              </div>

              {/* Título */}
              <div className="relative">
                <h1 className="text-2xl sm:text-3xl font-black tracking-tighter leading-none">
                  <span className="bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                    [ TU NOMBRE ]
                  </span>
                </h1>
                <div className="flex items-center gap-2 mt-1">
                  <Zap className="w-3 h-3 text-cyan-500" />
                  <p className="text-[10px] sm:text-xs text-gray-400 font-medium tracking-[0.3em] uppercase">
                    INGENIERO DE SOFTWARE
                  </p>
                </div>
              </div>
            </Link>

            {/* Navegación Horizontal (Desktop) */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => <NavButton key={item.id} item={item} />)}
            </div>

            {/* Botón de Menú Móvil */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden relative w-12 h-12 sm:w-14 sm:h-14 border-2 border-gray-700/50 hover:border-cyan-500/50 backdrop-blur-lg transition-all duration-300 group rounded-md shadow-[0_0_10px_rgba(0,0,0,0.5)]"
              aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            >
              <div className="absolute inset-0 bg-gray-900/50 group-hover:bg-cyan-900/20 transition-colors rounded-md"></div>
              <div className="relative flex items-center justify-center">
                {isOpen ? (
                  <X className="w-6 h-6 text-white" />
                ) : (
                  <Menu className="w-6 h-6 text-white" />
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Menú Móvil Desplegable: Estilo Consola/CLI */}
        <div className={`lg:hidden transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="px-4 sm:px-6 pt-4 pb-6 space-y-1 bg-gray-950/98 border-t border-gray-800/80">
            {navItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className={`w-full group relative overflow-hidden transition-all duration-300 rounded-lg ${activeSection === item.id ? 'bg-cyan-900/20' : 'hover:bg-gray-800/50'}`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className={`absolute left-0 top-0 h-full w-1 bg-cyan-500 transition-all duration-300 ${activeSection === item.id ? 'opacity-100 shadow-[0_0_10px_rgba(0,255,255,0.8)]' : 'opacity-0'}`}></div>

                <div className="flex items-center px-4 py-3.5">
                  <span className={`font-bold tracking-[0.1em] uppercase text-sm transition-colors duration-300 ${activeSection === item.id ? 'text-cyan-400' : 'text-gray-300 group-hover:text-white'}`}>
                    {activeSection === item.id ? `> ${item.label.toUpperCase()}` : item.label}
                  </span>
                </div>
              </button>
            ))}
            
            {/* CTA de Contacto Móvil */}
            <Link to="/contacto" onClick={() => { setActiveSection('contact'); setIsOpen(false); }}
              className="block w-full mt-4 text-center py-3.5 bg-cyan-700/50 hover:bg-cyan-600/70 border border-cyan-500/50 rounded-lg font-bold tracking-widest text-sm text-white transition-all duration-300 shadow-[0_0_15px_rgba(0,255,255,0.3)]"
            >
              {'[ INICIAR CONVERSACIÓN ]'}
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}