import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { Briefcase, Code, Zap } from 'lucide-react';

// --- Tipos y Datos ---
interface Highlight {
    title: string;
    icon: React.ElementType;
    accentColor: string;
    delay: number;
    description: string;
}

interface MousePosition {
    x: number;
    y: number;
}

const highlights: Highlight[] = [
    {
        title: 'Arquitectura de Sistemas',
        description: 'Especialista en análisis de requisitos y modelado de sistemas complejos. Transformo necesidades de negocio en arquitecturas escalables y mantenibles.',
        icon: Briefcase,
        accentColor: '#8b5cf6',
        delay: 0.1,
    },
    {
        title: 'Ingeniería Full Stack',
        description: 'Dominio transversal en ecosistemas modernos: desde frontends de alto rendimiento hasta backends resilientes. Coherencia técnica end-to-end.',
        icon: Code,
        accentColor: '#0ea5e9',
        delay: 0.2,
    },
    {
        title: 'Liderazgo y Ejecución',
        description: 'Experiencia liderando ciclos completos de desarrollo (ideación a producción). Impulso equipos hacia la excelencia y entrega de valor mensurable.',
        icon: Zap,
        accentColor: '#10b981',
        delay: 0.3,
    },
];

// --- Componente de Tarjeta con Efecto 3D ---
const HighlightCard3D: React.FC<{ highlight: Highlight }> = ({ highlight }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
    const rafRef = useRef<number | undefined>(undefined);

    const Icon = highlight.icon;
    const { accentColor, title, description, delay } = highlight;

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (!cardRef.current) return;
        if (rafRef.current) cancelAnimationFrame(rafRef.current);

        rafRef.current = requestAnimationFrame(() => {
            if (!cardRef.current) return;
            const rect = cardRef.current.getBoundingClientRect();
            const x = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
            const y = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
            setMousePosition({ x, y });
        });
    }, []);

    const transformStyle = useMemo(() =>
        isHovered
            ? `perspective(1000px) rotateX(${-mousePosition.y * 5}deg) rotateY(${mousePosition.x * 5}deg) translateZ(10px)`
            : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)',
        [isHovered, mousePosition]
    );

    const glowStyle = useMemo(() =>
        isHovered
            ? `radial-gradient(circle at ${mousePosition.x * 50 + 50}% ${mousePosition.y * 50 + 50}%, ${accentColor}30, transparent 70%)`
            : 'radial-gradient(circle at 50% 50%, transparent, transparent 100%)',
        [isHovered, mousePosition, accentColor]
    );

    return (
        <div className="animate-fade-in-up w-full max-w-3xl mx-auto" style={{ animationDelay: `${delay}s` }}>
            <article
                ref={cardRef}
                className="relative p-6 sm:p-8 rounded-3xl transition-all duration-300 ease-out cursor-pointer select-none group will-change-transform"
                style={{
                    backgroundColor: 'rgba(15, 23, 42, 0.4)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    border: `1px solid ${accentColor}25`,
                    transform: transformStyle,
                    boxShadow: isHovered
                        ? `0 25px 50px -12px ${accentColor}50`
                        : `0 10px 15px -3px rgba(0, 0, 0, 0.1)`,
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => { setIsHovered(false); setMousePosition({ x: 0, y: 0 }); }}
                onMouseMove={handleMouseMove}
            >
                <div className="absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-300"
                    style={{ background: glowStyle, opacity: isHovered ? 1 : 0 }} />

                <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-6">
                    <div className="p-3.5 rounded-2xl transition-all duration-300 group-hover:scale-110"
                        style={{ backgroundColor: `${accentColor}18`, border: `1px solid ${accentColor}40` }}>
                        <Icon className="w-8 h-8" style={{ color: accentColor }} />
                    </div>
                    <div className="text-center sm:text-left">
                        <h3 className="text-xl sm:text-2xl font-black text-slate-100 mb-2">{title}</h3>
                        <p className="text-sm sm:text-lg text-slate-400 leading-relaxed font-light">{description}</p>
                    </div>
                </div>
            </article>
        </div>
    );
};

// --- Componente Principal About ---
const About: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(entry.target); }
        }, { threshold: 0.1 });
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen overflow-hidden"
            style={{
                paddingTop: 'clamp(5rem, 12vw, 10rem)',
                paddingBottom: 'clamp(10rem, 20vw, 15rem)',
            }}
        >
            {/* Ambient Orbs */}
            <div className="absolute pointer-events-none" style={{ top: '5%', left: '10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(139, 92, 246, 0.05) 0%, transparent 70%)', filter: 'blur(80px)', animation: 'float 20s infinite' }} />
            <div className="absolute pointer-events-none" style={{ bottom: '15%', right: '10%', width: '450px', height: '450px', background: 'radial-gradient(circle, rgba(14, 165, 233, 0.04) 0%, transparent 70%)', filter: 'blur(100px)', animation: 'float-reverse 25s infinite' }} />

            <div className="relative max-w-5xl mx-auto px-6 z-10">
                <header className={`text-center space-y-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter">
                        <span style={{
                            background: 'linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 50%, #ec4899 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}>
                            Analista de Sistemas <br /> & Arquitecto de Software
                        </span>
                    </h2>
                    <p className="text-slate-400 max-w-xl mx-auto text-base sm:text-lg font-light leading-relaxed">
                        Ingeniería de software de alto nivel enfocada en escalabilidad,
                        rendimiento y arquitecturas empresariales modernas.
                    </p>
                </header>

                {/* CONTENEDOR DE CARDS - Ajustado el margen superior (mt-24 sm:mt-32) */}
                <div className="mt-24 sm:mt-32 flex flex-col gap-10">
                    {highlights.map((highlight) => (
                        <HighlightCard3D key={highlight.title} highlight={highlight} />
                    ))}
                </div>
            </div>

            <style>{`
                @keyframes float { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(30px, -30px); } }
                @keyframes float-reverse { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(-30px, 30px); } }
                @keyframes fade-in-up { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
                .animate-fade-in-up { animation: fade-in-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
            `}</style>
        </section>
    );
};

export default About;