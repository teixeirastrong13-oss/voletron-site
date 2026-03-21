import "@/App.css";
import { useState, useEffect, useRef } from "react";
import { 
  Phone, 
  Zap, 
  Shield, 
  Clock, 
  Award, 
  CheckCircle2, 
  Sun, 
  Building2, 
  Home, 
  FileCheck, 
  Wrench,
  TrendingDown,
  BadgeCheck,
  Lightbulb,
  ArrowRight,
  Menu,
  X,
  Play
} from "lucide-react";
import { Button } from "./components/ui/button";

// Assets URLs
const LOGO_URL = "https://customer-assets.emergentagent.com/job_energia-solar-pro-1/artifacts/53gv7at7_LOGO%20VOLETRON.png";
const WHATSAPP_NUMBER = "5571999192508";
const WHATSAPP_MESSAGE = "Olá! Gostaria de saber mais sobre energia solar e fazer uma simulação de economia.";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

// Project images from client
const PROJECT_IMAGES = [
  {
    url: "https://customer-assets.emergentagent.com/job_energia-solar-pro-1/artifacts/fjlgrdxn_dji_fly_20260120_153434_0120_1768934130254_photo_beautify.JPEG",
    title: "Projeto Residencial",
    location: "Salvador - BA"
  },
  {
    url: "https://customer-assets.emergentagent.com/job_energia-solar-pro-1/artifacts/pf95vvvw_dji_fly_20260207_101854_0126_1772563453190_photo_beautify.JPEG",
    title: "Instalação Completa",
    location: "Lauro de Freitas - BA"
  },
  {
    url: "https://customer-assets.emergentagent.com/job_energia-solar-pro-1/artifacts/e1x9uqvx_dji_fly_20260207_101918_0127_1772563448652_photo_beautify.JPEG",
    title: "Sistema Fotovoltaico",
    location: "Camaçari - BA"
  },
  {
    url: "https://customer-assets.emergentagent.com/job_energia-solar-pro-1/artifacts/6vx74r2x_Entre%20Rios%20foto.JPEG",
    title: "Projeto Comercial",
    location: "Entre Rios - BA"
  }
];

const VIDEO_URL = "https://customer-assets.emergentagent.com/job_energia-solar-pro-1/artifacts/6ioihi2u_Entre%20Rios%20Video.MP4";

// Scroll reveal hook
const useScrollReveal = () => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
};

// Header Component
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      data-testid="header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass-header shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between h-20">
          <a href="#hero" data-testid="logo-link">
            <img 
              src={LOGO_URL} 
              alt="Voletron Engenharia Elétrica" 
              className="h-12 md:h-14 w-auto"
              data-testid="logo-image"
            />
          </a>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8" data-testid="desktop-nav">
            <a href="#beneficios" className="text-voletron-navy font-medium hover:text-voletron-orange transition-colors">
              Benefícios
            </a>
            <a href="#projetos" className="text-voletron-navy font-medium hover:text-voletron-orange transition-colors">
              Projetos
            </a>
            <a href="#diferenciais" className="text-voletron-navy font-medium hover:text-voletron-orange transition-colors">
              Diferenciais
            </a>
            <Button 
              asChild
              data-testid="header-cta-button"
              className="bg-voletron-orange hover:bg-voletron-orange-dark text-voletron-navy font-bold px-6 py-2.5 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <Phone className="w-4 h-4 mr-2" />
                Falar com Engenheiro
              </a>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            data-testid="mobile-menu-button"
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-voletron-navy" /> : <Menu className="w-6 h-6 text-voletron-navy" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 py-4" data-testid="mobile-menu">
            <nav className="flex flex-col gap-4">
              <a href="#beneficios" className="text-voletron-navy font-medium px-4 py-2 hover:bg-slate-50" onClick={() => setMobileMenuOpen(false)}>
                Benefícios
              </a>
              <a href="#projetos" className="text-voletron-navy font-medium px-4 py-2 hover:bg-slate-50" onClick={() => setMobileMenuOpen(false)}>
                Projetos
              </a>
              <a href="#diferenciais" className="text-voletron-navy font-medium px-4 py-2 hover:bg-slate-50" onClick={() => setMobileMenuOpen(false)}>
                Diferenciais
              </a>
              <div className="px-4 pt-2">
                <Button 
                  asChild
                  data-testid="mobile-cta-button"
                  className="w-full bg-voletron-orange hover:bg-voletron-orange-dark text-voletron-navy font-bold py-3 rounded-full"
                >
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                    <Phone className="w-4 h-4 mr-2" />
                    Falar com Engenheiro
                  </a>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

// Hero Section
const HeroSection = () => {
  return (
    <section id="hero" className="hero-pattern min-h-screen pt-20 flex items-center" data-testid="hero-section">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-2">
              <span className="inline-block text-sm font-semibold tracking-widest uppercase text-voletron-orange animate-fade-in">
                Engenharia Elétrica Especializada
              </span>
              <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight leading-none text-voletron-navy animate-fade-in animate-delay-100">
                Reduza até <span className="text-voletron-orange">90%</span> da sua Conta de Luz
              </h1>
            </div>
            
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed animate-fade-in animate-delay-200">
              Sistema completo de energia solar com <strong>financiamento aprovado</strong>. 
              Parcelas que cabem no seu bolso — muitas vezes menores que sua conta de luz atual.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in animate-delay-300">
              <Button 
                asChild
                data-testid="hero-primary-cta"
                className="bg-voletron-orange hover:bg-voletron-orange-dark text-voletron-navy font-bold text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <Phone className="w-5 h-5 mr-2" />
                  Simular Economia Agora
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>
              </Button>
              <Button 
                asChild
                variant="outline"
                data-testid="hero-secondary-cta"
                className="border-2 border-voletron-navy text-voletron-navy hover:bg-voletron-navy hover:text-white font-bold text-lg px-8 py-6 rounded-full transition-all duration-300"
              >
                <a href="#projetos">
                  Ver Projetos Realizados
                </a>
              </Button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-6 pt-4 animate-fade-in animate-delay-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-voletron-orange" />
                <span className="text-sm text-slate-600">+500 kWp instalados</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-voletron-orange" />
                <span className="text-sm text-slate-600">+5 anos de experiência</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-voletron-orange" />
                <span className="text-sm text-slate-600">Atendimento direto com engenheiro</span>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative animate-slide-in-right">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={PROJECT_IMAGES[3].url}
                alt="Sistema de energia solar instalado"
                className="w-full h-auto object-cover"
                data-testid="hero-image"
              />
              {/* Overlay badge */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">Economia mensal média</p>
                    <p className="font-heading text-3xl font-bold text-voletron-navy">R$ 800+</p>
                  </div>
                  <div className="icon-circle">
                    <Sun className="w-8 h-8 text-voletron-navy" />
                  </div>
                </div>
              </div>
            </div>
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 bg-voletron-navy text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
              Financiamento em até 120x
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Benefits Section
const BenefitsSection = () => {
  const [ref, isVisible] = useScrollReveal();

  const benefits = [
    {
      icon: TrendingDown,
      title: "Economia de até 90%",
      description: "Reduza drasticamente sua conta de energia desde o primeiro mês de operação."
    },
    {
      icon: FileCheck,
      title: "Financiamento Facilitado",
      description: "Parcelas menores ou iguais à sua conta de luz atual. Aprovação rápida."
    },
    {
      icon: Shield,
      title: "Garantia de 25 Anos",
      description: "Painéis de alta qualidade com garantia de performance por décadas."
    },
    {
      icon: Wrench,
      title: "Projeto Completo",
      description: "Da análise inicial à homologação. Você não se preocupa com burocracia."
    },
    {
      icon: Building2,
      title: "Residencial e Comercial",
      description: "Soluções personalizadas para sua casa ou empresa. Atendemos todos os portes."
    },
    {
      icon: Clock,
      title: "Entrega Rápida",
      description: "Instalação ágil com cronograma definido. Seu sistema funcionando logo."
    }
  ];

  return (
    <section id="beneficios" className="py-20 md:py-32 bg-slate-50" data-testid="benefits-section">
      <div 
        ref={ref}
        className={`container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="text-center mb-16">
          <span className="text-sm font-semibold tracking-widest uppercase text-voletron-orange">
            Por que escolher energia solar?
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-voletron-navy mt-2">
            Benefícios que transformam sua vida
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="benefit-card bg-white rounded-xl p-8 hover:shadow-lg transition-all duration-300"
              data-testid={`benefit-card-${index}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="icon-circle mb-6">
                <benefit.icon className="w-7 h-7 text-voletron-navy" />
              </div>
              <h3 className="font-heading text-xl font-bold text-voletron-navy mb-3 uppercase">
                {benefit.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Band */}
        <div className="mt-16 cta-band rounded-2xl p-8 md:p-12 text-center" data-testid="benefits-cta-band">
          <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-4 uppercase">
            Quer saber quanto você pode economizar?
          </h3>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Faça uma simulação gratuita e descubra o sistema ideal para sua necessidade.
          </p>
          <Button 
            asChild
            data-testid="benefits-cta-button"
            className="bg-voletron-orange hover:bg-voletron-orange-dark text-voletron-navy font-bold text-lg px-10 py-6 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <Phone className="w-5 h-5 mr-2" />
              Fazer Simulação Gratuita
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

// Authority Section
const AuthoritySection = () => {
  const [ref, isVisible] = useScrollReveal();

  const stats = [
    { number: "500+", label: "kWp instalados" },
    { number: "5+", label: "anos de experiência" },
    { number: "100%", label: "projetos homologados" },
    { number: "24h", label: "suporte técnico" }
  ];

  const credentials = [
    "Engenheiro Eletricista registrado no CREA",
    "Projetos conforme NBR 5410 e normas da concessionária",
    "Experiência em grandes empresas: Braskem, Cetrel, Usinazul",
    "Aprovação e homologação junto à concessionária inclusa"
  ];

  return (
    <section className="py-32 md:py-40 bg-voletron-navy relative overflow-hidden" data-testid="authority-section">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div 
        ref={ref}
        className={`container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Stats and Info */}
          <div className="space-y-10">
            <div>
              <span className="text-sm font-semibold tracking-widest uppercase text-voletron-orange">
                Autoridade técnica
              </span>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-white mt-2">
                Engenharia de Verdade
              </h2>
              <p className="text-lg text-white/80 mt-4 leading-relaxed">
                Atendimento direto com engenheiro eletricista. Sem intermediários, 
                sem amadorismo. Projeto técnico dimensionado corretamente para máxima eficiência.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-6 bg-white/5 rounded-xl backdrop-blur-sm" data-testid={`stat-${index}`}>
                  <p className="font-heading text-4xl md:text-5xl font-bold text-voletron-orange">
                    {stat.number}
                  </p>
                  <p className="text-white/70 text-sm mt-1 uppercase tracking-wide">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Credentials */}
            <div className="space-y-4">
              {credentials.map((item, index) => (
                <div key={index} className="flex items-start gap-3" data-testid={`credential-${index}`}>
                  <BadgeCheck className="w-5 h-5 text-voletron-orange flex-shrink-0 mt-0.5" />
                  <span className="text-white/90">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1700529289398-dd313f11c9cc?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwyfHxtYWxlJTIwY29uc3RydWN0aW9uJTIwd29ya2VyJTIwaW5zdGFsbGluZyUyMHNvbGFyJTIwcGFuZWxzfGVufDB8fHx8MTc3NDEwMzY3NXww&ixlib=rb-4.1.0&q=85"
                alt="Engenheiro instalando painéis solares"
                className="w-full h-auto object-cover"
                data-testid="authority-image"
              />
            </div>
            {/* Badge */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-6 shadow-xl max-w-xs">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-voletron-orange/10 rounded-full flex items-center justify-center">
                  <Award className="w-7 h-7 text-voletron-orange" />
                </div>
                <div>
                  <p className="font-heading font-bold text-voletron-navy uppercase">CREA Ativo</p>
                  <p className="text-sm text-slate-500">Engenheiro Responsável</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Projects Section
const ProjectsSection = () => {
  const [ref, isVisible] = useScrollReveal();
  const [showVideo, setShowVideo] = useState(false);

  return (
    <section id="projetos" className="py-20 md:py-32 bg-white" data-testid="projects-section">
      <div 
        ref={ref}
        className={`container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="text-center mb-16">
          <span className="text-sm font-semibold tracking-widest uppercase text-voletron-orange">
            Nossos projetos
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-voletron-navy mt-2">
            Resultados que falam por si
          </h2>
          <p className="text-lg text-slate-600 mt-4 max-w-2xl mx-auto">
            Veja alguns dos sistemas que já instalamos em Salvador, Lauro de Freitas, 
            Camaçari e região metropolitana.
          </p>
        </div>

        {/* Video Section */}
        <div className="mb-12" data-testid="video-section">
          <div className="relative rounded-2xl overflow-hidden shadow-xl max-w-4xl mx-auto">
            {showVideo ? (
              <video 
                controls 
                autoPlay 
                className="w-full aspect-video"
                data-testid="project-video"
              >
                <source src={VIDEO_URL} type="video/mp4" />
                Seu navegador não suporta vídeos.
              </video>
            ) : (
              <div className="relative aspect-video bg-slate-900 cursor-pointer" onClick={() => setShowVideo(true)}>
                <img 
                  src={PROJECT_IMAGES[3].url}
                  alt="Vídeo do projeto"
                  className="w-full h-full object-cover opacity-70"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button 
                    data-testid="play-video-button"
                    className="w-20 h-20 bg-voletron-orange rounded-full flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform"
                  >
                    <Play className="w-8 h-8 text-voletron-navy ml-1" fill="currentColor" />
                  </button>
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="font-heading text-xl font-bold">Projeto Completo - Entre Rios</p>
                  <p className="text-white/70 text-sm">Assista ao vídeo da instalação</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Project Gallery */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROJECT_IMAGES.map((project, index) => (
            <div 
              key={index}
              className="project-card rounded-xl overflow-hidden shadow-md"
              data-testid={`project-card-${index}`}
            >
              <div className="aspect-square overflow-hidden">
                <img 
                  src={project.url}
                  alt={project.title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-4 bg-white">
                <p className="font-heading font-bold text-voletron-navy">{project.title}</p>
                <p className="text-sm text-slate-500">{project.location}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button 
            asChild
            data-testid="projects-cta-button"
            className="bg-voletron-navy hover:bg-voletron-navy-dark text-white font-bold text-lg px-10 py-6 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <Phone className="w-5 h-5 mr-2" />
              Quero um Projeto Assim
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

// Differentials Section
const DifferentialsSection = () => {
  const [ref, isVisible] = useScrollReveal();

  const differentials = [
    {
      icon: Lightbulb,
      title: "Atendimento Direto com Engenheiro",
      description: "Fale diretamente com o responsável técnico. Sem intermediários, sem ruído na comunicação."
    },
    {
      icon: FileCheck,
      title: "Projeto Conforme Normas Técnicas",
      description: "Dimensionamento correto seguindo NBR 5410 e normas da concessionária. Segurança garantida."
    },
    {
      icon: Shield,
      title: "Qualidade e Segurança",
      description: "Equipamentos de primeira linha. Instalação segura com foco em durabilidade do sistema."
    },
    {
      icon: Clock,
      title: "Entrega Rápida",
      description: "Cronograma definido e cumprido. Seu sistema gerando economia o mais rápido possível."
    },
    {
      icon: Home,
      title: "Residencial e Comercial",
      description: "Atendemos desde residências até grandes empresas. Cada projeto é único e personalizado."
    },
    {
      icon: Award,
      title: "Homologação Inclusa",
      description: "Cuidamos de toda a burocracia. Aprovação junto à concessionária sem dor de cabeça."
    }
  ];

  return (
    <section id="diferenciais" className="py-20 md:py-32 bg-slate-50" data-testid="differentials-section">
      <div 
        ref={ref}
        className={`container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Image */}
          <div className="relative order-2 lg:order-1">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img 
                src={PROJECT_IMAGES[0].url}
                alt="Projeto solar residencial"
                className="w-full h-auto object-cover"
                data-testid="differentials-image"
              />
            </div>
            {/* Floating card */}
            <div className="absolute -bottom-6 -right-6 bg-voletron-navy text-white rounded-xl p-6 shadow-xl max-w-xs">
              <p className="font-heading text-3xl font-bold text-voletron-orange">R$ 0</p>
              <p className="text-white/80 text-sm mt-1">Visita técnica e orçamento gratuitos</p>
            </div>
          </div>

          {/* Right - Content */}
          <div className="space-y-8 order-1 lg:order-2">
            <div>
              <span className="text-sm font-semibold tracking-widest uppercase text-voletron-orange">
                Nossos diferenciais
              </span>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-voletron-navy mt-2">
                Por que escolher a Voletron?
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {differentials.map((item, index) => (
                <div key={index} className="flex gap-4" data-testid={`differential-${index}`}>
                  <div className="flex-shrink-0 w-12 h-12 bg-voletron-orange/10 rounded-lg flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-voletron-orange" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-voletron-navy uppercase text-sm">
                      {item.title}
                    </h4>
                    <p className="text-slate-600 text-sm mt-1">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Final CTA Section
const FinalCTASection = () => {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section className="py-20 md:py-32 bg-voletron-navy relative overflow-hidden" data-testid="final-cta-section">
      {/* Background */}
      <div className="absolute inset-0">
        <img 
          src="https://images.pexels.com/photos/6961215/pexels-photo-6961215.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          alt=""
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-voletron-navy via-voletron-navy/95 to-voletron-navy/90" />
      </div>

      <div 
        ref={ref}
        className={`container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl relative z-10 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <span className="inline-block text-sm font-semibold tracking-widest uppercase text-voletron-orange mb-4">
          Comece a economizar hoje
        </span>
        <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-white max-w-4xl mx-auto">
          Sua conta de luz pode ser até <span className="text-voletron-orange">90% menor</span>
        </h2>
        <p className="text-xl text-white/80 mt-6 max-w-2xl mx-auto">
          Financiamento com parcelas que cabem no seu bolso. 
          Fale agora com nosso engenheiro e descubra o sistema ideal para você.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <Button 
            asChild
            data-testid="final-cta-whatsapp"
            className="bg-whatsapp hover:bg-whatsapp-dark text-white font-bold text-xl px-12 py-7 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 whatsapp-pulse"
          >
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <Phone className="w-6 h-6 mr-3" />
              Falar com Engenheiro
            </a>
          </Button>
        </div>

        <div className="flex flex-wrap justify-center gap-8 mt-12 text-white/70">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-voletron-orange" />
            <span>Orçamento gratuito</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-voletron-orange" />
            <span>Sem compromisso</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-voletron-orange" />
            <span>Resposta rápida</span>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  return (
    <footer className="bg-voletron-navy-dark py-12" data-testid="footer">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Logo and Description */}
          <div>
            <img 
              src={LOGO_URL} 
              alt="Voletron Engenharia Elétrica" 
              className="h-12 mb-4 brightness-0 invert"
              data-testid="footer-logo"
            />
            <p className="text-white/60 text-sm">
              Engenharia elétrica especializada em energia solar. 
              Atendendo Salvador, Lauro de Freitas, Camaçari e Mata de São João.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-white uppercase mb-4">Links Rápidos</h4>
            <nav className="space-y-2">
              <a href="#beneficios" className="footer-link block text-sm">Benefícios</a>
              <a href="#projetos" className="footer-link block text-sm">Projetos</a>
              <a href="#diferenciais" className="footer-link block text-sm">Diferenciais</a>
              <a href={WHATSAPP_URL} className="footer-link block text-sm">Contato</a>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-bold text-white uppercase mb-4">Contato</h4>
            <div className="space-y-3">
              <a 
                href={WHATSAPP_URL} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/60 hover:text-voletron-orange transition-colors text-sm"
                data-testid="footer-whatsapp"
              >
                <Phone className="w-4 h-4" />
                (71) 99919-2508
              </a>
              <p className="text-white/60 text-sm">
                Salvador - BA e região metropolitana
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/40 text-sm">
              © {new Date().getFullYear()} Voletron Engenharia Elétrica. Todos os direitos reservados.
            </p>
            <p className="text-white/40 text-sm">
              CREA-BA • Engenheiro Eletricista Responsável
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Floating WhatsApp Button
const FloatingWhatsApp = () => {
  return (
    <a 
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="floating-whatsapp"
      data-testid="floating-whatsapp"
    >
      <div className="bg-whatsapp hover:bg-whatsapp-dark text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110">
        <Phone className="w-7 h-7" />
      </div>
    </a>
  );
};

// Main App
function App() {
  return (
    <div className="App font-body">
      <Header />
      <main>
        <HeroSection />
        <BenefitsSection />
        <AuthoritySection />
        <ProjectsSection />
        <DifferentialsSection />
        <FinalCTASection />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

export default App;
