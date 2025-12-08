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
    particles: number;
}

const skills: Skill[] = [
    {
        name: 'React',
        icon: Code,
        gradient: 'from-cyan-400 via-blue-500 to-indigo-600',
        color: 'text-cyan-400',
        category: 'Frontend',
        level: 95,
        description: 'Desarrollo de interfaces modernas y reactivas',
        particles: 8
    },
    {
        name: 'TypeScript',
        icon: Terminal,
        gradient: 'from-blue-400 via-indigo-500 to-purple-600',
        color: 'text-blue-400',
        category: 'Frontend',
        level: 90,
        description: 'Tipado estático para código robusto',
        particles: 7
    },
    {
        name: 'JavaScript',
        icon: Zap,
        gradient: 'from-yellow-400 via-amber-500 to-orange-600',
        color: 'text-yellow-400',
        category: 'Frontend',
        level: 98,
        description: 'Lenguaje fundamental del desarrollo web',
        particles: 9
    },
    {
        name: 'Tailwind CSS',
        icon: Sparkles,
        gradient: 'from-sky-400 via-cyan-500 to-teal-600',
        color: 'text-sky-400',
        category: 'Frontend',
        level: 92,
        description: 'Diseño utility-first para UI premium',
        particles: 7
    },
    {
        name: 'Node.js',
        icon: Globe,
        gradient: 'from-green-400 via-emerald-500 to-teal-600',
        color: 'text-green-400',
        category: 'Backend',
        level: 88,
        description: 'Runtime de JavaScript del lado del servidor',
        particles: 7
    },
    {
        name: 'C#',
        icon: Cpu,
        gradient: 'from-purple-400 via-violet-500 to-indigo-600',
        color: 'text-purple-400',
        category: 'Backend',
        level: 85,
        description: 'Desarrollo de aplicaciones empresariales',
        particles: 6
    },
    {
        name: 'MongoDB',
        icon: Database,
        gradient: 'from-green-500 via-emerald-600 to-green-700',
        color: 'text-green-500',
        category: 'Database',
        level: 87,
        description: 'Base de datos NoSQL escalable',
        particles: 8
    },
    {
        name: 'SQL',
        icon: Database,
        gradient: 'from-orange-400 via-red-500 to-pink-600',
        color: 'text-orange-400',
        category: 'Database',
        level: 90,
        description: 'Gestión de bases de datos relacionales',
        particles: 7
    },
    {
        name: 'GeneXus',
        icon: Layers,
        gradient: 'from-red-400 via-rose-500 to-pink-600',
        color: 'text-red-400',
        category: 'Full Stack',
        level: 80,
        description: 'Plataforma de desarrollo low-code',
        particles: 6
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
        const [cardPosition, setCardPosition] = useState({ x: 0, y: 0 });
        const Icon = skill.icon;
        const cardRef = useRef<HTMLDivElement>(null);

        const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
            if (!cardRef.current) return;
            const rect = cardRef.current.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width - 0.5) * 15;
            const y = ((e.clientY - rect.top) / rect.height - 0.5) * 15;
            setCardPosition({ x, y });
        };

        return (
            <div
                ref={cardRef}
                onMouseEnter={() => {
                    setIsHovered(true);
                    setActiveSkill(index);
                }}
                onMouseLeave={() => {
                    setIsHovered(false);
                    setActiveSkill(null);
                    setCardPosition({ x: 0, y: 0 });
                }}
                onMouseMove={handleMouseMove}
                className={`relative group animate-fade-in-up-smooth`}
                style={{
                    animationDelay: `${index * 0.1}s`,
                    transform: `perspective(1000px) rotateX(${-cardPosition.y}deg) rotateY(${cardPosition.x}deg)`,
                    transition: 'transform 0.3s ease-out',
                }}
            >
                {/* Subtle Glow Effect - Elegant */}
                <div className={`absolute -inset-1 bg-gradient-to-r ${skill.gradient} rounded-3xl blur-2xl opacity-0 group-hover:opacity-20 transition-all duration-700`} />

                {/* Soft Border Highlight */}
                <div className={`absolute -inset-0.5 rounded-3xl opacity-0 group-hover:opacity-25 transition-opacity duration-700`}
                    style={{
                        background: `linear-gradient(135deg, transparent 0%, ${skill.color.replace('text-', '')} 50%, transparent 100%)`,
                    }}
                />

                {/* Main Card with Advanced Glassmorphism */}
                <div className="relative glass-premium rounded-3xl p-7 transition-all duration-700 border border-white/25 hover:border-white/40 overflow-hidden group-hover:scale-[1.01] shadow-2xl hover:shadow-mega">

                    {/* Ripple Effect on Hover - Subtle */}
                    {isHovered && (
                        <div className="absolute inset-0 rounded-3xl animate-ripple-effect">
                            <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${skill.gradient} opacity-10`} />
                        </div>
                    )}

                    {/* Floating Particles - Reduced */}
                    {isHovered && Array.from({ length: skill.particles }).map((_, i) => {
                        const randomX = Math.random() * 100;
                        const randomY = Math.random() * 100;
                        const randomDelay = Math.random() * 1;
                        const randomDuration = 2 + Math.random() * 3;
                        const randomSize = 0.8 + Math.random() * 1.5;

                        return (
                            <div
                                key={i}
                                className={`absolute rounded-full bg-gradient-to-r ${skill.gradient} animate-particle-explosion`}
                                style={{
                                    left: `${randomX}%`,
                                    top: `${randomY}%`,
                                    width: `${randomSize}px`,
                                    height: `${randomSize}px`,
                                    animationDelay: `${randomDelay}s`,
                                    animationDuration: `${randomDuration}s`,
                                    boxShadow: `0 0 ${randomSize * 3}px currentColor`,
                                }}
                            />
                        );
                    })}

                    {/* Gradient Mesh Overlay - Subtle */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${skill.gradient} opacity-0 group-hover:opacity-[0.08] transition-opacity duration-700 rounded-3xl mix-blend-overlay`} />

                    {/* Holographic Shine Sweep - Subtle */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1200 skew-x-12" />

                    {/* Content */}
                    <div className="relative z-10 space-y-5">
                        {/* Icon Section with Energy Field */}
                        <div className="flex items-center justify-between">
                            <div className="relative">
                                {/* Icon Energy Field - Subtle */}
                                <div className={`absolute -inset-2 bg-gradient-to-r ${skill.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-15 transition-opacity duration-700`} />

                                {/* Icon Container */}
                                <div className={`relative p-4 rounded-2xl bg-gradient-to-br ${skill.gradient} bg-opacity-12 group-hover:scale-110 transition-all duration-700 shadow-xl border border-white/15 group-hover:border-white/30`}>
                                    <Icon className={`w-9 h-9 ${skill.color} drop-shadow-lg transition-all duration-700 animate-icon-float`} strokeWidth={2.5} />
                                </div>
                            </div>

                            {/* Category Badge - Elegant */}
                            <div className="relative">
                                <div className={`absolute inset-0 bg-gradient-to-r ${skill.gradient} blur-md opacity-0 group-hover:opacity-20 rounded-full transition-opacity duration-500`} />
                                <div className={`relative px-4 py-1.5 rounded-full glass-elite text-xs font-bold ${skill.color} border border-white/20 group-hover:border-white/35 transition-all duration-500 shadow-md group-hover:scale-105`}>
                                    {skill.category}
                                </div>
                            </div>
                        </div>

                        {/* Skill Name - Elegant */}
                        <div className="relative">
                            <h3 className={`text-2xl font-black bg-gradient-to-r ${skill.gradient} bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-500 inline-block`}>
                                {skill.name}
                            </h3>
                            {isHovered && (
                                <div className={`absolute -inset-2 bg-gradient-to-r ${skill.gradient} blur-lg opacity-12 -z-10`} />
                            )}
                        </div>

                        {/* Description with Enhanced Typography */}
                        <p className="text-sm text-slate-400 group-hover:text-slate-200 transition-colors duration-500 font-semibold leading-relaxed tracking-wide">
                            {skill.description}
                        </p>

                        {/* Decorative Corner Accents - Subtle */}
                        <div className={`absolute top-3 right-3 w-12 h-12 border-t border-r rounded-tr-3xl opacity-0 group-hover:opacity-25 transition-all duration-700 ${skill.color}`} />
                        <div className={`absolute bottom-3 left-3 w-12 h-12 border-b border-l rounded-bl-3xl opacity-0 group-hover:opacity-25 transition-all duration-700 ${skill.color}`} />
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            <style>{`
                @keyframes fade-in-up-smooth {
                    from { opacity: 0; transform: translateY(50px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up-smooth { animation: fade-in-up-smooth 0.8s ease-out forwards; }

                @keyframes icon-float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-6px) rotate(3deg); }
                }
                .animate-icon-float { animation: icon-float 3s ease-in-out infinite; }

                @keyframes particle-explosion {
                    0% { 
                        transform: translate(0, 0) scale(0); 
                        opacity: 0; 
                    }
                    20% { opacity: 0.8; }
                    100% { 
                        transform: translate(
                            calc((var(--random-x, 0.5) - 0.5) * 150px),
                            calc((var(--random-y, 0.5) - 0.5) * 150px)
                        ) scale(1.2); 
                        opacity: 0; 
                    }
                }
                .animate-particle-explosion { 
                    animation: particle-explosion 3s ease-out infinite; 
                }

                @keyframes text-shimmer-premium {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                .animate-text-shimmer-premium { 
                    animation: text-shimmer-premium 5s ease infinite; 
                    background-size: 200% auto; 
                }

                @keyframes shimmer-elite {
                    0% { background-position: -200% center; }
                    100% { background-position: 200% center; }
                }
                .animate-shimmer-elite { 
                    animation: shimmer-elite 2s linear infinite; 
                    background-size: 200% 100%; 
                }

                @keyframes ripple-effect {
                    0% { transform: scale(0.9); opacity: 0.6; }
                    100% { transform: scale(1.4); opacity: 0; }
                }
                .animate-ripple-effect { animation: ripple-effect 1.2s ease-out; }

                @keyframes wave-float {
                    0%, 100% { transform: translate(0, 0) rotate(0deg); }
                    33% { transform: translate(30px, -30px) rotate(120deg); }
                    66% { transform: translate(-30px, 30px) rotate(240deg); }
                }
                .animate-wave-float { animation: wave-float 20s ease-in-out infinite; }

                @keyframes wave-float-reverse {
                    0%, 100% { transform: translate(0, 0) rotate(0deg); }
                    33% { transform: translate(-40px, 40px) rotate(-120deg); }
                    66% { transform: translate(40px, -40px) rotate(-240deg); }
                }
                .animate-wave-float-reverse { animation: wave-float-reverse 25s ease-in-out infinite; }

                @keyframes orb-pulse {
                    0%, 100% { transform: scale(1); opacity: 0.25; }
                    50% { transform: scale(1.15); opacity: 0.4; }
                }
                .animate-orb-pulse { animation: orb-pulse 8s ease-in-out infinite; }

                .glass-elite {
                    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
                    backdrop-filter: blur(30px) saturate(180%);
                    -webkit-backdrop-filter: blur(30px) saturate(180%);
                }

                .glass-premium {
                    background: linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.06) 100%);
                    backdrop-filter: blur(40px) saturate(200%);
                    -webkit-backdrop-filter: blur(40px) saturate(200%);
                }

                .shadow-mega {
                    box-shadow: 
                        0 20px 60px -15px rgba(0, 0, 0, 0.4),
                        0 0 30px rgba(139, 92, 246, 0.15),
                        inset 0 1px 0 rgba(255, 255, 255, 0.15);
                }
            `}</style>

            <section
                ref={sectionRef}
                className="relative min-h-screen py-20 sm:py-24 lg:py-32 overflow-hidden"
            >
                {/* Premium Animated Background */}

                {/* Floating Gradient Orbs - Subtle */}
                <div
                    className="absolute top-20 left-10 w-[500px] h-[500px] bg-gradient-to-r from-violet-500/20 via-purple-500/15 to-fuchsia-500/20 rounded-full blur-3xl animate-wave-float animate-orb-pulse"
                    style={{
                        transform: `translate(${mousePosition.x * 0.06}px, ${mousePosition.y * 0.06}px)`,
                    }}
                />
                <div
                    className="absolute top-40 right-20 w-[600px] h-[600px] bg-gradient-to-r from-cyan-500/18 via-blue-500/15 to-indigo-500/18 rounded-full blur-3xl animate-wave-float-reverse animate-orb-pulse"
                    style={{
                        transform: `translate(${-mousePosition.x * 0.05}px, ${-mousePosition.y * 0.05}px)`,
                        animationDelay: '2s',
                    }}
                />
                <div
                    className="absolute bottom-20 left-1/3 w-[550px] h-[550px] bg-gradient-to-r from-pink-500/15 via-rose-500/12 to-red-500/15 rounded-full blur-3xl animate-wave-float animate-orb-pulse"
                    style={{
                        transform: `translate(${mousePosition.x * 0.03}px, ${-mousePosition.y * 0.03}px)`,
                        animationDelay: '4s',
                    }}
                />

                {/* Ambient Light Waves - Subtle */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-violet-400/40 to-transparent" />
                    <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
                </div>

                {/* Radial Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-radial from-transparent via-slate-950/40 to-slate-950/70" />

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Section Header */}
                    <div className={`text-center space-y-6 mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

                        {/* Title */}
                        <div className="space-y-4">
                            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight">
                                <span className="block bg-gradient-to-r from-sky-400 via-violet-500 to-pink-500 bg-clip-text text-transparent animate-text-shimmer-premium">
                                    Habilidades & Tecnologías
                                </span>
                            </h2>

                            {/* Decorative Line - Enhanced */}
                            <div className="flex justify-center items-center gap-4">
                                <div className="w-32 h-px bg-gradient-to-r from-transparent via-sky-400/50 to-sky-400 shadow-md shadow-sky-400/30" />
                                <div className="relative w-72 h-1.5 rounded-full overflow-hidden shadow-xl">
                                    <div className="absolute inset-0 bg-gradient-to-r from-sky-500 via-violet-500 to-pink-500 opacity-60" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-sky-400 via-violet-400 to-pink-400 animate-shimmer-elite" />
                                </div>
                                <div className="w-32 h-px bg-gradient-to-l from-transparent via-pink-400/50 to-pink-400 shadow-md shadow-pink-400/30" />
                            </div>
                        </div>

                        {/* Subtitle */}
                        <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto font-semibold leading-relaxed">
                            Dominio de tecnologías modernas para crear{' '}
                            <span className="bg-gradient-to-r from-sky-400 via-violet-400 to-pink-400 bg-clip-text text-transparent font-black">
                                soluciones excepcionales
                            </span>
                            {' '}con código de alta calidad
                        </p>
                    </div>

                    {/* Skills Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                        {skills.map((skill, index) => (
                            <SkillCard key={index} skill={skill} index={index} />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
