import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowUp,
  BadgeCheck,
  Building2,
  ChevronDown,
  Clock,
  Facebook,
  Headset,
  HelpCircle,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
  Tag,
  User,
  Youtube,
} from "lucide-react";

import heroImage from "@/assets/contacto-hero.jpg";
import buildingImage from "@/assets/contacto-edificio.jpg";
import mapImage from "@/assets/contacto-mapa.jpg";

export const Route = createFileRoute("/contactos")({
  head: () => ({
    meta: [
      { title: "Contactos — EventPro" },
      {
        name: "description",
        content:
          "Fale com a equipa da EventPro: telefone, e-mail, WhatsApp e escritórios em Luanda. Estamos aqui para ajudar o seu evento do início ao fim.",
      },
      { property: "og:title", content: "Contactos — EventPro" },
      {
        property: "og:description",
        content: "Tire as suas dúvidas, solicite uma demonstração ou fale com a nossa equipa.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactosPage,
});

function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <span />
      <span />
      <span />
    </span>
  );
}

const heroBadges = [
  { icon: Headset, title: "Suporte rápido", text: "e eficiente" },
  { icon: BadgeCheck, title: "Atendimento", text: "especializado" },
  { icon: Sparkles, title: "Soluções", text: "personalizadas" },
  { icon: ShieldCheck, title: "Acompanhamento", text: "em todo o processo" },
];

const contactCards = [
  {
    icon: Phone,
    title: "Telefone",
    lines: ["+244 923 456 789", "+244 912 345 678"],
    note: "Segunda a Sexta • 08h às 18h",
  },
  {
    icon: Mail,
    title: "E-mail",
    lines: ["geral@eventpro.co.ao", "suporte@eventpro.co.ao"],
    note: "Resposta em até 24h",
  },
  {
    icon: MapPin,
    title: "Endereço",
    lines: ["Rua das Tecnologias, Nº 123", "Bairro Ingombota, Luanda – Angola"],
    note: "Visite-nos",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    lines: ["+244 923 456 789"],
    note: "Atendimento rápido",
  },
];

const subjects = [
  "Solicitar uma demonstração",
  "Dúvidas sobre planos e preços",
  "Suporte técnico",
  "Parcerias e patrocínios",
  "Outro assunto",
];

const locations = [
  {
    title: "Sede Principal – Luanda",
    lines: ["Rua das Tecnologias, Nº 123", "Bairro Ingombota, Luanda – Angola"],
  },
  {
    title: "Escritório de Suporte",
    lines: ["Av. Revolução de Outubro, Nº 456", "Maianga, Luanda – Angola"],
  },
];

function ContactosPage() {
  const [sent, setSent] = useState(false);

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <header className="site-header">
        <div className="site-container flex h-20 items-center justify-between">
          <Link to="/" className="flex items-center gap-3" aria-label="EventPro — início">
            <BrandMark />
            <span>
              <span className="block text-[1.35rem] font-extrabold leading-none">
                Event<span className="text-primary">Pro</span>
              </span>
              <span className="mt-1 block text-[0.57rem] text-muted-foreground">
                Eventos que conectam pessoas e negócios
              </span>
            </span>
          </Link>
          <nav className="hidden items-center gap-8 text-sm font-medium lg:flex" aria-label="Navegação principal">
            <Link className="nav-link" to="/">Início</Link>
            <Link className="nav-link" to="/funcionalidades">Funcionalidades</Link>
            <Link className="nav-link" to="/planos">Planos</Link>
            <a className="nav-link" href="/#eventos">Exemplos</a>
            <Link className="nav-link" to="/sobre">Sobre</Link>
            <Link className="nav-link active" to="/contactos">Contactos</Link>
          </nav>
          <div className="flex items-center gap-2.5">
            <a href="#formulario" className="btn-outline hidden sm:inline-flex">Entrar</a>
            <a href="#formulario" className="btn-primary">Criar Conta</a>
          </div>
        </div>
      </header>

      <section className="hero-section">
        <img
          src={heroImage}
          width={1200}
          height={912}
          alt="Operadora de suporte da EventPro com auscultadores"
          className="hero-image"
        />
        <div className="hero-shade" />
        <div className="site-container relative z-10 flex min-h-[520px] items-center py-24 sm:min-h-[560px]">
          <div className="max-w-[560px] pt-10">
            <p className="eyebrow"><span className="eyebrow-dot" /> Contacto</p>
            <h1 className="mt-5 text-5xl font-extrabold leading-[0.98] sm:text-6xl">
              Estamos aqui<br /><span className="text-primary">para ajudar.</span>
            </h1>
            <p className="mt-6 max-w-md text-base leading-7 text-copy">
              Tire as suas dúvidas, solicite uma demonstração ou fale com a nossa equipa.
              Estamos prontos para apoiar o seu evento do início ao fim.
            </p>
            <div className="mt-9 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
              {heroBadges.map(({ icon: Icon, title, text }) => (
                <div key={title} className="flex items-center gap-2.5">
                  <span className="icon-disc" style={{ width: 40, height: 40, flexBasis: 40 }}>
                    <Icon size={18} />
                  </span>
                  <span className="text-[0.68rem] font-semibold leading-tight">
                    {title}<br />
                    <span className="font-normal text-muted-foreground">{text}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-border py-16 lg:py-20">
        <div className="site-container grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
          <div>
            <p className="section-kicker">Fale connosco</p>
            <h2 className="section-title mt-3">Os nossos contactos</h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-copy">
              Escolha o canal que preferir. Estamos disponíveis para atender você.
            </p>
            <div className="mt-8 grid gap-4">
              {contactCards.map(({ icon: Icon, title, lines, note }) => (
                <article key={title} className="contact-card">
                  <span className="contact-icon"><Icon size={20} /></span>
                  <div>
                    <h3 className="text-sm font-bold">{title}</h3>
                    {lines.map((line) => (
                      <p key={line} className="mt-0.5 text-[0.82rem] text-copy">{line}</p>
                    ))}
                    <p className="mt-1.5 flex items-center gap-1.5 text-[0.68rem] text-primary">
                      <Clock size={12} /> {note}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div id="formulario" className="panel-card scroll-mt-28 p-6 sm:p-8">
            <p className="section-kicker">Envie uma mensagem</p>
            <h2 className="section-title mt-3">Preencha o formulário</h2>
            <p className="mt-3 text-sm leading-6 text-copy">
              Conte-nos o que precisa. Em breve, nossa equipa entrará em contacto consigo.
            </p>
            {sent ? (
              <div className="mt-8 rounded-lg border border-primary/50 bg-secondary p-6 text-center">
                <BadgeCheck size={36} className="mx-auto text-primary" />
                <h3 className="mt-3 text-lg font-bold">Mensagem enviada!</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Obrigado pelo contacto. A nossa equipa responderá em breve.
                </p>
                <button type="button" className="btn-outline mt-5" onClick={() => setSent(false)}>
                  Enviar outra mensagem
                </button>
              </div>
            ) : (
              <form
                className="mt-7 grid gap-4"
                onSubmit={(event) => {
                  event.preventDefault();
                  setSent(true);
                }}
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="field">
                    <User size={16} />
                    <input required type="text" placeholder="Nome completo *" />
                  </label>
                  <label className="field">
                    <Mail size={16} />
                    <input required type="email" placeholder="E-mail *" />
                  </label>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="field">
                    <Phone size={16} />
                    <input required type="tel" placeholder="Telefone *" />
                  </label>
                  <label className="field">
                    <Building2 size={16} />
                    <input type="text" placeholder="Empresa (opcional)" />
                  </label>
                </div>
                <label className="field">
                  <Tag size={16} />
                  <select required defaultValue="">
                    <option value="" disabled>Selecione um assunto</option>
                    {subjects.map((subject) => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="field-caret" />
                </label>
                <label className="field field-area">
                  <MessageCircle size={16} />
                  <textarea required rows={5} placeholder="Escreva a sua mensagem aqui..." />
                </label>
                <button type="submit" className="btn-primary btn-large w-full">
                  <Send size={17} /> Enviar mensagem
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="section-border py-16 lg:py-20">
        <div className="site-container grid gap-8 lg:grid-cols-2">
          <div className="map-card">
            <img src={mapImage} width={928} height={720} loading="lazy" alt="Mapa de Luanda com a localização da sede da EventPro" className="h-full w-full object-cover" />
            <div className="map-pin-card">
              <p className="flex items-center gap-2 text-xs font-bold"><MapPin size={14} className="text-primary" /> Sede Principal</p>
              <p className="mt-1 text-[0.68rem] text-muted-foreground">Rua das Tecnologias, Nº 123<br />Bairro Ingombota, Luanda – Angola</p>
            </div>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Ingombota+Luanda+Angola"
              target="_blank"
              rel="noreferrer"
              className="map-link"
            >
              <MapPin size={13} /> Ver no Google Maps
            </a>
          </div>
          <div className="panel-card overflow-hidden">
            <div className="p-6 sm:p-8">
              <h2 className="section-title">Nossas Localizações</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Estamos presentes em Luanda, e em breve em outras províncias.
              </p>
              <div className="mt-6 grid gap-5">
                {locations.map((location) => (
                  <div key={location.title} className="flex gap-3.5">
                    <span className="contact-icon" style={{ width: 40, height: 40, flexBasis: 40 }}>
                      <MapPin size={18} />
                    </span>
                    <div>
                      <h3 className="text-sm font-bold">{location.title}</h3>
                      {location.lines.map((line) => (
                        <p key={line} className="mt-0.5 text-[0.78rem] text-muted-foreground">{line}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <img src={buildingImage} width={928} height={720} loading="lazy" alt="Edifício sede da EventPro ao entardecer" className="h-56 w-full object-cover sm:h-64" />
          </div>
        </div>
      </section>

      <section className="metrics-band section-border py-12">
        <div className="site-container flex flex-col items-start justify-between gap-7 lg:flex-row lg:items-center">
          <div className="flex items-center gap-5">
            <span className="icon-disc" style={{ width: 64, height: 64, flexBasis: 64 }}>
              <Headset size={30} />
            </span>
            <div>
              <p className="section-kicker">Precisa de ajuda?</p>
              <h2 className="mt-2 text-2xl font-extrabold">Fale com a nossa equipa agora.</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Estamos disponíveis para esclarecer as suas dúvidas e ajudar no que precisar.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="#formulario" className="btn-primary btn-large"><MessageCircle size={17} /> Falar com suporte</a>
            <Link to="/planos" className="btn-outline btn-large">Ver FAQ <HelpCircle size={17} /></Link>
          </div>
        </div>
      </section>

      <footer className="section-border">
        <div className="site-container grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.2fr]">
          <div>
            <Link to="/" className="flex items-center gap-3">
              <BrandMark />
              <span>
                <span className="block text-xl font-extrabold">Event<span className="text-primary">Pro</span></span>
                <span className="block text-[0.56rem] text-muted-foreground">Eventos que conectam pessoas e negócios</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-xs leading-5 text-muted-foreground">
              A plataforma completa para criar, gerir e personalizar eventos presenciais, virtuais e híbridos.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-bold">Links rápidos</h3>
            <ul className="mt-4 grid gap-2.5 text-xs text-muted-foreground">
              <li><Link to="/">Início</Link></li>
              <li><Link to="/funcionalidades">Funcionalidades</Link></li>
              <li><Link to="/planos">Planos</Link></li>
              <li><a href="/#eventos">Exemplos</a></li>
              <li><Link to="/sobre">Sobre</Link></li>
              <li><Link to="/contactos">Contactos</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold">Suporte</h3>
            <ul className="mt-4 grid gap-2.5 text-xs text-muted-foreground">
              <li><a href="#formulario">Central de Ajuda</a></li>
              <li><a href="#formulario">Termos de Uso</a></li>
              <li><a href="#formulario">Política de Privacidade</a></li>
              <li><a href="#formulario">Fale Connosco</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold">Siga-nos</h3>
            <div className="mt-4 flex gap-3">
              {[Facebook, Instagram, Linkedin, Youtube].map((Icon, index) => (
                <a key={index} href="#formulario" aria-label="Rede social" className="social-dot"><Icon size={15} /></a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold">Baixe o nosso app</h3>
            <div className="mt-4 grid gap-2.5">
              <a href="#formulario" className="store-badge">Google Play</a>
              <a href="#formulario" className="store-badge">App Store</a>
            </div>
          </div>
        </div>
        <div className="site-container flex flex-col gap-4 border-t border-border py-6 text-[0.65rem] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 EventPro. Todos os direitos reservados.</span>
          <div className="flex flex-wrap items-center gap-5">
            <a href="#formulario">Termos de Uso</a>
            <a href="#formulario">Política de Privacidade</a>
            <a href="#formulario" aria-label="Voltar ao topo" className="social-dot"><ArrowUp size={14} /></a>
          </div>
        </div>
      </footer>
    </main>
  );
}
