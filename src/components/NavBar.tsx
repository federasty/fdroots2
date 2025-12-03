
import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Code, Github, Linkedin, Mail, Home, Sparkles, Briefcase, User, MessageCircle, Terminal } from 'lucide-react';
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
    gradient: 'from-sky-400 via-blue-400 to-indigo-400'
  },
  {
    id: 'skills',
    label: 'Habilidades',
    path: '/habilidades',
    icon: Sparkles,
    color: 'text-violet-400',
    gradient: 'from-violet-400 via-purple-400 to-fuchsia-400'
  },
  {
    id: 'projects',
    label: 'Proyectos',
    path: '/proyectos',
    icon: Briefcase,
    color: 'text-emerald-400',
    gradient: 'from-emerald-400 via-teal-400 to-cyan-400'
  },
  {
    id: 'about',
    label: 'Sobre Mí',
    path: '/sobre-mi',
    icon: User,
    color: 'text-amber-400',
    gradient: 'from-amber-400 via-orange-400 to-rose-400'
  },
  {
    id: 'contact',
    label: 'Contacto',
    path: '/contacto',
    icon: MessageCircle,
    color: 'text-pink-400',
    gradient: 'from-pink-400 via-rose-400 to-red-400'
  },
];
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState('home');
  const navRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
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
  const handleNavClick = (item: NavItem) => {
    setActiveSection(item.id);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const NavButton: React.FC<{ item: NavItem }> = ({ item }) => {
    const [isHovered, setIsHovered] = useState(false);
    const isActive = activeSection === item.id;
    const Icon = item.icon;
    return (
      <button
        onClick={() => handleNavClick(item)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative px-5 py-3 transition-all duration-500 group"
      >
        <div className={`absolute inset-0 rounded-2xl transition-all duration-500 backdrop-blur-xl ${isActive
          ? 'bg-gradient-to-br from-white/25 to-white/10 shadow-xl scale-105 border-2'
          : 'bg-white/5 scale-95 border group-hover:bg-gradient-to-br group-hover:from-white/20 group-hover:to-white/8 group-hover:scale-100'
          }`}
          style={{
            borderColor: isActive ? `rgba(${item.color === 'text-sky-300' ? '125, 211, 252' : item.color === 'text-violet-300' ? '196, 181, 253' : item.color === 'text-emerald-300' ? '110, 231, 183' : item.color === 'text-amber-300' ? '252, 211, 77' : '248, 180, 217'}, 0.5)` : 'rgba(255, 255, 255, 0.1)',
          }}>
          {isActive && (
            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${item.gradient} opacity-15 animate-pulse-slow`} />
          )}
        </div>
        <div className="relative z-10 flex items-center gap-2.5">
          <div className={`relative transition-all duration-500 ${isActive || isHovered ? 'scale-110' : 'scale-100'}`}>
            <Icon className={`w-5 h-5 transition-all duration-500 ${isActive ? item.color : 'text-slate-400 group-hover:text-slate-200'}`} strokeWidth={2.5} />
            {isActive && (
              <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} blur-lg opacity-50 animate-pulse`} />
            )}
          </div>
          <span className={`text-sm font-bold tracking-wide transition-all duration-500 ${isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
            {item.label}
          </span>
        </div>
        {isActive && (
          <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${item.gradient} opacity-20 animate-ping-slow`} />
        )}
      </button>
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
        className="relative p-2.5 rounded-xl transition-all duration-500 group"
      >
        <div className={`absolute inset-0 rounded-xl backdrop-blur-xl transition-all duration-500 ${isHovered ? 'bg-gradient-to-br from-white/20 to-white/8 scale-110 shadow-lg' : 'bg-white/5 scale-100'}`}>
          <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-15 transition-opacity duration-500`} />
        </div>
        <Icon className={`relative w-5 h-5 transition-all duration-500 ${isHovered ? `${color} scale-110` : 'text-slate-400 scale-100'}`} strokeWidth={2.5} />
        {isHovered && (
          <div className={`absolute inset-0 bg-gradient-to-r ${gradient} blur-lg opacity-40 animate-pulse`} />
        )}
      </a>
    );
  };
  return (
    <>
   <style>{`
    @keyframes morph {
        0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
        50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
    }
    .animate-morph { animation: morph 8s ease-in-out infinite; }
    
    @keyframes stronger-glow {
        0%, 100% { 
            /* MÁXIMA INTENSIDAD: Desenfoque de 50px y Propagación de 8px */
            box-shadow: 
                0 0 50px 8px rgba(0, 191, 255, 1.0),     /* Azul Eléctrico (100% opacidad) */
                0 0 100px 5px rgba(0, 255, 255, 0.9),    /* Cian brillante */
                0 0 150px rgba(64, 224, 255, 0.6),       /* Capa exterior turquesa */
                inset 0 0 30px rgba(0, 191, 255, 0.5);   /* Resplandor interno */
        }
        50% { 
            /* EXPLOSIÓN DE LUZ: Desenfoque de 80px y Propagación de 15px */
            box-shadow: 
                0 0 80px 15px rgba(0, 191, 255, 1.0),    /* Núcleo azul sólido */
                0 0 150px 10px rgba(0, 255, 255, 1.0),   /* Cian intenso */
                0 0 200px rgba(64, 224, 255, 0.8),       /* Halo exterior masivo */
                inset 0 0 50px rgba(0, 255, 255, 0.7);   /* Resplandor interno potente */
        }
    }
    .animate-glow-pulse { animation: stronger-glow 3s ease-in-out infinite; }
    
    @keyframes float-3d {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
    .animate-float-3d { animation: float-3d 4s ease-in-out infinite; }
    
    @keyframes gradient-x {
        0%, 100% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
    }
    .animate-gradient-x { animation: gradient-x 8s ease infinite; background-size: 200% 200%; }
    
    @keyframes ping-slow {
        0% { transform: scale(1); opacity: 0.4; }
        100% { transform: scale(1.5); opacity: 0; }
    }
    .animate-ping-slow { animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite; }
    
    @keyframes shimmer-wave {
        0% { background-position: -200% center; }
        100% { background-position: 200% center; }
    }
    .animate-shimmer-wave { animation: shimmer-wave 3s linear infinite; background-size: 200% 100%; }
    
    @keyframes rotate-slow {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    .animate-rotate-slow { animation: rotate-slow 20s linear infinite; }
    
    @keyframes pulse-slow {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.6; }
    }
    .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
    
    @keyframes ripple {
        0% { transform: scale(1); opacity: 0.5; }
        100% { transform: scale(2); opacity: 0; }
    }
    .animate-ripple { animation: ripple 1.5s ease-out infinite; }
    
    .glass-ultra {
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%);
        backdrop-filter: blur(30px) saturate(150%);
        -webkit-backdrop-filter: blur(30px) saturate(150%);
        border: 1px solid rgba(255, 255, 255, 0.2);
        box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.1);
    }
    .glass-strong {
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.08) 100%);
        backdrop-filter: blur(40px) saturate(180%);
        -webkit-backdrop-filter: blur(40px) saturate(180%);
        border: 1px solid rgba(255, 255, 255, 0.25);
        box-shadow: 0 12px 40px 0 rgba(0, 0, 0, 0.15);
    }
    .glass-premium {
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%);
        backdrop-filter: blur(50px) saturate(200%);
        -webkit-backdrop-filter: blur(50px) saturate(200%);
        border: 1.5px solid rgba(255, 255, 255, 0.3);
        box-shadow: 0 16px 48px 0 rgba(0, 0, 0, 0.2);
    }
`}</style>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${scrolled ? 'glass-strong shadow-2xl' : 'glass-ultra'}`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-sky-500/5 via-violet-500/5 to-pink-500/5" />
        <div
          className="absolute inset-0 pointer-events-none opacity-20 transition-all duration-500"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(167, 139, 250, 0.15), transparent 70%)`,
          }}
        />
        <div className="absolute top-0 left-0 right-0 h-[2px]">
          <div className="absolute inset-0 bg-gradient-to-r from-sky-300 via-violet-300 to-pink-300 opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-r from-sky-200 via-violet-200 to-pink-200 blur-sm animate-pulse" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <button
              onClick={() => handleNavClick(navItems[0])}
              className="flex items-center gap-3 group relative z-10"
            >
              <div className="relative w-12 h-12 flex items-center justify-center">
                <div className="absolute inset-0 rounded-xl border animate-rotate-slow" style={{ borderColor: 'rgba(167, 139, 250, 0.3)' }}>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-sky-300/20 via-violet-300/20 to-pink-300/20 blur-sm" />
                </div>
                <div className="absolute inset-1 rounded-lg glass-ultra group-hover:glass-premium transition-all duration-500 animate-morph" />
                <div className="relative z-10 animate-float-3d">
                  <Code className="w-6 h-6 text-white group-hover:text-violet-200 transition-all duration-500 drop-shadow-lg" strokeWidth={2.5} />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-sky-300 via-violet-300 to-pink-300 rounded-xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-2xl font-black tracking-tight relative">
                  <span className="bg-gradient-to-r from-sky-400 via-violet-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg">
                    FDroots
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-200/40 to-transparent animate-shimmer-wave" />
                </h1>
                <div className="flex items-center gap-1.5">
                  <Terminal className="w-3 h-3 text-violet-300 animate-pulse" strokeWidth={2.5} />
                  <p className="text-xs font-bold tracking-wider uppercase bg-gradient-to-r from-sky-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">
                    CODE FOR LIFE
                  </p>
                </div>
              </div>
            </button>
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <NavButton key={item.id} item={item} />
              ))}
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl glass-premium shadow-lg">
                <SocialLink Icon={Github} href="https://github.com/federasty" label="GitHub" color="text-slate-300" gradient="from-slate-400 to-slate-600" />
                <div className="w-px h-5 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
                <SocialLink Icon={Linkedin} href="https://www.linkedin.com/in/federico-daniel-142b22349/" label="LinkedIn" color="text-blue-300" gradient="from-blue-300 to-cyan-300" />
                <div className="w-px h-5 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
                <SocialLink Icon={Mail} href="mailto:federicodaniel7@gmail.com" label="Email" color="text-rose-300" gradient="from-rose-300 to-pink-300" />
              </div>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden relative w-12 h-12 rounded-xl glass-premium hover:scale-105 transition-all duration-500 group shadow-lg"
                aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
              >
                <div className="absolute inset-0 rounded-xl border transition-all duration-500" style={{ borderColor: 'rgba(167, 139, 250, 0.3)' }}>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-sky-300/20 via-violet-300/20 to-pink-300/20 group-hover:from-sky-300/30 group-hover:via-violet-300/30 group-hover:to-pink-300/30" />
                </div>
                <div className={`relative flex items-center justify-center h-full transition-all duration-500 ${isOpen ? 'rotate-90' : 'rotate-0'}`}>
                  {isOpen ? (
                    <X className="w-6 h-6 text-white drop-shadow-lg" strokeWidth={2.5} />
                  ) : (
                    <Menu className="w-6 h-6 text-white drop-shadow-lg" strokeWidth={2.5} />
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>
        <div className={`lg:hidden transition-all duration-700 ease-out overflow-hidden ${isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="relative px-4 sm:px-6 pt-6 pb-8 space-y-3 glass-strong border-t border-white/10 shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-b from-sky-500/5 via-violet-500/5 to-pink-500/5" />
            {navItems.map((item, index) => {
              const isActive = activeSection === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  className={`relative w-full group overflow-hidden transition-all duration-500 rounded-2xl ${isActive
                    ? 'glass-premium shadow-xl scale-[1.01] border-2'
                    : 'glass-ultra hover:glass-strong hover:scale-[1.005] border'
                    }`}
                  style={{
                    animationDelay: `${index * 40}ms`,
                    opacity: isOpen ? 1 : 0,
                    transform: isOpen ? 'translateY(0)' : 'translateY(-15px)',
                    transition: `all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 40}ms`,
                    borderColor: isActive ? `rgba(${item.color === 'text-sky-300' ? '125, 211, 252' : item.color === 'text-violet-300' ? '196, 181, 253' : item.color === 'text-emerald-300' ? '110, 231, 183' : item.color === 'text-amber-300' ? '252, 211, 77' : '248, 180, 217'}, 0.6)` : 'rgba(255, 255, 255, 0.1)',
                  }}
                >
                  {isActive && (
                    <>
                      <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-20 blur-2xl`} />
                      <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-10 animate-pulse`} />
                      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${item.gradient} opacity-15 animate-ping-slow`} />
                      <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${item.gradient} opacity-70 blur-sm`} />
                      <div className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r ${item.gradient} opacity-70 blur-sm`} />
                    </>
                  )}
                  <div className="relative flex items-center gap-4 px-5 py-4">
                    <div className={`relative transition-all duration-500 ${isActive ? 'scale-110' : 'scale-100 group-hover:scale-105'}`}>
                      <Icon className={`w-6 h-6 transition-all duration-500 ${isActive
                        ? `${item.color} drop-shadow-lg`
                        : 'text-slate-500 group-hover:text-white'
                        }`} strokeWidth={2.5} />
                      {isActive && (
                        <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} blur-xl opacity-60 animate-pulse`} />
                      )}
                    </div>
                    <span className={`font-bold text-base tracking-wide transition-all duration-500 ${isActive
                      ? 'text-white drop-shadow-lg'
                      : 'text-slate-500 group-hover:text-white'
                      }`}>
                      {item.label}
                    </span>
                    {isActive && (
                      <div className="ml-auto flex items-center justify-center">
                        <div className="relative w-8 h-8">
                          <div className={`absolute w-8 h-8 rounded-full bg-gradient-to-r ${item.gradient} opacity-15 animate-ping`} />
                          <div className={`absolute inset-2 rounded-full bg-gradient-to-r ${item.gradient} opacity-30 animate-pulse`} />
                          <div className={`absolute inset-3 rounded-full bg-gradient-to-r ${item.gradient} shadow-lg`} />
                        </div>
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
            <div className="flex items-center justify-center gap-3 pt-4 mt-2 border-t border-white/10">
              <SocialLink Icon={Github} href="https://github.com/federasty" label="GitHub" color="text-slate-300" gradient="from-slate-400 to-slate-600" />
              <SocialLink Icon={Linkedin} href="https://www.linkedin.com/in/federico-daniel-142b22349/" label="LinkedIn" color="text-blue-300" gradient="from-blue-300 to-cyan-300" />
              <SocialLink Icon={Mail} href="mailto:federicodaniel7@gmail.com" label="Email" color="text-rose-300" gradient="from-rose-300 to-pink-300" />
            </div>
            <a
              href="https://wa.me/59894248120?text=Hola%20me%20interesan%20tus%20servicios"
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex items-center justify-center gap-2.5 w-full mt-5 py-3.5 overflow-hidden rounded-2xl font-bold text-sm text-white transition-all duration-500 group shadow-lg hover:shadow-xl"
            >



            </a>
          </div>
        </div>
      </nav>
    </>
  );
}