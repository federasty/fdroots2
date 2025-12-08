import React, { useState, useEffect, useRef } from 'react';
import { Database, Code, Layers, Zap, Terminal, Sparkles, Cpu, Globe } from 'lucide-react';

interface Skill {
    name: string;
    icon: React.FC<any>;
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
        icon: Code,
        gradient: 'from-cyan-400 via-blue-500 to-indigo-600',
        color: 'text-cyan-400',
        accentColor: '#22d3ee',
        category: 'Frontend',
        level: 95,
        description: 'Desarrollo de interfaces modernas y reactivas'
    },
    {
        name: 'TypeScript',
        icon: Terminal,
        gradient: 'from-blue-500 via-indigo-600 to-purple-700',
        color: 'text-blue-500',
        accentColor: '#3b82f6',
        category: 'Frontend',
        level: 90,
        description: 'Tipado estático para código robusto'
    },
    {
        name: 'JavaScript',
        icon: Zap,
        gradient: 'from-yellow-400 via-orange-500 to-red-500',
        color: 'text-yellow-400',
        accentColor: '#facc15',
        category: 'Frontend',
        level: 98,
        description: 'Lenguaje fundamental del desarrollo web'
    },
    {
        name: 'Tailwind CSS',
        icon: Sparkles,
        gradient: 'from-teal-400 via-cyan-500 to-blue-600',
        color: 'text-teal-400',
        accentColor: '#2dd4bf',
        category: 'Frontend',
        level: 92,
        description: 'Diseño utility-first para UI premium'
    },
    {
        name: 'Node.js',
        icon: Globe,
        gradient: 'from-green-400 via-emerald-500 to-teal-600',
        color: 'text-green-400',
        accentColor: '#4ade80',
        category: 'Backend',
        level: 88,
        description: 'Runtime de JavaScript del lado del servidor'
    },
    {
        name: 'C#',
        icon: Cpu,
        gradient: 'from-purple-500 via-violet-600 to-indigo-700',
        color: 'text-purple-500',
        accentColor: '#a855f7',
        category: 'Backend',
        level: 85,
        description: 'Desarrollo de aplicaciones empresariales'
    },
    {
        name: 'MongoDB',
        icon: Database,
        gradient: 'from-green-500 via-emerald-600 to-green-700',
        color: 'text-green-500',
        accentColor: '#22c55e',
        category: 'Database',
        level: 87,
        description: 'Base de datos NoSQL escalable'
    },
    {
        name: 'SQL',
        icon: Database,
        gradient: 'from-orange-500 via-red-500 to-pink-600',
        color: 'text-orange-500',
        accentColor: '#f97316',
        category: 'Database',
        level: 90,
        description: 'Gestión de bases de datos relacionales'
    },
    {
        name: 'GeneXus',
        icon: Layers,
        gradient: 'from-rose-500 via-pink-600 to-fuchsia-700',
        color: 'text-rose-500',
        accentColor: '#f43f5e',
        category: 'Full Stack',
        level: 80,
        description: 'Plataforma de desarrollo low-code'
    }
];

export default function Skills() {
    const [activeSkill, setActiveSkill] = useState<number | null>(null);
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

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
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

    const SkillCard: React.FC<{ skill: Skill; index: number }> = ({ skill, index }) => {
        const [isHovered, setIsHovered] = useState(false);
        const Icon = skill.icon;

        return (
            <div
                onMouseEnter={() => {
                    setIsHovered(true);
                    setActiveSkill(index);
                }}
                onMouseLeave={() => {
                    setIsHovered(false);
                    setActiveSkill(null);
                }}
                className={`relative group animate-fade-in-up`}
                style={{
                    animationDelay: `${index * 0.1}s`,
                }}
            >
                {/* Subtle Permanent Border */}
                <div
                    className="absolute -inset-0.5 rounded-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"
                    style={{
                        background: `linear-gradient(135deg, ${skill.accentColor}40, transparent, ${skill.accentColor}40)`,
                    }}
                />

                {/* Main Card - Simple and Clean */}
                <div
                    className="relative bg-slate-900/60 backdrop-blur-xl rounded-3xl p-6 transition-all duration-500 group-hover:scale-[1.02] shadow-xl"
                    style={{
                        borderColor: `${skill.accentColor}30`,
                        borderWidth: '1px',
                        borderStyle: 'solid',
                    }}
                >
                    {/* Subtle Color Tint */}
                    <div
                        className={`absolute inset-0 bg-gradient-to-br ${skill.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`}
                    />

                    {/* Content */}
                    <div className="relative z-10 space-y-4">
                        {/* Icon and Badge */}
                        <div className="flex items-center justify-between">
                            {/* Icon Container - Simple */}
                            <div
                                className="relative p-3 rounded-xl transition-all duration-500 group-hover:scale-105"
                                style={{
                                    backgroundColor: `${skill.accentColor}15`,
                                    borderColor: `${skill.accentColor}30`,
                                    borderWidth: '1px',
                                    borderStyle: 'solid',
                                }}
                            >
                                <Icon className={`w-8 h-8 ${skill.color} transition-transform duration-500 group-hover:rotate-6`} strokeWidth={2} />
                            </div>

                            {/* Category Badge - Simple */}
                            <div
                                className={`px-3 py-1 rounded-full text-xs font-bold ${skill.color} transition-all duration-500 group-hover:scale-105`}
                                style={{
                                    backgroundColor: `${skill.accentColor}15`,
                                    borderColor: `${skill.accentColor}30`,
                                    borderWidth: '1px',
                                    borderStyle: 'solid',
                                }}
                            >
                                {skill.category}
                            </div>
                        </div>

                        {/* Skill Name */}
                        <h3 className={`text-xl font-bold bg-gradient-to-r ${skill.gradient} bg-clip-text text-transparent transition-transform duration-500 group-hover:scale-105`}>
                            {skill.name}
                        </h3>

                        {/* Description */}
                        <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors duration-500 leading-relaxed">
                            {skill.description}
                        </p>

                        {/* Simple Corner Accents */}
                        <div
                            className="absolute top-2 right-2 w-8 h-8 opacity-20 group-hover:opacity-40 transition-opacity duration-500"
                            style={{
                                borderTop: `1px solid ${skill.accentColor}`,
                                borderRight: `1px solid ${skill.accentColor}`,
                                borderTopRightRadius: '0.75rem',
                            }}
                        />
                        <div
                            className="absolute bottom-2 left-2 w-8 h-8 opacity-20 group-hover:opacity-40 transition-opacity duration-500"
                            style={{
                                borderBottom: `1px solid ${skill.accentColor}`,
                                borderLeft: `1px solid ${skill.accentColor}`,
                                borderBottomLeftRadius: '0.75rem',
                            }}
                        />
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            <style>{`
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up { 
                    animation: fade-in-up 0.6s ease-out forwards;
                    opacity: 1 !important;
                }

                @keyframes text-shimmer {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                .animate-text-shimmer { 
                    animation: text-shimmer 5s ease infinite; 
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
                .animate-float { animation: float 20s ease-in-out infinite; }

                @keyframes float-reverse {
                    0%, 100% { transform: translate(0, 0); }
                    50% { transform: translate(-15px, 15px); }
                }
                .animate-float-reverse { animation: float-reverse 25s ease-in-out infinite; }
            `}</style>

            <section
                ref={sectionRef}
                className="relative min-h-screen py-20 sm:py-24 lg:py-32 overflow-hidden"
            >
                {/* Minimal Background */}

                {/* Subtle Orbs */}
                <div
                    className="absolute top-20 left-10 w-[400px] h-[400px] bg-gradient-to-r from-violet-500/8 via-purple-500/6 to-fuchsia-500/8 rounded-full blur-3xl animate-float"
                    style={{
                        transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
                    }}
                />
                <div
                    className="absolute top-40 right-20 w-[450px] h-[450px] bg-gradient-to-r from-cyan-500/6 via-blue-500/5 to-indigo-500/6 rounded-full blur-3xl animate-float-reverse"
                    style={{
                        transform: `translate(${-mousePosition.x * 0.02}px, ${-mousePosition.y * 0.02}px)`,
                    }}
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-radial from-transparent via-slate-950/70 to-slate-950/90" />

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Section Header */}
                    <div className={`text-center space-y-4 mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

                        {/* Title */}
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
                            <span className="block bg-gradient-to-r from-sky-400 via-violet-500 to-pink-500 bg-clip-text text-transparent animate-text-shimmer">
                                Habilidades & Tecnologías
                            </span>
                        </h2>

                        {/* Simple Line */}
                        <div className="flex justify-center items-center gap-3">
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
                    </div>

                    {/* Skills Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {skills.map((skill, index) => (
                            <SkillCard key={index} skill={skill} index={index} />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
