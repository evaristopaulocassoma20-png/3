// ============= Full file contents =============

import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  CalendarClock,
  CheckCircle2,
  CircleUserRound,
  ClipboardList,
  Cog,
  CreditCard,
  Download,
  Headset,
  ImagePlus,
  LayoutTemplate,
  Palette,
  QrCode,
  Rocket,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Ticket,
  UserCog,
  Users,
  Zap,
} from "lucide-react";

import heroImage from "@/assets/eventpro-hero.jpg";

export const Route = createFileRoute("/funcionalidades")({
  head: () => ({
    meta: [
      { title: "Funcionalidades — EventPro" },
      {
        name: "description",
        content:
          "Tudo o que precisa para eventos de sucesso: gestão de eventos, site personalizado, bilhetes, check-in, equipa e relatórios em tempo real.",
      },
      { property: "og:title", content: "Funcionalidades — EventPro" },
      {
        property: "og:description",
        content:
          "Uma plataforma completa e intuitiva para gerir eventos presenciais, virtuais e híbridos.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FuncionalidadesPage,
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

function Check({ children }: { children: React.ReactNode }) {
  return (
    <li className="check-item">
      <CheckCircle2 size={17} />
      <span>{children}</span>
    </li>
  );
}

function SectionHead({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: typeof Cog;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <span className="icon-disc flex-none"><Icon size={22} /></span>
      <div>
        <h2 className="text-xl font-extrabold sm:text-2xl">{title}</h2>
        <p className="mt-1 text-sm text-copy">{subtitle}</p>
      </div>
    </div>
  );
}

const heroPerks = [
  { icon: ShieldCheck, label: ["Seguro", "e confiável"] },
  { icon: Zap, label: ["Fácil de usar", ""] },
  { icon: Cog, label: ["Totalmente", "personalizável"] },
  { icon: Headset, label: ["Suporte", "especializado"] },
];

const eventStats = [
  { value: "+5.000", label: "Participantes" },
  { value: "+50", label: "Palestrantes" },
  { value: "+100", label: "Empresas" },
  { value: "3 Dias", label: "Duração" },
];

const teamRoles = [
  { name: "Administrador", color: "#2563eb" },
  { name: "Gestor", color: "#0ea5e9" },
  { name: "Financeiro", color: "#16a34a" },
  { name: "Credenciamento", color: "#eab308" },
  { name: "Atendimento", color: "#f97316" },
  { name: "Marketing", color: "#ec4899" },
  { name: "Operador", color: "#a855f7" },
];

function FuncionalidadesPage() {
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
            <span className="nav-link active">Funcionalidades</span>
            <Link className="nav-link" to="/planos">Planos</Link>
            <a className="nav-link" href="/#eventos">Exemplos</a>
            <a className="nav-link" href="/#sobre">Sobre</a>
            <a className="nav-link" href="/#contacto">Contacto</a>
          </nav>
          <div className="flex items-center gap-2.5">
            <a href="/#contacto" className="btn-outline hidden sm:inline-flex">Entrar</a>
            <a href="/#contacto" className="btn-primary">Criar Conta</a>
          </div>
        </div>
      </header>

      {/* ===== Hero ===== */}
      <section className="feat-hero">
        <div className="site-container relative z-10 grid items-center gap-14 py-28 pt-36 lg:grid-cols-[1fr_1.05fr] lg:gap-10 lg:pt-40">
          <div>
            <p className="eyebrow"><Sparkles size={14} /> FUNCIONALIDADES</p>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.02] sm:text-5xl lg:text-[3.4rem]">
              Tudo o que precisa<br />para <span className="text-primary">eventos de sucesso.</span>
            </h1>
            <p className="mt-6 max-w-lg text-sm leading-7 text-copy sm:text-base">
              A EventPro oferece uma plataforma completa e intuitiva, com todas as ferramentas
              que o organizador precisa para gerir eventos presenciais, virtuais e híbridos —
              de forma simples, segura e profissional.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-y-6 sm:grid-cols-4">
              {heroPerks.map(({ icon: Icon, label }) => (
                <div key={label[0]} className="flex items-center gap-3 border-l border-border pl-4 sm:flex-col sm:items-start">
                  <Icon size={20} className="text-primary" />
                  <span className="text-[0.7rem] leading-4 text-copy">{label[0]}{label[1] ? <><br />{label[1]}</> : null}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[560px]">
            <div className="device-laptop">
              <div className="device-screen">
                <img src={heroImage} width={1200} height={720} alt="Pré-visualização do site do evento" className="h-full w-full object-cover" />
                <div className="device-overlay">
                  <p className="text-base font-extrabold leading-tight sm:text-lg">Conferência Global<br />de Tecnologia 2026</p>
                  <p className="mt-1 text-[0.6rem] text-copy">15 – 17 Abril 2026 | Luanda, Angola</p>
                  <span className="mt-2 inline-flex rounded-sm bg-primary px-3 py-1 text-[0.6rem] font-bold text-primary-foreground">Inscrever-se</span>
                </div>
                <div className="device-stats">
                  {eventStats.map((s) => (
                    <div key={s.label}><strong>{s.value}</strong><span>{s.label}</span></div>
                  ))}
                </div>
              </div>
            </div>
            <div className="device-phone">
              <div className="device-phone-screen">
                <p className="text-[0.55rem] font-extrabold leading-tight">Conferência Global de Tecnologia 2026</p>
                <p className="mt-0.5 text-[0.45rem] text-copy">15 – 17 Abril 2026 | Luanda, Angola</p>
                <span className="mt-1.5 inline-flex justify-center rounded-sm bg-primary px-2 py-0.5 text-[0.45rem] font-bold text-primary-foreground">Inscrever-se</span>
                <div className="mt-2 grid grid-cols-2 gap-1">
                  <span className="rounded-sm bg-secondary px-1 py-1.5 text-center text-[0.42rem] text-copy">Programa</span>
                  <span className="rounded-sm bg-secondary px-1 py-1.5 text-center text-[0.42rem] text-copy">Palestrantes</span>
                  <span className="rounded-sm bg-secondary px-1 py-1.5 text-center text-[0.42rem] text-copy">Patrocinadores</span>
                  <span className="rounded-sm bg-secondary px-1 py-1.5 text-center text-[0.42rem] text-copy">Ingressos</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Gestão de Eventos ===== */}
      <section className="section-border py-16 lg:py-20">
        <div className="site-container">
          <SectionHead icon={ClipboardList} title="Gestão de Eventos" subtitle="Crie e configure seu evento de forma simples e rápida." />
          <div className="mt-10 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <ul className="space-y-4">
              <Check>Defina nome, data, local e descrição</Check>
              <Check>Personalize o visual do seu evento</Check>
              <Check>Configure categorias e horários</Check>
              <Check>Adicione mapas e informações de contacto</Check>
            </ul>
            <div className="grid gap-6 sm:grid-cols-[1fr_1fr]">
              <div className="panel-card">
                <p className="panel-header"><LayoutTemplate size={16} /> Criar Evento</p>
                <div className="space-y-4 p-5">
                  {["Informações básicas", "Personalização", "Ingressos", "Publicar"].map((step, i) => (
                    <div key={step} className="flex items-center gap-3">
                      <span className={`step-pill${i === 0 ? " step-pill-active" : ""}`}>{i + 1}</span>
                      <span className={`text-[0.8rem] ${i === 0 ? "font-bold text-foreground" : "text-muted-foreground"}`}>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="panel-card">
                <p className="panel-header"><Palette size={16} /> Personalize o seu evento</p>
                <div className="space-y-4 p-5">
                  <div className="rounded-md border border-border bg-secondary/60 p-4">
                    <p className="text-[0.7rem] font-bold">Escolha as cores</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {["#16a34a", "#dc2626", "#a855f7", "#ec4899", "#2563eb", "#0ea5e9", "#64748b"].map((c) => (
                        <span key={c} className="color-dot" style={{ background: c }} />
                      ))}
                    </div>
                  </div>
                  <div className="rounded-md border border-border bg-secondary/60 p-4">
                    <p className="text-[0.7rem] font-bold">Seu logo</p>
                    <div className="mt-3 flex items-center justify-between gap-3 rounded-md border border-border bg-background/70 p-3">
                      <span className="flex items-center gap-2 text-xs font-extrabold"><BrandMark /> Event<span className="text-primary">Pro</span></span>
                      <span className="inline-flex items-center gap-1.5 rounded-sm bg-primary px-3 py-1.5 text-[0.65rem] font-bold text-primary-foreground"><ImagePlus size={12} /> Escolher</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Site Personalizado ===== */}
      <section className="section-border py-16 lg:py-20">
        <div className="site-container">
          <SectionHead icon={LayoutTemplate} title="Site Personalizado do Evento" subtitle="Cada evento tem o seu próprio site, com a sua identidade visual." />
          <div className="mt-10 grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <ul className="space-y-4">
              <Check>Página inicial, sobre o evento, programa</Check>
              <Check>Palestrantes, patrocinadores e expositores</Check>
              <Check>Bilhetes e inscrição online</Check>
              <Check>Domínio próprio (opcional)</Check>
            </ul>
            <div className="grid gap-5 sm:grid-cols-[1.4fr_1fr]">
              <div className="panel-card overflow-hidden">
                <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
                  <span className="h-2 w-2 rounded-full bg-muted-foreground/60" />
                  <span className="h-2 w-2 rounded-full bg-muted-foreground/40" />
                  <span className="h-2 w-2 rounded-full bg-muted-foreground/25" />
                  <span className="ml-2 text-[0.62rem] font-bold text-primary">Fórum Empresarial 2026</span>
                </div>
                <div className="relative h-44 overflow-hidden sm:h-52">
                  <img src={heroImage} width={900} height={500} loading="lazy" alt="Site do evento" className="h-full w-full object-cover" />
                  <div className="absolute inset-0 flex flex-col justify-center bg-gradient-to-r from-background/95 via-background/70 to-transparent p-5">
                    <p className="text-lg font-extrabold leading-tight">Fórum Empresarial 2026</p>
                    <p className="mt-1 text-[0.62rem] text-copy">Luanda, Angola</p>
                    <p className="text-[0.62rem] text-copy">10 – 12 Setembro 2026</p>
                    <span className="mt-2 w-fit rounded-sm bg-primary px-3 py-1 text-[0.6rem] font-bold text-primary-foreground">Inscrever-se</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 p-4 text-center text-[0.55rem] text-muted-foreground">
                  <span className="rounded-sm bg-secondary px-1 py-2">Início</span>
                  <span className="rounded-sm bg-secondary px-1 py-2">Programa</span>
                  <span className="rounded-sm bg-secondary px-1 py-2">Bilhetes</span>
                </div>
              </div>
              <div className="space-y-5">
                <div className="panel-card p-4">
                  <p className="text-[0.72rem] font-extrabold text-primary">Palestrantes</p>
                  <div className="mt-3 grid grid-cols-4 gap-2">
                    {["Dr. Carlos Mendes", "Ana Paula", "José Kiala", "Maria Silva"].map((n) => (
                      <div key={n} className="text-center">
                        <span className="mx-auto grid h-9 w-9 place-items-center rounded-full border border-border bg-secondary text-[0.55rem] font-bold">{n.split(" ").map((p) => p[0]).slice(0, 2).join("")}</span>
                        <p className="mt-1 truncate text-[0.5rem] text-muted-foreground">{n}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="panel-card p-4">
                  <p className="text-[0.72rem] font-extrabold text-primary">Patrocinadores</p>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <span className="grid h-10 place-items-center rounded-sm border border-border bg-secondary text-[0.65rem] font-extrabold tracking-wide">unitel</span>
                    <span className="grid h-10 place-items-center rounded-sm border border-border bg-secondary text-[0.65rem] font-extrabold tracking-wide">BFA</span>
                    <span className="grid h-10 place-items-center rounded-sm border border-border bg-secondary text-[0.65rem] font-extrabold tracking-wide">UNITEC</span>
                    <span className="grid h-10 place-items-center rounded-sm border border-border bg-secondary text-[0.65rem] font-extrabold tracking-wide">Sonangol</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Bilhetes + Credenciamento ===== */}
      <section className="section-border py-16 lg:py-20">
        <div className="site-container grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHead icon={Ticket} title="Bilhetes e Inscrições" subtitle="Venda de ingressos e gestão das inscrições de forma segura e eficiente." />
            <ul className="mt-8 space-y-4">
              <Check>Vários tipos de bilhetes (normal, VIP, premium, etc.)</Check>
              <Check>Descontos com códigos promocionais</Check>
              <Check>Limite por pessoa</Check>
              <Check>Pagamento online (cartões, transferência, etc.)</Check>
            </ul>
            <div className="mt-8 grid gap-5 sm:grid-cols-[1.2fr_1fr]">
              <div className="panel-card">
                <p className="panel-header"><Ticket size={16} /> Tipos de ingresso</p>
                <div className="space-y-3 p-5">
                  {[
                    { name: "Normal", price: "10.000 Kz", left: "500 disponíveis", color: "#a855f7" },
                    { name: "VIP", price: "25.000 Kz", left: "200 disponíveis", color: "#ec4899" },
                    { name: "Premium", price: "50.000 Kz", left: "100 disponíveis", color: "#f97316" },
                  ].map((t) => (
                    <div key={t.name} className="flex items-center justify-between gap-3 rounded-md border border-border bg-secondary/60 p-3">
                      <span className="flex items-center gap-2.5">
                        <span className="grid h-8 w-8 place-items-center rounded-sm text-[0.7rem] font-extrabold" style={{ background: `${t.color}26`, color: t.color }}>{t.name[0]}</span>
                        <span><strong className="block text-[0.78rem]">{t.name}</strong><span className="text-[0.6rem] text-muted-foreground">{t.left}</span></span>
                      </span>
                      <strong className="text-[0.78rem] text-primary">{t.price}</strong>
                    </div>
                  ))}
                  <span className="btn-primary w-full !min-h-[38px] text-[0.72rem]">Configurar ingressos</span>
                </div>
              </div>
              <div className="panel-card p-5">
                <p className="text-[0.72rem] font-extrabold">Seu ingresso</p>
                <div className="mt-3 rounded-md border border-border bg-secondary/60 p-4 text-center">
                  <span className="qr-box mx-auto">NF-4567</span>
                  <p className="mt-3 text-[0.68rem] font-bold leading-tight">Conferência Global de Tecnologia 2026</p>
                  <p className="mt-0.5 text-[0.6rem] text-primary">VIP · NF-4567</p>
                  <span className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-sm bg-primary px-3 py-1.5 text-[0.62rem] font-bold text-primary-foreground"><Download size={12} /> Baixar comprovativo</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <SectionHead icon={ScanLine} title="Credenciamento e Check-in" subtitle="Controle o acesso dos participantes no dia do evento." />
            <ul className="mt-8 space-y-4">
              <Check>Leitura de QR Code</Check>
              <Check>Verificação de ingressos</Check>
              <Check>Evita entradas duplicadas</Check>
              <Check>Registo de data, hora e funcionário</Check>
            </ul>
            <div className="mt-8 flex justify-center lg:justify-start">
              <div className="device-phone device-phone-static">
                <div className="device-phone-screen text-center">
                  <p className="text-[0.58rem] font-extrabold">Seu ingresso</p>
                  <span className="qr-box mx-auto mt-2">NF-4567</span>
                  <p className="mt-2 text-[0.5rem] text-copy">Conferência Global de Tecnologia 2026</p>
                  <p className="mt-2 inline-flex items-center gap-1 rounded-sm bg-green-600/20 px-2 py-1 text-[0.5rem] font-bold text-green-400"><CheckCircle2 size={10} /> Ingresso Válido</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Palestrantes / Equipa / Relatórios ===== */}
      <section className="section-border py-16 lg:py-20">
        <div className="site-container grid gap-12 lg:grid-cols-3">
          <div>
            <SectionHead icon={Users} title="Palestrantes, Patrocinadores e Expositores" subtitle="Valorize quem faz parte do seu evento." />
            <ul className="mt-6 space-y-3">
              <Check>Cadastre palestrantes e convidados</Check>
              <Check>Gerencie patrocinadores e seus stands</Check>
              <Check>Organize expositores e produtos/serviços</Check>
              <Check>Divulgue no site e no programa</Check>
            </ul>
            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className="panel-card p-3 text-center">
                <p className="text-[0.55rem] font-bold text-primary">Palestrantes</p>
                <span className="avatar mx-auto mt-2">CM</span>
                <p className="mt-1.5 text-[0.55rem] font-bold leading-tight">Dr. Carlos Mendes</p>
                <p className="text-[0.5rem] text-muted-foreground">CEO · Business Angola</p>
              </div>
              <div className="panel-card p-3 text-center">
                <p className="text-[0.55rem] font-bold text-primary">Patrocinadores</p>
                <p className="mt-4 text-[0.7rem] font-extrabold tracking-wide">unitel</p>
                <p className="mt-3 text-[0.5rem] text-muted-foreground">Patrocinador Principal</p>
              </div>
              <div className="panel-card p-3 text-center">
                <p className="text-[0.55rem] font-bold text-primary">Expositores</p>
                <p className="mt-4 text-[0.7rem] font-extrabold tracking-wide">BFA</p>
                <p className="mt-3 text-[0.5rem] text-muted-foreground">Stand A12</p>
              </div>
            </div>
          </div>

          <div>
            <SectionHead icon={UserCog} title="Gestão de Equipa" subtitle="Projete a sua equipa e defina permissões." />
            <ul className="mt-6 space-y-3">
              {["Administrador", "Gestor do evento", "Financeiro", "Credenciamento", "Atendimento", "Marketing", "Operador"].map((r) => (
                <Check key={r}>{r}</Check>
              ))}
            </ul>
            <div className="panel-card mt-6">
              <p className="panel-header"><ShieldCheck size={16} /> Acesso por função</p>
              <div className="space-y-2 p-4">
                {teamRoles.map((r) => (
                  <div key={r.name} className="flex items-center gap-2.5 rounded-sm border border-border bg-secondary/50 px-3 py-2">
                    <CircleUserRound size={14} style={{ color: r.color }} />
                    <span className="text-[0.7rem]">{r.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <SectionHead icon={BarChart3} title="Relatórios e Estatísticas" subtitle="Acompanhe o desempenho do seu evento em tempo real." />
            <ul className="mt-6 space-y-3">
              <Check>Número de inscritos e participantes</Check>
              <Check>Vendas e faturamento</Check>
              <Check>Check-ins e presença</Check>
              <Check>Relatórios e exportações</Check>
              <Check>Exportação de dados</Check>
            </ul>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="panel-card p-4">
                <p className="text-[0.58rem] text-muted-foreground">Total de participantes</p>
                <p className="mt-1 text-lg font-extrabold">2.845 <span className="text-[0.6rem] font-bold text-green-400">↑ 12%</span></p>
                <div className="mt-3 flex h-14 items-end gap-1">
                  {[35, 55, 40, 70, 60, 90, 75].map((h, i) => (
                    <span key={i} className="flex-1 rounded-t-sm bg-primary/70" style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>
              <div className="panel-card p-4">
                <p className="text-[0.58rem] text-muted-foreground">Ingressos vendidos</p>
                <div className="donut-chart mx-auto mt-3"><span>78%</span></div>
                <div className="mt-3 flex h-10 items-end gap-1">
                  {[45, 80, 60, 95].map((h, i) => (
                    <span key={i} className="flex-1 rounded-t-sm bg-primary/70" style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="metrics-band section-border py-14">
        <div className="site-container flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-5">
            <span className="icon-disc flex-none !h-14 !w-14"><Rocket size={26} /></span>
            <div>
              <h2 className="text-2xl font-extrabold leading-tight sm:text-3xl">Mais que uma plataforma,<br /><span className="text-primary">o seu parceiro de eventos.</span></h2>
              <p className="mt-3 text-xs text-copy">Tecnologia, suporte e flexibilidade para o seu evento ser um sucesso.</p>
            </div>
          </div>
          <div className="text-center lg:text-right">
            <a href="/#contacto" className="btn-primary btn-large">Comece Agora <ArrowRight size={17} /></a>
            <p className="mt-2 text-[0.68rem] text-muted-foreground">Crie o seu evento em poucos minutos.</p>
          </div>
        </div>
      </section>

      <footer id="contacto" className="section-border">
        <div className="site-container flex flex-col items-start justify-between gap-8 py-10 md:flex-row md:items-center">
          <Link to="/" className="flex items-center gap-3"><BrandMark /><span><span className="block text-xl font-extrabold">Event<span className="text-primary">Pro</span></span><span className="block text-[0.56rem] text-muted-foreground">Eventos que conectam pessoas e negócios</span></span></Link>
          <div><strong className="text-sm">Pronto para criar o seu próximo grande evento?</strong><p className="mt-1 text-xs text-muted-foreground">Junte-se a centenas de empresas que já confiam na EventPro.</p></div>
          <a href="mailto:ola@eventpro.ao" className="btn-primary btn-large">Criar Conta Agora <ArrowRight size={17} /></a>
        </div>
        <div className="site-container flex flex-col gap-4 border-t border-border py-6 text-[0.65rem] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 EventPro. Todos os direitos reservados.</span><div className="flex flex-wrap gap-5"><a href="/#inicio">Termos de Uso</a><a href="/#inicio">Política de Privacidade</a><a href="mailto:ola@eventpro.ao">Suporte</a></div>
        </div>
      </footer>
    </main>
  );
}
