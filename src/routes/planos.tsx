import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  CalendarClock,
  Check,
  Crown,
  Headset,
  Minus,
  Rocket,
  Sparkles,
  Star,
  Wallet,
  Zap,
} from "lucide-react";

import heroImage from "@/assets/eventpro-hero.jpg";
import faqImage from "@/assets/event-presencial.jpg";

export const Route = createFileRoute("/planos")({
  head: () => ({
    meta: [
      { title: "Planos e Preços — EventPro" },
      {
        name: "description",
        content:
          "Escolha o plano ideal para o seu evento: Básico, Profissional, Enterprise ou Plano Mensal SaaS. Compare funcionalidades e comece hoje.",
      },
      { property: "og:title", content: "Planos e Preços — EventPro" },
      {
        property: "og:description",
        content:
          "Planos flexíveis e acessíveis para eventos presenciais, virtuais e híbridos em Angola.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PlanosPage,
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

const heroPerks = [
  { icon: Wallet, label: ["Sem custos", "ocultos"] },
  { icon: Headset, label: ["Suporte", "especializado"] },
  { icon: Zap, label: ["Ativação rápida", "da sua plataforma"] },
];

const eventStats = [
  { value: "+5.000", label: "Participantes" },
  { value: "+50", label: "Palestrantes" },
  { value: "+100", label: "Empresas" },
  { value: "3 Dias", label: "Duração" },
];

const plans = [
  {
    icon: Rocket,
    name: "Básico",
    desc: "Ideal para pequenos eventos e organizações.",
    price: "50.000 Kz",
    unit: "/ evento",
    prefix: null as string | null,
    cta: "Escolher Plano",
    featured: false,
    features: [
      "Site personalizado do evento",
      "Inscrições e bilhetes",
      "QR Code e check-in",
      "Gestão de participantes",
      "Suporte por e-mail",
    ],
  },
  {
    icon: Star,
    name: "Profissional",
    desc: "Perfeito para empresas e eventos de médio porte.",
    price: "100.000 Kz",
    unit: "/ evento",
    prefix: null,
    cta: "Escolher Plano",
    featured: true,
    features: [
      "Tudo do plano Básico +",
      "Patrocinadores e expositores",
      "Palestrantes e convidados",
      "Equipa do evento",
      "Relatórios e estatísticas",
      "Suporte prioritário",
    ],
  },
  {
    icon: Crown,
    name: "Enterprise",
    desc: "Para grandes eventos e necessidades personalizadas.",
    price: "Preço sob consulta",
    unit: "",
    prefix: null,
    cta: "Falar com a equipa",
    featured: false,
    features: [
      "Tudo do plano Profissional +",
      "Domínio próprio (ex.: seuevento.com)",
      "Mais participantes",
      "Integrações personalizadas",
      "Suporte dedicado 24/7",
      "Consultoria especializada",
    ],
  },
  {
    icon: CalendarClock,
    name: "Plano Mensal (SaaS)",
    desc: "Ideal para quem realiza vários eventos ao longo do ano.",
    price: "150.000 Kz",
    unit: "/ mês",
    prefix: "A partir de",
    cta: "Escolher Plano",
    featured: false,
    features: [
      "Até 3 eventos por mês",
      "Gestão completa da plataforma",
      "Atualizações e melhorias",
      "Suporte técnico incluído",
      "Relatórios avançados",
    ],
  },
];

type Mark = boolean | "check";

const compareRows: { label: string; marks: Mark[] }[] = [
  { label: "Site personalizado do evento", marks: [true, true, true, true] },
  { label: "Inscrições e bilhetes", marks: [true, true, true, true] },
  { label: "QR Code e check-in", marks: [true, true, true, true] },
  { label: "Patrocinadores e expositores", marks: [false, true, true, true] },
  { label: "Palestrantes e convidados", marks: [false, true, true, true] },
  { label: "Relatórios e estatísticas", marks: [false, true, true, true] },
  { label: "Equipa do evento", marks: [false, true, true, true] },
  { label: "Domínio próprio", marks: [false, false, true, true] },
  { label: "Suporte prioritário / 24-7", marks: [false, false, true, true] },
];

const faqs = [
  {
    q: "Posso cancelar o plano a qualquer momento?",
    a: "Sim. Os planos por evento podem ser cancelados antes da publicação do site do evento, sem custos adicionais. No plano mensal, o cancelamento fica efetivo no fim do ciclo em curso.",
  },
  {
    q: "Os preços já incluem impostos?",
    a: "Os valores apresentados referem-se à licença de utilização da plataforma. Impostos aplicáveis são calculados no momento da faturação, de acordo com a legislação angolana em vigor.",
  },
  {
    q: "O que acontece se eu precisar de mais participantes?",
    a: "Pode aumentar o limite de participantes a qualquer momento, pagando apenas a diferença proporcional. A nossa equipa ajuda-o a escolher a melhor configuração para o seu evento.",
  },
  {
    q: "O plano mensal é apenas para eventos ou também para gestão contínua?",
    a: "Os dois. O plano mensal foi pensado para organizações que realizam vários eventos ao longo do ano e querem uma plataforma sempre ativa, com gestão contínua de participantes, equipa e relatórios.",
  },
  {
    q: "Como faço o pagamento?",
    a: "Aceitamos transferência bancária, cartões de crédito/débito e outras formas de pagamento online. Após a confirmação, a sua plataforma é ativada de imediato.",
  },
];

function PlanCheck() {
  return <Check size={15} className="mt-0.5 flex-none text-primary" strokeWidth={3.2} />;
}

function PlanosPage() {
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
            <span className="nav-link active">Planos</span>
            <a className="nav-link" href="/#eventos">Exemplos</a>
            <Link className="nav-link" to="/sobre">Sobre</Link>
            <Link className="nav-link" to="/contactos">Contactos</Link>
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
            <p className="eyebrow"><BadgeCheck size={14} /> PLANOS E PREÇOS</p>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-[3.3rem]">
              Escolha o plano ideal<br />para o <span className="text-primary">seu evento.</span>
            </h1>
            <p className="mt-6 max-w-lg text-sm leading-7 text-copy sm:text-base">
              Oferecemos planos flexíveis e acessíveis para empresas, organizações e
              instituições que desejam criar eventos híbridos, virtuais ou presenciais
              com total controlo e personalização.
            </p>
            <div className="mt-10 grid grid-cols-3 gap-y-6">
              {heroPerks.map(({ icon: Icon, label }) => (
                <div key={label[0]} className="flex items-center gap-3 border-l border-border pl-4 sm:flex-col sm:items-start">
                  <Icon size={20} className="text-primary" />
                  <span className="text-[0.7rem] leading-4 text-copy">{label[0]}<br />{label[1]}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[560px]">
            <span className="plan-hero-note">Sua marca,<br />seu evento,<br />seu site.</span>
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

      {/* ===== Cartões de planos ===== */}
      <section className="section-border py-16 lg:py-20">
        <div className="site-container grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {plans.map((plan) => (
            <article key={plan.name} className={`price-card${plan.featured ? " price-card-featured" : ""}`}>
              {plan.featured && <span className="plan-badge"><Star size={12} /> Mais Popular</span>}
              <div className="p-6">
                <span className="icon-disc"><plan.icon size={22} /></span>
                <h2 className="mt-4 text-lg font-extrabold">{plan.name}</h2>
                <p className="mt-2 min-h-[40px] text-[0.78rem] leading-5 text-copy">{plan.desc}</p>
                <div className="mt-4 min-h-[56px]">
                  {plan.prefix && <span className="block text-[0.65rem] text-muted-foreground">{plan.prefix} de</span>}
                  <strong className={`block font-extrabold leading-tight ${plan.price.length > 12 ? "text-xl" : "text-[1.7rem]"}`}>
                    {plan.price}
                    {plan.unit && <span className="ml-1 text-[0.7rem] font-semibold text-muted-foreground">{plan.unit}</span>}
                  </strong>
                </div>
                <ul className="mt-5 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-[0.78rem] text-copy">
                      <PlanCheck />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="px-6 pb-6">
                <a href="/#contacto" className={plan.featured ? "btn-primary w-full" : "btn-outline w-full"}>{plan.cta}</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ===== Comparativo ===== */}
      <section className="section-border py-16 lg:py-20">
        <div className="site-container grid gap-10 lg:grid-cols-[0.75fr_1.6fr] lg:items-center">
          <div>
            <p className="eyebrow"><BadgeCheck size={14} /> COMPARATIVO DE PLANOS</p>
            <h2 className="section-title mt-4">Veja o que está incluído em cada plano.</h2>
            <p className="mt-4 text-sm leading-6 text-copy">
              Compare os recursos e escolha o plano que melhor se adapta às suas necessidades.
            </p>
            <a href="/#contacto" className="btn-primary btn-large mt-8">Falar com a equipa <ArrowRight size={17} /></a>
          </div>
          <div className="panel-card overflow-x-auto">
            <table className="compare-table w-full min-w-[560px]">
              <thead>
                <tr>
                  <th scope="col">Funcionalidades</th>
                  <th scope="col">Básico</th>
                  <th scope="col">Profissional</th>
                  <th scope="col">Enterprise</th>
                  <th scope="col">Mensal (SaaS)</th>
                </tr>
              </thead>
              <tbody>
                {compareRows.map((row) => (
                  <tr key={row.label}>
                    <th scope="row">{row.label}</th>
                    {row.marks.map((m, i) => (
                      <td key={i}>{m ? <Check size={16} className="mx-auto text-primary" strokeWidth={3} /> : <Minus size={14} className="mx-auto text-muted-foreground/60" />}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="section-border py-16 lg:py-20">
        <div className="site-container grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="faq-photo-card">
            <img src={faqImage} width={800} height={600} loading="lazy" alt="Público num evento" className="h-full w-full object-cover" />
            <div className="faq-photo-overlay">
              <div className="faq-photo-box">
                <span className="icon-disc flex-none !h-11 !w-11"><Headset size={20} /></span>
                <div>
                  <p className="text-base font-extrabold">Tem dúvidas?</p>
                  <p className="mt-1 text-[0.72rem] leading-5 text-copy">Estamos aqui para ajudar. Veja as perguntas mais frequentes ou fale com a nossa equipa.</p>
                  <a href="/#contacto" className="btn-primary mt-4 !min-h-[36px] !text-[0.7rem]">Contactar suporte <ArrowRight size={14} /></a>
                </div>
              </div>
            </div>
          </div>
          <div>
            <p className="eyebrow"><Sparkles size={14} /> PERGUNTAS FREQUENTES</p>
            <h2 className="section-title mt-4">Tire suas dúvidas sobre os planos.</h2>
            <div className="mt-8 space-y-3">
              {faqs.map((item) => (
                <details key={item.q} className="faq-item">
                  <summary>
                    <span>{item.q}</span>
                    <span className="faq-plus" aria-hidden="true" />
                  </summary>
                  <p className="faq-answer">{item.a}</p>
                </details>
              ))}
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
              <h2 className="text-2xl font-extrabold leading-tight sm:text-3xl">Pronto para criar o seu próximo grande evento?</h2>
              <p className="mt-3 text-xs text-copy">Junte-se a centenas de empresas que já confiam na EventPro.</p>
            </div>
          </div>
          <div className="text-center lg:text-right">
            <a href="/#contacto" className="btn-primary btn-large">Criar Conta Agora <ArrowRight size={17} /></a>
          </div>
        </div>
      </section>

      <footer id="contacto" className="section-border">
        <div className="site-container flex flex-col items-start justify-between gap-8 py-10 md:flex-row md:items-center">
          <Link to="/" className="flex items-center gap-3"><BrandMark /><span><span className="block text-xl font-extrabold">Event<span className="text-primary">Pro</span></span><span className="block text-[0.56rem] text-muted-foreground">Eventos que conectam pessoas e negócios</span></span></Link>
          <div className="hidden lg:block"><strong className="text-sm">Pronto para criar o seu próximo grande evento?</strong><p className="mt-1 text-xs text-muted-foreground">Junte-se a centenas de empresas que já confiam na EventPro.</p></div>
          <a href="mailto:ola@eventpro.ao" className="btn-primary btn-large">Criar Conta Agora <ArrowRight size={17} /></a>
        </div>
        <div className="site-container flex flex-col gap-4 border-t border-border py-6 text-[0.65rem] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 EventPro. Todos os direitos reservados.</span><div className="flex flex-wrap gap-5"><a href="/#inicio">Termos de Uso</a><a href="/#inicio">Política de Privacidade</a><a href="mailto:ola@eventpro.ao">Suporte</a></div>
        </div>
      </footer>
    </main>
  );
}
