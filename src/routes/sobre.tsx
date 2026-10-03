import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  BadgeCheck,
  CalendarDays,
  CheckCircle2,
  Diamond,
  Eye,
  Handshake,
  Headset,
  LayoutDashboard,
  Linkedin,
  MonitorSmartphone,
  Puzzle,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  Twitter,
  Users,
  Wrench,
  PlayCircle,
} from "lucide-react";

import stage from "@/assets/sobre-stage.jpg";
import evaristo from "@/assets/team-evaristo.jpg";
import marta from "@/assets/team-marta.jpg";
import carlos from "@/assets/team-carlos.jpg";
import patricia from "@/assets/team-patricia.jpg";
import heroImage from "@/assets/eventpro-hero.jpg";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre Nós — EventPro" },
      { name: "description", content: "Conheça a EventPro: missão, visão, valores e a equipa que transforma eventos híbridos, virtuais e presenciais em Angola." },
      { property: "og:title", content: "Sobre Nós — EventPro" },
      { property: "og:description", content: "Mais do que uma plataforma, somos o parceiro do seu evento." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SobrePage,
});

function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true"><span /><span /><span /></span>
  );
}

const perks = [
  { icon: Sparkles, l: ["Tecnologia", "inovadora"] },
  { icon: Headset, l: ["Suporte", "especializado"] },
  { icon: Puzzle, l: ["Soluções", "personalizadas"] },
  { icon: BarChart3, l: ["Resultados", "reais"] },
];

const valores = ["Inovação constante", "Compromisso com o cliente", "Transparência e confiança", "Excelência no serviço", "Conexões que geram valor"];

const team = [
  { img: evaristo, name: "Evaristo Cassoma", role: "CEO & Fundador", desc: "Liderança, estratégia e inovação." },
  { img: marta, name: "Marta Silva", role: "Diretora de Operações", desc: "Gestão de projetos e qualidade." },
  { img: carlos, name: "Carlos Mendes", role: "Diretor de Tecnologia", desc: "Desenvolvimento e suporte técnico." },
  { img: patricia, name: "Patrícia Costa", role: "Marketing & Comunicação", desc: "Marca, conteúdos e relacionamento." },
];

const numbers = [
  { icon: CalendarDays, v: "+500", l: "Eventos realizados" },
  { icon: Users, v: "+200k", l: "Participantes conectados" },
  { icon: Star, v: "+98%", l: "Satisfação dos clientes" },
  { icon: Handshake, v: "+50", l: "Empresas parceiras" },
];

const reasons = [
  { icon: LayoutDashboard, t: "Plataforma completa", d: "Tudo o que você precisa em um só lugar." },
  { icon: MonitorSmartphone, t: "Personalização total", d: "Seu evento com a sua identidade visual." },
  { icon: Headset, t: "Suporte dedicado", d: "Estamos sempre ao seu lado." },
  { icon: ShieldCheck, t: "Segurança de dados", d: "Proteção e privacidade das suas informações." },
  { icon: Wrench, t: "Integrações", d: "Conecte com as principais ferramentas do mercado." },
  { icon: Headset, t: "Suporte 24/7", d: "Para que nada pare o seu evento." },
];

function SobrePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="site-header">
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
            <a className="nav-link" href="/#eventos">Exemplos</a>
            <span className="nav-link active">Sobre</span>
            <Link className="nav-link" to="/contactos">Contactos</Link>
          </nav>
          <div className="flex items-center gap-2.5">
            <a href="#contacto" className="btn-outline hidden sm:inline-flex">Entrar</a>
            <a href="#contacto" className="btn-primary">Criar Conta</a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="feat-hero">
        <div className="site-container relative z-10 grid items-center gap-12 py-24 pt-32 lg:grid-cols-[1fr_1fr] lg:pt-36">
          <div>
            <p className="eyebrow"><BadgeCheck size={14} /> SOBRE NÓS</p>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.08] sm:text-5xl">
              Mais do que uma plataforma,<br /><span className="text-primary">somos o parceiro do seu evento.</span>
            </h1>
            <p className="mt-6 max-w-xl text-sm leading-7 text-copy sm:text-base">
              A EventPro é uma empresa de tecnologia especializada em soluções integrais para a gestão de eventos <strong className="text-foreground">híbridos, virtuais e presenciais</strong>. Ajudamos organizações, empresas e instituições a criar, gerir e personalizar os seus eventos de forma <strong className="text-foreground">simples, segura e profissional.</strong>
            </p>
            <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-4">
              {perks.map(({ icon: Icon, l }) => (
                <div key={l[0]} className="flex items-center gap-3">
                  <span className="icon-disc !h-10 !w-10 shrink-0"><Icon size={17} /></span>
                  <span className="text-[0.72rem] leading-4 text-copy">{l[0]}<br />{l[1]}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="sobre-stage">
            <img src={stage} width={1280} height={768} alt="Palco de conferência com iluminação azul" className="h-full w-full object-cover" />
            <p className="sobre-stage-text">Conectando<br />pessoas, ideias<br />e oportunidades.</p>
          </div>
        </div>
      </section>

      {/* Missão / Visão / Valores */}
      <section className="section-border">
        <div className="site-container grid gap-10 py-16 md:grid-cols-3">
          {[
            { icon: Target, tag: "NOSSA MISSÃO", t: "Facilitar a realização de eventos de alto impacto.", d: "Fornecemos ferramentas e suporte para que cada evento seja uma experiência única, com foco em resultados, engajamento e conexões que geram valor." },
            { icon: Eye, tag: "NOSSA VISÃO", t: "Ser a referência em soluções de eventos na África e no mundo.", d: "Queremos ser reconhecidos como a plataforma mais completa, confiável e inovadora para a gestão de eventos, conectando pessoas e negócios em qualquer lugar." },
          ].map(({ icon: Icon, tag, t, d }) => (
            <div key={tag} className="flex gap-5 md:border-r md:border-border md:pr-8">
              <span className="icon-disc shrink-0"><Icon size={22} /></span>
              <div>
                <p className="eyebrow">{tag}</p>
                <h2 className="mt-3 text-xl font-extrabold leading-snug">{t}</h2>
                <p className="mt-4 text-sm leading-6 text-copy">{d}</p>
              </div>
            </div>
          ))}
          <div className="flex gap-5">
            <span className="icon-disc shrink-0"><Diamond size={22} /></span>
            <div>
              <p className="eyebrow">OS NOSSOS VALORES</p>
              <ul className="mt-4 space-y-3">
                {valores.map((v) => (
                  <li key={v} className="flex items-center gap-3 text-sm text-copy"><CheckCircle2 size={17} className="text-primary" />{v}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Equipa */}
      <section className="section-border">
        <div className="site-container grid gap-10 py-16 lg:grid-cols-[0.8fr_2fr] lg:items-center">
          <div>
            <p className="eyebrow">A NOSSA EQUIPA</p>
            <h2 className="section-title mt-4">Pessoas que fazem<br /><span className="text-primary">a diferença.</span></h2>
            <p className="mt-5 text-sm leading-6 text-copy">Somos uma equipa apaixonada por tecnologia, eventos e relacionamento. Unimos experiência, criatividade e foco em resultados para transformar as suas ideias em grandes eventos.</p>
            <a href="#contacto" className="btn-primary mt-8">Conheça a nossa equipa <ArrowRight size={16} /></a>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {team.map((m) => (
              <article key={m.name} className="team-card">
                <img src={m.img} loading="lazy" width={912} height={736} alt={m.name} className="aspect-[5/4] w-full object-cover" />
                <div className="p-4">
                  <h3 className="text-sm font-bold">{m.name}</h3>
                  <p className="text-[0.7rem] text-primary">{m.role}</p>
                  <p className="mt-3 text-[0.72rem] leading-5 text-copy">{m.desc}</p>
                  <div className="mt-4 flex gap-3 text-primary"><Linkedin size={15} /><Twitter size={15} /></div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Números */}
      <section className="metrics-band section-border">
        <div className="site-container grid gap-10 py-16 lg:grid-cols-[0.8fr_2fr] lg:items-center">
          <div>
            <p className="eyebrow">EM NÚMEROS</p>
            <h2 className="section-title mt-4">A confiança dos nossos clientes <span className="text-primary">fala por nós.</span></h2>
            <p className="mt-5 text-sm leading-6 text-copy">Já ajudamos <strong className="text-foreground">centenas de organizações</strong> a realizar os seus <strong className="text-foreground">eventos com sucesso</strong>. E continuamos a crescer.</p>
            <a href="/#eventos" className="btn-primary mt-8">Ver todos os eventos <ArrowRight size={16} /></a>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {numbers.map(({ icon: Icon, v, l }) => (
              <div key={l} className="panel-card flex flex-col items-center py-8 text-center">
                <Icon size={30} className="text-primary" />
                <strong className="mt-5 text-3xl font-extrabold">{v}</strong>
                <span className="mt-2 text-xs text-copy">{l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Porquê */}
      <section className="section-border">
        <div className="site-container grid gap-10 py-16 lg:grid-cols-[0.8fr_2fr] lg:items-center">
          <div>
            <p className="eyebrow">PORQUE ESCOLHER A EVENTPRO?</p>
            <h2 className="section-title mt-4">Escolha uma plataforma criada para o <span className="text-primary">seu sucesso.</span></h2>
            <p className="mt-5 text-sm leading-6 text-copy">Não importa o tamanho do seu evento. A EventPro oferece a flexibilidade, segurança e suporte que você precisa para criar experiências inesquecíveis.</p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
            {reasons.map(({ icon: Icon, t, d }) => (
              <div key={t} className="flex gap-4">
                <span className="icon-disc !h-12 !w-12 shrink-0"><Icon size={20} /></span>
                <div><h3 className="text-sm font-bold">{t}</h3><p className="mt-1 text-xs leading-5 text-copy">{d}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="metrics-band section-border">
        <div className="site-container grid items-center gap-10 py-14 md:grid-cols-[1fr_1.4fr]">
          <img src={heroImage} loading="lazy" width={1200} height={720} alt="Painel EventPro num portátil" className="rounded-xl border border-border object-cover" />
          <div>
            <p className="eyebrow">PRONTO PARA CRIAR O SEU PRÓXIMO EVENTO?</p>
            <h2 className="mt-3 text-2xl font-extrabold">Junte-se a centenas de empresas que já confiam na EventPro.</h2>
            <p className="mt-2 text-sm text-copy">Comece agora e descubra como é fácil organizar eventos incríveis.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#contacto" className="btn-primary">Criar Conta Agora <ArrowRight size={16} /></a>
              <a href="#contacto" className="btn-outline">Ver Demonstração <PlayCircle size={16} /></a>
            </div>
          </div>
        </div>
      </section>

      <footer id="contacto" className="section-border">
        <div className="site-container grid gap-10 py-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <Link to="/" className="flex items-start gap-3"><BrandMark /><span><span className="block text-xl font-extrabold">Event<span className="text-primary">Pro</span></span><span className="block text-[0.56rem] text-muted-foreground">Eventos que conectam pessoas e negócios</span></span></Link>
          <div className="text-xs text-copy"><strong className="text-foreground">Links rápidos</strong>
            <div className="mt-3 flex flex-col gap-1.5"><Link to="/">Início</Link><Link to="/funcionalidades">Funcionalidades</Link><Link to="/planos">Planos</Link><a href="/#eventos">Exemplos</a><Link to="/sobre">Sobre</Link></div></div>
          <div className="text-xs text-copy"><strong className="text-foreground">Suporte</strong>
            <div className="mt-3 flex flex-col gap-1.5"><a href="mailto:ola@eventpro.ao">Central de Ajuda</a><a href="#">Termos de Uso</a><a href="#">Política de Privacidade</a><a href="mailto:ola@eventpro.ao">Fale Conosco</a></div></div>
          <div className="text-xs text-copy"><strong className="text-foreground">Siga-nos</strong>
            <div className="mt-3 flex gap-3 text-foreground"><Linkedin size={16} /><Twitter size={16} /></div></div>
        </div>
        <div className="site-container border-t border-border py-6 text-[0.65rem] text-muted-foreground">© 2026 EventPro. Todos os direitos reservados.</div>
      </footer>
    </main>
  );
}
