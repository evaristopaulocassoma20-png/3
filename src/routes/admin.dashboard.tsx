import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import {
  LayoutDashboard, Building2, CalendarDays, Receipt, Users, Tag, Settings, Activity, FileText,
  Search, Bell, Mail, TrendingUp, CreditCard, QrCode, ChevronRight, LogOut, Plus, X, MessageCircle, Send,
} from "lucide-react";

export const Route = createFileRoute("/admin/dashboard")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Dashboard Global — Super Admin EventPro" },
      { name: "description", content: "Painel global do sistema EventPro: organizações, assinaturas e saúde do sistema." },
      { property: "og:title", content: "Dashboard Global — Super Admin EventPro" },
      { property: "og:description", content: "Painel global do sistema EventPro." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Dashboard,
});

const nav = [
  [LayoutDashboard, "Dashboard Global"], [Building2, "Organizações"], [CalendarDays, "Eventos Globais"],
  [Receipt, "Faturamento Global"], [Users, "Usuários & Permissões"], [Tag, "Planos & Preços"],
  [Settings, "Configurações Globais"], [Activity, "Monitoramento do Sistema"], [FileText, "Registros de Auditoria"],
] as const;

const growth = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"].map((m,i)=>({m,v:[1000,1500,2100,3200,2300,4100,5000,4200,4800,4000,4700,5500][i]}));
const latency = Array.from({length:60},(_,i)=>({i,v:Math.round(80+Math.sin(i/3)*25+((i*37)%40))}));
const cities = [{n:"Luanda",x:28,y:35,s:22},{n:"Benguela",x:30,y:60,s:14},{n:"Lubango",x:35,y:78,s:12},{n:"Cabinda",x:22,y:10,s:10},{n:"Huambo",x:48,y:58,s:12},{n:"Malanje",x:55,y:40,s:10},{n:"Uíge",x:42,y:22,s:9},{n:"Namibe",x:25,y:85,s:8},{n:"Moxico",x:72,y:55,s:9}];

type Org = { nome: string; admin: string; email: string; plano: string; data: string; status: "Confirmado" | "Pendente" };
const initialOrgs: Org[] = [
  { nome: "Kianda Eventos", admin: "Ana Lopes", email: "ana@kianda.ao", plano: "Profissional", data: "20/04/2026", status: "Confirmado" },
  { nome: "Evento Globais", admin: "Paulo Sousa", email: "paulo@globais.ao", plano: "Básico", data: "20/04/2026", status: "Confirmado" },
  { nome: "Aura Angola", admin: "Marta Neto", email: "marta@aura.ao", plano: "Enterprise", data: "20/06/2026", status: "Confirmado" },
  { nome: "Evento Angola", admin: "João Dias", email: "joao@eventoangola.ao", plano: "SaaS", data: "20/04/2026", status: "Pendente" },
  { nome: "Event Amigo", admin: "Rita Costa", email: "rita@amigo.ao", plano: "Profissional", data: "20/06/2026", status: "Pendente" },
];

const card = "rounded-lg border border-border bg-card";

function Dashboard() {
  const navigate = useNavigate();
  const [ok, setOk] = useState(false);
  const [orgs, setOrgs] = useState(initialOrgs);
  const [open, setOpen] = useState(false);
  const [chat, setChat] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem("ep_admin") !== "1") navigate({ to: "/admin/login" });
    else setOk(true);
  }, [navigate]);
  if (!ok) return null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="flex h-16 items-center gap-4 border-b border-border px-4">
        <div className="flex items-center gap-3"><span className="brand-mark"><span/><span/><span/></span><div><p className="font-extrabold leading-none">EventPro</p><p className="text-[10px] text-muted-foreground">SISTEMA</p></div></div>
        <span className="hidden rounded border border-primary/60 px-2 py-0.5 text-xs font-bold text-primary sm:inline">SUPER ADMIN</span>
        <div className="ml-auto hidden items-center gap-2 rounded-md border border-border bg-input px-3 md:flex"><Search size={15} className="text-muted-foreground"/><input placeholder="Pesquisar" className="h-9 bg-transparent text-sm outline-none"/></div>
        <Mail size={18} className="text-muted-foreground"/>
        <div className="relative"><Bell size={18} className="text-muted-foreground"/><span className="absolute -right-1 -top-1 h-2 w-2 rounded-full" style={{background:"oklch(0.65 0.22 25)"}}/></div>
        <button onClick={()=>{sessionStorage.removeItem("ep_admin");navigate({to:"/admin/login",replace:true});}} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"><LogOut size={16}/> Sair</button>
      </header>
      <div className="flex">
        <aside className="hidden w-60 shrink-0 border-r border-border p-3 lg:block">
          {nav.map(([I,l],i)=>(
            <button key={l} className={`mb-1 flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm ${i===0?"bg-primary/20 text-foreground":"text-copy hover:bg-secondary"}`}><I size={16}/>{l}</button>
          ))}
        </aside>
        <main className="min-w-0 flex-1 space-y-5 p-4 md:p-6">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-bold">Dashboard Global</h1>
            <button onClick={()=>setOpen(true)} className="ml-auto flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"><Plus size={16}/> Cadastrar admin de empresa</button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[["Assinaturas Ativas","4,875","Tendência de assinaturas ativas"],["MRR (Receita Mensal)","75.000.000 Kz","Crescimento +5%"],["Total de Eventos Ativos","2,150","Em todos os clientes"],["Participantes Totais","1,245,000","Global"]].map(([t,v,s],i)=>(
              <div key={t} className={`${card} p-4`}><p className="text-sm font-semibold">{t}</p><p className="mt-1 flex items-center gap-2 text-2xl font-extrabold">{v}{i===0&&<TrendingUp size={18} className="text-accent"/>}</p><p className={`mt-1 text-xs ${i===1?"text-accent":"text-muted-foreground"}`}>{s}</p></div>
            ))}
          </div>

          <div className="grid gap-4 xl:grid-cols-2">
            <div className={`${card} overflow-hidden`}>
              <div className="p-4"><h2 className="font-bold">Cidades Mais Ativas</h2><p className="text-xs text-muted-foreground">Pontos com mais eventos ativos</p></div>
              <div className="relative h-72 bg-secondary/60">
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full opacity-40"><path d="M20 5 L45 8 L60 25 L85 35 L88 70 L70 95 L25 95 L18 70 L25 45 L15 25 Z" fill="none" stroke="var(--accent)" strokeWidth=".4"/><path d="M25 45 L60 45 M45 8 L50 95 M18 70 L88 70" stroke="var(--border)" strokeWidth=".3"/></svg>
                {cities.map(c=>(<span key={c.n} title={c.n} className="absolute rounded-full" style={{left:`${c.x}%`,top:`${c.y}%`,width:c.s,height:c.s,background:"oklch(0.75 0.18 55)",boxShadow:"0 0 18px 4px oklch(0.75 0.18 55 / 60%)"}}/>))}
                <div className="absolute bottom-3 left-3 rounded-md border border-border bg-background/90 p-3 text-xs"><p className="mb-1 font-bold">Cidades Mais Ativas</p>{["Luanda","Benguela","Lubango","Cabinda"].map(c=><p key={c}>• {c}</p>)}</div>
              </div>
            </div>
            <div className={`${card} p-4`}>
              <h2 className="font-bold">Crescimento de Assinaturas</h2><p className="text-xs text-muted-foreground">Últimos 12 meses</p>
              <div className="mt-3 h-72"><ResponsiveContainer><AreaChart data={growth}><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--primary)" stopOpacity={.7}/><stop offset="100%" stopColor="var(--primary)" stopOpacity={0}/></linearGradient></defs><CartesianGrid stroke="var(--border)" vertical={false}/><XAxis dataKey="m" stroke="var(--muted-foreground)" fontSize={11}/><YAxis stroke="var(--muted-foreground)" fontSize={11}/><Tooltip contentStyle={{background:"var(--background)",border:"1px solid var(--border)"}}/><Area dataKey="v" stroke="var(--accent)" fill="url(#g)" strokeWidth={2}/></AreaChart></ResponsiveContainer></div>
            </div>
          </div>

          <div className="grid gap-4 xl:grid-cols-[1.6fr_1fr]">
            <div className={`${card} overflow-x-auto`}>
              <h2 className="p-4 font-bold">Últimas Organizações Cadastradas</h2>
              <table className="w-full min-w-[620px] text-sm">
                <thead className="bg-secondary text-left text-xs text-muted-foreground"><tr><th className="p-3">Organização</th><th>Admin</th><th>Plano</th><th>Data</th><th>Status</th><th/></tr></thead>
                <tbody>{orgs.map(o=>(<tr key={o.email} className="border-t border-border"><td className="p-3">{o.nome}</td><td><p>{o.admin}</p><p className="text-xs text-muted-foreground">{o.email}</p></td><td>{o.plano}</td><td>{o.data}</td><td><span className="rounded border px-2 py-0.5 text-xs" style={o.status==="Confirmado"?{color:"oklch(0.78 0.18 150)",borderColor:"oklch(0.78 0.18 150 / 50%)"}:{color:"oklch(0.82 0.16 85)",borderColor:"oklch(0.82 0.16 85 / 50%)"}}>{o.status}</span></td><td className="pr-3"><button className="flex items-center text-accent">Acessar como <ChevronRight size={14}/></button></td></tr>))}</tbody>
              </table>
            </div>
            <div className={`${card} overflow-x-auto`}>
              <h2 className="p-4 font-bold">Faturamento Recente (SaaS)</h2>
              <table className="w-full text-sm"><thead className="bg-secondary text-left text-xs text-muted-foreground"><tr><th className="p-3">Valor</th><th>Fatura</th><th className="pr-3 text-right">Taxa</th></tr></thead>
              <tbody>{[1,2,3,4,5].map(n=>(<tr key={n} className="border-t border-border"><td className="p-3">75.000.000 Kz</td><td>Fatura {n}</td><td className="pr-3 text-right">{n%2?"3.000":"5.000"} Kz</td></tr>))}</tbody></table>
            </div>
          </div>

          <div className={`${card} p-4`}>
            <h2 className="font-bold">Saúde do Sistema</h2><p className="text-xs text-muted-foreground">Monitorização em tempo real dos serviços globais.</p>
            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              <div className="rounded-md border border-border p-3"><div className="flex justify-between text-sm"><span>Latência da API</span><span className="font-bold" style={{color:"oklch(0.78 0.18 150)"}}>● OPERACIONAL</span></div><div className="h-36"><ResponsiveContainer><AreaChart data={latency}><Area dataKey="v" stroke="var(--accent)" fill="var(--primary)" fillOpacity={.25}/><YAxis stroke="var(--muted-foreground)" fontSize={10}/></AreaChart></ResponsiveContainer></div></div>
              <div className="divide-y divide-border rounded-md border border-border">
                {[[CreditCard,"Processamento de Pagamentos","OPERACIONAL"],[Mail,"Envio de E-mail/SMS","SAUDÁVEL"],[QrCode,"Gerador de Ingressos/QR Code","SAUDÁVEL"]].map(([I,t,s]:any)=>(<div key={t} className="flex items-center gap-3 p-4 text-sm"><I size={18} className="text-accent"/>{t}<span className="ml-auto font-bold" style={{color:"oklch(0.78 0.18 150)"}}>● {s}</span></div>))}
              </div>
            </div>
          </div>

          <div className={`${card} p-4`}>
            <h2 className="font-bold">Suporte & Tíquetes do Cliente</h2><p className="text-xs text-muted-foreground">Tíquetes recentes dos administradores.</p>
            <table className="mt-3 w-full text-sm"><thead className="bg-secondary text-left text-xs text-muted-foreground"><tr><th className="p-3">#</th><th>Nome</th><th className="text-right pr-3">Tíquete Nº</th></tr></thead>
            <tbody>{["Damião Nunes","Danilo Monteiro","Beatriz Mamona","Domingos Neves","Daniela Mateus"].map((n,i)=>(<tr key={n} className="border-t border-border"><td className="p-3 text-accent">{i+1}</td><td><p>{n}</p><p className="text-xs text-muted-foreground">Problema com acesso ao painel da organização</p></td><td className="pr-3 text-right text-accent">10{35310+i*17}</td></tr>))}</tbody></table>
          </div>
        </main>
      </div>

      {chat ? (
        <div className="fixed bottom-4 right-4 z-40 w-72 overflow-hidden rounded-lg border border-border bg-background shadow-2xl">
          <div className="flex items-center justify-between bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground">Suporte Interno / Devs<button onClick={()=>setChat(false)}><X size={16}/></button></div>
          <div className="space-y-2 p-3 text-xs"><p className="ml-auto w-fit rounded bg-primary px-2 py-1 text-primary-foreground">Olá</p><p className="w-fit rounded bg-secondary px-2 py-1">Como podemos ajudar hoje?</p></div>
          <div className="flex gap-2 border-t border-border p-2"><input placeholder="Escreva mensagem..." className="flex-1 rounded bg-input px-2 text-xs outline-none"/><button className="rounded bg-primary p-1.5 text-primary-foreground"><Send size={14}/></button></div>
        </div>
      ) : (
        <button onClick={()=>setChat(true)} className="fixed bottom-4 right-4 z-40 rounded-full bg-primary p-3 text-primary-foreground"><MessageCircle size={20}/></button>
      )}

      {open && <NewAdmin onClose={()=>setOpen(false)} onSave={o=>{setOrgs([o,...orgs]);setOpen(false);}}/>}
    </div>
  );
}

function NewAdmin({ onClose, onSave }: { onClose: () => void; onSave: (o: Org) => void }) {
  const [f, setF] = useState({ nome: "", admin: "", email: "", senha: "", plano: "Básico" });
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setF({ ...f, [k]: e.target.value });
  const inp = "mt-1 h-10 w-full rounded-md border border-border bg-input px-3 text-sm outline-none";
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4">
      <form onSubmit={e=>{e.preventDefault();onSave({nome:f.nome,admin:f.admin,email:f.email,plano:f.plano,data:new Date().toLocaleDateString("pt-PT"),status:"Pendente"});}} className={`${card} w-full max-w-md space-y-3 bg-background p-6`}>
        <div className="flex items-center justify-between"><h2 className="text-lg font-bold">Cadastrar admin de empresa</h2><button type="button" onClick={onClose}><X size={18}/></button></div>
        <label className="block text-sm">Nome da empresa<input required className={inp} value={f.nome} onChange={set("nome")}/></label>
        <label className="block text-sm">Nome do administrador<input required className={inp} value={f.admin} onChange={set("admin")}/></label>
        <label className="block text-sm">E-mail<input required type="email" className={inp} value={f.email} onChange={set("email")}/></label>
        <label className="block text-sm">Senha inicial<input required type="password" minLength={4} className={inp} value={f.senha} onChange={set("senha")}/></label>
        <label className="block text-sm">Plano<select className={inp} value={f.plano} onChange={set("plano")}>{["Básico","Profissional","Enterprise","SaaS"].map(p=><option key={p}>{p}</option>)}</select></label>
        <button className="h-10 w-full rounded-md bg-primary font-semibold text-primary-foreground">Cadastrar</button>
      </form>
    </div>
  );
}
