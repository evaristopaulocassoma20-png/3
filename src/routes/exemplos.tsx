import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight, BarChart3, CalendarDays, ChevronLeft, ChevronRight, CirclePlay, Facebook, Globe2,
  Instagram, Linkedin, MapPin, Monitor, QrCode, Quote, Ticket, Users, Youtube, Layers,
} from "lucide-react";

import heroImage from "@/assets/sobre-stage.jpg";
import presencial from "@/assets/event-presencial.jpg";
import virtual from "@/assets/event-virtual.jpg";
import hibrido from "@/assets/event-hibrido.jpg";
import mainHero from "@/assets/eventpro-hero.jpg";
import marta from "@/assets/team-marta.jpg";
import carlos from "@/assets/team-carlos.jpg";
import patricia from "@/assets/team-patricia.jpg";

export const Route = createFileRoute("/exemplos")({
  head: () => ({
    meta: [
      { title: "Exemplos de Eventos — EventPro" },
      { name: "description", content: "Inspire-se com exemplos reais de conferências, feiras, workshops e eventos corporativos criados com a EventPro." },
      { property: "og:title", content: "Exemplos de Eventos — EventPro" },
      { property: "og:description", content: "Veja como empresas já usam a EventPro para criar eventos presenciais, virtuais e híbridos." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ExemplosPage,
});

function BrandMark() {
  return <span className="brand-mark" aria-hidden="true"><span /><span /><span /></span>;
}

const heroFeatures = [
  { icon: Globe2, a: "Sites personalizados", b: "para cada evento" },
  { icon: Ticket, a: "Inscrições e bilhetes", b: "online" },
  { icon: QrCode, a: "Check-in e credenciamento", b: "com QR Code" },
  { icon: BarChart3, a: "Relatórios e estatísticas", b: "em tempo real" },
];

const events = [
  { tag: "Conferência", img: mainHero, title: "Conferência Empresarial Angola 2026", sub: "Inovação, Estratégia e Negócios", date: "15 – 17 Abril 2026", place: "Luanda, Angola", modes: ["Presencial", "Virtual", "Híbrido"] },
  { tag: "Feira", img: presencial, title: "Expo Angola Negócios 2026", sub: "Conectando Empresas e Oportunidades", date: "10 – 13 Setembro 2026", place: "Talatona, Luanda", modes: ["Presencial", "Híbrido"] },
  { tag: "Workshop", img: virtual, title: "Workshop de Marketing Digital", sub: "Estratégias para o seu negócio crescer", date: "22 Fevereiro 2026", place: "Online", modes: ["Virtual", "Híbrido"] },
  { tag: "Evento Corporativo", img: hibrido, title: "Jantar de Gala – Empresas 2026", sub: "Networking, Reconhecimento e Celebração", date: "05 Dezembro 2026", place: "Luanda, Angola", modes: ["Presencial", "Híbrido"] },
];

const templates = [
  { img: mainHero, kicker: "Conferência", title: "Tecnologia & Inovação 2026", meta: "12 – 14 Maio 2026 | Luanda, Angola", cta: "Inscrição", name: "Modelo Conferência", desc: "Ideal para congressos e palestras." },
  { img: presencial, kicker: "Expo Angola", title: "Feira de Negócios", meta: "10 – 13 Setembro 2026 | Talatona", cta: "Comprar ingresso", name: "Modelo Feira", desc: "Perfeito para feiras e exposições." },
  { img: hibrido, kicker: "Gala", title: "Jantar de Gala Empresas 2026", meta: "05 Dezembro 2026 | Luanda", cta: "Confirmar presença", name: "Modelo Corporativo", desc: "Ideal para eventos empresariais e sociais." },
];

const testimonials = [
  { img: marta, quote: "A plataforma é super intuitiva e nos ajudou a organizar nosso evento com muita eficiência. Recomendamos!", name: "Mariana Silva", role: "Diretora de Eventos – AngolaTech" },
  { img: carlos, quote: "Conseguimos gerir inscrições, pagamentos e check-in de forma simples. Foi um grande apoio para o nosso evento híbrido.", name: "Carlos Mendes", role: "CEO – Business Angola" },
  { img: patricia, quote: "O suporte da EventPro é incrível. A equipe esteve sempre disponível e nos ajudou em todas as etapas.", name: "Patrícia Costa", role: "Gestora de Projetos – ExpoLuanda" },
];

const modeIcon: Record<string, typeof Users> = { Presencial: Users, Virtual: Monitor, Híbrido: Layers };

function ExemplosPage() {
  const [page, setPage] = useState(0);
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
        <div className="site-container flex h-20 items-center justify-between">
          <Link to="/" className="flex items-center gap-3" aria-label="EventPro — início">
            <BrandMark />
            <span>
              <span className="block text-[1.35rem] font-extrabold leading-none">Event<span className="text-primary">Pro</span></span>
              <span className="mt-1 block text-[0.57rem] text-muted-foreground">Eventos que conectam pessoas e negócios</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-8 text-sm font-medium lg:flex" aria-label="Navegação principal">
            <Link className="nav-link" to="/">Início</Link>
            <Link className="nav-link" to="/funcionalidades">Funcionalidades</Link>
            <Link className="nav-link" to="/planos">Planos</Link>
            <Link className="nav-link active" to="/exemplos">Exemplos</Link>
            <Link className="nav-link" to="/sobre">Sobre</Link>
            <Link className="nav-link" to="/contactos">Contactos</Link>
          </nav>
          <div className="flex items-center gap-2.5">
            <a href="#" className="btn-outline hidden sm:inline-flex">Entrar</a>
            <a href="#" className="btn-primary">Criar Conta</a>
          </div>
        </div>
      </header>

      <section className="hero-section">
        <img src={heroImage} alt="Grande conferência num palco iluminado a azul" className="hero-image" />
        <div className="hero-shade" />
        <div className="site-container relative z-10 py-20">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-[540px]">
              <p className="eyebrow"><span className="eyebrow-dot" /> Exemplos de eventos</p>
              <h1 className="mt-4 text-5xl font-extrabold leading-[1] sm:text-6xl">
                Inspire-se com<br />nossos <span className="text-primary">exemplos.</span>
              </h1>
              <p className="mt-6 text-sm leading-6 text-copy">
                Veja como empresas e organizações já estão a usar a EventPro para criar eventos incríveis,
                presenciais, virtuais e híbridos. Cada evento é único, mas todos têm algo em comum:
                mais organização, mais engajamento e melhores resultados.
              </p>
            </div>
            <div className="panel-card w-fit p-5">
              {[["Presenciais", Users], ["Virtuais", Monitor], ["Híbridos", Layers]].map(([l, I]) => {
                const Icon = I as typeof Users;
                return <p key={l as string} className="flex items-center gap-3 py-1 text-sm"><Icon size={16} className="text-primary" /> {l as string}</p>;
              })}
              <p className="mt-3 text-xs text-primary">Tudo numa só plataforma.</p>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-6 lg:grid-cols-4">
            {heroFeatures.map(({ icon: Icon, a, b }) => (
              <div key={a} className="flex items-center gap-3">
                <span className="icon-disc" style={{ width: 40, height: 40, flexBasis: 40 }}><Icon size={18} /></span>
                <span className="text-xs leading-tight">{a}<br /><span className="text-muted-foreground">{b}</span></span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-border py-16">
        <div className="site-container">
          <p className="section-kicker">Eventos em destaque</p>
          <h2 className="section-title mt-3">Exemplos <span className="text-primary">reais</span> de eventos</h2>
          <p className="mt-2 text-sm text-copy">Conheça alguns dos tipos de eventos que você pode criar com a EventPro.</p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {events.map((e) => (
              <article key={e.title} className="panel-card flex flex-col">
                <div className="relative">
                  <img src={e.img} alt={e.title} loading="lazy" className="h-40 w-full object-cover" />
                  <span className="absolute left-3 top-3 rounded-md bg-primary px-2 py-0.5 text-[0.65rem] font-bold text-primary-foreground">{e.tag}</span>
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="text-sm font-bold">{e.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{e.sub}</p>
                  <p className="mt-4 flex items-center gap-2 text-xs text-copy"><CalendarDays size={14} className="text-primary" /> {e.date}</p>
                  <p className="mt-2 flex items-center gap-2 text-xs text-copy"><MapPin size={14} className="text-primary" /> {e.place}</p>
                  <div className="mt-4 flex flex-wrap gap-3 text-[0.68rem] text-copy">
                    {e.modes.map((m) => { const I = modeIcon[m] ?? Users; return <span key={m} className="flex items-center gap-1"><I size={13} className="text-primary" /> {m}</span>; })}
                  </div>
                  <a href="#" className="btn-outline mt-5 w-full text-primary">Ver exemplo <ArrowRight size={14} /></a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-border py-16">
        <div className="site-container grid gap-10 lg:grid-cols-[0.8fr_2fr] lg:items-center">
          <div>
            <p className="section-kicker">Templates personalizáveis</p>
            <h2 className="section-title mt-3">Modelos prontos<br />para <span className="text-primary">qualquer tipo de evento.</span></h2>
            <p className="mt-4 text-sm leading-6 text-copy">Escolha um modelo, personalize com a identidade da sua marca e tenha o seu evento online em minutos.</p>
            <a href="#" className="btn-primary mt-7">Ver todos os templates <ArrowRight size={15} /></a>
          </div>
          <div className="grid gap-5 sm:grid-cols-3">
            {templates.map((t) => (
              <div key={t.name}>
                <div className="panel-card relative h-44">
                  <img src={t.img} alt={t.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-50" />
                  <div className="relative p-4">
                    <p className="text-[0.55rem] text-muted-foreground">Início · Sobre · Programa</p>
                    <p className="mt-5 text-[0.6rem] uppercase text-copy">{t.kicker}</p>
                    <p className="text-base font-bold leading-tight">{t.title}</p>
                    <p className="mt-1 text-[0.55rem] text-copy">{t.meta}</p>
                    <span className="mt-3 inline-block rounded bg-primary px-2 py-1 text-[0.55rem] font-bold text-primary-foreground">{t.cta}</span>
                  </div>
                </div>
                <h3 className="mt-3 text-sm font-bold">{t.name}</h3>
                <p className="text-xs text-muted-foreground">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-border py-16">
        <div className="site-container grid gap-10 lg:grid-cols-[0.8fr_2fr] lg:items-center">
          <div>
            <p className="section-kicker">Clientes que já realizaram eventos</p>
            <h2 className="section-title mt-3">Quem confia na <span className="text-primary">EventPro</span></h2>
            <p className="mt-4 text-sm leading-6 text-copy">Empresas, instituições e organizações que já transformaram suas ideias em eventos de sucesso.</p>
            <a href="#" className="btn-primary mt-7">Ver mais depoimentos <ArrowRight size={15} /></a>
          </div>
          <div>
            <div className="grid gap-5 sm:grid-cols-3">
              {testimonials.map((t) => (
                <figure key={t.name} className="panel-card p-5">
                  <Quote size={22} className="text-primary" />
                  <blockquote className="mt-3 text-xs leading-5 text-copy">"{t.quote}"</blockquote>
                  <figcaption className="mt-5 flex items-center gap-3">
                    <img src={t.img} alt={t.name} loading="lazy" className="h-10 w-10 rounded-full object-cover" />
                    <span className="text-xs"><span className="block font-bold text-primary">{t.name}</span><span className="text-muted-foreground">{t.role}</span></span>
                  </figcaption>
                </figure>
              ))}
            </div>
            <div className="mt-6 flex items-center justify-between">
              <div className="flex gap-2">{[0, 1, 2].map((i) => <button key={i} aria-label={`Página ${i + 1}`} onClick={() => setPage(i)} className={`h-2 w-2 rounded-full ${page === i ? "bg-primary" : "bg-muted"}`} />)}</div>
              <div className="flex gap-2">
                <button aria-label="Anterior" onClick={() => setPage((page + 2) % 3)} className="social-dot"><ChevronLeft size={15} /></button>
                <button aria-label="Seguinte" onClick={() => setPage((page + 1) % 3)} className="social-dot"><ChevronRight size={15} /></button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-border relative overflow-hidden">
        <div className="site-container grid gap-8 py-14 lg:grid-cols-2 lg:items-center">
          <img src={mainHero} alt="Portátil com a plataforma EventPro" loading="lazy" className="h-56 w-full rounded-lg object-cover opacity-80" />
          <div>
            <CalendarDays size={34} className="text-primary" />
            <h2 className="mt-3 text-2xl font-extrabold">Pronto para criar o seu próximo evento?</h2>
            <p className="mt-2 text-sm text-copy">Junte-se a centenas de empresas que já confiam na EventPro.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#" className="btn-primary btn-large">Criar Conta Agora <ArrowRight size={16} /></a>
              <a href="#" className="btn-outline btn-large">Ver Demonstração <CirclePlay size={17} /></a>
            </div>
          </div>
        </div>
      </section>

      <footer className="section-border">
        <div className="site-container grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.2fr]">
          <Link to="/" className="flex items-start gap-3">
            <BrandMark />
            <span>
              <span className="block text-xl font-extrabold">Event<span className="text-primary">Pro</span></span>
              <span className="block text-[0.56rem] text-muted-foreground">Eventos que conectam pessoas e negócios</span>
            </span>
          </Link>
          <div>
            <h3 className="text-sm font-bold">Links rápidos</h3>
            <ul className="mt-4 grid gap-2.5 text-xs text-muted-foreground">
              <li><Link to="/">Início</Link></li><li><Link to="/funcionalidades">Funcionalidades</Link></li>
              <li><Link to="/planos">Planos</Link></li><li><Link to="/exemplos">Exemplos</Link></li>
              <li><Link to="/sobre">Sobre</Link></li><li><Link to="/contactos">Contactos</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold">Suporte</h3>
            <ul className="mt-4 grid gap-2.5 text-xs text-muted-foreground">
              <li><a href="#">Central de Ajuda</a></li><li><a href="#">Termos de Uso</a></li>
              <li><a href="#">Política de Privacidade</a></li><li><Link to="/contactos">Fale Connosco</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold">Siga-nos</h3>
            <div className="mt-4 flex gap-3">
              {[Facebook, Instagram, Linkedin, Youtube].map((Icon, i) => <a key={i} href="#" aria-label="Rede social" className="social-dot"><Icon size={15} /></a>)}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold">Baixe o nosso app</h3>
            <div className="mt-4 grid gap-2.5">
              <a href="#" className="store-badge">Google Play</a><a href="#" className="store-badge">App Store</a>
            </div>
          </div>
        </div>
        <div className="site-container flex flex-col gap-4 border-t border-border py-6 text-[0.65rem] text-muted-foreground sm:flex-row sm:justify-between">
          <span>© 2026 EventPro. Todos os direitos reservados.</span>
          <div className="flex gap-5"><a href="#">Termos de Uso</a><a href="#">Política de Privacidade</a></div>
        </div>
      </footer>
    </main>
  );
}
