import "@/App.css";
import { useState, useEffect, useRef } from "react";
import { 
  Phone, 
  Shield, 
  Clock, 
  Award, 
  CheckCircle2, 
  Sun, 
  Building2, 
  Home, 
  FileCheck, 
  Wrench,
  BadgeCheck,
  Lightbulb,
  ArrowRight,
  Menu,
  X,
  Play,
  Calculator,
  User,
  Send,
  DollarSign,
  Zap,
  Settings,
  AlertCircle
} from "lucide-react";
import { Button } from "./components/ui/button";

// Assets URLs
const LOGO_URL = "https://customer-assets.emergentagent.com/job_energia-solar-pro-1/artifacts/53gv7at7_LOGO%20VOLETRON.png";
const WHATSAPP_NUMBER = "5571999192508";
const WHATSAPP_MESSAGE = "Olá! Gostaria de falar com o engenheiro sobre um projeto de energia solar.";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

// Analytics IDs
const GA_MEASUREMENT_ID = "G-ZRZF7G8DNS";
const FB_PIXEL_ID = "1407734350658288";

// Track WhatsApp click events
const trackWhatsAppClick = (buttonLocation) => {
  // Google Analytics 4 Event
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'click_whatsapp', {
      event_category: 'engagement',
      event_label: buttonLocation,
      button_location: buttonLocation,
      transport_type: 'beacon' // Ensures event is sent even on navigation
    });
  }
  
  // Facebook Pixel Event - Lead padrão + evento personalizado
  if (typeof window.fbq === 'function') {
    // Evento Lead padrão do Facebook (para otimização de campanhas)
    window.fbq('track', 'Lead', {
      content_name: 'WhatsApp Contact',
      content_category: buttonLocation
    });
    
    // Evento personalizado lead_whatsapp
    window.fbq('trackCustom', 'lead_whatsapp', {
      button_location: buttonLocation,
      button_text: getButtonText(buttonLocation)
    });
  }
  
  console.log(`[Analytics] WhatsApp click tracked: ${buttonLocation}`);
};

// Helper para mapear localização para texto do botão
const getButtonText = (location) => {
  const buttonTexts = {
    'header': 'Falar com Engenheiro',
    'mobile-menu': 'Falar com Engenheiro',
    'hero': 'Falar com o Engenheiro',
    'calculator-result': 'Quero meu projeto com simulação real',
    'benefits-cta': 'Solicitar Análise Técnica',
    'engineer-section': 'Tirar dúvidas com especialista',
    'why-engineer-section': 'Falar com o Engenheiro',
    'projects-section': 'Solicitar proposta personalizada',
    'final-cta': 'Falar com o Engenheiro',
    'footer-nav': 'Contato',
    'footer-contact': '(71) 99919-2508',
    'floating-button': 'WhatsApp Flutuante'
  };
  return buttonTexts[location] || location;
};

// WhatsApp Link Component with tracking
const WhatsAppLink = ({ children, className, location, testId }) => {
  const handleClick = () => {
    trackWhatsAppClick(location);
  };

  return (
    <a 
      href={WHATSAPP_URL} 
      target="_blank" 
      rel="noopener noreferrer"
      onClick={handleClick}
      className={className}
      data-testid={testId}
    >
      {children}
    </a>
  );
};

// Engineer photos
const ENGINEER_PHOTOS = {
  main: "https://customer-assets.emergentagent.com/job_energia-solar-pro-1/artifacts/m4asag5b_Diego%20Teixeira%20Engenheiro.jpeg",
  braskem: "https://customer-assets.emergentagent.com/job_energia-solar-pro-1/artifacts/wxsa8ati_WhatsApp%20Image%202026-03-21%20at%2012.10.43.jpeg",
  field: "https://customer-assets.emergentagent.com/job_energia-solar-pro-1/artifacts/zx2qp5pu_Foto%20diego%20.jpeg",
  bay: "https://customer-assets.emergentagent.com/job_energia-solar-pro-1/artifacts/mwc9qa0t_Bay.jpeg"
};

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

// Tarifas do Fio B por ano
const FIO_B_RATES = {
  2026: 0.28,
  2027: 0.31
};

// Tarifa cheia para conversão
const TARIFA_CHEIA = 1.30;

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
          <nav className="hidden md:flex items-center gap-5 lg:gap-7" data-testid="desktop-nav">
            <a href="#calculadora" className="text-voletron-navy font-medium hover:text-voletron-orange transition-colors text-sm">
              Simulação
            </a>
            <a href="#engenheiro" className="text-voletron-navy font-medium hover:text-voletron-orange transition-colors text-sm">
              Engenheiro
            </a>
            <a href="#projetos" className="text-voletron-navy font-medium hover:text-voletron-orange transition-colors text-sm">
              Projetos
            </a>
            <a href="#confianca" className="text-voletron-navy font-medium hover:text-voletron-orange transition-colors text-sm">
              Diferenciais
            </a>
            <Button 
              asChild
              data-testid="header-cta-button"
              className="bg-voletron-orange hover:bg-voletron-orange-dark text-voletron-navy font-bold px-5 py-2.5 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              <WhatsAppLink location="header">
                <Phone className="w-4 h-4 mr-2" />
                Falar com Engenheiro
              </WhatsAppLink>
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
              <a href="#calculadora" className="text-voletron-navy font-medium px-4 py-2 hover:bg-slate-50" onClick={() => setMobileMenuOpen(false)}>
                Simulação
              </a>
              <a href="#engenheiro" className="text-voletron-navy font-medium px-4 py-2 hover:bg-slate-50" onClick={() => setMobileMenuOpen(false)}>
                Engenheiro
              </a>
              <a href="#projetos" className="text-voletron-navy font-medium px-4 py-2 hover:bg-slate-50" onClick={() => setMobileMenuOpen(false)}>
                Projetos
              </a>
              <a href="#confianca" className="text-voletron-navy font-medium px-4 py-2 hover:bg-slate-50" onClick={() => setMobileMenuOpen(false)}>
                Diferenciais
              </a>
              <div className="px-4 pt-2">
                <Button 
                  asChild
                  data-testid="mobile-cta-button"
                  className="w-full bg-voletron-orange hover:bg-voletron-orange-dark text-voletron-navy font-bold py-3 rounded-full"
                >
                  <WhatsAppLink location="mobile-menu">
                    <Phone className="w-4 h-4 mr-2" />
                    Falar com Engenheiro
                  </WhatsAppLink>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

// Hero Section - Updated with professional language
const HeroSection = () => {
  return (
    <section id="hero" className="hero-pattern min-h-screen pt-20 flex items-center" data-testid="hero-section">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="inline-block text-sm font-semibold tracking-widest uppercase text-voletron-orange animate-fade-in">
                Voletron Engenharia Elétrica
              </span>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight leading-tight text-voletron-navy animate-fade-in animate-delay-100">
                Projeto de energia solar com acompanhamento direto de <span className="text-voletron-orange">engenheiro</span>
              </h1>
            </div>
            
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed animate-fade-in animate-delay-200">
              Sistema dimensionado de forma técnica, com análise de consumo, 
              instalação profissional e homologação junto à concessionária.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in animate-delay-300">
              <Button 
                asChild
                className="bg-voletron-orange hover:bg-voletron-orange-dark text-voletron-navy font-bold text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <WhatsAppLink location="hero" testId="hero-primary-cta">
                  <Phone className="w-5 h-5 mr-2" />
                  Falar com o Engenheiro
                  <ArrowRight className="w-5 h-5 ml-2" />
                </WhatsAppLink>
              </Button>
              <Button 
                asChild
                variant="outline"
                data-testid="hero-secondary-cta"
                className="border-2 border-voletron-navy text-voletron-navy hover:bg-voletron-navy hover:text-white font-bold text-lg px-8 py-6 rounded-full transition-all duration-300"
              >
                <a href="#calculadora">
                  <Calculator className="w-5 h-5 mr-2" />
                  Simular Conta
                </a>
              </Button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4 pt-4 animate-fade-in animate-delay-400">
              <div className="flex items-center gap-2 bg-white/80 rounded-lg px-3 py-2 shadow-sm">
                <BadgeCheck className="w-5 h-5 text-voletron-orange" />
                <span className="text-sm text-slate-700">CREA-BA Ativo</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 rounded-lg px-3 py-2 shadow-sm">
                <Shield className="w-5 h-5 text-voletron-orange" />
                <span className="text-sm text-slate-700">NBR 5410</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 rounded-lg px-3 py-2 shadow-sm">
                <FileCheck className="w-5 h-5 text-voletron-orange" />
                <span className="text-sm text-slate-700">Homologação Inclusa</span>
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
                    <p className="text-sm text-slate-500">Atendimento direto</p>
                    <p className="font-heading text-xl font-bold text-voletron-navy">Sem intermediários</p>
                  </div>
                  <div className="icon-circle">
                    <User className="w-7 h-7 text-voletron-navy" />
                  </div>
                </div>
              </div>
            </div>
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 bg-voletron-navy text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
              +500 kWp instalados
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Commercial Calculator Section
const CommercialCalculatorSection = () => {
  const [ref, isVisible] = useScrollReveal();
  const [inputMode, setInputMode] = useState("kwh"); // "kwh" or "reais"
  const [selectedYear, setSelectedYear] = useState(2026);
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState(null);
  
  // Lead form state
  const [leadName, setLeadName] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [leadBillValue, setLeadBillValue] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const calculateSavings = () => {
    const value = parseFloat(inputValue);
    if (!value || value <= 0) return;

    const tarifaFioB = FIO_B_RATES[selectedYear];
    let consumoKwh, valorAtual, valorFinal, economia, descontoPercentual;

    if (inputMode === "kwh") {
      // Entrada em kWh
      consumoKwh = value;
      valorAtual = consumoKwh * TARIFA_CHEIA;
      valorFinal = consumoKwh * tarifaFioB;
      economia = valorAtual - valorFinal;
      descontoPercentual = (economia / valorAtual) * 100;
    } else {
      // Entrada em R$
      valorAtual = value;
      consumoKwh = valorAtual / TARIFA_CHEIA;
      valorFinal = consumoKwh * tarifaFioB;
      economia = valorAtual - valorFinal;
      descontoPercentual = (economia / valorAtual) * 100;
    }

    setResult({
      consumoKwh: consumoKwh.toFixed(0),
      valorAtual: valorAtual.toFixed(2),
      valorFinal: valorFinal.toFixed(2),
      economia: economia.toFixed(2),
      descontoPercentual: descontoPercentual.toFixed(1),
      tarifaFioB: tarifaFioB.toFixed(2),
      ano: selectedYear
    });
  };

  const handleLeadSubmit = (e) => {
    e.preventDefault();
    const message = `Olá! Meu nome é ${leadName}. Gostaria de uma análise técnica para meu projeto de energia solar. Minha conta de energia é aproximadamente R$ ${leadBillValue}. Meu telefone: ${leadPhone}`;
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    setFormSubmitted(true);
    window.open(whatsappUrl, '_blank');
    setTimeout(() => {
      setFormSubmitted(false);
      setLeadName("");
      setLeadPhone("");
      setLeadBillValue("");
    }, 3000);
  };

  const formatPhone = (value) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    return value;
  };

  return (
    <section id="calculadora" className="py-20 md:py-32 bg-white" data-testid="calculator-section">
      <div 
        ref={ref}
        className={`container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="text-center mb-12">
          <span className="text-sm font-semibold tracking-widest uppercase text-voletron-orange">
            Simulação comercial
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-voletron-navy mt-2">
            Simule sua economia com energia solar
          </h2>
          <p className="text-lg text-slate-600 mt-4 max-w-2xl mx-auto">
            Descubra quanto sua conta pode ficar com energia solar considerando a tarifa do Fio B.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Calculator */}
          <div className="bg-slate-50 rounded-2xl p-6 md:p-8" data-testid="commercial-calculator">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-voletron-orange/10 rounded-xl flex items-center justify-center">
                <Calculator className="w-6 h-6 text-voletron-orange" />
              </div>
              <h3 className="font-heading text-xl font-bold text-voletron-navy uppercase">
                Calculadora de Economia
              </h3>
            </div>

            {/* Mode Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Como deseja informar seu consumo?
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => { setInputMode("kwh"); setResult(null); setInputValue(""); }}
                  data-testid="mode-kwh-button"
                  className={`p-4 rounded-xl border-2 transition-all duration-200 text-center ${
                    inputMode === "kwh" 
                      ? "border-voletron-orange bg-voletron-orange/10 text-voletron-navy" 
                      : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                  }`}
                >
                  <Zap className="w-5 h-5 mx-auto mb-1" />
                  <span className="text-sm font-medium">Consumo em kWh</span>
                </button>
                <button
                  onClick={() => { setInputMode("reais"); setResult(null); setInputValue(""); }}
                  data-testid="mode-reais-button"
                  className={`p-4 rounded-xl border-2 transition-all duration-200 text-center ${
                    inputMode === "reais" 
                      ? "border-voletron-orange bg-voletron-orange/10 text-voletron-navy" 
                      : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                  }`}
                >
                  <DollarSign className="w-5 h-5 mx-auto mb-1" />
                  <span className="text-sm font-medium">Valor da conta (R$)</span>
                </button>
              </div>
            </div>

            {/* Year Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Ano de referência (tarifa Fio B)
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => { setSelectedYear(2026); setResult(null); }}
                  data-testid="year-2026-button"
                  className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                    selectedYear === 2026 
                      ? "border-voletron-navy bg-voletron-navy text-white" 
                      : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                  }`}
                >
                  <span className="font-bold">2026</span>
                  <span className="text-xs block">R$ 0,28/kWh</span>
                </button>
                <button
                  onClick={() => { setSelectedYear(2027); setResult(null); }}
                  data-testid="year-2027-button"
                  className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                    selectedYear === 2027 
                      ? "border-voletron-navy bg-voletron-navy text-white" 
                      : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                  }`}
                >
                  <span className="font-bold">2027</span>
                  <span className="text-xs block">R$ 0,31/kWh</span>
                </button>
              </div>
            </div>

            {/* Input Field */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                {inputMode === "kwh" ? "Consumo mensal em kWh" : "Valor atual da conta (R$)"}
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                  {inputMode === "kwh" ? "kWh" : "R$"}
                </span>
                <input
                  type="number"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={inputMode === "kwh" ? "Ex: 500" : "Ex: 650"}
                  className="w-full pl-14 pr-4 py-4 rounded-xl border border-slate-200 focus:border-voletron-orange focus:ring-2 focus:ring-voletron-orange/20 outline-none transition-all text-lg"
                  data-testid="calculator-input"
                />
              </div>
              {inputMode === "reais" && (
                <p className="text-xs text-slate-500 mt-2">
                  * Conversão estimada usando tarifa cheia de R$ 1,30/kWh
                </p>
              )}
            </div>

            <Button 
              onClick={calculateSavings}
              data-testid="calculate-button"
              className="w-full bg-voletron-navy hover:bg-voletron-navy-dark text-white font-bold text-lg py-5 rounded-xl transition-all duration-300"
            >
              <Calculator className="w-5 h-5 mr-2" />
              Simular Agora
            </Button>

            {/* Results */}
            {result && (
              <div className="mt-6 space-y-4 animate-fade-in" data-testid="calculator-result">
                {inputMode === "reais" && (
                  <div className="p-4 bg-white rounded-xl border border-slate-200">
                    <p className="text-sm text-slate-500">Consumo estimado</p>
                    <p className="font-heading text-2xl font-bold text-voletron-navy">
                      {result.consumoKwh} kWh/mês
                    </p>
                  </div>
                )}
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-voletron-orange/10 rounded-xl border-2 border-voletron-orange">
                    <p className="text-sm text-slate-600">Conta estimada após solar</p>
                    <p className="font-heading text-3xl font-bold text-voletron-orange">
                      R$ {result.valorFinal}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">Fio B {result.ano}: R$ {result.tarifaFioB}/kWh</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-xl border-2 border-green-500">
                    <p className="text-sm text-slate-600">Sua economia mensal</p>
                    <p className="font-heading text-3xl font-bold text-green-600">
                      R$ {result.economia}
                    </p>
                  </div>
                </div>

                <div className="p-5 bg-voletron-navy rounded-xl text-center">
                  <p className="text-white/70 text-sm">Desconto estimado</p>
                  <p className="font-heading text-5xl font-bold text-voletron-orange">
                    {result.descontoPercentual}%
                  </p>
                </div>

                <Button 
                  asChild
                  data-testid="calculator-cta"
                  className="w-full bg-whatsapp hover:bg-whatsapp-dark text-white font-bold py-5 rounded-xl transition-all"
                >
                  <WhatsAppLink location="calculator-result">
                    <Phone className="w-5 h-5 mr-2" />
                    Quero meu projeto com simulação real
                  </WhatsAppLink>
                </Button>

                <div className="flex items-start gap-2 p-3 bg-slate-100 rounded-lg">
                  <AlertCircle className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-500">
                    Simulação comercial estimada. Valores podem variar conforme tributos, custo de disponibilidade, bandeira tarifária e regras da concessionária.
                  </p>
                </div>
              </div>
            )}

            {!result && (
              <p className="text-sm text-slate-500 text-center mt-4">
                Simulação estimada baseada na tarifa do Fio B. Para um dimensionamento preciso, fale diretamente com o engenheiro.
              </p>
            )}
          </div>

          {/* Lead Capture Form */}
          <div className="bg-voletron-navy rounded-2xl p-6 md:p-8" data-testid="lead-form">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                <Send className="w-6 h-6 text-voletron-orange" />
              </div>
              <h3 className="font-heading text-xl font-bold text-white uppercase">
                Solicitar Análise Técnica
              </h3>
            </div>

            <p className="text-white/70 mb-6">
              Preencha seus dados para receber uma proposta personalizada diretamente do engenheiro responsável.
            </p>

            {formSubmitted ? (
              <div className="text-center py-12" data-testid="form-success">
                <div className="w-20 h-20 bg-whatsapp/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-10 h-10 text-whatsapp" />
                </div>
                <h4 className="font-heading text-2xl font-bold text-white mb-2">Dados enviados!</h4>
                <p className="text-white/70">Você será redirecionado para o WhatsApp.</p>
              </div>
            ) : (
              <form onSubmit={handleLeadSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Seu nome
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      value={leadName}
                      onChange={(e) => setLeadName(e.target.value)}
                      placeholder="Digite seu nome"
                      required
                      className="w-full pl-12 pr-4 py-4 rounded-xl border-0 focus:ring-2 focus:ring-voletron-orange outline-none transition-all text-lg"
                      data-testid="lead-name-input"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Telefone / WhatsApp
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="tel"
                      value={leadPhone}
                      onChange={(e) => setLeadPhone(formatPhone(e.target.value))}
                      placeholder="(71) 99999-9999"
                      required
                      className="w-full pl-12 pr-4 py-4 rounded-xl border-0 focus:ring-2 focus:ring-voletron-orange outline-none transition-all text-lg"
                      data-testid="lead-phone-input"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Valor médio da conta de energia (R$)
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="number"
                      value={leadBillValue}
                      onChange={(e) => setLeadBillValue(e.target.value)}
                      placeholder="Ex: 500"
                      required
                      className="w-full pl-12 pr-4 py-4 rounded-xl border-0 focus:ring-2 focus:ring-voletron-orange outline-none transition-all text-lg"
                      data-testid="lead-bill-input"
                    />
                  </div>
                </div>

                <Button 
                  type="submit"
                  data-testid="lead-submit-button"
                  className="w-full bg-voletron-orange hover:bg-voletron-orange-dark text-voletron-navy font-bold text-lg py-5 rounded-xl transition-all duration-300 transform hover:scale-[1.02]"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Receber proposta personalizada
                </Button>

                <p className="text-xs text-white/50 text-center">
                  Ao enviar, você será direcionado ao WhatsApp para falar diretamente com o engenheiro.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// Technical Benefits Section
const TechnicalBenefitsSection = () => {
  const [ref, isVisible] = useScrollReveal();

  const benefits = [
    {
      icon: Settings,
      title: "Projeto personalizado",
      description: "Sistema dimensionado conforme seu consumo real e perfil de uso."
    },
    {
      icon: Calculator,
      title: "Dimensionamento correto",
      description: "Cálculo técnico preciso para máxima eficiência do sistema."
    },
    {
      icon: Shield,
      title: "Segurança elétrica",
      description: "Instalação conforme NBR 5410 e normas da concessionária."
    },
    {
      icon: Wrench,
      title: "Suporte técnico completo",
      description: "Acompanhamento do início ao fim, sem dúvidas técnicas."
    },
    {
      icon: FileCheck,
      title: "Homologação junto à concessionária",
      description: "Toda a burocracia resolvida pelo engenheiro responsável."
    },
    {
      icon: Clock,
      title: "Cronograma definido",
      description: "Prazos claros e cumpridos em todas as etapas do projeto."
    }
  ];

  return (
    <section id="beneficios" className="py-20 md:py-28 bg-slate-50" data-testid="benefits-section">
      <div 
        ref={ref}
        className={`container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="text-center mb-14">
          <span className="text-sm font-semibold tracking-widest uppercase text-voletron-orange">
            Metodologia técnica
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-voletron-navy mt-2">
            Como trabalhamos
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="benefit-card bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300"
              data-testid={`benefit-card-${index}`}
            >
              <div className="w-12 h-12 bg-voletron-orange/10 rounded-xl flex items-center justify-center mb-4">
                <benefit.icon className="w-6 h-6 text-voletron-orange" />
              </div>
              <h3 className="font-heading text-lg font-bold text-voletron-navy mb-2 uppercase">
                {benefit.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Band */}
        <div className="mt-14 cta-band rounded-2xl p-8 md:p-10 text-center" data-testid="benefits-cta-band">
          <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-3 uppercase">
            Fale diretamente com o engenheiro responsável
          </h3>
          <p className="text-white/80 mb-6 max-w-2xl mx-auto">
            Sem intermediários, sem dúvidas técnicas. Projeto dimensionado conforme normas e perfil de consumo.
          </p>
          <Button 
            asChild
            data-testid="benefits-cta-button"
            className="bg-voletron-orange hover:bg-voletron-orange-dark text-voletron-navy font-bold text-lg px-10 py-5 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <WhatsAppLink location="benefits-cta">
              <Phone className="w-5 h-5 mr-2" />
              Solicitar Análise Técnica
            </WhatsAppLink>
          </Button>
        </div>
      </div>
    </section>
  );
};

// About Engineer Section - Compact and Professional
const AboutEngineerSection = () => {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section id="engenheiro" className="py-20 md:py-28 bg-white" data-testid="engineer-section">
      <div 
        ref={ref}
        className={`container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-start">
          {/* Left - Photo (Compact) */}
          <div className="lg:col-span-2">
            <div className="max-w-sm mx-auto lg:mx-0">
              {/* Main Photo */}
              <div className="rounded-2xl overflow-hidden shadow-lg mb-4">
                <img 
                  src={ENGINEER_PHOTOS.main}
                  alt="Diego Teixeira - Engenheiro Eletricista"
                  className="w-full h-72 object-cover object-top"
                  data-testid="engineer-photo-main"
                />
              </div>
              {/* Small gallery */}
              <div className="grid grid-cols-3 gap-2">
                <div className="rounded-lg overflow-hidden shadow-sm">
                  <img 
                    src={ENGINEER_PHOTOS.braskem}
                    alt="Diego na Braskem"
                    className="w-full h-20 object-cover object-top"
                  />
                </div>
                <div className="rounded-lg overflow-hidden shadow-sm">
                  <img 
                    src={ENGINEER_PHOTOS.field}
                    alt="Diego em campo"
                    className="w-full h-20 object-cover object-top"
                  />
                </div>
                <div className="rounded-lg overflow-hidden shadow-sm">
                  <img 
                    src={ENGINEER_PHOTOS.bay}
                    alt="Painéis elétricos"
                    className="w-full h-20 object-cover"
                  />
                </div>
              </div>
              {/* Badge */}
              <div className="mt-4 bg-voletron-navy text-white rounded-xl px-4 py-3 flex items-center justify-center gap-3">
                <Award className="w-5 h-5 text-voletron-orange" />
                <span className="font-heading font-bold uppercase text-sm">CREA-BA Ativo</span>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div className="lg:col-span-3 space-y-6">
            <div>
              <span className="text-sm font-semibold tracking-widest uppercase text-voletron-orange">
                Responsável técnico
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase tracking-tight text-voletron-navy mt-2">
                Sobre o Engenheiro
              </h2>
            </div>

            <div className="bg-slate-50 rounded-xl p-5 border-l-4 border-voletron-orange">
              <p className="text-lg text-slate-700 leading-relaxed">
                Sou <strong className="text-voletron-navy">Diego Teixeira</strong>, engenheiro eletricista com mais de <strong className="text-voletron-orange">5 anos de experiência</strong> no setor elétrico, atuando em grandes empresas como <strong>Braskem, Cetrel e Usinazul</strong>, com foco em projetos, manutenção e confiabilidade de sistemas elétricos.
              </p>
            </div>

            <p className="text-slate-600 leading-relaxed">
              Ao longo da minha trajetória, já participei e executei projetos que somam mais de <strong className="text-voletron-navy">500 kWp em sistemas de energia solar</strong>, sempre priorizando qualidade, segurança e desempenho.
            </p>

            <p className="text-slate-600 leading-relaxed">
              Hoje, meu trabalho é oferecer <strong className="text-voletron-navy">soluções completas em energia solar</strong>, com atendimento direto ao cliente, sem intermediários, garantindo um projeto bem dimensionado, instalação segura e acompanhamento em todas as etapas, desde a análise até a homologação junto à concessionária.
            </p>

            <div className="bg-voletron-orange/10 rounded-xl p-5">
              <p className="text-voletron-navy font-medium italic">
                "Meu objetivo é entregar não apenas economia na conta de energia, mas um sistema confiável, durável e tecnicamente bem executado."
              </p>
              <p className="text-voletron-orange font-bold mt-2 text-sm">— Eng. Diego Teixeira</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 shadow-sm border border-slate-100">
                <BadgeCheck className="w-4 h-4 text-voletron-orange" />
                <span className="text-sm text-slate-700">Braskem</span>
              </div>
              <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 shadow-sm border border-slate-100">
                <BadgeCheck className="w-4 h-4 text-voletron-orange" />
                <span className="text-sm text-slate-700">Cetrel</span>
              </div>
              <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 shadow-sm border border-slate-100">
                <BadgeCheck className="w-4 h-4 text-voletron-orange" />
                <span className="text-sm text-slate-700">Usinazul</span>
              </div>
              <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 shadow-sm border border-slate-100">
                <BadgeCheck className="w-4 h-4 text-voletron-orange" />
                <span className="text-sm text-slate-700">+500 kWp</span>
              </div>
            </div>

            <Button 
              asChild
              data-testid="engineer-cta"
              className="bg-voletron-orange hover:bg-voletron-orange-dark text-voletron-navy font-bold text-lg px-8 py-5 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <WhatsAppLink location="engineer-section">
                <Phone className="w-5 h-5 mr-2" />
                Tirar dúvidas com especialista
              </WhatsAppLink>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

// Why Choose an Engineer Section
const WhyEngineerSection = () => {
  const [ref, isVisible] = useScrollReveal();

  const reasons = [
    {
      icon: Settings,
      title: "Evita dimensionamento incorreto",
      description: "Projeto calculado corretamente para atender seu consumo real."
    },
    {
      icon: Shield,
      title: "Garante segurança da instalação",
      description: "Sistema elétrico conforme normas técnicas vigentes."
    },
    {
      icon: AlertCircle,
      title: "Reduz riscos técnicos e retrabalho",
      description: "Menos problemas e custos extras no futuro."
    },
    {
      icon: Clock,
      title: "Projeto pensado para longo prazo",
      description: "Sistema durável com garantia de performance."
    }
  ];

  return (
    <section id="confianca" className="py-20 md:py-28 bg-voletron-navy" data-testid="why-engineer-section">
      <div 
        ref={ref}
        className={`container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="text-center mb-12">
          <span className="text-sm font-semibold tracking-widest uppercase text-voletron-orange">
            Segurança e qualidade
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-white mt-2">
            Por que escolher um engenheiro para seu projeto solar?
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, index) => (
            <div 
              key={index}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/10 transition-all duration-300"
              data-testid={`reason-card-${index}`}
            >
              <div className="w-14 h-14 bg-voletron-orange/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <reason.icon className="w-7 h-7 text-voletron-orange" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white mb-2 uppercase">
                {reason.title}
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            asChild
            data-testid="why-engineer-cta"
            className="bg-voletron-orange hover:bg-voletron-orange-dark text-voletron-navy font-bold text-lg px-10 py-5 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <WhatsAppLink location="why-engineer-section">
              <Phone className="w-5 h-5 mr-2" />
              Falar com o Engenheiro
            </WhatsAppLink>
          </Button>
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
    <section id="projetos" className="py-20 md:py-28 bg-slate-50" data-testid="projects-section">
      <div 
        ref={ref}
        className={`container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="text-center mb-14">
          <span className="text-sm font-semibold tracking-widest uppercase text-voletron-orange">
            Projetos executados
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-voletron-navy mt-2">
            Trabalhos realizados
          </h2>
          <p className="text-lg text-slate-600 mt-4 max-w-2xl mx-auto">
            Veja alguns dos sistemas que já instalamos em Salvador, Lauro de Freitas, 
            Camaçari e região metropolitana.
          </p>
        </div>

        {/* Video Section */}
        <div className="mb-10" data-testid="video-section">
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
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {PROJECT_IMAGES.map((project, index) => (
            <div 
              key={index}
              className="project-card rounded-xl overflow-hidden shadow-md bg-white"
              data-testid={`project-card-${index}`}
            >
              <div className="aspect-square overflow-hidden">
                <img 
                  src={project.url}
                  alt={project.title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <p className="font-heading font-bold text-voletron-navy">{project.title}</p>
                <p className="text-sm text-slate-500">{project.location}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Button 
            asChild
            data-testid="projects-cta-button"
            className="bg-voletron-navy hover:bg-voletron-navy-dark text-white font-bold text-lg px-10 py-5 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <WhatsAppLink location="projects-section">
              <Phone className="w-5 h-5 mr-2" />
              Solicitar proposta personalizada
            </WhatsAppLink>
          </Button>
        </div>
      </div>
    </section>
  );
};

// Final CTA Section
const FinalCTASection = () => {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section className="py-20 md:py-28 bg-voletron-navy relative overflow-hidden" data-testid="final-cta-section">
      {/* Background */}
      <div className="absolute inset-0">
        <img 
          src="https://images.pexels.com/photos/6961215/pexels-photo-6961215.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          alt=""
          className="w-full h-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-voletron-navy via-voletron-navy/95 to-voletron-navy/90" />
      </div>

      <div 
        ref={ref}
        className={`container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl relative z-10 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <span className="inline-block text-sm font-semibold tracking-widest uppercase text-voletron-orange mb-4">
          Acompanhamento completo
        </span>
        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-white max-w-4xl mx-auto">
          Soluções completas em energia solar com <span className="text-voletron-orange">responsabilidade técnica</span>
        </h2>
        <p className="text-lg text-white/80 mt-6 max-w-2xl mx-auto">
          Acompanhamento completo do início à homologação. 
          Fale agora com o engenheiro Diego Teixeira e receba uma proposta personalizada.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <Button 
            asChild
            data-testid="final-cta-whatsapp"
            className="bg-whatsapp hover:bg-whatsapp-dark text-white font-bold text-xl px-12 py-6 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 whatsapp-pulse"
          >
            <WhatsAppLink location="final-cta">
              <Phone className="w-6 h-6 mr-3" />
              Falar com o Engenheiro
            </WhatsAppLink>
          </Button>
        </div>

        <div className="flex flex-wrap justify-center gap-6 mt-10 text-white/70">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-voletron-orange" />
            <span>Análise técnica gratuita</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-voletron-orange" />
            <span>Sem compromisso</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-voletron-orange" />
            <span>Atendimento direto</span>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  return (
    <footer className="bg-voletron-navy-dark py-10" data-testid="footer">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Logo and Description */}
          <div>
            <img 
              src={LOGO_URL} 
              alt="Voletron Engenharia Elétrica" 
              className="h-10 mb-4 brightness-0 invert"
              data-testid="footer-logo"
            />
            <p className="text-white/60 text-sm">
              Engenharia elétrica especializada em energia solar. 
              Atendendo Salvador, Lauro de Freitas, Camaçari e Mata de São João.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-white uppercase mb-4 text-sm">Links Rápidos</h4>
            <nav className="space-y-2">
              <a href="#calculadora" className="footer-link block text-sm">Simulação</a>
              <a href="#beneficios" className="footer-link block text-sm">Como Trabalhamos</a>
              <a href="#engenheiro" className="footer-link block text-sm">Sobre o Engenheiro</a>
              <a href="#projetos" className="footer-link block text-sm">Projetos</a>
              <WhatsAppLink location="footer-nav" className="footer-link block text-sm">Contato</WhatsAppLink>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-bold text-white uppercase mb-4 text-sm">Contato</h4>
            <div className="space-y-3">
              <WhatsAppLink 
                location="footer-contact"
                className="flex items-center gap-2 text-white/60 hover:text-voletron-orange transition-colors text-sm"
                testId="footer-whatsapp"
              >
                <Phone className="w-4 h-4" />
                (71) 99919-2508
              </WhatsAppLink>
              <p className="text-white/60 text-sm">
                Salvador - BA e região metropolitana
              </p>
              <p className="text-white/60 text-sm">
                Eng. Diego Teixeira - CREA-BA
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/40 text-xs">
              © {new Date().getFullYear()} Voletron Engenharia Elétrica. Todos os direitos reservados.
            </p>
            <p className="text-white/40 text-xs">
              CREA-BA • Eng. Diego Teixeira
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Floating WhatsApp Button
const FloatingWhatsApp = () => {
  const handleClick = () => {
    trackWhatsAppClick('floating-button');
  };

  return (
    <a 
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="floating-whatsapp"
      data-testid="floating-whatsapp"
      onClick={handleClick}
    >
      <div className="bg-whatsapp hover:bg-whatsapp-dark text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110">
        <Phone className="w-7 h-7" />
      </div>
    </a>
  );
};

// Analytics Scripts Component
const AnalyticsScripts = () => {
  useEffect(() => {
    // Google Analytics 4
    if (!document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}"]`)) {
      const gaScript = document.createElement('script');
      gaScript.async = true;
      gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      document.head.appendChild(gaScript);

      gaScript.onload = () => {
        window.dataLayer = window.dataLayer || [];
        window.gtag = function() { window.dataLayer.push(arguments); };
        window.gtag('js', new Date());
        window.gtag('config', GA_MEASUREMENT_ID, {
          page_title: 'Voletron Engenharia Elétrica - Energia Solar',
          send_page_view: true
        });
        console.log('Google Analytics GA4 initialized:', GA_MEASUREMENT_ID);
      };
    }

    // Facebook Pixel - Check if already initialized
    if (!window.fbq) {
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      
      window.fbq('init', FB_PIXEL_ID);
      window.fbq('track', 'PageView');
      console.log('Facebook Pixel initialized:', FB_PIXEL_ID);
    } else {
      // Pixel already loaded, just track PageView
      window.fbq('track', 'PageView');
      console.log('Facebook Pixel already loaded, PageView tracked');
    }

  }, []);

  return null;
};

// Main App
function App() {
  return (
    <div className="App font-body">
      <AnalyticsScripts />
      <Header />
      <main>
        <HeroSection />
        <CommercialCalculatorSection />
        <TechnicalBenefitsSection />
        <AboutEngineerSection />
        <WhyEngineerSection />
        <ProjectsSection />
        <FinalCTASection />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

export default App;
