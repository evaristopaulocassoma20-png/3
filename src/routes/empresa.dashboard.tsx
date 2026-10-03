import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import {
  Home, CalendarDays, Users, Ticket, Mic, Trophy, Store, Megaphone, Wallet, BarChart3, UserCog, Settings,
  Search, Bell, LogOut, Pencil, ExternalLink, Check, MapPin, Clock, Download, Eye, Trash2, Plus, X, Copy,
  CircleDollarSign, ScanLine, ShieldAlert, Mail, CalendarClock, LayoutGrid, Lightbulb, Headphones,
} from "lucide-react";
import { useDB, update, getSession, setSession, uid, type Participante, type Evento } from "@/lib/demo-store";
import { EventForm } from "@/components/event-form";

export const Route = createFileRoute("/empresa/dashboard")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Painel da Empresa — EventPro" },
      { name: "description", content: "Painel do administrador da empresa: eventos, participantes, bilhetes e relatórios." },
      { property: "og:title", content: "Painel da Empresa — EventPro" },
      { property: "og:description", content: "Gestão completa dos eventos da sua empresa." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: EmpresaPanel,
});

const nav = [
  [Home, "Dashboard"], [CalendarDays, "Eventos"], [Users, "Participantes"], [Ticket, "Bilhetes"],
  [Mic, "Palestras & Programação"], [Trophy, "Patrocinadores"], [Store, "Expositores"], [Megaphone, "Marketing & Comunicação"],
  [Wallet, "Finanças"], [BarChart3, "Relatórios"], [UserCog, "Equipa & Permissões"], [Settings, "Configurações"],
] as const;
type Sec = (typeof nav)[number][1];
const card = "rounded-lg border border-border bg-card";
const inp = "h-10 w-full rounded-md border border-border bg-input px-3 text-sm outline-none";
const btn = "flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground";
const ok = { color: "oklch(0.78 0.18 150)", borderColor: "oklch(0.78 0.18 150 / 50%)", background: "oklch(0.78 0.18 150 / 12%)" };
const warn = { color: "oklch(0.82 0.16 85)", borderColor: "oklch(0.82 0.16 85 / 50%)", background: "oklch(0.82 0.16 85 / 12%)" };
const info = { color: "var(--accent)", borderColor: "var(--accent)", background: "transparent" };
const Pill = ({ s }: { s: string }) => <span className="rounded-full border px-2.5 py-0.5 text-xs" style={s==="Confirmado"||s==="Ativo"?ok:s==="Pendente"?info:warn}>{s}</span>;
const receitas = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out"].map((m,i)=>({m,v:[40,60,55,90,120,95,160,130,110,210][i]*1000}));

function EmpresaPanel() {
  const navigate = useNavigate();
  const db = useDB();
  const [sess, setSess] = useState<ReturnType<typeof getSession>>(null);
  const [sec, setSec] = useState<Sec>("Dashboard");
  const [evId, setEvId] = useState<string | null>(null);
  const [q, setQ] = useState(""); const [fTipo, setFTipo] = useState(""); const [fStatus, setFStatus] = useState("");
  const [editP, setEditP] = useState<Participante | "new" | null>(null);
  const [editEv, setEditEv] = useState<Evento | "new" | null>(null);

  useEffect(() => { const s = getSession(); if (s?.role !== "empresa") navigate({ to: "/admin/login" }); else setSess(s); }, [navigate]);
  if (!sess || sess.role !== "empresa" || !db) return null;
  const org = db.orgs.find(o => o.id === sess.orgId);
  if (!org) return <div className="p-10 text-center">Empresa não encontrada. <button className="text-accent" onClick={()=>{setSession(null);navigate({to:"/admin/login"});}}>Voltar</button></div>;
  const quem = sess.viaSuper ? `Super Admin (em ${org.nome})` : `${org.admin} · ${org.nome}`;
  const ev = org.eventos.find(e => e.id === evId) ?? org.eventos[0];
  const parts = (ev?.participantes ?? []).filter(p => (p.nome+p.email).toLowerCase().includes(q.toLowerCase()) && (!fTipo||p.tipo===fTipo) && (!fStatus||p.status===fStatus));
  const confirmados = ev?.participantes.filter(p=>p.status==="Confirmado").length ?? 0;
  const mutEv = (acao: string, fn: (e: Evento) => void) => update(quem, acao, d => { fn(d.orgs.find(o=>o.id===org.id)!.eventos.find(e=>e.id===ev!.id)!); });
  const sair = () => { if (sess.viaSuper) { setSession({ role: "super" }); navigate({ to: "/admin/dashboard" }); } else { setSession(null); navigate({ to: "/admin/login", replace: true }); } };
  const exportar = () => { if (!ev) return; const csv = ["Nome,E-mail,Tipo,Bilhete,Status", ...ev.participantes.map(p=>[p.nome,p.email,p.tipo,p.bilhete,p.status].join(","))].join("\n"); const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([csv],{type:"text/csv"})); a.download = `participantes-${ev.nome}.csv`; a.click(); };

  const Participants = () => (
    <div className={`${card} p-4`}>
      <div className="mb-3 flex items-center gap-2"><Users size={20} className="text-accent"/><h2 className="text-lg font-bold">Inscrições & Bilhetes</h2><button onClick={()=>setEditP("new")} className={`${btn} ml-auto py-1.5`}><Plus size={14}/> Adicionar</button></div>
      <div className="mb-3 grid gap-2 sm:grid-cols-[1fr_auto_auto_auto]">
        <div className="flex items-center gap-2 rounded-md border border-border bg-input px-3"><Search size={14} className="text-muted-foreground"/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Pesquisar participante..." className="h-9 w-full bg-transparent text-sm outline-none"/></div>
        <select value={fTipo} onChange={e=>setFTipo(e.target.value)} className={inp}><option value="">Todos os tipos</option>{["Visitante","Empresário","Palestrante","Expositor","Imprensa"].map(t=><option key={t}>{t}</option>)}</select>
        <select value={fStatus} onChange={e=>setFStatus(e.target.value)} className={inp}><option value="">Todos os status</option>{["Confirmado","Pendente","A verificar"].map(t=><option key={t}>{t}</option>)}</select>
        <button onClick={exportar} className="flex items-center gap-2 rounded-md border border-border px-3 text-sm"><Download size={14}/> Exportar</button>
      </div>
      <div className="overflow-x-auto"><table className="w-full min-w-[640px] text-sm">
        <thead className="bg-secondary text-left text-xs text-muted-foreground"><tr><th className="p-2.5">Nome</th><th>E-mail</th><th>Tipo</th><th>Bilhete</th><th>Status</th><th className="text-center">Ações</th></tr></thead>
        <tbody>{parts.map(p=>(<tr key={p.id} className="border-t border-border">
          <td className="p-2.5"><div className="flex items-center gap-2"><span className="grid h-7 w-7 place-items-center rounded-full bg-primary/30 text-xs font-bold">{p.nome.split(" ").map(x=>x[0]).join("").slice(0,2)}</span>{p.nome}</div></td>
          <td className="text-muted-foreground">{p.email}</td><td>{p.tipo}</td><td><span className="rounded bg-secondary px-2 py-0.5 text-xs">{p.bilhete}</span></td><td><Pill s={p.status}/></td>
          <td><div className="flex justify-center gap-3">
            {p.status!=="Confirmado"&&<button title="Confirmar" onClick={()=>mutEv(`Confirmou ${p.nome}`,e=>{e.participantes.find(x=>x.id===p.id)!.status="Confirmado";})}><Check size={15} style={{color:ok.color}}/></button>}
            <button title="Editar" onClick={()=>setEditP(p)}><Pencil size={15}/></button>
            <button title="Remover" onClick={()=>confirm(`Remover ${p.nome}?`)&&mutEv(`Removeu ${p.nome}`,e=>{e.participantes=e.participantes.filter(x=>x.id!==p.id);})}><Trash2 size={15} style={{color:"oklch(0.7 0.2 25)"}}/></button>
          </div></td></tr>))}
          {parts.length===0&&<tr><td colSpan={6} className="p-6 text-center text-muted-foreground">Sem participantes.</td></tr>}
        </tbody></table></div>
      <p className="mt-3 text-xs text-muted-foreground">Mostrando {parts.length} de {ev?.participantes.length ?? 0} participantes</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      {sess.viaSuper && <div className="flex items-center justify-center gap-3 bg-primary px-4 py-1.5 text-sm text-primary-foreground"><ShieldAlert size={15}/> Está a ver o painel de <b>{org.nome}</b> como Super Admin — pode ver, editar e corrigir tudo. <button onClick={sair} className="underline">Voltar ao Super Admin</button></div>}
      <header className="flex h-16 items-center gap-4 border-b border-border px-4">
        <div className="flex items-center gap-3"><span className="brand-mark"><span/><span/><span/></span><div><p className="font-extrabold leading-none">EventPro</p><p className="text-[10px] text-muted-foreground">{org.nome.toUpperCase()}</p></div></div>
        <div className="mx-auto hidden w-full max-w-lg items-center gap-2 rounded-md border border-border bg-input px-3 md:flex"><Search size={15} className="text-muted-foreground"/><input value={q} onChange={e=>{setQ(e.target.value);if(sec==="Dashboard")setSec("Participantes");}} placeholder="Pesquisar participantes..." className="h-9 w-full bg-transparent text-sm outline-none"/></div>
        <div className="relative ml-auto md:ml-0"><Bell size={18} className="text-muted-foreground"/><span className="absolute -right-1.5 -top-1.5 grid h-4 w-4 place-items-center rounded-full text-[10px] font-bold" style={{background:"oklch(0.6 0.22 25)"}}>{ev?.participantes.filter(p=>p.status!=="Confirmado").length??0}</span></div>
        <div className="hidden text-right sm:block"><p className="text-sm font-semibold">{org.admin}</p><p className="text-xs text-muted-foreground">Administrador</p></div>
        <button onClick={sair} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"><LogOut size={16}/> Sair</button>
      </header>
      <div className="flex">
        <aside className="hidden w-60 shrink-0 border-r border-border p-3 lg:block">
          {nav.map(([I,l])=>(<button key={l} onClick={()=>setSec(l)} className={`mb-1 flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm ${sec===l?"bg-primary text-primary-foreground shadow-[0_0_20px_-6px_var(--primary)]":"text-copy hover:bg-secondary"}`}><I size={16}/>{l}</button>))}
        </aside>
        <main className="min-w-0 flex-1 space-y-4 p-4 md:p-6">
          <select value={sec} onChange={e=>setSec(e.target.value as Sec)} className={`${inp} lg:hidden`}>{nav.map(([,l])=><option key={l}>{l}</option>)}</select>
          {org.eventos.length>1 && ["Dashboard","Participantes","Bilhetes"].includes(sec) && <select value={ev?.id} onChange={e=>setEvId(e.target.value)} className={`${inp} max-w-sm`}>{org.eventos.map(e=><option key={e.id} value={e.id}>{e.nome}</option>)}</select>}

          {!ev && ["Dashboard","Participantes","Bilhetes"].includes(sec) && <div className={`${card} p-10 text-center`}><p className="mb-4 text-muted-foreground">Ainda não há eventos.</p><button onClick={()=>setEditEv("new")} className={`${btn} mx-auto`}><Plus size={16}/> Criar evento</button></div>}

          {sec==="Dashboard" && ev && <div className="grid gap-4 2xl:grid-cols-[1fr_300px]">
            <div className="min-w-0 space-y-4">
              <div className="flex flex-wrap gap-4">
                <div className="grid h-32 w-48 place-items-center rounded-lg bg-gradient-to-br from-primary/60 to-accent/30"><CalendarDays size={40}/></div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2"><h1 className="text-2xl font-bold">{ev.nome}</h1><Pill s={ev.status}/></div>
                  <p className="mt-2 flex flex-wrap gap-4 text-sm text-muted-foreground"><span className="flex items-center gap-1"><CalendarDays size={14}/>{ev.data}</span><span className="flex items-center gap-1"><Clock size={14}/>{ev.hora}</span><span className="flex items-center gap-1"><MapPin size={14}/>{ev.local}</span></p>
                  <p className="mt-2 max-w-xl text-sm">{ev.descricao}</p>
                </div>
                <div className="flex flex-col gap-2"><button onClick={()=>setEditEv(ev)} className={btn}><Pencil size={15}/> Editar Evento</button><button onClick={()=>mutEv(ev.status==="Ativo"?"Encerrou o evento":"Publicou o evento",e=>{e.status=e.status==="Ativo"?"Encerrado":"Ativo";})} className="flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm"><ExternalLink size={15}/> {ev.status==="Ativo"?"Encerrar":"Publicar"}</button></div>
              </div>
              <div className={`${card} flex flex-wrap items-center gap-4 p-4`}>
                {[["Configuração","Evento configurado",true],["Bilhetes","Preços definidos",ev.preco>0],["Publicação",ev.status==="Ativo"?"Evento online":"Por publicar",ev.status!=="Rascunho"],["Check-in",`${confirmados} confirmados`,confirmados>0],["Finalização","Pós evento",ev.status==="Encerrado"]].map(([t,s,d],i)=>(
                  <div key={t as string} className="flex items-center gap-2"><span className="grid h-8 w-8 place-items-center rounded-full border border-border text-sm font-bold" style={d?{background:"oklch(0.7 0.17 160)",color:"var(--background)"}:{}}>{d?<Check size={16}/>:i+1}</span><div><p className="text-sm font-semibold">{t as string}</p><p className="text-xs text-muted-foreground">{s as string}</p></div></div>))}
              </div>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {[[Users,"Total de Participantes",ev.participantes.length],[Ticket,"Bilhetes Vendidos",ev.participantes.length],[ScanLine,"Check-ins Realizados",confirmados],[CircleDollarSign,"Receita Total",(ev.participantes.length*ev.preco).toLocaleString("pt-PT")+" Kz"]].map(([I,t,v]:any)=>(
                  <div key={t} className={`${card} flex items-center gap-3 p-4`}><span className="grid h-12 w-12 place-items-center rounded-full bg-primary/25 text-accent"><I size={22}/></span><div><p className="text-sm text-muted-foreground">{t}</p><p className="text-2xl font-extrabold">{v}</p></div></div>))}
              </div>
              <Participants/>
              <div className="grid gap-4 md:grid-cols-3">
                {[[Lightbulb,"Dica","Use o QR Code para facilitar o check-in no dia do evento."],[CalendarClock,"Lembrete","Verifique a lista de participantes e a equipa antes do evento."],[Headphones,"Suporte","Precisa de ajuda? Fale com a nossa equipa."]].map(([I,t,s]:any)=>(<div key={t} className={`${card} flex gap-3 p-4`}><I size={22} className="shrink-0 text-accent"/><div><p className="font-semibold text-accent">{t}</p><p className="text-xs text-muted-foreground">{s}</p></div></div>))}
              </div>
            </div>
            <div className="space-y-4">
              <div className={`${card} p-4`}><p className="mb-3 font-bold">Ações Rápidas</p>{[[Mic,"Gestão de Palestrantes","Palestras & Programação"],[CalendarClock,"Gestão de Cronograma","Palestras & Programação"],[LayoutGrid,"Gestão de Espaço","Expositores"],[Mail,"Enviar E-mail em Massa","Marketing & Comunicação"],[BarChart3,"Gerar Relatório","Relatórios"]].map(([I,t,s]:any)=>(<button key={t} onClick={()=>setSec(s)} className="mb-2 flex w-full items-center gap-3 rounded-md border border-border bg-secondary/50 px-3 py-2.5 text-left text-sm hover:border-accent"><I size={16} className="text-accent"/>{t}</button>))}</div>
              <div className={`${card} p-4`}><p className="mb-2 font-bold">Link do Evento</p><div className="flex items-center gap-2 rounded-md border border-border bg-input px-3 py-2 text-xs"><span className="truncate">https://eventpro.ao/evento/{ev.id}</span><button className="ml-auto" onClick={()=>navigator.clipboard?.writeText(`https://eventpro.ao/evento/${ev.id}`)}><Copy size={14}/></button></div></div>
              <div className={`${card} p-4`}><p className="mb-2 font-bold">QR Code de Check-in</p><div className="mx-auto grid w-32 grid-cols-8 gap-0.5 bg-foreground p-2">{Array.from({length:64},(_,i)=><span key={i} className="aspect-square" style={{background:(i*7+ev.id.charCodeAt(i%ev.id.length))%3?"var(--background)":"transparent"}}/>)}</div></div>
              <div className={`${card} p-4`}><p className="mb-2 font-bold">Receitas (exemplo)</p><div className="h-44"><ResponsiveContainer><AreaChart data={receitas}><CartesianGrid stroke="var(--border)" vertical={false}/><XAxis dataKey="m" fontSize={10} stroke="var(--muted-foreground)"/><YAxis fontSize={10} stroke="var(--muted-foreground)"/><Tooltip contentStyle={{background:"var(--background)",border:"1px solid var(--border)"}}/><Area dataKey="v" stroke="var(--accent)" fill="var(--primary)" fillOpacity={.35}/></AreaChart></ResponsiveContainer></div></div>
            </div>
          </div>}

          {sec==="Eventos" && <div className="space-y-4">
            <div className="flex items-center"><h1 className="text-2xl font-bold">Eventos</h1><button onClick={()=>setEditEv("new")} className={`${btn} ml-auto`}><Plus size={16}/> Criar Evento</button></div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{org.eventos.map(e=>(<div key={e.id} className={`${card} p-4`}>
              <div className="flex items-start justify-between gap-2"><p className="font-bold">{e.nome}</p><Pill s={e.status}/></div>
              <p className="mt-1 text-xs text-muted-foreground">{e.data} · {e.local}</p><p className="mt-2 text-sm">{e.participantes.length} participantes</p>
              <div className="mt-3 flex gap-3 text-sm"><button className="flex items-center gap-1 text-accent" onClick={()=>{setEvId(e.id);setSec("Dashboard");}}><Eye size={14}/> Abrir</button><button className="flex items-center gap-1" onClick={()=>setEditEv(e)}><Pencil size={14}/> Editar</button><button className="flex items-center gap-1" style={{color:"oklch(0.7 0.2 25)"}} onClick={()=>confirm(`Eliminar ${e.nome}?`)&&update(quem,`Eliminou o evento ${e.nome}`,d=>{const o=d.orgs.find(x=>x.id===org.id)!;o.eventos=o.eventos.filter(x=>x.id!==e.id);})}><Trash2 size={14}/> Eliminar</button></div>
            </div>))}</div>
          </div>}

          {sec==="Participantes" && ev && <Participants/>}

          {sec==="Bilhetes" && ev && <div className={`${card} p-5`}>
            <h1 className="mb-4 text-xl font-bold">Bilhetes — {ev.nome}</h1>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">{["Padrão","VIP","Expositor","Imprensa","Pedido"].map(b=>(<div key={b} className="rounded-md border border-border p-4"><p className="font-semibold">{b}</p><p className="text-2xl font-extrabold">{ev.participantes.filter(p=>p.bilhete===b).length}</p><p className="text-xs text-muted-foreground">vendidos</p></div>))}</div>
            <p className="mt-4 text-sm">Preço base: <b>{ev.preco.toLocaleString("pt-PT")} Kz</b> <button className="ml-2 text-accent" onClick={()=>setEditEv(ev)}>Alterar</button></p>
          </div>}

          {sec==="Configurações" && <Config org={org} quem={quem}/>}

          {sec==="Relatórios" && <div className={`${card} overflow-x-auto p-4`}><h1 className="mb-3 text-xl font-bold">Relatório de eventos</h1>
            <table className="w-full text-sm"><thead className="bg-secondary text-left text-xs text-muted-foreground"><tr><th className="p-2.5">Evento</th><th>Participantes</th><th>Confirmados</th><th className="pr-3 text-right">Receita</th></tr></thead>
            <tbody>{org.eventos.map(e=>(<tr key={e.id} className="border-t border-border"><td className="p-2.5">{e.nome}</td><td>{e.participantes.length}</td><td>{e.participantes.filter(p=>p.status==="Confirmado").length}</td><td className="pr-3 text-right">{(e.participantes.length*e.preco).toLocaleString("pt-PT")} Kz</td></tr>))}</tbody></table></div>}

          {!["Dashboard","Eventos","Participantes","Bilhetes","Configurações","Relatórios"].includes(sec) && <div className={`${card} p-10 text-center`}><h1 className="text-xl font-bold">{sec}</h1><p className="mt-2 text-muted-foreground">Esta área ficará disponível quando o sistema for ligado a dados reais.</p></div>}
        </main>
      </div>

      {editP && ev && <PartForm p={editP==="new"?null:editP} onClose={()=>setEditP(null)} onSave={np=>{mutEv(`${editP==="new"?"Adicionou":"Editou"} ${np.nome}`,e=>{if(editP==="new")e.participantes.unshift(np);else Object.assign(e.participantes.find(x=>x.id===np.id)!,np);});setEditP(null);}}/>}
      {editEv && <EventForm orgId={org.id} ev={editEv==="new"?null:editEv} quem={quem} onClose={()=>setEditEv(null)}/>}
    </div>
  );
}

function Config({ org, quem }: { org: { id: string; nome: string; admin: string; email: string; senha: string; plano: string }; quem: string }) {
  const [f, setF] = useState({ nome: org.nome, admin: org.admin, senha: "" });
  const [msg, setMsg] = useState("");
  return (
    <form onSubmit={e=>{e.preventDefault();update(quem,"Atualizou as configurações da empresa",d=>{const o=d.orgs.find(x=>x.id===org.id)!;o.nome=f.nome;o.admin=f.admin;if(f.senha.length>=4)o.senha=f.senha;});setMsg("Alterações guardadas.");setF({...f,senha:""});}} className={`${card} max-w-lg space-y-3 p-5`}>
      <h1 className="text-xl font-bold">Configurações da empresa</h1>
      <label className="block text-sm">Nome da empresa<input className={`${inp} mt-1`} value={f.nome} onChange={e=>setF({...f,nome:e.target.value})}/></label>
      <label className="block text-sm">Nome do administrador<input className={`${inp} mt-1`} value={f.admin} onChange={e=>setF({...f,admin:e.target.value})}/></label>
      <p className="text-sm">E-mail de entrada: <b>{org.email}</b> · Plano: <b>{org.plano}</b></p>
      <label className="block text-sm">Nova senha (opcional)<input type="password" minLength={4} className={`${inp} mt-1`} value={f.senha} onChange={e=>setF({...f,senha:e.target.value})}/></label>
      {msg && <p className="text-sm" style={{color:ok.color}}>{msg}</p>}
      <button className={btn}>Guardar</button>
    </form>
  );
}

function PartForm({ p, onClose, onSave }: { p: Participante | null; onClose: () => void; onSave: (p: Participante) => void }) {
  const [f, setF] = useState<Participante>(p ?? { id: uid(), nome: "", email: "", tipo: "Visitante", bilhete: "Padrão", status: "Pendente" });
  const s = (k: keyof Participante) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setF({ ...f, [k]: e.target.value } as Participante);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4">
      <form onSubmit={e=>{e.preventDefault();onSave(f);}} className={`${card} w-full max-w-md space-y-3 bg-background p-6`}>
        <div className="flex items-center justify-between"><h2 className="text-lg font-bold">{p?"Editar participante":"Adicionar participante"}</h2><button type="button" onClick={onClose}><X size={18}/></button></div>
        <input required placeholder="Nome" className={inp} value={f.nome} onChange={s("nome")}/>
        <input required type="email" placeholder="E-mail" className={inp} value={f.email} onChange={s("email")}/>
        <div className="grid grid-cols-3 gap-2">
          <select className={inp} value={f.tipo} onChange={s("tipo")}>{["Visitante","Empresário","Palestrante","Expositor","Imprensa"].map(t=><option key={t}>{t}</option>)}</select>
          <select className={inp} value={f.bilhete} onChange={s("bilhete")}>{["Padrão","VIP","Expositor","Imprensa","Pedido"].map(t=><option key={t}>{t}</option>)}</select>
          <select className={inp} value={f.status} onChange={s("status")}>{["Confirmado","Pendente","A verificar"].map(t=><option key={t}>{t}</option>)}</select>
        </div>
        <button className="h-10 w-full rounded-md bg-primary font-semibold text-primary-foreground">Guardar</button>
      </form>
    </div>
  );
}
