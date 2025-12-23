import React, { useState, useEffect, useRef } from 'react';

interface Skill {
    name: string;
    iconPath: string;
    gradient: string;
    color: string;
    category: string;
    level: number;
    description: string;
    accentColor: string;
}

const skills: Skill[] = [
    {
        name: 'JavaScript',
        iconPath: '/javascript.png',
        gradient: 'from-amber-400 via-yellow-500 to-orange-500',
        color: 'text-amber-400',
        accentColor: '#fbbf24',
        category: 'Frontend',
        level: 98,
        description: 'Lenguaje versátil y fundamental para desarrollo web moderno, desde manipulación del DOM hasta aplicaciones full-stack'
    },
    {
        name: 'TypeScript',
        iconPath: '/tsLogo.png',
        gradient: 'from-blue-400 via-purple-500 to-blue-600',
        color: 'text-blue-400',
        accentColor: '#6366f1',
        category: 'Frontend',
        level: 90,
        description: 'Superset de JavaScript con tipado estático que mejora la calidad del código y facilita el mantenimiento de proyectos grandes'
    },
    {
        name: 'React',
        iconPath: '/react.png',
        gradient: 'from-cyan-400 via-blue-500 to-indigo-600',
        color: 'text-cyan-400',
        accentColor: '#22d3ee',
        category: 'Frontend',
        level: 95,
        description: 'Framework declarativo para construir interfaces interactivas y componentes reutilizables con hooks y estado avanzado'
    },
    {
        name: 'JWT',
        iconPath: '/jwt.png',
        gradient: 'from-pink-400 via-pink-500 to-rose-600',
        color: 'text-purple-400',
        accentColor: '#a855f7',
        category: 'Backend',
        level: 88,
        description: 'Estándar abierto para autenticación y autorización segura mediante tokens JSON firmados digitalmente y verificables.'
    },
    {
        name: 'CSS',
        iconPath: '/css.png',
        gradient: 'from-blue-400 via-sky-500 to-cyan-600',
        color: 'text-blue-400',
        accentColor: '#3b82f6',
        category: 'Frontend',
        level: 94,
        description: 'Lenguaje de estilos para diseñar interfaces web modernas con layouts responsive, animaciones y efectos visuales avanzados'
    },
    {
        name: 'Node.js',
        iconPath: '/nodejs.png',
        gradient: 'from-lime-400 via-green-500 to-emerald-600',
        color: 'text-lime-400',
        accentColor: '#84cc16',
        category: 'Backend',
        level: 88,
        description: 'Entorno de ejecución JavaScript del lado del servidor, ideal para APIs REST, microservicios y aplicaciones en tiempo real'
    },
    {
        name: 'SQL',
        iconPath: '/sql.png',
        gradient: 'from-orange-600 via-red-600 to-rose-600',
        color: 'text-rose-400',
        accentColor: '#fb7185',
        category: 'Database',
        level: 90,
        description: 'Lenguaje estándar para gestión de bases de datos relacionales, consultas complejas y optimización de rendimiento'
    },
    {
        name: 'C#',
        iconPath: '/csharp.png',
        gradient: 'from-fuchsia-400 via-purple-500 to-violet-600',
        color: 'text-fuchsia-400',
        accentColor: '#e879f9',
        category: 'Backend',
        level: 85,
        description: 'Lenguaje robusto orientado a objetos para aplicaciones empresariales, servicios web y desarrollo con .NET Framework'
    },
    {
        name: 'Tailwind CSS',
        iconPath: '/tailwind.png',
        gradient: 'from-sky-400 via-teal-500 to-cyan-600',
        color: 'text-sky-400',
        accentColor: '#0ea5e9',
        category: 'Frontend',
        level: 92,
        description: 'Framework CSS utility-first que acelera el desarrollo con clases predefinidas para crear diseños modernos y responsivos'
    },
    {
        name: 'MongoDB',
        iconPath: '/mongodb.png',
        gradient: 'from-emerald-400 via-green-500 to-teal-600',
        color: 'text-emerald-400',
        accentColor: '#10b981',
        category: 'Database',
        level: 87,
        description: 'Base de datos NoSQL flexible y escalable con documentos JSON, perfecta para aplicaciones modernas con datos dinámicos'
    },
    {
        name: 'Git',
        iconPath: '/git.png',
        gradient: 'from-orange-400 via-red-500 to-rose-600',
        color: 'text-orange-400',
        accentColor: '#f97316',
        category: 'DevOps',
        level: 92,
        description: 'Sistema de control de versiones distribuido para rastrear cambios, colaborar en equipo y gestionar código fuente'
    },
    {
        name: 'GeneXus',
        iconPath: '/genexus.png',
        gradient: 'from-red-400 via-rose-500 to-red-600',
        color: 'text-red-400',
        accentColor: '#f472b6',
        category: 'Full Stack',
        level: 80,
        description: 'Plataforma low-code empresarial para desarrollo rápido de aplicaciones multiplataforma con generación automática de código'
    }
];

const SkillCard: React.FC<{ skill: Skill; index: number }> = ({ skill, index }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        setMousePosition({
            x: ((e.clientX - rect.left) / rect.width) * 100,
            y: ((e.clientY - rect.top) / rect.height) * 100,
        });
    };

    return (
        <article
            ref={cardRef}
            className="relative animate-fade-in-up group cursor-pointer"
            style={{
                animationDelay: `${index * 0.06}s`,
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => { setIsHovered(false); setIsActive(false); }}
            onMouseMove={handleMouseMove}
            onMouseDown={() => setIsActive(true)}
            onMouseUp={() => setIsActive(false)}
            onTouchStart={() => setIsActive(true)}
            onTouchEnd={() => setIsActive(false)}
            role="button"
            tabIndex={0}
            aria-label={`${skill.name} - ${skill.description}`}
        >
            {/* Subtle Outer Glow */}
            <div
                className="absolute -inset-0.5 rounded-2xl transition-all duration-500"
                style={{
                    background: `linear-gradient(135deg, ${skill.accentColor}20, transparent, ${skill.accentColor}15)`,
                    opacity: isHovered ? 0.4 : 0.2,
                    filter: isHovered ? 'blur(6px)' : 'blur(0px)',
                }}
            />

            {/* Main Card */}
            <div
                className="relative backdrop-blur-xl rounded-2xl p-5 sm:p-6 transition-all duration-300"
                style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 100%)',
                    borderColor: isHovered ? `${skill.accentColor}35` : `${skill.accentColor}20`,
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    transform: isActive ? 'translateY(0px) scale(0.98)' : isHovered ? 'translateY(-4px) scale(1)' : 'translateY(0) scale(1)',
                    opacity: isActive ? 0.9 : 1,
                    boxShadow: isHovered
                        ? `0 20px 40px -12px ${skill.accentColor}25, 0 0 0 1px ${skill.accentColor}15`
                        : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                }}
            >
                {/* Dynamic Mouse Glow */}
                {isHovered && (
                    <div
                        className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-500"
                        style={{
                            background: `radial-gradient(400px circle at ${mousePosition.x}% ${mousePosition.y}%, ${skill.accentColor}10, transparent 60%)`,
                        }}
                    />
                )}

                {/* Subtle Background Gradient */}
                <div
                    className={`absolute inset-0 bg-gradient-to-br ${skill.gradient} rounded-2xl pointer-events-none transition-opacity duration-500`}
                    style={{
                        opacity: isHovered ? 0.08 : 0.04,
                    }}
                />

                {/* Content */}
                <div className="relative z-10 space-y-4">
                    {/* Header */}
                    <header className="flex items-center justify-between">
                        {/* Icon */}
                        <div
                            className="p-2.5 sm:p-3 rounded-xl transition-all duration-500"
                            style={{
                                backgroundColor: isHovered ? `${skill.accentColor}15` : `${skill.accentColor}10`,
                                borderColor: `${skill.accentColor}25`,
                                borderWidth: '1px',
                                borderStyle: 'solid',
                            }}
                        >
                            <img
                                src={skill.iconPath}
                                alt={`${skill.name} logo`}
                                className="w-7 h-7 sm:w-8 sm:h-8 object-contain transition-transform duration-500"
                                style={{
                                    transform: isHovered ? 'scale(1.1) rotate(5deg)' : 'scale(1)',
                                }}
                            />
                        </div>

                        {/* Category Badge */}
                        <span
                            className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${skill.color} transition-all duration-500`}
                            style={{
                                backgroundColor: `${skill.accentColor}12`,
                                borderColor: `${skill.accentColor}25`,
                                borderWidth: '1px',
                                borderStyle: 'solid',
                            }}
                        >
                            {skill.category}
                        </span>
                    </header>

                    {/* Skill Name */}
                    <h3
                        className={`text-lg sm:text-xl font-bold bg-gradient-to-r ${skill.gradient} bg-clip-text text-transparent transition-all duration-500`}
                        style={{
                            filter: isHovered ? 'brightness(1.2)' : 'brightness(1)',
                        }}
                    >
                        {skill.name}
                    </h3>

                    {/* Description */}
                    <p
                        className="text-xs sm:text-sm leading-relaxed transition-colors duration-500"
                        style={{
                            color: isHovered ? '#cbd5e1' : '#94a3b8',
                        }}
                    >
                        {skill.description}
                    </p>
                </div>

                {/* Corner Accents */}
                <div
                    className="absolute top-0 right-0 w-12 h-12 border-t border-r opacity-0 group-hover:opacity-25 rounded-tr-2xl transition-opacity duration-500"
                    style={{ borderColor: skill.accentColor }}
                />
                <div
                    className="absolute bottom-0 left-0 w-12 h-12 border-b border-l opacity-0 group-hover:opacity-25 rounded-bl-2xl transition-opacity duration-500"
                    style={{ borderColor: skill.accentColor }}
                />
            </div>
        </article>
    );
};

export default function Skills() {
    const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

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
    }, []);

    return (
        <>
            <style>{`
                /* ========================================
                   ULTRA PREMIUM ANIMATIONS
                   ======================================== */
                
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
                    opacity: 0;
                }

                @keyframes text-shimmer {
                    0% { background-position: -200% center; }
                    100% { background-position: 200% center; }
                }
                
                .animate-text-shimmer { 
                    animation: text-shimmer 8s linear infinite; 
                    background-size: 200% auto; 
                }

                @keyframes shimmer {
                    0% { background-position: -200% center; }
                    100% { background-position: 200% center; }
                }
                
                .animate-shimmer { 
                    animation: shimmer 4s linear infinite; 
                    background-size: 200% 100%; 
                }

                @keyframes float-gentle {
                    0%, 100% { transform: translate(0, 0); }
                    50% { transform: translate(10px, -10px); }
                }
                
                .animate-float-gentle { 
                    animation: float-gentle 20s ease-in-out infinite; 
                }

                @keyframes float-gentle-reverse {
                    0%, 100% { transform: translate(0, 0); }
                    50% { transform: translate(-10px, 10px); }
                }
                
                .animate-float-gentle-reverse { 
                    animation: float-gentle-reverse 25s ease-in-out infinite; 
                }

                /* ========================================
                   ACCESSIBILITY
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
                ref={sectionRef}
                className="relative min-h-screen pt-20 sm:pt-24 md:pt-28 pb-16 sm:pb-20 md:pb-24 overflow-hidden"
                aria-labelledby="skills-heading"
            >
                {/* Ultra Subtle Ambient Background */}
                <div
                    className="absolute top-20 left-10 w-[500px] h-[500px] bg-gradient-to-r from-violet-500/5 via-purple-500/3 to-fuchsia-500/5 rounded-full blur-3xl animate-float-gentle pointer-events-none"
                    style={{
                        transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`,
                    }}
                    aria-hidden="true"
                />
                <div
                    className="absolute top-40 right-20 w-[450px] h-[450px] bg-gradient-to-r from-cyan-500/4 via-blue-500/2 to-indigo-500/4 rounded-full blur-3xl animate-float-gentle-reverse pointer-events-none"
                    style={{
                        transform: `translate(${-mousePosition.x * 0.01}px, ${-mousePosition.y * 0.01}px)`,
                    }}
                    aria-hidden="true"
                />

                {/* Subtle Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-transparent to-slate-950/50 pointer-events-none" aria-hidden="true" />

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Section Header */}
                    <header
                        className={`text-center space-y-5 sm:space-y-6 mb-12 sm:mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                    >
                        {/* Main Title */}
                        <h2 id="skills-heading" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] px-4">
                            <span className="block bg-gradient-to-r from-sky-400 via-violet-400 to-pink-400 bg-clip-text text-transparent animate-text-shimmer">
                                Habilidades & Tecnologías
                            </span>
                        </h2>

                        {/* Refined Decorative Line */}
                        <div className="flex justify-center items-center gap-4 mt-4" aria-hidden="true">
                            <div className="w-20 sm:w-32 h-px bg-gradient-to-r from-transparent via-violet-400/40 to-violet-400/60" />
                            <div className="relative w-2 h-2 rounded-full bg-violet-400/60">
                                <div className="absolute inset-0 rounded-full bg-violet-400/40 animate-ping" style={{ animationDuration: '3s' }} />
                            </div>
                            <div className="w-20 sm:w-32 h-px bg-gradient-to-l from-transparent via-violet-400/40 to-violet-400/60" />
                        </div>

                        {/* Subtitle */}
                        <p className="text-sm sm:text-base md:text-lg text-slate-400/90 max-w-2xl mx-auto leading-relaxed font-medium px-4">
                            Dominio de tecnologías modernas para crear{' '}
                            <span className="text-white font-semibold">soluciones excepcionales</span>
                            {' '}que impulsan el éxito empresarial
                        </p>
                    </header>

                    {/* Skills Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                        {skills.map((skill, index) => (
                            <SkillCard key={skill.name} skill={skill} index={index} />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
