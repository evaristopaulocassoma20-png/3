import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import {
  LayoutDashboard, Building2, CalendarDays, Receipt, Users, Tag, Settings, Activity, FileText,
  Search, Bell, Mail, TrendingUp, CreditCard, QrCode, ChevronRight, LogOut, Plus, X, Pencil, Trash2, Ban, CheckCircle2, RotateCcw,
} from "lucide-react";
import { EventForm } from "@/components/event-form";
import { useDB, update, getSession, setSession, uid, resetDemo, type Org, type Evento } from "@/lib/demo-store";

export const Route = createFileRoute("/admin/dashboard")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Dashboard Global — Super Admin EventPro" },
      { name: "description", content: "Painel global do sistema EventPro: organizações, eventos, faturação e auditoria." },
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
type Sec = (typeof nav)[number][1];

const growth = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"].map((m,i)=>({m,v:[1000,1500,2100,3200,2300,4100,5000,4200,4800,4000,4700,5500][i]}));
const latency = Array.from({length:60},(_,i)=>({i,v:Math.round(80+Math.sin(i/3)*25+((i*37)%40))}));
const precos: Record<string, number> = { Básico: 15000, Profissional: 45000, Enterprise: 120000, SaaS: 75000 };
const card = "rounded-lg border border-border bg-card";
const inp = "mt-1 h-10 w-full rounded-md border border-border bg-input px-3 text-sm outline-none";
const btn = "flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground";
const ok = { color: "oklch(0.78 0.18 150)", borderColor: "oklch(0.78 0.18 150 / 50%)" };
const warn = { color: "oklch(0.82 0.16 85)", borderColor: "oklch(0.82 0.16 85 / 50%)" };
const bad = { color: "oklch(0.7 0.2 25)", borderColor: "oklch(0.7 0.2 25 / 50%)" };
const Badge = ({ s }: { s: string }) => <span className="rounded border px-2 py-0.5 text-xs" style={["Confirmado","Ativo"].includes(s)?ok:["Suspenso","Encerrado"].includes(s)?bad:warn}>{s}</span>;

function Dashboard() {
  const navigate = useNavigate();
  const db = useDB();
  const [allowed, setAllowed] = useState(false);
  const [sec, setSec] = useState<Sec>("Dashboard Global");
  const [q, setQ] = useState("");
  const [editOrg, setEditOrg] = useState<Org | "new" | null>(null);
  const [editEv, setEditEv] = useState<{ orgId: string; ev: Evento } | null>(null);

  useEffect(() => {
    if (getSession()?.role !== "super") navigate({ to: "/admin/login" });
    else setAllowed(true);
  }, [navigate]);
  if (!allowed || !db) return null;

  const orgs = db.orgs.filter(o => (o.nome + o.admin + o.email).toLowerCase().includes(q.toLowerCase()));
  const eventos = db.orgs.flatMap(o => o.eventos.map(e => ({ org: o, ev: e })));
  const totalPart = eventos.reduce((s, x) => s + x.ev.participantes.length, 0);
  const mrr = db.orgs.filter(o => o.status === "Confirmado").reduce((s, o) => s + (precos[o.plano] ?? 0), 0);
  const L = "Super Admin";

  const acessar = (o: Org) => { setSession({ role: "empresa", orgId: o.id, viaSuper: true }); update(L, `Acedeu ao painel de ${o.nome}`, () => {}); navigate({ to: "/empresa/dashboard" }); };
  const setStatus = (o: Org, status: Org["status"]) => update(L, `${status === "Suspenso" ? "Suspendeu" : "Ativou"} ${o.nome}`, d => { d.orgs.find(x => x.id === o.id)!.status = status; });
  const delOrg = (o: Org) => confirm(`Eliminar ${o.nome}?`) && update(L, `Eliminou ${o.nome}`, d => { d.orgs = d.orgs.filter(x => x.id !== o.id); });

  const OrgTable = ({ list }: { list: Org[] }) => (
    <table className="w-full min-w-[760px] text-sm">
      <thead className="bg-secondary text-left text-xs text-muted-foreground"><tr><th className="p-3">Organização</th><th>Admin</th><th>Plano</th><th>Eventos</th><th>Status</th><th className="pr-3 text-right">Ações</th></tr></thead>
      <tbody>{list.map(o => (
        <tr key={o.id} className="border-t border-border">
          <td className="p-3">{o.nome}<p className="text-xs text-muted-foreground">desde {o.data}</p></td>
          <td><p>{o.admin}</p><p className="text-xs text-muted-foreground">{o.email}</p></td>
          <td>{o.plano}</td><td>{o.eventos.length}</td><td><Badge s={o.status}/></td>
          <td className="pr-3"><div className="flex items-center justify-end gap-2">
            <button title="Editar" onClick={() => setEditOrg(o)} className="text-muted-foreground hover:text-foreground"><Pencil size={15}/></button>
            {o.status === "Suspenso"
              ? <button title="Ativar" onClick={() => setStatus(o, "Confirmado")} style={ok}><CheckCircle2 size={15}/></button>
              : <button title="Suspender" onClick={() => setStatus(o, "Suspenso")} style={warn}><Ban size={15}/></button>}
            {o.status === "Pendente" && <button onClick={() => setStatus(o, "Confirmado")} className="text-xs" style={ok}>Aprovar</button>}
            <button title="Eliminar" onClick={() => delOrg(o)} style={bad}><Trash2 size={15}/></button>
            <button onClick={() => acessar(o)} className="flex items-center text-accent">Acessar como <ChevronRight size={14}/></button>
          </div></td>
        </tr>))}
        {list.length === 0 && <tr><td colSpan={6} className="p-6 text-center text-muted-foreground">Nenhuma organização.</td></tr>}
      </tbody>
    </table>
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="flex h-16 items-center gap-4 border-b border-border px-4">
        <div className="flex items-center gap-3"><span className="brand-mark"><span/><span/><span/></span><div><p className="font-extrabold leading-none">EventPro</p><p className="text-[10px] text-muted-foreground">SISTEMA</p></div></div>
        <span className="hidden rounded border border-primary/60 px-2 py-0.5 text-xs font-bold text-primary sm:inline">SUPER ADMIN</span>
        <div className="ml-auto hidden items-center gap-2 rounded-md border border-border bg-input px-3 md:flex"><Search size={15} className="text-muted-foreground"/><input value={q} onChange={e=>{setQ(e.target.value); if (sec==="Dashboard Global") setSec("Organizações");}} placeholder="Pesquisar organizações" className="h-9 bg-transparent text-sm outline-none"/></div>
        <Mail size={18} className="text-muted-foreground"/>
        <div className="relative"><Bell size={18} className="text-muted-foreground"/>{db.logs.length>0&&<span className="absolute -right-1 -top-1 h-2 w-2 rounded-full" style={{background:"oklch(0.65 0.22 25)"}}/>}</div>
        <button onClick={()=>{setSession(null);navigate({to:"/admin/login",replace:true});}} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"><LogOut size={16}/> Sair</button>
      </header>
      <div className="flex">
        <aside className="hidden w-60 shrink-0 border-r border-border p-3 lg:block">
          {nav.map(([I,l])=>(
            <button key={l} onClick={()=>setSec(l)} className={`mb-1 flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm ${sec===l?"bg-primary/20 text-foreground":"text-copy hover:bg-secondary"}`}><I size={16}/>{l}</button>
          ))}
        </aside>
        <main className="min-w-0 flex-1 space-y-5 p-4 md:p-6">
          <select value={sec} onChange={e=>setSec(e.target.value as Sec)} className={`${inp} lg:hidden`}>{nav.map(([,l])=><option key={l}>{l}</option>)}</select>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-bold">{sec}</h1>
            <button onClick={()=>setEditOrg("new")} className={`${btn} ml-auto`}><Plus size={16}/> Cadastrar admin de empresa</button>
          </div>

          {sec === "Dashboard Global" && <>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[["Organizações", String(db.orgs.length), `${db.orgs.filter(o=>o.status==="Pendente").length} pendentes`],["MRR (Receita Mensal)", mrr.toLocaleString("pt-PT")+" Kz","Assinaturas confirmadas"],["Eventos Ativos", String(eventos.filter(x=>x.ev.status==="Ativo").length),"Em todos os clientes"],["Participantes Totais", String(totalPart),"Global"]].map(([t,v,s],i)=>(
                <div key={t} className={`${card} p-4`}><p className="text-sm font-semibold">{t}</p><p className="mt-1 flex items-center gap-2 text-2xl font-extrabold">{v}{i===0&&<TrendingUp size={18} className="text-accent"/>}</p><p className="mt-1 text-xs text-muted-foreground">{s}</p></div>
              ))}
            </div>
            <div className={`${card} p-4`}>
              <h2 className="font-bold">Crescimento de Assinaturas</h2><p className="text-xs text-muted-foreground">Últimos 12 meses (exemplo)</p>
              <div className="mt-3 h-64"><ResponsiveContainer><AreaChart data={growth}><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--primary)" stopOpacity={.7}/><stop offset="100%" stopColor="var(--primary)" stopOpacity={0}/></linearGradient></defs><CartesianGrid stroke="var(--border)" vertical={false}/><XAxis dataKey="m" stroke="var(--muted-foreground)" fontSize={11}/><YAxis stroke="var(--muted-foreground)" fontSize={11}/><Tooltip contentStyle={{background:"var(--background)",border:"1px solid var(--border)"}}/><Area dataKey="v" stroke="var(--accent)" fill="url(#g)" strokeWidth={2}/></AreaChart></ResponsiveContainer></div>
            </div>
            <div className={`${card} overflow-x-auto`}><h2 className="p-4 font-bold">Últimas Organizações Cadastradas</h2><OrgTable list={db.orgs.slice(0,5)}/></div>
            <div className={`${card} p-4`}><h2 className="mb-3 font-bold">Atividade recente das empresas</h2><Logs logs={db.logs.slice(0,6)}/></div>
          </>}

          {sec === "Organizações" && <div className={`${card} overflow-x-auto`}><OrgTable list={orgs}/></div>}

          {sec === "Eventos Globais" && <div className={`${card} overflow-x-auto`}>
            <table className="w-full min-w-[720px] text-sm"><thead className="bg-secondary text-left text-xs text-muted-foreground"><tr><th className="p-3">Evento</th><th>Organização</th><th>Data</th><th>Participantes</th><th>Status</th><th className="pr-3 text-right">Ações</th></tr></thead>
            <tbody>{eventos.map(({org,ev})=>(<tr key={ev.id} className="border-t border-border"><td className="p-3">{ev.nome}<p className="text-xs text-muted-foreground">{ev.local}</p></td><td>{org.nome}</td><td>{ev.data}</td><td>{ev.participantes.length}</td><td><Badge s={ev.status}/></td>
              <td className="pr-3"><div className="flex justify-end gap-3"><button onClick={()=>setEditEv({orgId:org.id,ev})}><Pencil size={15}/></button><button style={bad} onClick={()=>confirm(`Eliminar ${ev.nome}?`)&&update(L,`Eliminou o evento ${ev.nome} (${org.nome})`,d=>{const o=d.orgs.find(x=>x.id===org.id)!;o.eventos=o.eventos.filter(e=>e.id!==ev.id);})}><Trash2 size={15}/></button><button className="text-accent" onClick={()=>acessar(org)}>Abrir</button></div></td></tr>))}</tbody></table>
          </div>}

          {sec === "Faturamento Global" && <div className={`${card} overflow-x-auto`}>
            <table className="w-full text-sm"><thead className="bg-secondary text-left text-xs text-muted-foreground"><tr><th className="p-3">Fatura</th><th>Organização</th><th>Plano</th><th className="pr-3 text-right">Valor mensal</th></tr></thead>
            <tbody>{db.orgs.map((o,i)=>(<tr key={o.id} className="border-t border-border"><td className="p-3">FT-2026/{100+i}</td><td>{o.nome}</td><td>{o.plano}</td><td className="pr-3 text-right">{(precos[o.plano]??0).toLocaleString("pt-PT")} Kz</td></tr>))}
            <tr className="border-t border-border font-bold"><td className="p-3" colSpan={3}>Total (confirmadas)</td><td className="pr-3 text-right">{mrr.toLocaleString("pt-PT")} Kz</td></tr></tbody></table>
          </div>}

          {sec === "Usuários & Permissões" && <div className={`${card} overflow-x-auto`}>
            <table className="w-full text-sm"><thead className="bg-secondary text-left text-xs text-muted-foreground"><tr><th className="p-3">Nome</th><th>E-mail</th><th>Cargo</th><th>Empresa</th><th/></tr></thead>
            <tbody><tr className="border-t border-border"><td className="p-3">Evaristo Cassoma</td><td>—</td><td>Super Admin</td><td>EventPro</td><td/></tr>
            {db.orgs.map(o=>(<tr key={o.id} className="border-t border-border"><td className="p-3">{o.admin}</td><td>{o.email}</td><td>Admin da Empresa</td><td>{o.nome}</td><td className="pr-3 text-right"><button onClick={()=>{const s=prompt(`Nova senha para ${o.admin}`);if(s&&s.length>=4)update(L,`Redefiniu a senha de ${o.admin}`,d=>{d.orgs.find(x=>x.id===o.id)!.senha=s;});}} className="text-accent">Redefinir senha</button></td></tr>))}</tbody></table>
          </div>}

          {sec === "Planos & Preços" && <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{Object.entries(precos).map(([p,v])=>(<div key={p} className={`${card} p-5`}><p className="font-bold">{p}</p><p className="mt-2 text-2xl font-extrabold">{v.toLocaleString("pt-PT")} Kz<span className="text-sm font-normal text-muted-foreground">/mês</span></p><p className="mt-2 text-sm text-muted-foreground">{db.orgs.filter(o=>o.plano===p).length} empresas</p></div>))}</div>}

          {sec === "Configurações Globais" && <div className={`${card} max-w-xl space-y-4 p-5`}>
            {["Permitir novos cadastros de empresas","Aprovação manual de empresas","Notificar por e-mail novas inscrições","Modo de manutenção"].map((t,i)=>(<label key={t} className="flex items-center justify-between text-sm">{t}<input type="checkbox" defaultChecked={i<3} className="h-4 w-4 accent-[var(--primary)]"/></label>))}
            <button onClick={()=>confirm("Repor todos os dados de demonstração?")&&resetDemo()} className="flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm"><RotateCcw size={15}/> Repor dados de demonstração</button>
          </div>}

          {sec === "Monitoramento do Sistema" && <div className={`${card} p-4`}>
            <div className="grid gap-4 lg:grid-cols-2">
              <div className="rounded-md border border-border p-3"><div className="flex justify-between text-sm"><span>Latência da API</span><span className="font-bold" style={ok}>● OPERACIONAL</span></div><div className="h-36"><ResponsiveContainer><AreaChart data={latency}><Area dataKey="v" stroke="var(--accent)" fill="var(--primary)" fillOpacity={.25}/><YAxis stroke="var(--muted-foreground)" fontSize={10}/></AreaChart></ResponsiveContainer></div></div>
              <div className="divide-y divide-border rounded-md border border-border">
                {([[CreditCard,"Processamento de Pagamentos"],[Mail,"Envio de E-mail/SMS"],[QrCode,"Gerador de Ingressos/QR Code"]] as const).map(([I,t])=>(<div key={t} className="flex items-center gap-3 p-4 text-sm"><I size={18} className="text-accent"/>{t}<span className="ml-auto font-bold" style={ok}>● SAUDÁVEL</span></div>))}
              </div>
            </div>
          </div>}

          {sec === "Registros de Auditoria" && <div className={`${card} p-4`}><Logs logs={db.logs}/></div>}
        </main>
      </div>

      {editOrg && <OrgForm org={editOrg==="new"?null:editOrg} onClose={()=>setEditOrg(null)}/>}
      {editEv && <EventForm orgId={editEv.orgId} ev={editEv.ev} quem={L} onClose={()=>setEditEv(null)}/>}
    </div>
  );
}

function Logs({ logs }: { logs: { id: string; quando: string; quem: string; acao: string }[] }) {
  if (!logs.length) return <p className="text-sm text-muted-foreground">Ainda não há registos.</p>;
  return <ul className="divide-y divide-border text-sm">{logs.map(l=>(<li key={l.id} className="flex flex-wrap gap-2 py-2"><span className="text-xs text-muted-foreground">{l.quando}</span><span className="font-semibold text-accent">{l.quem}</span><span>{l.acao}</span></li>))}</ul>;
}

function OrgForm({ org, onClose }: { org: Org | null; onClose: () => void }) {
  const [f, setF] = useState({ nome: org?.nome ?? "", admin: org?.admin ?? "", email: org?.email ?? "", senha: org?.senha ?? "", plano: org?.plano ?? "Básico" });
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setF({ ...f, [k]: e.target.value });
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4">
      <form onSubmit={e=>{e.preventDefault();
        if (org) update("Super Admin", `Editou ${f.nome}`, d => { Object.assign(d.orgs.find(x=>x.id===org.id)!, { ...f, email: f.email.toLowerCase() }); });
        else update("Super Admin", `Cadastrou ${f.nome}`, d => { d.orgs.unshift({ id: uid(), ...f, email: f.email.toLowerCase(), data: new Date().toLocaleDateString("pt-PT"), status: "Confirmado", eventos: [] }); });
        onClose();}} className={`${card} w-full max-w-md space-y-3 bg-background p-6`}>
        <div className="flex items-center justify-between"><h2 className="text-lg font-bold">{org?"Editar empresa":"Cadastrar admin de empresa"}</h2><button type="button" onClick={onClose}><X size={18}/></button></div>
        <label className="block text-sm">Nome da empresa<input required className={inp} value={f.nome} onChange={set("nome")}/></label>
        <label className="block text-sm">Nome do administrador<input required className={inp} value={f.admin} onChange={set("admin")}/></label>
        <label className="block text-sm">E-mail de entrada<input required type="email" className={inp} value={f.email} onChange={set("email")}/></label>
        <label className="block text-sm">Senha<input required minLength={4} className={inp} value={f.senha} onChange={set("senha")}/></label>
        <label className="block text-sm">Plano<select className={inp} value={f.plano} onChange={set("plano")}>{Object.keys(precos).map(p=><option key={p}>{p}</option>)}</select></label>
        <button className="h-10 w-full rounded-md bg-primary font-semibold text-primary-foreground">{org?"Guardar alterações":"Cadastrar"}</button>
      </form>
    </div>
  );
}

