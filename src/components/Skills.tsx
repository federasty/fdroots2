import React, { useState, useEffect, useRef } from 'react';

interface Skill {
    name: string;
    iconPath: string; // Path to PNG image in public folder
    gradient: string;
    color: string;
    category: string;
    level: number;
    description: string;
    accentColor: string;
}

const skills: Skill[] = [
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
        name: 'TypeScript',
        iconPath: '/tsLogo.png',
        gradient: 'from-indigo-400 via-purple-500 to-violet-600',
        color: 'text-indigo-400',
        accentColor: '#6366f1',
        category: 'Frontend',
        level: 90,
        description: 'Superset de JavaScript con tipado estático que mejora la calidad del código y facilita el mantenimiento de proyectos grandes'
    },
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
        name: 'JWT',
        iconPath: '/jwt.png',
        gradient: 'from-purple-400 via-pink-500 to-rose-600',
        color: 'text-purple-400',
        accentColor: '#a855f7',
        category: 'Backend',
        level: 88,
        description: 'Estándar abierto para autenticación y autorización segura mediante tokens JSON firmados digitalmente y verificables.'
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
        name: 'SQL',
        iconPath: '/sql.png',
        gradient: 'from-rose-400 via-red-500 to-pink-600',
        color: 'text-rose-400',
        accentColor: '#fb7185',
        category: 'Database',
        level: 90,
        description: 'Lenguaje estándar para gestión de bases de datos relacionales, consultas complejas y optimización de rendimiento'
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
        gradient: 'from-pink-400 via-rose-500 to-red-600',
        color: 'text-pink-400',
        accentColor: '#f472b6',
        category: 'Full Stack',
        level: 80,
        description: 'Plataforma low-code empresarial para desarrollo rápido de aplicaciones multiplataforma con generación automática de código'
    }
];

const SkillCard: React.FC<{ skill: Skill; index: number }> = ({ skill, index }) => {
    const [isPressed, setIsPressed] = useState(false);
    const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);
    const cardRef = useRef<HTMLDivElement>(null);
    const fadeTimeoutRef = useRef<number | null>(null);

    const handleInteractionStart = (e: React.MouseEvent | React.TouchEvent) => {
        // Clear any pending fade timeout
        if (fadeTimeoutRef.current) {
            clearTimeout(fadeTimeoutRef.current);
            fadeTimeoutRef.current = null;
        }

        setIsPressed(true);

        // Create ripple effect with improved mobile edge handling
        if (cardRef.current) {
            const rect = cardRef.current.getBoundingClientRect();

            // Get touch/click coordinates
            let clientX: number;
            let clientY: number;

            if ('touches' in e) {
                clientX = e.touches[0].clientX;
                clientY = e.touches[0].clientY;
            } else {
                clientX = e.clientX;
                clientY = e.clientY;
            }

            // Calculate position relative to card
            let x = clientX - rect.left;
            let y = clientY - rect.top;

            // Clamp coordinates to card boundaries with padding (mobile optimization)
            // This prevents ripple from starting at extreme edges
            const padding = 10; // 10px padding from edges
            x = Math.max(padding, Math.min(x, rect.width - padding));
            y = Math.max(padding, Math.min(y, rect.height - padding));

            const newRipple = { x, y, id: Date.now() };
            setRipples((prev: Array<{ x: number; y: number; id: number }>) => [...prev, newRipple]);

            // Remove ripple after animation (slower)
            setTimeout(() => {
                setRipples((prev: Array<{ x: number; y: number; id: number }>) => prev.filter((r: { x: number; y: number; id: number }) => r.id !== newRipple.id));
            }, 1400);
        }
    };

    const handleInteractionEnd = () => {
        // Gradual fade out - delay the state reset
        fadeTimeoutRef.current = setTimeout(() => {
            setIsPressed(false);
        }, 400);
    };

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (fadeTimeoutRef.current) {
                clearTimeout(fadeTimeoutRef.current);
            }
        };
    }, []);

    return (
        <article
            ref={cardRef}
            className="relative animate-fade-in-up cursor-pointer select-none"
            style={{
                animationDelay: `${index * 0.08}s`,
                touchAction: 'manipulation', // Optimizes touch interactions on mobile
                WebkitTapHighlightColor: 'transparent', // Removes default mobile tap highlight
            }}
            onMouseDown={handleInteractionStart}
            onMouseUp={handleInteractionEnd}
            onMouseLeave={handleInteractionEnd}
            onTouchStart={handleInteractionStart}
            onTouchEnd={handleInteractionEnd}
            role="button"
            tabIndex={0}
            aria-label={`${skill.name} - ${skill.description}`}
        >
            {/* Outer Glow Border - Enhanced on press */}
            <div
                className="absolute -inset-0.5 rounded-3xl transition-all duration-700 ease-out"
                style={{
                    background: `linear-gradient(135deg, ${skill.accentColor}30, transparent, ${skill.accentColor}20)`,
                    opacity: isPressed ? 0.6 : 0.25,
                    filter: isPressed ? 'blur(8px)' : 'blur(0px)',
                }}
            />

            {/* Main Card Container - Transforms on press */}
            <div
                className="relative bg-slate-900/50 backdrop-blur-xl rounded-3xl p-6 shadow-2xl transition-all duration-600 ease-out"
                style={{
                    borderColor: isPressed ? `${skill.accentColor}50` : `${skill.accentColor}25`,
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    // Enhanced scale for mobile - more pronounced feedback
                    transform: isPressed ? 'scale(0.96)' : 'scale(1)',
                    boxShadow: isPressed
                        ? `0 0 30px ${skill.accentColor}40, 0 20px 25px -5px rgba(0, 0, 0, 0.3)`
                        : '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                    // Prevent overflow of ripple effects
                    overflow: 'hidden',
                }}
            >
                {/* Ripple Effects */}
                {ripples.map((ripple: { x: number; y: number; id: number }) => (
                    <span
                        key={ripple.id}
                        className="absolute rounded-full animate-ripple pointer-events-none"
                        style={{
                            left: ripple.x,
                            top: ripple.y,
                            width: '20px',
                            height: '20px',
                            background: `radial-gradient(circle, ${skill.accentColor}60 0%, transparent 70%)`,
                            transform: 'translate(-50%, -50%)',
                        }}
                    />
                ))}

                {/* Subtle Background Gradient - Enhanced on press */}
                <div
                    className={`absolute inset-0 bg-gradient-to-br ${skill.gradient} rounded-3xl pointer-events-none transition-opacity duration-700 ease-out`}
                    style={{
                        opacity: isPressed ? 0.12 : 0.05,
                    }}
                />

                {/* Animated Shine Effect on Press */}
                {isPressed && (
                    <div
                        className="absolute inset-0 rounded-3xl pointer-events-none animate-shine"
                        style={{
                            background: `linear-gradient(135deg, transparent 0%, ${skill.accentColor}20 50%, transparent 100%)`,
                        }}
                    />
                )}

                {/* Card Content */}
                <div className="relative z-10 space-y-4">
                    {/* Header: Icon and Category Badge */}
                    <header className="flex items-center justify-between">
                        {/* Icon Container - Glows on press */}
                        <div
                            className="p-3 rounded-xl transition-all duration-600 ease-out"
                            style={{
                                backgroundColor: isPressed ? `${skill.accentColor}20` : `${skill.accentColor}12`,
                                borderColor: isPressed ? `${skill.accentColor}40` : `${skill.accentColor}25`,
                                borderWidth: '1px',
                                borderStyle: 'solid',
                                boxShadow: isPressed ? `0 0 20px ${skill.accentColor}30` : 'none',
                            }}
                        >
                            <img
                                src={skill.iconPath}
                                alt={`${skill.name} logo`}
                                className="w-8 h-8 object-contain"
                                style={{
                                    transform: isPressed ? 'scale(1.1)' : 'scale(1)',
                                    filter: isPressed ? `drop-shadow(0 0 8px ${skill.accentColor})` : 'none',
                                    transition: 'transform 0.6s ease-out, filter 0.7s ease-out',
                                }}
                            />
                        </div>

                        {/* Category Badge - Enhanced on press */}
                        <span
                            className={`px-3 py-1 rounded-full text-xs font-bold ${skill.color} transition-all duration-600 ease-out`}
                            style={{
                                backgroundColor: isPressed ? `${skill.accentColor}20` : `${skill.accentColor}12`,
                                borderColor: isPressed ? `${skill.accentColor}40` : `${skill.accentColor}25`,
                                borderWidth: '1px',
                                borderStyle: 'solid',
                                boxShadow: isPressed ? `0 0 15px ${skill.accentColor}25` : 'none',
                            }}
                        >
                            {skill.category}
                        </span>
                    </header>

                    {/* Skill Name - Brightens on press */}
                    <h3
                        className={`text-xl font-bold bg-gradient-to-r ${skill.gradient} bg-clip-text text-transparent`}
                        style={{
                            filter: isPressed ? 'brightness(1.3)' : 'brightness(1)',
                            transition: 'filter 0.7s ease-out',
                        }}
                    >
                        {skill.name}
                    </h3>

                    {/* Description - Lightens on press */}
                    <p
                        className="text-sm leading-relaxed"
                        style={{
                            color: isPressed ? '#cbd5e1' : '#94a3b8',
                            transition: 'color 0.7s ease-out',
                        }}
                    >
                        {skill.description}
                    </p>
                </div>
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
                /* Mobile-specific optimizations */
                @media (hover: none) and (pointer: coarse) {
                    .animate-fade-in-up {
                        -webkit-user-select: none;
                        -webkit-touch-callout: none;
                        -webkit-tap-highlight-color: transparent;
                    }
                }

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
                    animation: fade-in-up 0.7s cubic-bezier(0.4, 0, 0.2, 1) forwards;
                    opacity: 0;
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

                @keyframes ripple {
                    0% {
                        width: 20px;
                        height: 20px;
                        opacity: 1;
                    }
                    100% {
                        width: 350px;
                        height: 350px;
                        opacity: 0;
                    }
                }
                
                .animate-ripple {
                    animation: ripple 1.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
                }

                @keyframes shine {
                    0% {
                        transform: translateX(-100%) translateY(-100%) rotate(30deg);
                        opacity: 0;
                    }
                    50% {
                        opacity: 1;
                    }
                    100% {
                        transform: translateX(100%) translateY(100%) rotate(30deg);
                        opacity: 0;
                    }
                }
                
                .animate-shine {
                    animation: shine 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
                }
            `}</style>

            <section
                ref={sectionRef}
                className="relative min-h-screen py-20 sm:py-24 lg:py-32 overflow-hidden"
                aria-labelledby="skills-heading"
            >
                {/* Ambient Background Orbs */}
                <div
                    className="absolute top-20 left-10 w-[400px] h-[400px] bg-gradient-to-r from-violet-500/6 via-purple-500/4 to-fuchsia-500/6 rounded-full blur-3xl animate-float pointer-events-none"
                    style={{
                        transform: `translate(${mousePosition.x * 0.015}px, ${mousePosition.y * 0.015}px)`,
                    }}
                    aria-hidden="true"
                />
                <div
                    className="absolute top-40 right-20 w-[450px] h-[450px] bg-gradient-to-r from-cyan-500/5 via-blue-500/3 to-indigo-500/5 rounded-full blur-3xl animate-float-reverse pointer-events-none"
                    style={{
                        transform: `translate(${-mousePosition.x * 0.015}px, ${-mousePosition.y * 0.015}px)`,
                    }}
                    aria-hidden="true"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-radial from-transparent via-slate-950/70 to-slate-950/90 pointer-events-none" aria-hidden="true" />

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Section Header */}
                    <header
                        className={`text-center space-y-4 mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                    >
                        {/* Main Title */}
                        <h2 id="skills-heading" className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
                            <span className="block bg-gradient-to-r from-sky-400 via-violet-500 to-pink-500 bg-clip-text text-transparent animate-text-shimmer">
                                Habilidades & Tecnologías
                            </span>
                        </h2>

                        {/* Decorative Divider */}
                        <div className="flex justify-center items-center gap-3" aria-hidden="true">
                            <div className="w-20 h-px bg-gradient-to-r from-transparent via-sky-400/30 to-sky-400" />
                            <div className="relative w-48 h-1 rounded-full overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-sky-500 via-violet-500 to-pink-500 opacity-40" />
                                <div className="absolute inset-0 bg-gradient-to-r from-sky-400 via-violet-400 to-pink-400 animate-shimmer" />
                            </div>
                            <div className="w-20 h-px bg-gradient-to-l from-transparent via-pink-400/30 to-pink-400" />
                        </div>

                        {/* Subtitle */}
                        <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                            Dominio de tecnologías modernas para crear{' '}
                            <span className="bg-gradient-to-r from-sky-400 via-violet-400 to-pink-400 bg-clip-text text-transparent font-bold">
                                soluciones excepcionales
                            </span>
                        </p>
                    </header>

                    {/* Skills Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {skills.map((skill, index) => (
                            <SkillCard key={skill.name} skill={skill} index={index} />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
