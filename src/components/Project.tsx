import React, { useState, useEffect, useRef } from 'react';

// Interfaces y datos de proyectos (se mantienen iguales)
interface Project {
    id: string;
    title: string;
    description: string;
    longDescription: string;
    category: string;
    technologies: string[];
    imageUrl: string;
    gradient: string;
    accentColor: string;
    githubUrl?: string;
    liveUrl?: string;
    status: 'completed' | 'in-progress' | 'concept';
    year: number;
}

const projects: Project[] = [
    {
        id: '1',
        title: 'E-Commerce Platform',
        description: 'Plataforma de comercio electrónico completa con pagos integrados',
        longDescription: 'Sistema full-stack con React, Node.js, MongoDB y Stripe. Incluye panel de administración, gestión de inventario, analytics en tiempo real y sistema de notificaciones.',
        category: 'Full Stack',
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        imageUrl: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop',
        gradient: 'from-cyan-400 via-blue-500 to-indigo-600',
        accentColor: '#22d3ee',
        githubUrl: 'https://github.com',
        liveUrl: 'https://demo.com',
        status: 'completed',
        year: 2024
    },
    {
        id: '2',
        title: 'AI Task Manager',
        description: 'Gestor de tareas con inteligencia artificial y análisis predictivo',
        longDescription: 'Aplicación que utiliza machine learning para predecir prioridades, sugerir deadlines óptimos y automatizar la organización de tareas basándose en patrones de comportamiento.',
        category: 'AI/ML',
        technologies: ['TypeScript', 'TensorFlow', 'React', 'Python'],
        imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
        gradient: 'from-violet-400 via-purple-500 to-fuchsia-600',
        accentColor: '#a855f7',
        githubUrl: 'https://github.com',
        status: 'in-progress',
        year: 2024
    },
    {
        id: '3',
        title: 'Real-Time Analytics Dashboard',
        description: 'Dashboard empresarial con visualización de datos en tiempo real',
        longDescription: 'Sistema de monitoreo con gráficos interactivos, WebSockets para actualizaciones en vivo, y exportación de reportes. Procesamiento de grandes volúmenes de datos.',
        category: 'Data Viz',
        technologies: ['React', 'D3.js', 'WebSocket', 'PostgreSQL'],
        imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
        gradient: 'from-emerald-400 via-green-500 to-teal-600',
        accentColor: '#10b981',
        githubUrl: 'https://github.com',
        liveUrl: 'https://demo.com',
        status: 'completed',
        year: 2023
    },
    {
        id: '4',
        title: 'Social Media API',
        description: 'API REST escalable para aplicaciones sociales',
        longDescription: 'Backend robusto con autenticación JWT, rate limiting, caching con Redis, y documentación con Swagger. Optimizado para alto tráfico.',
        category: 'Backend',
        technologies: ['Node.js', 'Express', 'MongoDB', 'Redis'],
        imageUrl: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=600&fit=crop',
        gradient: 'from-orange-400 via-red-500 to-rose-600',
        accentColor: '#f97316',
        githubUrl: 'https://github.com',
        status: 'completed',
        year: 2024
    },
    {
        id: '5',
        title: 'Blockchain Wallet',
        description: 'Wallet de criptomonedas con seguridad avanzada',
        longDescription: 'Aplicación de monedero digital con encriptación de extremo a extremo, soporte multi-cadena, historial de transacciones y conversión de divisas en tiempo real.',
        category: 'Blockchain',
        technologies: ['React', 'Web3.js', 'Solidity', 'Ethers'],
        imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop',
        gradient: 'from-amber-400 via-yellow-500 to-orange-500',
        accentColor: '#fbbf24',
        githubUrl: 'https://github.com',
        status: 'concept',
        year: 2024
    },
    {
        id: '6',
        title: 'Cloud Storage System',
        description: 'Sistema de almacenamiento en la nube con encriptación',
        longDescription: 'Plataforma de almacenamiento con chunking de archivos, compresión automática, compartición segura y sincronización multi-dispositivo.',
        category: 'Cloud',
        technologies: ['React', 'AWS', 'Node.js', 'PostgreSQL'],
        imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop',
        gradient: 'from-sky-400 via-blue-500 to-cyan-600',
        accentColor: '#0ea5e9',
        githubUrl: 'https://github.com',
        liveUrl: 'https://demo.com',
        status: 'completed',
        year: 2023
    }
];

// Componentes ProjectCard y ProjectModal (se mantienen iguales)
const ProjectCard: React.FC<{ project: Project; index: number; onExpand: () => void }> = ({ 
    project, 
    index,
    onExpand 
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isPressed, setIsPressed] = useState(false);
    const [particles, setParticles] = useState<Array<{ x: number; y: number; id: number }>>([]);
    const cardRef = useRef<HTMLDivElement>(null);
    const fadeTimeoutRef = useRef<number | null>(null);

    const statusConfig = {
        completed: { label: 'Completado', color: '#10b981', icon: '✓' },
        'in-progress': { label: 'En Desarrollo', color: '#f59e0b', icon: '⟳' },
        concept: { label: 'Concepto', color: '#6366f1', icon: '◆' }
    };

    const handleInteractionStart = (e: React.MouseEvent | React.TouchEvent) => {
        if (fadeTimeoutRef.current) {
            clearTimeout(fadeTimeoutRef.current);
            fadeTimeoutRef.current = null;
        }

        setIsPressed(true);

        if (cardRef.current) {
            const rect = cardRef.current.getBoundingClientRect();
            let clientX: number, clientY: number;

            if ('touches' in e) {
                clientX = e.touches[0].clientX;
                clientY = e.touches[0].clientY;
            } else {
                clientX = e.clientX;
                clientY = e.clientY;
            }

            let x = clientX - rect.left;
            let y = clientY - rect.top;

            const padding = 10;
            x = Math.max(padding, Math.min(x, rect.width - padding));
            y = Math.max(padding, Math.min(y, rect.height - padding));

            const newParticle = { x, y, id: Date.now() };
            setParticles(prev => [...prev, newParticle]);

            setTimeout(() => {
                setParticles(prev => prev.filter(p => p.id !== newParticle.id));
            }, 1400);
        }
    };

    const handleInteractionEnd = () => {
        fadeTimeoutRef.current = setTimeout(() => {
            setIsPressed(false);
        }, 400);
    };

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
            className="relative group animate-fade-in-up cursor-pointer select-none"
            style={{
                animationDelay: `${index * 0.1}s`,
                touchAction: 'manipulation',
                WebkitTapHighlightColor: 'transparent',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                setIsHovered(false);
                handleInteractionEnd();
            }}
            onMouseDown={handleInteractionStart}
            onMouseUp={handleInteractionEnd}
            onTouchStart={handleInteractionStart}
            onTouchEnd={handleInteractionEnd}
            onClick={onExpand}
            role="button"
            tabIndex={0}
            aria-label={`${project.title} - ${project.description}`}
        >
            {/* Outer Glow */}
            <div
                className="absolute -inset-1 rounded-3xl transition-all duration-700"
                style={{
                    background: `linear-gradient(135deg, ${project.accentColor}40, transparent, ${project.accentColor}30)`,
                    opacity: isPressed ? 0.8 : isHovered ? 0.5 : 0.25,
                    filter: isPressed ? 'blur(12px)' : isHovered ? 'blur(8px)' : 'blur(4px)',
                }}
            />

            {/* Main Card */}
            <div
                className="relative bg-slate-900/60 backdrop-blur-2xl rounded-3xl overflow-hidden shadow-2xl transition-all duration-700"
                style={{
                    borderColor: isPressed ? `${project.accentColor}60` : isHovered ? `${project.accentColor}40` : `${project.accentColor}25`,
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    transform: isPressed ? 'scale(0.97) translateY(2px)' : isHovered ? 'scale(1.02) translateY(-4px)' : 'scale(1)',
                    boxShadow: isPressed
                        ? `0 0 40px ${project.accentColor}50, 0 25px 30px -5px rgba(0, 0, 0, 0.4)`
                        : isHovered 
                        ? `0 0 30px ${project.accentColor}40, 0 30px 40px -5px rgba(0, 0, 0, 0.3)`
                        : '0 20px 25px -5px rgba(0, 0, 0, 0.2)',
                }}
            >
                {/* Particles */}
                {particles.map(particle => (
                    <span
                        key={particle.id}
                        className="absolute rounded-full animate-ripple pointer-events-none z-30"
                        style={{
                            left: particle.x,
                            top: particle.y,
                            width: '15px',
                            height: '15px',
                            background: `radial-gradient(circle, ${project.accentColor}80 0%, transparent 70%)`,
                            transform: 'translate(-50%, -50%)',
                        }}
                    />
                ))}

                {/* Shine Effect */}
                {isPressed && (
                    <div
                        className="absolute inset-0 pointer-events-none animate-shine z-20"
                        style={{
                            background: `linear-gradient(135deg, transparent 0%, ${project.accentColor}30 50%, transparent 100%)`,
                        }}
                    />
                )}

                {/* Image Container */}
                <div className="relative h-56 overflow-hidden">
                    {/* Background Gradient */}
                    <div
                        className={`absolute inset-0 bg-gradient-to-br ${project.gradient} transition-opacity duration-700`}
                        style={{
                            opacity: isPressed ? 0.4 : isHovered ? 0.3 : 0.2,
                        }}
                    />

                    {/* Project Image */}
                    <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover transition-all duration-700"
                        style={{
                            transform: isPressed ? 'scale(1.05)' : isHovered ? 'scale(1.1)' : 'scale(1)',
                            filter: isPressed ? 'brightness(0.9)' : isHovered ? 'brightness(0.8)' : 'brightness(0.7)',
                        }}
                    />

                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />

                    {/* Status Badge */}
                    <div
                        className="absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-md transition-all duration-500"
                        style={{
                            backgroundColor: `${statusConfig[project.status].color}20`,
                            borderColor: `${statusConfig[project.status].color}40`,
                            borderWidth: '1px',
                            borderStyle: 'solid',
                            color: statusConfig[project.status].color,
                            boxShadow: isHovered ? `0 0 20px ${statusConfig[project.status].color}30` : 'none',
                        }}
                    >
                        <span className="mr-1">{statusConfig[project.status].icon}</span>
                        {statusConfig[project.status].label}
                    </div>

                    {/* Year Badge */}
                    <div
                        className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-md transition-all duration-500"
                        style={{
                            backgroundColor: `${project.accentColor}15`,
                            borderColor: `${project.accentColor}30`,
                            borderWidth: '1px',
                            borderStyle: 'solid',
                            color: project.accentColor,
                        }}
                    >
                        {project.year}
                    </div>
                </div>

                {/* Content */}
                <div className="relative p-6 space-y-4">
                    {/* Category Badge */}
                    <div
                        className="inline-block px-3 py-1 rounded-lg text-xs font-bold transition-all duration-500"
                        style={{
                            backgroundColor: isPressed ? `${project.accentColor}25` : `${project.accentColor}15`,
                            borderColor: isPressed ? `${project.accentColor}50` : `${project.accentColor}30`,
                            borderWidth: '1px',
                            borderStyle: 'solid',
                            color: project.accentColor,
                            boxShadow: isPressed ? `0 0 15px ${project.accentColor}25` : 'none',
                        }}
                    >
                        {project.category}
                    </div>

                    {/* Title */}
                    <h3
                        className={`text-2xl font-bold bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent transition-all duration-700`}
                        style={{
                            filter: isPressed ? 'brightness(1.4)' : isHovered ? 'brightness(1.2)' : 'brightness(1)',
                        }}
                    >
                        {project.title}
                    </h3>

                    {/* Description */}
                    <p
                        className="text-sm leading-relaxed transition-colors duration-700"
                        style={{
                            color: isPressed ? '#e2e8f0' : isHovered ? '#cbd5e1' : '#94a3b8',
                        }}
                    >
                        {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, i) => (
                            <span
                                key={i}
                                className="px-2.5 py-1 rounded-md text-xs font-medium transition-all duration-500"
                                style={{
                                    backgroundColor: isHovered ? `${project.accentColor}20` : `${project.accentColor}12`,
                                    borderColor: `${project.accentColor}25`,
                                    borderWidth: '1px',
                                    borderStyle: 'solid',
                                    color: '#cbd5e1',
                                }}
                            >
                                {tech}
                            </span>
                        ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-2">
                        {project.githubUrl && (
                            <a
                                href={project.githubUrl}
                                onClick={(e) => e.stopPropagation()}
                                className="flex-1 py-2.5 rounded-xl text-sm font-bold text-center transition-all duration-500"
                                style={{
                                    backgroundColor: isHovered ? `${project.accentColor}20` : `${project.accentColor}12`,
                                    borderColor: `${project.accentColor}40`,
                                    borderWidth: '1px',
                                    borderStyle: 'solid',
                                    color: project.accentColor,
                                }}
                            >
                                GitHub →
                            </a>
                        )}
                        {project.liveUrl && (
                            <a
                                href={project.liveUrl}
                                onClick={(e) => e.stopPropagation()}
                                className="flex-1 py-2.5 rounded-xl text-sm font-bold text-center transition-all duration-500"
                                style={{
                                    backgroundColor: project.accentColor,
                                    color: '#0f172a',
                                    boxShadow: isHovered ? `0 0 20px ${project.accentColor}40` : 'none',
                                }}
                            >
                                Ver Demo →
                            </a>
                        )}
                    </div>
                </div>

                {/* Hover Scan Line */}
                {isHovered && (
                    <div
                        className="absolute inset-x-0 h-px pointer-events-none animate-scan"
                        style={{
                            background: `linear-gradient(90deg, transparent, ${project.accentColor}60, transparent)`,
                            boxShadow: `0 0 10px ${project.accentColor}40`,
                        }}
                    />
                )}
            </div>
        </article>
    );
};

const ProjectModal: React.FC<{ project: Project; onClose: () => void }> = ({ project, onClose }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setTimeout(() => setIsVisible(true), 10);
    }, []);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
            onClick={onClose}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl" />

            {/* Modal */}
            <div
                className={`relative max-w-4xl w-full bg-slate-900/90 backdrop-blur-2xl rounded-3xl overflow-hidden transition-all duration-700 ${
                    isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
                style={{
                    borderColor: `${project.accentColor}40`,
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    boxShadow: `0 0 60px ${project.accentColor}30`,
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold transition-all duration-300 hover:rotate-90"
                    style={{
                        backgroundColor: `${project.accentColor}20`,
                        borderColor: `${project.accentColor}40`,
                        borderWidth: '1px',
                        borderStyle: 'solid',
                        color: 'white',
                    }}
                >
                    ✕
                </button>

                {/* Image */}
                <div className="relative h-80 overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-30`} />
                    <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        style={{ filter: 'brightness(0.7)' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-8 space-y-6">
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <span
                                className="px-3 py-1 rounded-lg text-xs font-bold"
                                style={{
                                    backgroundColor: `${project.accentColor}20`,
                                    borderColor: `${project.accentColor}40`,
                                    borderWidth: '1px',
                                    borderStyle: 'solid',
                                    color: project.accentColor,
                                }}
                            >
                                {project.category}
                            </span>
                            <span className="text-slate-500 text-sm">{project.year}</span>
                        </div>

                        <h2
                            className={`text-4xl font-bold bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}
                        >
                            {project.title}
                        </h2>
                    </div>

                    <p className="text-slate-300 leading-relaxed text-lg">
                        {project.longDescription}
                    </p>

                    <div>
                        <h3 className="text-sm font-bold text-slate-400 mb-3">TECNOLOGÍAS UTILIZADAS</h3>
                        <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech, i) => (
                                <span
                                    key={i}
                                    className="px-4 py-2 rounded-lg text-sm font-medium"
                                    style={{
                                        backgroundColor: `${project.accentColor}15`,
                                        borderColor: `${project.accentColor}30`,
                                        borderWidth: '1px',
                                        borderStyle: 'solid',
                                        color: '#e2e8f0',
                                    }}
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                        {project.githubUrl && (
                            <a
                                href={project.githubUrl}
                                className="flex-1 py-3 rounded-xl text-center font-bold transition-all duration-300"
                                style={{
                                    backgroundColor: `${project.accentColor}20`,
                                    borderColor: `${project.accentColor}40`,
                                    borderWidth: '1px',
                                    borderStyle: 'solid',
                                    color: project.accentColor,
                                }}
                            >
                                Ver en GitHub →
                            </a>
                        )}
                        {project.liveUrl && (
                            <a
                                href={project.liveUrl}
                                className="flex-1 py-3 rounded-xl text-center font-bold transition-all duration-300"
                                style={{
                                    backgroundColor: project.accentColor,
                                    color: '#0f172a',
                                    boxShadow: `0 0 20px ${project.accentColor}40`,
                                }}
                            >
                                Ver Demo en Vivo →
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Componente Projects (terminado)
export default function Projects() {
    const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
    const [isVisible, setIsVisible] = useState(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [filter, setFilter] = useState<string>('all');
    const sectionRef = useRef<HTMLDivElement>(null);

    const categories = ['all', ...Array.from(new Set(projects.map(p => p.category)))];
    const filteredProjects = filter === 'all' 
        ? projects 
        : projects.filter(p => p.category === filter);

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
                @media (hover: none) and (pointer: coarse) {
                    .animate-fade-in-up {
                        -webkit-user-select: none;
                        -webkit-touch-callout: none;
                        -webkit-tap-highlight-color: transparent;
                    }
                }

                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                .animate-fade-in { 
                    animation: fade-in 0.3s ease-out forwards;
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
                    50% { transform: translate(20px, -20px); }
                }
                
                .animate-float { 
                    animation: float 25s ease-in-out infinite; 
                }

                @keyframes float-reverse {
                    0%, 100% { transform: translate(0, 0); }
                    50% { transform: translate(-20px, 20px); }
                }
                
                .animate-float-reverse { 
                    animation: float-reverse 30s ease-in-out infinite; 
                }

                @keyframes ripple {
                    0% {
                        width: 15px;
                        height: 15px;
                        opacity: 1;
                    }
                    100% {
                        width: 400px;
                        height: 400px;
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

                @keyframes scan {
                    0% {
                        top: 0%;
                        opacity: 0;
                    }
                    50% {
                        opacity: 1;
                    }
                    100% {
                        top: 100%;
                        opacity: 0;
                    }
                }
                
                .animate-scan {
                    animation: scan 2s ease-in-out infinite;
                }

                @keyframes pulse-glow {
                    0%, 100% {
                        opacity: 0.5;
                        filter: blur(20px);
                    }
                    50% {
                        opacity: 0.8;
                        filter: blur(25px);
                    }
                }
                
                .animate-pulse-glow {
                    animation: pulse-glow 5s ease-in-out infinite;
                }
            `}</style>
            
            <section 
                ref={sectionRef}
                id="projects" 
                className="py-16 md:py-24 relative overflow-hidden bg-slate-950 min-h-screen"
                style={{
                    perspective: '1000px',
                    backgroundColor: '#0f172a',
                }}
            >
                {/* Background Blob/Mouse Trail */}
                <div
                    className={`absolute inset-0 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                    style={{
                        background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(51, 65, 85, 0.15) 0%, rgba(15, 23, 42, 0.9) 60%)`,
                        pointerEvents: 'none',
                    }}
                />

                {/* Main Content Container */}
                <div className="container mx-auto px-4 max-w-7xl relative z-10">
                    <header className="mb-16 text-center">
                        <h1 
                            className="text-6xl md:text-8xl font-extrabold tracking-tight mb-4 animate-text-shimmer"
                            style={{
                                background: 'linear-gradient(90deg, #64748b, #cbd5e1, #64748b)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            Mis Proyectos
                        </h1>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
                            Explora una colección de proyectos full-stack, de IA y visualización de datos.
                        </p>
                    </header>

                    {/* Filter Bar */}
                    <div className="flex flex-wrap justify-center gap-3 mb-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 backdrop-blur-sm ${
                                    filter === cat
                                        ? 'bg-blue-600/90 text-white shadow-lg shadow-blue-500/30 ring-2 ring-blue-500'
                                        : 'bg-slate-800/60 text-slate-300 hover:bg-slate-700/70 hover:text-white'
                                }`}
                            >
                                {cat === 'all' ? 'Todos' : cat}
                            </button>
                        ))}
                    </div>

                    {/* Project Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProjects.map((project, index) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                index={index}
                                onExpand={() => setSelectedProject(project)}
                            />
                        ))}
                        {filteredProjects.length === 0 && (
                            <div className="md:col-span-2 lg:col-span-3 text-center py-10">
                                <p className="text-slate-500 text-lg">No hay proyectos en esta categoría.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {selectedProject && (
                <ProjectModal 
                    project={selectedProject} 
                    onClose={() => setSelectedProject(null)} 
                />
            )}
        </>
    );
}