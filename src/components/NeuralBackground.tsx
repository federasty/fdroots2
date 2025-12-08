import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';

interface NeuralBackgroundProps {
  children: ReactNode;
  intensity?: 'low' | 'medium' | 'high';
  particleCount?: number;
  connectionDistance?: number;
}

export default function NeuralBackground({ 
  children, 
  intensity = 'medium',
  particleCount,
  connectionDistance
}: NeuralBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Configuración basada en intensidad
  const config = {
    low: { particles: 80, distance: 180, opacity: 0.3 },
    medium: { particles: 120, distance: 220, opacity: 0.4 },
    high: { particles: 180, distance: 280, opacity: 0.5 }
  }[intensity];

  const finalParticleCount = particleCount || config.particles;
  const finalDistance = connectionDistance || config.distance;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
    };

    updateCanvasSize();

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      opacity: number;
    }> = [];

    const colors = [
      'rgba(56, 189, 248, ',   // sky-400
      'rgba(139, 92, 246, ',   // violet-500
      'rgba(236, 72, 153, ',   // pink-500
      'rgba(34, 211, 238, ',   // cyan-400
      'rgba(251, 146, 60, ',   // orange-400
      'rgba(16, 185, 129, ',   // emerald-500
    ];

    // Inicializar partículas
    for (let i = 0; i < finalParticleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1,
        vy: (Math.random() - 0.5) * 1,
        size: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.25 + 0.15,
      });
    }

    let animationId: number;
    let scrollY = window.scrollY;

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Offset para seguir el scroll
      ctx.save();
      ctx.translate(0, -scrollY);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce en los bordes
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Dibujar partículas con glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
        gradient.addColorStop(0, p.color + p.opacity + ')');
        gradient.addColorStop(0.5, p.color + (p.opacity * 0.5) + ')');
        gradient.addColorStop(1, p.color + '0)');
        ctx.fillStyle = gradient;
        ctx.fill();

        // Conexiones
        particles.forEach((p2, j) => {
          if (i === j) return;
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < finalDistance) {
            ctx.beginPath();
            const lineOpacity = 0.12 * (1 - dist / finalDistance);
            const gradient = ctx.createLinearGradient(p.x, p.y, p2.x, p2.y);
            gradient.addColorStop(0, p.color + lineOpacity + ')');
            gradient.addColorStop(1, p2.color + lineOpacity + ')');
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1.2;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });

      ctx.restore();
      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      updateCanvasSize();
    };

    window.addEventListener('resize', handleResize);

    // Actualizar altura del canvas cuando cambia el contenido
    const resizeObserver = new ResizeObserver(() => {
      updateCanvasSize();
    });
    resizeObserver.observe(document.body);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      resizeObserver.disconnect();
    };
  }, [finalParticleCount, finalDistance]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Canvas de red neuronal fijo */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full pointer-events-none z-0"
        style={{ 
          opacity: config.opacity,
          height: '100vh'
        }}
      />
      
      {/* Grid pattern sutil */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(139,92,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.02)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none z-0" 
        style={{
          maskImage: 'radial-gradient(ellipse 80% 50% at 50% 0%, black, transparent)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 50% at 50% 0%, black, transparent)'
        }}
      />

      {/* Contenido */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}