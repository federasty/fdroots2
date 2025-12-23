import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { Briefcase, Code, Zap, Cloud, Shield, Database } from 'lucide-react';

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
        description: 'Especialista en análisis de requisitos y modelado de sistemas complejos. Transformo necesidades de negocio en arquitecturas escalables y de alta disponibilidad.',
        icon: Briefcase,
        accentColor: '#8b5cf6',
        delay: 0.1,
    },
    {
        title: 'Ingeniería Full Stack',
        description: 'Dominio transversal en ecosistemas modernos: desde frontends reactivos de alto rendimiento hasta backends resilientes con microservicios.',
        icon: Code,
        accentColor: '#0ea5e9',
        delay: 0.2,
    },
    {
        title: 'Cloud & Infrastructure',
        description: 'Despliegue y optimización en entornos multi-cloud. Implementación experta de pipelines CI/CD y arquitecturas serverless eficientes.',
        icon: Cloud,
        accentColor: '#f43f5e',
        delay: 0.3,
    },
    {
        title: 'Calidad & Seguridad',
        description: 'Compromiso total con el código limpio. Implementación de auditorías de seguridad, estándares OWASP y suites de pruebas automatizadas.',
        icon: Shield,
        accentColor: '#f59e0b',
        delay: 0.4,
    },
    {
        title: 'Estrategia de Datos',
        description: 'Diseño avanzado de modelos SQL/NoSQL. Transformación de grandes volúmenes de datos en insights accionables para el crecimiento del negocio.',
        icon: Database,
        accentColor: '#ec4899',
        delay: 0.5,
    },
    {
        title: 'Liderazgo y Ejecución',
        description: 'Dirección técnica de equipos multidisciplinarios bajo metodologías ágiles. Enfoque en la excelencia operativa y entrega continua de valor.',
        icon: Zap,
        accentColor: '#10b981',
        delay: 0.6,
    },
];

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
            ? `perspective(1200px) rotateX(${-mousePosition.y * 5}deg) rotateY(${mousePosition.x * 5}deg) translateZ(12px)`
            : 'perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0px)',
        [isHovered, mousePosition]
    );

    return (
        <div className="animate-fade-in-up w-full" style={{ animationDelay: `${delay}s` }}>
            <article
                ref={cardRef}
                className="relative h-full p-6 sm:p-7 md:p-8 rounded-2xl transition-all duration-500 ease-out cursor-pointer group will-change-transform"
                style={{
                    backgroundColor: 'rgba(15, 23, 42, 0.3)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: `1px solid ${accentColor}25`,
                    transform: transformStyle,
                    boxShadow: isHovered ? `0 20px 40px -12px ${accentColor}30` : `0 4px 6px -1px rgba(0, 0, 0, 0.1)`,
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => { setIsHovered(false); setMousePosition({ x: 0, y: 0 }); }}
                onMouseMove={handleMouseMove}
            >
                {/* Glow dinámico sutil */}
                <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                        background: `radial-gradient(500px circle at ${mousePosition.x * 50 + 50}% ${mousePosition.y * 50 + 50}%, ${accentColor}12, transparent 70%)`
                    }} />

                <div className="relative z-10 flex flex-col items-start gap-4 sm:gap-5">
                    <div className="p-3 sm:p-3.5 rounded-xl transition-all duration-500 group-hover:scale-105 shrink-0"
                        style={{ backgroundColor: `${accentColor}12`, border: `1px solid ${accentColor}25` }}>
                        <Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" style={{ color: accentColor }} strokeWidth={2.5} />
                    </div>
                    <div className="text-left space-y-2.5 sm:space-y-3">
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-100 group-hover:text-white transition-colors tracking-tight leading-tight">
                            {title}
                        </h3>
                        <p className="text-sm sm:text-base md:text-lg text-slate-400/90 leading-relaxed font-normal">
                            {description}
                        </p>
                    </div>
                </div>

                {/* Subtle corner accents */}
                <div className="absolute top-0 right-0 w-16 h-16 border-t border-r opacity-0 group-hover:opacity-30 rounded-tr-2xl transition-opacity duration-500"
                    style={{ borderColor: accentColor }} />
                <div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l opacity-0 group-hover:opacity-30 rounded-bl-2xl transition-opacity duration-500"
                    style={{ borderColor: accentColor }} />
            </article>
        </div>
    );
};

const About: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    // Scroll al top cuando el componente se monta
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.unobserve(entry.target);
            }
        }, { threshold: 0.1 });

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className="relative min-h-screen overflow-hidden pt-20 sm:pt-24 md:pt-28 pb-16 sm:pb-20 md:pb-24">
            {/* Ambient Background - Ultra Subtle */}
            <div className="absolute pointer-events-none opacity-[0.06] top-0 left-1/4 w-[600px] h-[600px] bg-purple-500/40 rounded-full blur-3xl" />
            <div className="absolute pointer-events-none opacity-[0.05] bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/40 rounded-full blur-3xl" />

            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-transparent to-slate-950/50 pointer-events-none" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
                <header className={`text-center space-y-5 sm:space-y-6 mb-12 sm:mb-16 md:mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                   

                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] px-4">
                        <span style={{
                            background: 'linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 50%, #ec4899 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}>
                            Analista de Sistemas
                        </span>
                        <br />
                        <span className="text-slate-400/80 text-xl sm:text-2xl md:text-3xl font-bold">
                            & Arquitecto de Software
                        </span>
                    </h2>

                    {/* Refined Decorative Line */}
                    <div className="flex justify-center items-center gap-4 mt-4">
                        <div className="w-20 sm:w-32 h-px bg-gradient-to-r from-transparent via-violet-400/40 to-violet-400/60" />
                        <div className="relative w-2 h-2 rounded-full bg-violet-400/60">
                            <div className="absolute inset-0 rounded-full bg-violet-400/40 animate-ping" style={{ animationDuration: '3s' }} />
                        </div>
                        <div className="w-20 sm:w-32 h-px bg-gradient-to-l from-transparent via-violet-400/40 to-violet-400/60" />
                    </div>

                    <p className="text-slate-400/90 max-w-2xl mx-auto text-sm sm:text-base md:text-lg font-medium leading-relaxed px-4">
                        Ingeniería de software de alto impacto. Me especializo en construir{' '}
                        <span className="text-white font-semibold">soluciones robustas</span>{' '}
                        que escalan al ritmo de las necesidades globales.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-7">
                    {highlights.map((highlight) => (
                        <HighlightCard3D key={highlight.title} highlight={highlight} />
                    ))}
                </div>
            </div>

            <style>{`
                @keyframes fade-in-up { 
                    from { opacity: 0; transform: translateY(30px); } 
                    to { opacity: 1; transform: translateY(0); } 
                }
                .animate-fade-in-up { 
                    animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; 
                    opacity: 0; 
                }

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
        </section>
    );
};

export default About;
