import React, { useState, useEffect, useRef } from 'react';
import { Github, Code2, ExternalLink, Sparkles, CheckCircle, Hourglass } from 'lucide-react'; // Importamos Hourglass

// Tipado del Proyecto (sin cambios)
interface ProjectData {
  id: number;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  image: string;
  tech: string[];
  github: string;
  demo: string;
  host: string;
  status: 'Completado' | 'En Progreso' | 'Pausado';
  gradient: string;
  accentGradient: string;
  glowColor: string;
  accentColor: string;
}

const Project = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Proyectos actualizados con "La Pizzería" (ID 4)
  const projects: ProjectData[] = [
    {
      id: 1,
      title: "ProRoller",
      subtitle: "E-Commerce Moderno",
      category: "E-Commerce",
      description: "Tienda online de cortinas roller, con catálogo interactivo, compras seguras y experiencia de usuario intuitiva.",
      image: "/proroller.png",
      tech: ["Angular 16", "Angular Material", "Angular Router", "Hostinger"],
      github: "https://github.com/andresdarin/Pro-Roller",
      demo: "https://proroller.uy/?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnuI0siNRXib1uey5KwKhe8sC8i_Qi8wQeJ9OIek2Gy34fwE-7FcSmC3e67bc_aem_9tGisV-OYa1J0EJYYPiQaQ",
      host: "Hostinger",
      status: "Completado",
      gradient: "from-rose-500/20 via-fuchsia-500/20 to-purple-600/20",
      accentGradient: "from-rose-400 via-fuchsia-500 to-purple-600",
      glowColor: "shadow-rose-500/50",
      accentColor: '#ec4899'
    },
    {
      id: 2,
      title: "RiFacil",
      subtitle: "Plataforma de Gestión",
      category: "Full Stack",
      description: "Plataforma web para gestión de rifas y ventas, con integración de pagos, roles de usuario y administración de sorteos y compras.",
      image: "/rifacil.png",
      tech: [
        "React + TypeScript",
        "Node.js + Express",
        "MongoDB",
        "JWT",
        "Mercado Pago",
        "Sendgrid",
        "Render",
        "Netlify"
      ],
      github: "https://github.com/federasty/rifacil",
      demo: "https://rifacil.netlify.app/#",
      host: "Netlify",
      status: "Completado",
      gradient: "from-emerald-500/20 via-teal-500/20 to-cyan-600/20",
      accentGradient: "from-emerald-400 via-teal-500 to-cyan-600",
      glowColor: "shadow-emerald-500/50",
      accentColor: '#10b981'
    },
    {
      id: 3,
      title: "VFtransportes",
      subtitle: "Soluciones de Transporte y Carga Pesada",
      category: "Logística ",
      description: "Empresa de transporte pesado dedicada a ofrecer soluciones confiables, seguras y eficientes para el traslado de carga de materiales de cantera",
      image: "/vf.png",
      tech: [
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Framer Motion",
        "React Router",
        "Sendgrid",
        "Vercel"
      ],
      github: "https://github.com/federasty/vftransportes",
      demo: "https://vftransportes.vercel.app/",
      host: "Vercel",
      status: "Completado",
      gradient: "from-blue-500/20 via-indigo-500/20 to-violet-600/20",
      accentGradient: "from-blue-400 via-indigo-500 to-violet-600",
      glowColor: "shadow-blue-500/50",
      accentColor: '#6366f1'
    },
    {
      id: 4,
      title: "La Pizzería",
      subtitle: "Sistema de Pedidos Online",
      category: "Full Stack",
      description: "Sistema completo para la gestión de pedidos de una pizzería: menú dinámico, carrito de compras, seguimiento de pedidos y área de administración.",
      image: "/lapizzeria.png",
      tech: [
        "Next.js",
        "Prisma",
        "PostgreSQL",
        "Stripe",
        "Tailwind CSS",
        "Vercel"
      ],
      github: "https://github.com/tu_usuario/la-pizzeria", // Reemplazar con tu repo real
      demo: "#", // En desarrollo, sin demo pública aún
      host: "Vercel",
      status: "En Progreso", // Estado "En Progreso"
      gradient: "from-amber-500/20 via-yellow-500/20 to-orange-500/20",
      accentGradient: "from-amber-400 via-yellow-500 to-orange-500",
      glowColor: "shadow-amber-500/50",
      accentColor: '#f59e0b' // Tailwind amber-500
    }
  ];

  // --- Lógica de Hooks (sin cambios) ---
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrolled = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        setScrollProgress((scrolled / maxScroll) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile]);
  
  // Función auxiliar para elegir el ícono de estado
  const StatusIcon = ({ status }: { status: ProjectData['status'] }) => {
    switch (status) {
      case 'Completado':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'En Progreso':
        return <Hourglass className="w-4 h-4 text-amber-400 animate-spin-slow" />;
      case 'Pausado':
        return <Code2 className="w-4 h-4 text-red-400" />;
      default:
        return null;
    }
  };
  
  // Función auxiliar para elegir el color del texto de estado
  const StatusTextColor = ({ status }: { status: ProjectData['status'] }) => {
    switch (status) {
      case 'Completado':
        return 'text-green-400';
      case 'En Progreso':
        return 'text-amber-400';
      case 'Pausado':
        return 'text-red-400';
      default:
        return 'text-slate-400';
    }
  };

  return (
    <div ref={containerRef} className="relative min-h-screen text-white overflow-hidden py-12 sm:py-16 md:py-20 lg:py-32 px-3 sm:px-4 md:px-6 lg:px-8">

      {/* Progress Bar (sin cambios) */}
      <div className="fixed top-0 left-0 right-0 h-0.5 sm:h-1 bg-slate-800/50 z-50">
        <div
          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-300 will-change-transform"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <section ref={sectionRef} className="relative z-10">

        {/* Ambient Background Orbs (sin cambios) */}
        {!isMobile && (
          <>
            <div
              className="absolute top-20 left-10 w-[300px] sm:w-[350px] lg:w-[400px] h-[300px] sm:h-[350px] lg:h-[400px] bg-gradient-to-r from-violet-500/6 via-purple-500/4 to-fuchsia-500/6 rounded-full blur-3xl animate-float pointer-events-none will-change-transform"
              style={{
                transform: `translate(${mousePosition.x * 0.015}px, ${mousePosition.y * 0.015}px)`,
              }}
              aria-hidden="true"
            />
            <div
              className="absolute top-40 right-20 w-[350px] sm:w-[400px] lg:w-[450px] h-[350px] sm:h-[400px] lg:h-[450px] bg-gradient-to-r from-cyan-500/5 via-blue-500/3 to-indigo-500/5 rounded-full blur-3xl animate-float-reverse pointer-events-none will-change-transform"
              style={{
                transform: `translate(${-mousePosition.x * 0.015}px, ${-mousePosition.y * 0.015}px)`,
              }}
              aria-hidden="true"
            />
          </>
        )}

        {/* Hero Header (sin cambios) */}
        <div className="max-w-7xl mx-auto mb-8 sm:mb-12 md:mb-16">
          <header
            className={`text-center space-y-3 sm:space-y-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight px-4">
              <span className="block bg-gradient-to-r from-sky-400 via-violet-500 to-pink-500 bg-clip-text text-transparent animate-text-shimmer">
                Proyectos Destacados
              </span>
            </h2>
            <div className="flex justify-center items-center gap-2 sm:gap-3 px-4" aria-hidden="true">
              <div className="w-12 sm:w-16 lg:w-20 h-px bg-gradient-to-r from-transparent via-sky-400/30 to-sky-400" />
              <div className="relative w-32 sm:w-40 lg:w-48 h-0.5 sm:h-1 rounded-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-sky-500 via-violet-500 to-pink-500 opacity-40" />
                <div className="absolute inset-0 bg-gradient-to-r from-sky-400 via-violet-400 to-pink-400 animate-shimmer" />
              </div>
              <div className="w-12 sm:w-16 lg:w-20 h-px bg-gradient-to-l from-transparent via-pink-400/30 to-pink-400" />
            </div>
            <p className="text-sm sm:text-base lg:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed px-4">
              Donde la{' '}
              <span className="bg-gradient-to-r from-sky-400 via-violet-400 to-pink-400 bg-clip-text text-transparent font-bold">
                innovación
              </span>
              {' '}se encuentra con la{' '}
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent font-bold">
                excelencia
              </span>
            </p>
          </header>
        </div>

        {/* Projects Grid - Mapeo de proyectos */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {projects.map((project, index) => (
              <div
                key={project.id}
                onMouseEnter={() => !isMobile && setHoveredProject(project.id)}
                onMouseLeave={() => !isMobile && setHoveredProject(null)}
                className="group relative"
                style={{
                  animation: `slideInUp 1s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.15}s both`
                }}
              >
                {/* Outer Glow (sin cambios) */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${project.accentGradient} rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 blur-lg sm:blur-xl transition-all duration-700 ${project.glowColor} will-change-transform`} />

                {/* Card Container (sin cambios) */}
                <div className="relative h-full bg-gradient-to-br from-slate-900/90 to-slate-800/90 rounded-2xl sm:rounded-3xl border border-slate-700/50 overflow-hidden backdrop-blur-2xl transition-all duration-700 hover:border-slate-600 hover:shadow-2xl md:hover:scale-[1.02] md:hover:-translate-y-3 will-change-transform">

                  {/* Gradient Overlay (sin cambios) */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

                  {/* Animated Border (sin cambios) */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className={`absolute inset-0 bg-gradient-to-r ${project.accentGradient} opacity-20 blur-2xl`} />
                  </div>

                  <div className="relative">
                    {/* Image Section (sin cambios) */}
                    <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden">

                      {/* Multiple Gradient Overlays (sin cambios) */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent z-10" />
                      <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-40 transition-all duration-700 z-10`} />

                      {/* Image (sin cambios) */}
                      <div className="w-full h-full p-3 sm:p-4">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-contain transition-all duration-1000 group-hover:scale-110 will-change-transform"
                          loading="lazy"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            // Puedes cambiar esta imagen de placeholder por una que tú desees,
                            // o una específica para cada proyecto.
                            target.src = '/placeholder.png'; // Asegúrate de tener una imagen placeholder en public/
                          }}
                        />
                      </div>

                      {/* Status Badge - MODIFICADO para usar StatusIcon y StatusTextColor */}
                      <div className="absolute top-3 sm:top-4 lg:top-6 right-3 sm:right-4 lg:right-6 z-20 flex items-center gap-1 transform transition-all duration-500 group-hover:scale-110">
                        <StatusIcon status={project.status} />
                        <span className={`text-xs sm:text-sm font-bold tracking-wide ${StatusTextColor({ status: project.status })}`}>
                          {project.status}
                        </span>
                      </div>

                      {/* Category Badge (sin cambios) */}
                      <div className="absolute top-3 sm:top-4 lg:top-6 left-3 sm:left-4 lg:left-6 z-20 transform transition-all duration-500 group-hover:scale-110">
                        <div className={`px-3 sm:px-4 lg:px-5 py-1.5 sm:py-2 lg:py-2.5 bg-gradient-to-r ${project.gradient} backdrop-blur-2xl rounded-xl sm:rounded-2xl border border-white/20 shadow-xl sm:shadow-2xl`}>
                          <span className="text-xs sm:text-sm font-bold text-white tracking-wide">{project.category}</span>
                        </div>
                      </div>
                    </div>

                    {/* Content Section (sin cambios) */}
                    <div className="relative p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-5 lg:space-y-6">

                      {/* Title & Subtitle (sin cambios) */}
                      <div className="space-y-1 sm:space-y-2">
                        <h3 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight transition-all duration-500 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:via-blue-200 group-hover:to-purple-300 group-hover:bg-clip-text">
                          {project.title}
                        </h3>
                        <p className="text-xs sm:text-sm font-semibold text-slate-500 uppercase tracking-widest">
                          {project.subtitle}
                        </p>
                      </div>

                      {/* Description (sin cambios) */}
                      <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Deployment Host (sin cambios) */}
                      <div className="flex items-center gap-2">
                        <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
                        <span className="text-xs sm:text-sm font-bold text-slate-300 uppercase tracking-wider">
                          Host de Despliegue: <span className={`text-sm sm:text-base font-extrabold`} style={{ color: project.accentColor }}>{project.host}</span>
                        </span>
                      </div>

                      {/* Divider (sin cambios) */}
                      <div className={`h-px bg-gradient-to-r ${project.accentGradient} opacity-20`} />

                      {/* Tech Stack (sin cambios) */}
                      <div className="space-y-3 sm:space-y-4">
                        <div className="flex items-center gap-2">
                          <Code2 className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
                          <span className="text-xs sm:text-sm font-bold text-slate-300 uppercase tracking-wider">Stack Tecnológico</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          {project.tech.map((tech, i) => (
                            <span
                              key={i}
                              className="group/tech relative px-2.5 sm:px-3 lg:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs font-semibold bg-slate-800/50 text-slate-300 rounded-lg sm:rounded-xl border border-slate-700/50 backdrop-blur-sm hover:bg-slate-700/70 hover:border-slate-600 hover:text-white hover:scale-105 transition-all duration-300 cursor-default overflow-hidden"
                              style={{
                                animation: `fadeInScale 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.05}s both`
                              }}
                            >
                              <span className="relative z-10">{tech}</span>
                              <div className={`absolute inset-0 bg-gradient-to-r ${project.accentGradient} opacity-0 group-hover/tech:opacity-20 transition-opacity duration-300`} />
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Premium Action Buttons (sin cambios en la estructura) */}
                      <div className="pt-2 sm:pt-3 lg:pt-4 flex flex-col sm:flex-row gap-2 sm:gap-3">
                        {/* Ver Demo Button */}
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          onMouseEnter={() => !isMobile && setHoveredButton(`demo-${project.id}`)}
                          onMouseLeave={() => !isMobile && setHoveredButton(null)}
                          onTouchStart={() => setHoveredButton(`demo-${project.id}`)}
                          onTouchEnd={() => setTimeout(() => setHoveredButton(null), 300)}
                          className={`group/demo relative flex-1 px-4 sm:px-5 lg:px-6 py-2.5 sm:py-3 lg:py-3.5 bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-slate-600/50 overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95 hover:shadow-2xl touch-manipulation will-change-transform ${project.status !== 'Completado' ? 'cursor-not-allowed opacity-60' : ''}`}
                          style={{
                            boxShadow: hoveredButton === `demo-${project.id}`
                              ? `0 0 30px ${project.accentColor}40, 0 0 60px ${project.accentColor}20`
                              : 'none',
                            WebkitTapHighlightColor: 'transparent'
                          }}
                          aria-label={`Ver demo de ${project.title} en ${project.host}`}
                          // Deshabilita el click si no está completado
                          onClick={(e) => project.status !== 'Completado' && e.preventDefault()}
                        >
                          {/* Animated Background */}
                          <div
                            className={`absolute inset-0 bg-gradient-to-r opacity-0 group-hover/demo:opacity-100 group-active/demo:opacity-100 transition-all duration-500`}
                            style={{
                              background: `linear-gradient(135deg, ${project.accentColor}20, ${project.accentColor}10, transparent)`
                            }}
                          />

                          {/* Shine Effect */}
                          <div
                            className="absolute inset-0 opacity-0 group-hover/demo:opacity-100 transition-opacity duration-700"
                            style={{
                              background: `linear-gradient(135deg, transparent 0%, ${project.accentColor}30 50%, transparent 100%)`,
                              animation: hoveredButton === `demo-${project.id}` ? 'shine 1.5s ease-in-out' : 'none'
                            }}
                          />

                          {/* Particle Effects - Solo desktop */}
                          {!isMobile && hoveredButton === `demo-${project.id}` && (
                            <>
                              {[...Array(8)].map((_, i) => (
                                <div
                                  key={i}
                                  className="absolute w-1 h-1 rounded-full animate-particle"
                                  style={{
                                    background: project.accentColor,
                                    left: `${20 + i * 10}%`,
                                    bottom: '50%',
                                    animationDelay: `${i * 0.1}s`,
                                    boxShadow: `0 0 10px ${project.accentColor}`
                                  }}
                                />
                              ))}
                            </>
                          )}

                          {/* Border Glow */}
                          <div
                            className="absolute inset-0 rounded-xl sm:rounded-2xl opacity-0 group-hover/demo:opacity-100 group-active/demo:opacity-100 transition-opacity duration-500"
                            style={{
                              boxShadow: `inset 0 0 20px ${project.accentColor}30`
                            }}
                          />

                          {/* Button Content */}
                          <div className="relative z-10 flex items-center justify-center gap-1.5 sm:gap-2">
                            <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover/demo:scale-110 group-hover/demo:rotate-12" />
                            <span className="font-bold text-xs sm:text-sm tracking-wide">
                              {project.status === 'Completado' ? 'Ver Proyecto' : 'Demo (Próx.)'}
                            </span>
                            <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 opacity-0 group-hover/demo:opacity-100 group-active/demo:opacity-100 transition-all duration-300 group-hover/demo:animate-pulse" />
                          </div>
                        </a>

                        {/* GitHub Button (sin cambios en la estructura) */}
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onMouseEnter={() => !isMobile && setHoveredButton(`github-${project.id}`)}
                          onMouseLeave={() => !isMobile && setHoveredButton(null)}
                          onTouchStart={() => setHoveredButton(`github-${project.id}`)}
                          onTouchEnd={() => setTimeout(() => setHoveredButton(null), 300)}
                          className="group/github relative flex-1 px-4 sm:px-5 lg:px-6 py-2.5 sm:py-3 lg:py-3.5 bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-slate-600/50 overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95 hover:shadow-2xl touch-manipulation will-change-transform"
                          style={{
                            boxShadow: hoveredButton === `github-${project.id}`
                              ? `0 0 30px ${project.accentColor}40, 0 0 60px ${project.accentColor}20`
                              : 'none',
                            WebkitTapHighlightColor: 'transparent'
                          }}
                          aria-label={`Ver código en GitHub de ${project.title}`}
                        >
                          {/* Animated Background */}
                          <div
                            className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover/github:opacity-100 group-active/github:opacity-100 transition-all duration-500"
                            style={{
                              background: `linear-gradient(135deg, ${project.accentColor}20, ${project.accentColor}10, transparent)`
                            }}
                          />

                          {/* Shine Effect */}
                          <div
                            className="absolute inset-0 opacity-0 group-hover/github:opacity-100 transition-opacity duration-700"
                            style={{
                              background: `linear-gradient(135deg, transparent 0%, ${project.accentColor}30 50%, transparent 100%)`,
                              animation: hoveredButton === `github-${project.id}` ? 'shine 1.5s ease-in-out' : 'none'
                            }}
                          />

                          {/* Particle Effects - Solo desktop */}
                          {!isMobile && hoveredButton === `github-${project.id}` && (
                            <>
                              {[...Array(8)].map((_, i) => (
                                <div
                                  key={i}
                                  className="absolute w-1 h-1 rounded-full animate-particle"
                                  style={{
                                    background: project.accentColor,
                                    left: `${20 + i * 10}%`,
                                    bottom: '50%',
                                    animationDelay: `${i * 0.1}s`,
                                    boxShadow: `0 0 10px ${project.accentColor}`
                                  }}
                                />
                              ))}
                            </>
                          )}

                          {/* Border Glow */}
                          <div
                            className="absolute inset-0 rounded-xl sm:rounded-2xl opacity-0 group-hover/github:opacity-100 group-active/github:opacity-100 transition-opacity duration-500"
                            style={{
                              boxShadow: `inset 0 0 20px ${project.accentColor}30`
                            }}
                          />

                          {/* Button Content */}
                          <div className="relative z-10 flex items-center justify-center gap-1.5 sm:gap-2">
                            <Github className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover/github:scale-110 group-hover/github:rotate-12" />
                            <span className="font-bold text-xs sm:text-sm tracking-wide">Ver Código</span>
                            <Code2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 opacity-0 group-hover/github:opacity-100 group-active/github:opacity-100 transition-all duration-300 group-hover/github:animate-pulse" />
                          </div>
                        </a>
                      </div>
                    </div>

                    {/* Bottom Accent Line (sin cambios) */}
                    <div className={`absolute bottom-0 left-0 right-0 h-1 sm:h-1.5 bg-gradient-to-r ${project.accentGradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left will-change-transform`} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Estilos CSS - MODIFICACIÓN para un nuevo keyframe */}
      <style>{`
        /* ... (tus keyframes existentes, sin cambios) ... */
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(60px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.8) translateY(8px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes text-shimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-text-shimmer { 
          animation: text-shimmer 6s ease-in-out infinite; 
          background-size: 200% auto; 
        }

        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        
        .animate-shimmer { 
          animation: shimmer 3s linear infinite; 
          background-size: 200% 100%; 
        }

        @keyframes shine {
          0% {
            transform: translateX(-100%) rotate(30deg);
          }
          100% {
            transform: translateX(200%) rotate(30deg);
          }
        }

        @keyframes particle {
          0% {
            transform: translateY(0) scale(0);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(-30px) scale(1);
            opacity: 0;
          }
        }

        .animate-particle {
          animation: particle 1.5s ease-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(15px, -15px); }
        }
        
        .animate-float { 
          animation: float 20s ease-in-out infinite; 
        }

        @keyframes float-reverse {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-15px, 15px); }
        }
        
        .animate-float-reverse { 
          animation: float-reverse 25s ease-in-out infinite; 
        }
        
        /* Nuevo keyframe para el ícono de "En Progreso" */
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-spin-slow {
          animation: spin-slow 4s linear infinite; /* Animación más lenta que la normal de spin */
        }


        /* Optimizaciones de performance */
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Project;