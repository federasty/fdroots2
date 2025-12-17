import React, { useState, useEffect, useRef } from 'react';
import { Mail, MapPin, Send, Linkedin, Github, Code2, CheckCircle2, AlertCircle, Loader2, MessageCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

interface ContactMethod {
  icon: React.ElementType;
  label: string;
  value: string;
  href: string;
  gradient: string;
  accentColor: string;
  description: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredMethod, setHoveredMethod] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);

  const contactMethods: ContactMethod[] = [
    {
      icon: Mail,
      label: 'Email',
      value: 'federicodaniel7@gmail.com',
      href: 'mailto:federicodaniel7@gmail.com',
      gradient: 'from-sky-400 via-blue-500 to-indigo-600',
      accentColor: '#0ea5e9',
      description: 'Respuesta en menos de 24hs'
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      value: '+598 94 248 120',
      href: 'https://wa.me/59894248120',
      gradient: 'from-emerald-400 via-teal-500 to-cyan-600',
      accentColor: '#10b981',
      description: 'Disponible para consultas rápidas'
    },
    {
      icon: MapPin,
      label: 'Ubicación',
      value: 'Las Piedras, Canelones',
      href: 'https://www.google.com/maps/search/Las+Piedras,+Canelones,+Uruguay',
      gradient: 'from-violet-400 via-purple-500 to-fuchsia-600',
      accentColor: '#8b5cf6',
      description: 'Uruguay (GMT-3)'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'Federico Daniel',
      href: 'https://www.linkedin.com/in/federico-daniel-142b22349/',
      gradient: 'from-blue-400 via-blue-500 to-blue-600',
      accentColor: '#3b82f6',
      description: 'Red profesional y experiencia'
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'federasty',
      href: 'https://github.com/federasty',
      gradient: 'from-slate-400 via-slate-500 to-slate-600',
      accentColor: '#64748b',
      description: 'Repositorios y código fuente'
    }
  ];

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
    if (isMobile) return;
    
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
  }, [isMobile]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'El nombre debe tener al menos 2 caracteres';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'El asunto es requerido';
    } else if (formData.subject.trim().length < 3) {
      newErrors.subject = 'El asunto debe tener al menos 3 caracteres';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'El mensaje es requerido';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'El mensaje debe tener al menos 10 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await emailjs.send(
        "service_z7gsbhk", // Service ID
        "template_v4hl71j", // Template ID
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        "BqH6VDYOtIYvPDmFm" // Public Key
      );

      console.log('Email enviado exitosamente:', response);
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } catch (error) {
      console.error('Error al enviar el email:', error);
      setSubmitStatus('error');
      
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <>
      <style>{`
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

        @keyframes pulse-glow {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(139, 92, 246, 0.3);
          }
          50% { 
            box-shadow: 0 0 40px rgba(139, 92, 246, 0.5);
          }
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        @keyframes success-bounce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        .animate-success-bounce {
          animation: success-bounce 0.5s ease-in-out;
        }

        @media (hover: none) and (pointer: coarse) {
          .animate-fade-in-up {
            -webkit-user-select: none;
            -webkit-touch-callout: none;
            -webkit-tap-highlight-color: transparent;
          }
        }
      `}</style>

      <section
        ref={sectionRef}
        className="relative min-h-screen py-20 sm:py-24 lg:py-32 overflow-hidden"
        aria-labelledby="contact-heading"
      >
        {/* Ambient Background Orbs */}
        {!isMobile && (
          <>
            <div
              className="absolute top-20 left-10 w-[400px] h-[400px] bg-gradient-to-r from-violet-500/6 via-purple-500/4 to-fuchsia-500/6 rounded-full blur-3xl animate-float pointer-events-none will-change-transform"
              style={{
                transform: `translate(${mousePosition.x * 0.015}px, ${mousePosition.y * 0.015}px)`,
              }}
              aria-hidden="true"
            />
            <div
              className="absolute top-40 right-20 w-[450px] h-[450px] bg-gradient-to-r from-cyan-500/5 via-blue-500/3 to-indigo-500/5 rounded-full blur-3xl animate-float-reverse pointer-events-none will-change-transform"
              style={{
                transform: `translate(${-mousePosition.x * 0.015}px, ${-mousePosition.y * 0.015}px)`,
              }}
              aria-hidden="true"
            />
          </>
        )}

        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-slate-950/70 to-slate-950/90 pointer-events-none" aria-hidden="true" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <header
            className={`text-center space-y-4 mb-12 sm:mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <h2 id="contact-heading" className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight">
              <span className="block bg-gradient-to-r from-sky-400 via-violet-500 to-pink-500 bg-clip-text text-transparent animate-text-shimmer">
                Hablemos de tu Proyecto
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

            <p className="text-base sm:text-lg lg:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              ¿Tienes una idea o un desafío técnico? Estoy listo para ayudarte a construir{' '}
              <span className="bg-gradient-to-r from-sky-400 via-violet-400 to-pink-400 bg-clip-text text-transparent font-bold">
                soluciones escalables
              </span>{' '}
              y eficientes.
            </p>
          </header>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Methods */}
            <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="space-y-4">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-200 flex items-center gap-3 mb-6">
                  <Code2 className="w-6 h-6 text-sky-400" />
                  Datos de Contacto
                </h3>
                
                <div className="grid grid-cols-1 gap-4">
                  {contactMethods.map((method, index) => {
                    const Icon = method.icon;
                    return (
                      <a
                        key={index}
                        href={method.href}
                        target={method.href.startsWith('http') ? '_blank' : undefined}
                        rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        onMouseEnter={() => !isMobile && setHoveredMethod(index)}
                        onMouseLeave={() => !isMobile && setHoveredMethod(null)}
                        className="group relative"
                        style={{
                          animation: `fade-in-up 0.7s cubic-bezier(0.4, 0, 0.2, 1) ${0.3 + index * 0.1}s forwards`,
                          opacity: 0
                        }}
                      >
                        {/* Outer Glow */}
                        <div 
                          className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 blur-lg transition-all duration-700"
                          style={{
                            background: `linear-gradient(135deg, ${method.accentColor}30, transparent, ${method.accentColor}20)`
                          }}
                        />

                        {/* Card */}
                        <div 
                          className="relative bg-slate-900/50 backdrop-blur-xl rounded-2xl p-5 border transition-all duration-700 hover:scale-[1.02] will-change-transform"
                          style={{
                            borderColor: hoveredMethod === index ? `${method.accentColor}50` : 'rgb(51 65 85 / 0.5)',
                            boxShadow: hoveredMethod === index ? `0 0 30px ${method.accentColor}40` : 'none'
                          }}
                        >
                          {/* Background Gradient */}
                          <div 
                            className={`absolute inset-0 bg-gradient-to-br ${method.gradient} rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-700`}
                          />

                          <div className="relative z-10 flex items-center gap-4">
                            {/* Icon */}
                            <div 
                              className="p-3 rounded-xl transition-all duration-500 group-hover:scale-110"
                              style={{
                                backgroundColor: `${method.accentColor}15`,
                                borderColor: `${method.accentColor}30`,
                                borderWidth: '1px',
                                borderStyle: 'solid'
                              }}
                            >
                              <Icon 
                                className="w-6 h-6 transition-all duration-500" 
                                style={{ color: method.accentColor }}
                              />
                            </div>

                            {/* Info */}
                            <div className="flex-1">
                              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">{method.label}</p>
                              <p className="text-base sm:text-lg font-bold text-slate-200 mt-0.5">{method.value}</p>
                              <p className="text-xs text-slate-600 mt-1">{method.description}</p>
                            </div>

                            {/* Arrow */}
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                              <Send className="w-5 h-5 text-slate-400 group-hover:translate-x-1 transition-transform duration-500" />
                            </div>
                          </div>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="relative">
                {/* Outer Glow */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-sky-500 via-violet-500 to-pink-500 rounded-3xl opacity-20 blur-xl" />

                {/* Form Container */}
                <div className="relative bg-slate-900/50 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-700/50">
                  {/* Success Message */}
                  {submitStatus === 'success' && (
                    <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center gap-3 animate-success-bounce">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      <p className="text-sm text-emerald-300 font-semibold">
                        ¡Mensaje enviado con éxito! Te responderé pronto.
                      </p>
                    </div>
                  )}

                  {/* Error Message */}
                  {submitStatus === 'error' && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-3">
                      <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                      <p className="text-sm text-red-300 font-semibold">
                        Hubo un error al enviar el mensaje. Intenta nuevamente.
                      </p>
                    </div>
                  )}

                  <div className="space-y-6">
                    {/* Name Field */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-bold text-slate-300 mb-2">
                        Nombre Completo
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('name')}
                          onBlur={() => setFocusedField(null)}
                          className={`w-full px-4 py-3 bg-slate-800/50 border rounded-xl text-slate-200 placeholder-slate-500 transition-all duration-300 focus:outline-none focus:ring-2 ${
                            errors.name 
                              ? 'border-red-500/50 focus:ring-red-500/50' 
                              : focusedField === 'name'
                              ? 'border-violet-500/50 focus:ring-violet-500/50'
                              : 'border-slate-700/50'
                          }`}
                          placeholder="Juan Pérez"
                        />
                        {focusedField === 'name' && !errors.name && (
                          <div className="absolute inset-0 rounded-xl pointer-events-none animate-pulse-glow" />
                        )}
                      </div>
                      {errors.name && (
                        <p className="mt-2 text-xs text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-bold text-slate-300 mb-2">
                        Email
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('email')}
                          onBlur={() => setFocusedField(null)}
                          className={`w-full px-4 py-3 bg-slate-800/50 border rounded-xl text-slate-200 placeholder-slate-500 transition-all duration-300 focus:outline-none focus:ring-2 ${
                            errors.email 
                              ? 'border-red-500/50 focus:ring-red-500/50' 
                              : focusedField === 'email'
                              ? 'border-violet-500/50 focus:ring-violet-500/50'
                              : 'border-slate-700/50'
                          }`}
                          placeholder="juan@ejemplo.com"
                        />
                        {focusedField === 'email' && !errors.email && (
                          <div className="absolute inset-0 rounded-xl pointer-events-none animate-pulse-glow" />
                        )}
                      </div>
                      {errors.email && (
                        <p className="mt-2 text-xs text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Subject Field */}
                    <div>
                      <label htmlFor="subject" className="block text-sm font-bold text-slate-300 mb-2">
                        Asunto
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('subject')}
                          onBlur={() => setFocusedField(null)}
                          className={`w-full px-4 py-3 bg-slate-800/50 border rounded-xl text-slate-200 placeholder-slate-500 transition-all duration-300 focus:outline-none focus:ring-2 ${
                            errors.subject 
                              ? 'border-red-500/50 focus:ring-red-500/50' 
                              : focusedField === 'subject'
                              ? 'border-violet-500/50 focus:ring-violet-500/50'
                              : 'border-slate-700/50'
                          }`}
                          placeholder="Propuesta de proyecto"
                        />
                        {focusedField === 'subject' && !errors.subject && (
                          <div className="absolute inset-0 rounded-xl pointer-events-none animate-pulse-glow" />
                        )}
                      </div>
                      {errors.subject && (
                        <p className="mt-2 text-xs text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.subject}
                        </p>
                      )}
                    </div>

                    {/* Message Field */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-bold text-slate-300 mb-2">
                        Mensaje
                      </label>
                      <div className="relative">
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('message')}
                          onBlur={() => setFocusedField(null)}
                          rows={5}
                          className={`w-full px-4 py-3 bg-slate-800/50 border rounded-xl text-slate-200 placeholder-slate-500 transition-all duration-300 focus:outline-none focus:ring-2 resize-none ${
                            errors.message 
                              ? 'border-red-500/50 focus:ring-red-500/50' 
                              : focusedField === 'message'
                              ? 'border-violet-500/50 focus:ring-violet-500/50'
                              : 'border-slate-700/50'
                          }`}
                          placeholder="Cuéntame sobre tu proyecto..."
                        />
                        {focusedField === 'message' && !errors.message && (
                          <div className="absolute inset-0 rounded-xl pointer-events-none animate-pulse-glow" />
                        )}
                      </div>
                      {errors.message && (
                        <p className="mt-2 text-xs text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.message}
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="group relative w-full px-6 py-4 bg-gradient-to-r from-sky-500 via-violet-500 to-pink-500 rounded-xl font-bold text-white text-lg overflow-hidden transition-all duration-500 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed will-change-transform"
                    >
                      {/* Animated Background */}
                      <div className="absolute inset-0 bg-gradient-to-r from-sky-400 via-violet-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Shine Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />

                      {/* Button Content */}
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Enviando...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-500" />
                            Enviar Mensaje
                          </>
                        )}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;