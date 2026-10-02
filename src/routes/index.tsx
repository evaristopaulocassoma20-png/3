import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CirclePlay,
  CreditCard,
  Handshake,
  Laptop,
  Megaphone,
  MonitorPlay,
  QrCode,
  Settings2,
  Star,
  TicketCheck,
  UserRound,
  Users,
} from "lucide-react";

import heroImage from "@/assets/eventpro-hero.jpg";
import inPersonImage from "@/assets/event-presencial.jpg";
import virtualImage from "@/assets/event-virtual.jpg";
import hybridImage from "@/assets/event-hibrido.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EventPro — Eventos que conectam pessoas e negócios" },
      {
        name: "description",
        content:
          "Crie, personalize e gira eventos presenciais, virtuais e híbridos com a EventPro.",
      },
      { property: "og:title", content: "EventPro — O seu evento, do seu jeito" },
      {
        property: "og:description",
        content: "Uma plataforma completa para transformar ideias em experiências inesquecíveis.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EventProPage,
});

const features = [
  { icon: MonitorPlay, title: "Site personalizado do evento", text: "O seu evento com a sua marca, cores e identidade visual." },
  { icon: TicketCheck, title: "Gestão de inscrições e bilhetes", text: "Controlo total de vendas e participantes." },
  { icon: QrCode, title: "Check-in e credenciamento", text: "Entrada rápida e segura com QR Code." },
  { icon: CreditCard, title: "Pagamento online", text: "Receba pagamentos de forma prática e segura." },
  { icon: Handshake, title: "Patrocinadores e expositores", text: "Valorize os seus parceiros e aumente o alcance." },
  { icon: BarChart3, title: "Relatórios e estatísticas", text: "Acompanhe os resultados em tempo real." },
];

const steps = [
  { icon: UserRound, title: "Escolha o plano", text: "Selecione o plano ideal para o seu evento." },
  { icon: Settings2, title: "Personalize o seu evento", text: "Configure informações, cores e conteúdos." },
  { icon: Megaphone, title: "Divulgue e venda ingressos", text: "Partilhe o seu evento e receba inscrições." },
  { icon: BarChart3, title: "Acompanhe tudo em tempo real", text: "Gira participantes, pagamentos e muito mais." },
];

const eventTypes = [
  { title: "Presenciais", text: "Organize eventos no local, com controlo de acesso, credenciamento e muito mais.", image: inPersonImage, icon: UserRound },
  { title: "Virtuais", text: "Conecte pessoas de qualquer lugar do mundo com uma experiência completa e segura.", image: virtualImage, icon: MonitorPlay },
  { title: "Híbridos", text: "Una o melhor dos dois mundos: presencial e virtual.", image: hybridImage, icon: Laptop },
];

const testimonials = [
  { quote: "A plataforma superou todas as nossas expectativas. O processo foi simples e o suporte é excelente!", name: "Mariana Silva", role: "Diretora de Eventos — AngoTech", initials: "MS" },
  { quote: "Conseguimos organizar nosso evento híbrido com total facilidade. A equipa da EventPro é incrível!", name: "Carlos Mendes", role: "CEO — Business Angola", initials: "CM" },
  { quote: "A personalização do site e o controlo de acesso foram fundamentais para o sucesso do nosso evento.", name: "Patrícia Costa", role: "Gestora de Projetos — ExpoLuanda", initials: "PC" },
];

function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <span />
      <span />
      <span />
    </span>
  );
}

function EventProPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <header className="site-header">
        <div className="site-container flex h-20 items-center justify-between">
          <a href="#inicio" className="flex items-center gap-3" aria-label="EventPro — início">
            <BrandMark />
            <span>
              <span className="block text-[1.35rem] font-extrabold leading-none">Event<span className="text-primary">Pro</span></span>
              <span className="mt-1 block text-[0.57rem] text-muted-foreground">Eventos que conectam pessoas e negócios</span>
            </span>
          </a>
          <nav className="hidden items-center gap-8 text-sm font-medium lg:flex" aria-label="Navegação principal">
            <a className="nav-link active" href="#inicio">Início</a>
            <Link className="nav-link" to="/funcionalidades">Funcionalidades</Link>
            <Link className="nav-link" to="/planos">Planos</Link>
            <a className="nav-link" href="#eventos">Exemplos</a>
            <Link className="nav-link" to="/sobre">Sobre</Link>
            <a className="nav-link" href="#contacto">Contacto</a>
          </nav>
          <div className="flex items-center gap-2.5">
            <a href="#contacto" className="btn-outline hidden sm:inline-flex">Entrar</a>
            <a href="#contacto" className="btn-primary">Criar Conta</a>
          </div>
        </div>
      </header>

      <section id="inicio" className="hero-section">
        <img src={heroImage} width={1600} height={1008} alt="Grande conferência empresarial com palco iluminado" className="hero-image" />
        <div className="hero-shade" />
        <div className="site-container relative z-10 flex min-h-[610px] items-center py-16 sm:min-h-[680px] lg:min-h-[720px]">
          <div className="max-w-[610px] pt-8">
            <p className="eyebrow"><span className="eyebrow-dot" /> Plataforma de eventos</p>
            <h1 className="mt-5 text-5xl font-extrabold leading-[0.98] sm:text-6xl lg:text-7xl">O seu evento,<br /><span className="text-primary">do seu jeito.</span></h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-copy sm:text-lg">A EventPro é uma plataforma completa para você criar, gerir e personalizar eventos híbridos e virtuais. Com tecnologia, simplicidade e suporte especializado, transformamos a sua ideia em uma experiência inesquecível.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#contacto" className="btn-primary btn-large">Comece Agora <ArrowRight size={17} /></a>
              <a href="#eventos" className="btn-outline btn-large">Ver Demonstração <CirclePlay size={18} /></a>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-7 gap-y-3 text-xs text-copy">
              <span className="flex items-center gap-2"><Users size={17} className="text-primary" /> Eventos presenciais</span>
              <span className="flex items-center gap-2"><MonitorPlay size={17} className="text-primary" /> Eventos virtuais</span>
              <span className="flex items-center gap-2"><Laptop size={17} className="text-primary" /> Eventos híbridos</span>
            </div>
          </div>
        </div>
      </section>

      <section id="funcionalidades" className="section-border py-16 lg:py-20">
        <div className="site-container grid gap-12 lg:grid-cols-[0.9fr_1.9fr] lg:gap-16">
          <div>
            <p className="section-kicker">Por que escolher a EventPro?</p>
            <h2 className="section-title mt-3">Tudo o que você precisa<br />em um só lugar.</h2>
            <p className="mt-5 max-w-md text-sm leading-6 text-copy">Nossa plataforma oferece todas as ferramentas que você precisa para organizar eventos de forma simples, segura e profissional.</p>
            <Link to="/funcionalidades" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">Conheça todas as funcionalidades <ArrowRight size={16} /></Link>
          </div>
          <div className="grid gap-x-8 gap-y-9 sm:grid-cols-2 xl:grid-cols-3">
            {features.map(({ icon: Icon, title, text }) => (
              <article key={title} className="flex gap-4">
                <span className="icon-disc"><Icon size={22} /></span>
                <div><h3 className="text-sm font-semibold">{title}</h3><p className="mt-2 text-xs leading-5 text-muted-foreground">{text}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="como-funciona" className="section-border py-16 lg:py-20">
        <div className="site-container">
          <h2 className="section-title">Como funciona?</h2>
          <p className="mt-2 text-sm text-muted-foreground">Em poucos passos, o seu evento está no ar.</p>
          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-0">
            {steps.map(({ icon: Icon, title, text }, index) => (
              <article key={title} className="step-item relative lg:pr-8">
                <span className="step-icon"><Icon size={24} /></span>
                <span className="step-number">{index + 1}</span>
                <div className="mt-4 pl-12"><h3 className="text-sm font-semibold">{title}</h3><p className="mt-2 text-xs leading-5 text-muted-foreground">{text}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="eventos" className="section-border py-16 lg:py-20">
        <div className="site-container">
          <h2 className="section-title">Tipos de Eventos</h2>
          <p className="mt-2 text-sm text-muted-foreground">Seja qual for o seu objetivo, temos a solução ideal.</p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {eventTypes.map(({ title, text, image, icon: Icon }) => (
              <article key={title} className="event-card">
                <div className="relative h-48 overflow-hidden"><img src={image} width={1200} height={704} loading="lazy" alt={`Evento ${title.toLowerCase()}`} className="h-full w-full object-cover transition duration-500 hover:scale-105" /><span className="event-icon"><Icon size={22} /></span></div>
                <div className="p-6"><h3 className="text-xl font-bold">{title}</h3><p className="mt-3 min-h-12 text-sm leading-6 text-copy">{text}</p><a href="#contacto" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">Saiba mais <ArrowRight size={15} /></a></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="sobre" className="metrics-band section-border py-12 lg:py-14">
        <div className="site-container grid items-center gap-10 lg:grid-cols-[1.2fr_2fr]">
          <div><p className="section-kicker">Números que falam por si</p><h2 className="section-title mt-3">Mais do que uma plataforma,<br />somos o seu parceiro de eventos.</h2></div>
          <div className="grid grid-cols-2 gap-y-8 sm:grid-cols-4">
            {[{ icon: CalendarDays, value: "+500", label: "Eventos realizados" }, { icon: Users, value: "+200K", label: "Participantes conectados" }, { icon: Star, value: "+98%", label: "Satisfação dos clientes" }, { icon: Handshake, value: "+50", label: "Empresas parceiras" }].map(({ icon: Icon, value, label }) => (
              <div key={label} className="metric"><Icon size={27} /><strong>{value}</strong><span>{label}</span></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-border py-16">
        <div className="site-container">
          <h2 className="section-title">O que nossos clientes dizem</h2>
          <p className="mt-2 text-sm text-muted-foreground">A confiança de quem já viveu grandes eventos com a EventPro.</p>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {testimonials.map((item) => (
              <article key={item.name} className="testimonial">
                <span className="quote-mark">“</span>
                <blockquote className="min-h-20 text-sm leading-6 text-copy">“{item.quote}”</blockquote>
                <div className="mt-6 flex items-center gap-3"><span className="avatar">{item.initials}</span><div><strong className="block text-sm">{item.name}</strong><span className="text-[0.68rem] text-muted-foreground">{item.role}</span></div></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer id="contacto" className="section-border">
        <div className="site-container flex flex-col items-start justify-between gap-8 py-10 md:flex-row md:items-center">
          <a href="#inicio" className="flex items-center gap-3"><BrandMark /><span><span className="block text-xl font-extrabold">Event<span className="text-primary">Pro</span></span><span className="block text-[0.56rem] text-muted-foreground">Eventos que conectam pessoas e negócios</span></span></a>
          <div><strong className="text-sm">Pronto para criar o seu próximo grande evento?</strong><p className="mt-1 text-xs text-muted-foreground">Junte-se a centenas de empresas que já confiam na EventPro.</p></div>
          <a href="mailto:ola@eventpro.ao" className="btn-primary btn-large">Criar Conta Agora <ArrowRight size={17} /></a>
        </div>
        <div className="site-container flex flex-col gap-4 border-t border-border py-6 text-[0.65rem] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 EventPro. Todos os direitos reservados.</span><div className="flex flex-wrap gap-5"><a href="#inicio">Termos de Uso</a><a href="#inicio">Política de Privacidade</a><a href="mailto:ola@eventpro.ao">Suporte</a></div>
        </div>
      </footer>
    </main>
  );
}