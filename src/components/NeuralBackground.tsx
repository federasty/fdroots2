import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';

interface NeuralBackgroundProps {
    children: ReactNode;
    intensity?: 'low' | 'medium' | 'high';
    particleCount?: number;
    connectionDistance?: number;
}

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    color: string;
    opacity: number;
    depth: number; // Para efecto parallax
    pulsePhase: number;
    trail: Array<{ x: number; y: number; opacity: number }>;
}

interface EnergyOrb {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    color: string;
    pulseSpeed: number;
    pulsePhase: number;
    glowIntensity: number;
}

interface EnergyWave {
    x: number;
    y: number;
    radius: number;
    maxRadius: number;
    opacity: number;
    color: string;
}

export default function NeuralBackground({
    children,
    intensity = 'medium',
    particleCount,
    connectionDistance
}: NeuralBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: 0, y: 0, active: false });
    const [isLoaded, setIsLoaded] = useState(false);

    // Configuración basada en intensidad
    const config = {
        low: { particles: 100, distance: 200, opacity: 0.35, orbs: 3 },
        medium: { particles: 150, distance: 250, opacity: 0.45, orbs: 5 },
        high: { particles: 220, distance: 300, opacity: 0.55, orbs: 8 }
    }[intensity];

    const finalParticleCount = particleCount || config.particles;
    const finalDistance = connectionDistance || config.distance;

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d', { alpha: true });
        if (!ctx) return;

        const updateCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = document.documentElement.scrollHeight;
        };

        updateCanvasSize();

        const particles: Particle[] = [];
        const energyOrbs: EnergyOrb[] = [];
        const energyWaves: EnergyWave[] = [];

        const colors = [
            { base: 'rgba(56, 189, 248, ', rgb: [56, 189, 248] },      // sky-400
            { base: 'rgba(139, 92, 246, ', rgb: [139, 92, 246] },      // violet-500
            { base: 'rgba(236, 72, 153, ', rgb: [236, 72, 153] },      // pink-500
            { base: 'rgba(34, 211, 238, ', rgb: [34, 211, 238] },      // cyan-400
            { base: 'rgba(251, 146, 60, ', rgb: [251, 146, 60] },      // orange-400
            { base: 'rgba(16, 185, 129, ', rgb: [16, 185, 129] },      // emerald-500
            { base: 'rgba(168, 85, 247, ', rgb: [168, 85, 247] },      // purple-500
            { base: 'rgba(59, 130, 246, ', rgb: [59, 130, 246] },      // blue-500
        ];

        // Inicializar partículas con trails
        for (let i = 0; i < finalParticleCount; i++) {
            const colorData = colors[Math.floor(Math.random() * colors.length)];
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 1.5,
                vy: (Math.random() - 0.5) * 1.5,
                size: Math.random() * 3.5 + 1.5,
                color: colorData.base,
                opacity: Math.random() * 0.3 + 0.2,
                depth: Math.random() * 0.6 + 0.4, // 0.4 a 1.0 para parallax
                pulsePhase: Math.random() * Math.PI * 2,
                trail: []
            });
        }

        // Inicializar orbes de energía (nodos principales)
        for (let i = 0; i < config.orbs; i++) {
            const colorData = colors[Math.floor(Math.random() * colors.length)];
            energyOrbs.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 15 + 20,
                color: colorData.base,
                pulseSpeed: Math.random() * 0.02 + 0.01,
                pulsePhase: Math.random() * Math.PI * 2,
                glowIntensity: Math.random() * 0.3 + 0.5
            });
        }

        let animationId: number;
        let scrollY = window.scrollY;
        let time = 0;

        const handleScroll = () => {
            scrollY = window.scrollY;
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = {
                x: e.clientX,
                y: e.clientY + scrollY,
                active: true
            };
        };

        const handleMouseLeave = () => {
            mouseRef.current.active = false;
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);

        // Función para crear ondas de energía
        const createEnergyWave = (x: number, y: number, color: string) => {
            energyWaves.push({
                x,
                y,
                radius: 0,
                maxRadius: Math.random() * 80 + 60,
                opacity: 0.4,
                color
            });
        };

        const animate = () => {
            time += 0.01;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Offset para seguir el scroll
            ctx.save();
            ctx.translate(0, -scrollY);

            // ===== CAPA 1: ONDAS DE ENERGÍA =====
            energyWaves.forEach((wave, index) => {
                wave.radius += 2;
                wave.opacity -= 0.008;

                if (wave.opacity <= 0) {
                    energyWaves.splice(index, 1);
                    return;
                }

                ctx.beginPath();
                ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
                ctx.strokeStyle = wave.color + wave.opacity + ')';
                ctx.lineWidth = 2;
                ctx.stroke();

                // Onda interna
                ctx.beginPath();
                ctx.arc(wave.x, wave.y, wave.radius * 0.7, 0, Math.PI * 2);
                ctx.strokeStyle = wave.color + (wave.opacity * 0.5) + ')';
                ctx.lineWidth = 1;
                ctx.stroke();
            });

            // ===== CAPA 2: ORBES DE ENERGÍA (NODOS PRINCIPALES) =====
            energyOrbs.forEach((orb, i) => {
                orb.x += orb.vx;
                orb.y += orb.vy;
                orb.pulsePhase += orb.pulseSpeed;

                // Bounce en los bordes
                if (orb.x < 0 || orb.x > canvas.width) orb.vx *= -1;
                if (orb.y < 0 || orb.y > canvas.height) orb.vy *= -1;

                const pulseFactor = Math.sin(orb.pulsePhase) * 0.3 + 1;
                const currentRadius = orb.radius * pulseFactor;

                // Interacción con mouse
                if (mouseRef.current.active) {
                    const dx = mouseRef.current.x - orb.x;
                    const dy = mouseRef.current.y - orb.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 200) {
                        const force = (200 - dist) / 200;
                        orb.x -= (dx / dist) * force * 2;
                        orb.y -= (dy / dist) * force * 2;
                    }
                }

                // Aura externa (múltiples capas)
                for (let layer = 4; layer > 0; layer--) {
                    const layerRadius = currentRadius * (1 + layer * 0.4);
                    const gradient = ctx.createRadialGradient(orb.x, orb.y, currentRadius, orb.x, orb.y, layerRadius);
                    gradient.addColorStop(0, orb.color + (orb.glowIntensity * 0.15 / layer) + ')');
                    gradient.addColorStop(0.5, orb.color + (orb.glowIntensity * 0.08 / layer) + ')');
                    gradient.addColorStop(1, orb.color + '0)');

                    ctx.beginPath();
                    ctx.arc(orb.x, orb.y, layerRadius, 0, Math.PI * 2);
                    ctx.fillStyle = gradient;
                    ctx.fill();
                }

                // Núcleo brillante
                const coreGradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, currentRadius);
                coreGradient.addColorStop(0, orb.color + '0.9)');
                coreGradient.addColorStop(0.4, orb.color + '0.6)');
                coreGradient.addColorStop(0.7, orb.color + '0.3)');
                coreGradient.addColorStop(1, orb.color + '0)');

                ctx.beginPath();
                ctx.arc(orb.x, orb.y, currentRadius, 0, Math.PI * 2);
                ctx.fillStyle = coreGradient;
                ctx.fill();

                // Anillo de energía rotatorio
                ctx.save();
                ctx.translate(orb.x, orb.y);
                ctx.rotate(time * 0.5);

                for (let j = 0; j < 6; j++) {
                    const angle = (Math.PI * 2 / 6) * j;
                    const ringX = Math.cos(angle) * currentRadius * 1.3;
                    const ringY = Math.sin(angle) * currentRadius * 1.3;

                    ctx.beginPath();
                    ctx.arc(ringX, ringY, 3, 0, Math.PI * 2);
                    ctx.fillStyle = orb.color + '0.6)';
                    ctx.fill();
                }
                ctx.restore();

                // Rayos de energía entre orbes
                energyOrbs.forEach((orb2, j) => {
                    if (i >= j) return;
                    const dx = orb.x - orb2.x;
                    const dy = orb.y - orb2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < finalDistance * 1.5) {
                        const pulseOpacity = (Math.sin(time * 2 + i + j) * 0.5 + 0.5) * 0.3;

                        // Rayo principal
                        const gradient = ctx.createLinearGradient(orb.x, orb.y, orb2.x, orb2.y);
                        gradient.addColorStop(0, orb.color + pulseOpacity + ')');
                        gradient.addColorStop(0.5, 'rgba(255, 255, 255, ' + (pulseOpacity * 0.5) + ')');
                        gradient.addColorStop(1, orb2.color + pulseOpacity + ')');

                        ctx.beginPath();
                        ctx.moveTo(orb.x, orb.y);
                        ctx.lineTo(orb2.x, orb2.y);
                        ctx.strokeStyle = gradient;
                        ctx.lineWidth = 2.5;
                        ctx.stroke();

                        // Partículas viajando por el rayo
                        const particlePos = (time * 0.5) % 1;
                        const px = orb.x + (orb2.x - orb.x) * particlePos;
                        const py = orb.y + (orb2.y - orb.y) * particlePos;

                        ctx.beginPath();
                        ctx.arc(px, py, 4, 0, Math.PI * 2);
                        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                        ctx.fill();

                        // Crear ondas ocasionalmente
                        if (Math.random() < 0.005) {
                            createEnergyWave(px, py, orb.color);
                        }
                    }
                });
            });

            // ===== CAPA 3: PARTÍCULAS CON TRAILS Y CONEXIONES =====
            particles.forEach((p, i) => {
                // Actualizar fase de pulso
                p.pulsePhase += 0.05;
                const pulseFactor = Math.sin(p.pulsePhase) * 0.3 + 1;

                // Movimiento con parallax basado en profundidad
                const depthFactor = p.depth;
                p.x += p.vx * depthFactor;
                p.y += p.vy * depthFactor;

                // Interacción con mouse (efecto de repulsión)
                if (mouseRef.current.active) {
                    const dx = p.x - mouseRef.current.x;
                    const dy = p.y - mouseRef.current.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 150) {
                        const force = (150 - dist) / 150;
                        p.x += (dx / dist) * force * 3 * depthFactor;
                        p.y += (dy / dist) * force * 3 * depthFactor;
                    }
                }

                // Bounce en los bordes
                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

                // Actualizar trail
                p.trail.unshift({ x: p.x, y: p.y, opacity: p.opacity });
                if (p.trail.length > 8) p.trail.pop();

                // Dibujar trail (estela)
                p.trail.forEach((point, index) => {
                    const trailOpacity = point.opacity * (1 - index / p.trail.length) * 0.4;
                    const trailSize = p.size * (1 - index / p.trail.length) * 0.8;

                    ctx.beginPath();
                    ctx.arc(point.x, point.y, trailSize, 0, Math.PI * 2);
                    ctx.fillStyle = p.color + trailOpacity + ')';
                    ctx.fill();
                });

                // Dibujar partícula principal con múltiples capas de glow
                const currentSize = p.size * pulseFactor * depthFactor;

                // Glow exterior
                const outerGlow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, currentSize * 4);
                outerGlow.addColorStop(0, p.color + (p.opacity * 0.4) + ')');
                outerGlow.addColorStop(0.3, p.color + (p.opacity * 0.2) + ')');
                outerGlow.addColorStop(1, p.color + '0)');
                ctx.beginPath();
                ctx.arc(p.x, p.y, currentSize * 4, 0, Math.PI * 2);
                ctx.fillStyle = outerGlow;
                ctx.fill();

                // Partícula principal
                const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, currentSize);
                gradient.addColorStop(0, 'rgba(255, 255, 255, ' + (p.opacity * 1.2) + ')');
                gradient.addColorStop(0.3, p.color + p.opacity + ')');
                gradient.addColorStop(1, p.color + (p.opacity * 0.3) + ')');
                ctx.beginPath();
                ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2);
                ctx.fillStyle = gradient;
                ctx.fill();

                // Conexiones entre partículas
                particles.forEach((p2, j) => {
                    if (i >= j) return;
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < finalDistance) {
                        const lineOpacity = 0.15 * (1 - dist / finalDistance) * Math.min(p.depth, p2.depth);

                        // Línea con gradiente
                        const gradient = ctx.createLinearGradient(p.x, p.y, p2.x, p2.y);
                        gradient.addColorStop(0, p.color + lineOpacity + ')');
                        gradient.addColorStop(0.5, 'rgba(255, 255, 255, ' + (lineOpacity * 0.5) + ')');
                        gradient.addColorStop(1, p2.color + lineOpacity + ')');

                        ctx.beginPath();
                        ctx.strokeStyle = gradient;
                        ctx.lineWidth = 1.5;
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();

                        // Punto medio brillante
                        if (dist < finalDistance * 0.5) {
                            const midX = (p.x + p2.x) / 2;
                            const midY = (p.y + p2.y) / 2;
                            const midOpacity = lineOpacity * 2;

                            ctx.beginPath();
                            ctx.arc(midX, midY, 2, 0, Math.PI * 2);
                            ctx.fillStyle = 'rgba(255, 255, 255, ' + midOpacity + ')';
                            ctx.fill();
                        }
                    }
                });
            });

            ctx.restore();
            animationId = requestAnimationFrame(animate);
        };

        // Iniciar animación con delay para efecto de carga
        setTimeout(() => {
            setIsLoaded(true);
            animate();
        }, 100);

        const handleResize = () => {
            updateCanvasSize();
        };

        window.addEventListener('resize', handleResize);

        const resizeObserver = new ResizeObserver(() => {
            updateCanvasSize();
        });
        resizeObserver.observe(document.body);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
            resizeObserver.disconnect();
        };
    }, [finalParticleCount, finalDistance, config.orbs]);

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
            {/* Canvas de red neuronal con fade-in */}
            <canvas
                ref={canvasRef}
                className={`fixed top-0 left-0 w-full pointer-events-none z-0 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                style={{
                    opacity: config.opacity,
                    height: '100vh'
                }}
            />

            {/* Grid pattern dinámico con animación */}
            <div
                className="fixed inset-0 pointer-events-none z-0 animate-pulse-slow"
                style={{
                    backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.03) 1px, transparent 1px),
            linear-gradient(rgba(56, 189, 248, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(56, 189, 248, 0.02) 1px, transparent 1px)
          `,
                    backgroundSize: '60px 60px, 60px 60px, 20px 20px, 20px 20px',
                    maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black, transparent)',
                    WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black, transparent)'
                }}
            />

            {/* Orbes de fondo estáticos con blur */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div
                    className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl animate-float-slow"
                    style={{
                        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4), transparent 70%)'
                    }}
                />
                <div
                    className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl animate-float-slow-delayed"
                    style={{
                        background: 'radial-gradient(circle, rgba(56, 189, 248, 0.4), transparent 70%)',
                        animationDelay: '2s'
                    }}
                />
                <div
                    className="absolute bottom-1/4 left-1/3 w-[550px] h-[550px] rounded-full opacity-20 blur-3xl animate-float-slow"
                    style={{
                        background: 'radial-gradient(circle, rgba(236, 72, 153, 0.4), transparent 70%)',
                        animationDelay: '4s'
                    }}
                />
            </div>

            {/* Scanline effect sutil */}
            <div
                className="fixed inset-0 pointer-events-none z-0 opacity-5"
                style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.03) 4px)'
                }}
            />

            {/* Contenido */}
            <div className="relative z-10">
                {children}
            </div>

            <style>{`
        @keyframes float-slow {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -30px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        @keyframes float-slow-delayed {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(-30px, 30px) scale(1.1);
          }
          66% {
            transform: translate(20px, -20px) scale(0.9);
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }

        .animate-float-slow {
          animation: float-slow 20s ease-in-out infinite;
        }

        .animate-float-slow-delayed {
          animation: float-slow-delayed 25s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
      `}</style>
        </div>
    );
}
