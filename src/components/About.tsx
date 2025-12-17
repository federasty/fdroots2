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
            ? `perspective(1200px) rotateX(${-mousePosition.y * 7}deg) rotateY(${mousePosition.x * 7}deg) translateZ(20px)`
            : 'perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0px)',
        [isHovered, mousePosition]
    );

    return (
        <div className="animate-fade-in-up w-full" style={{ animationDelay: `${delay}s` }}>
            <article
                ref={cardRef}
                className="relative h-full p-8 sm:p-10 rounded-3xl transition-all duration-500 ease-out cursor-pointer group will-change-transform"
                style={{
                    backgroundColor: 'rgba(15, 23, 42, 0.4)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    border: `1px solid ${accentColor}30`,
                    transform: transformStyle,
                    boxShadow: isHovered ? `0 25px 50px -12px ${accentColor}40` : `none`,
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => { setIsHovered(false); setMousePosition({ x: 0, y: 0 }); }}
                onMouseMove={handleMouseMove}
            >
                {/* Glow dinámico más grande */}
                <div className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ 
                        background: `radial-gradient(600px circle at ${mousePosition.x * 50 + 50}% ${mousePosition.y * 50 + 50}%, ${accentColor}15, transparent 80%)` 
                    }} />

                <div className="relative z-10 flex flex-col items-start gap-6">
                    <div className="p-4 rounded-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shrink-0"
                        style={{ backgroundColor: `${accentColor}15`, border: `1px solid ${accentColor}30` }}>
                        <Icon className="w-8 h-8 md:w-10 md:h-10" style={{ color: accentColor }} />
                    </div>
                    <div className="text-left space-y-3">
                        <h3 className="text-xl sm:text-2xl font-bold text-slate-100 group-hover:text-white transition-colors tracking-tight">
                            {title}
                        </h3>
                        <p className="text-base sm:text-lg text-slate-400 leading-relaxed font-light">
                            {description}
                        </p>
                    </div>
                </div>
            </article>
        </div>
    );
};

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
        <section ref={sectionRef} className="relative min-h-screen overflow-hidden py-20 md:py-32">
            {/* Orbes de fondo más grandes para acompañar el nuevo tamaño */}
            <div className="absolute pointer-events-none opacity-40 top-0 left-1/4 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute pointer-events-none opacity-30 bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px]" />

            <div className="relative max-w-7xl mx-auto px-6 z-10">
                <header className={`text-center space-y-6 mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter leading-tight">
                        <span style={{
                            background: 'linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 50%, #ec4899 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}>
                            Analista de Sistemas <br className="hidden sm:block" /> & Arquitecto de Software
                        </span>
                    </h2>
                    <p className="text-slate-400 max-w-3xl mx-auto text-lg sm:text-xl font-light leading-relaxed">
                        Ingeniería de software de alto impacto. Me especializo en construir soluciones robustas 
                        que escalan al ritmo de las necesidades globales.
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
                    {highlights.map((highlight) => (
                        <HighlightCard3D key={highlight.title} highlight={highlight} />
                    ))}
                </div>
            </div>

            <style>{`
                @keyframes fade-in-up { 
                    from { opacity: 0; transform: translateY(40px); } 
                    to { opacity: 1; transform: translateY(0); } 
                }
                .animate-fade-in-up { animation: fade-in-up 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; opacity: 0; }
            `}</style>
        </section>
    );
};

export default About;