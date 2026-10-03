import { useState } from "react";
import { X } from "lucide-react";
import { update, uid, type Evento } from "@/lib/demo-store";

const card = "rounded-lg border border-border bg-card";
const inp = "mt-1 h-10 w-full rounded-md border border-border bg-input px-3 text-sm outline-none";

export function EventForm({ orgId, ev, quem, onClose }: { orgId: string; ev: Evento | null; quem: string; onClose: () => void }) {
  const [f, setF] = useState({ nome: ev?.nome ?? "", data: ev?.data ?? "", hora: ev?.hora ?? "08:00 - 18:00", local: ev?.local ?? "", cidade: ev?.cidade ?? "Luanda, Angola", descricao: ev?.descricao ?? "", status: ev?.status ?? "Rascunho", preco: ev?.preco ?? 0 });
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setF({ ...f, [k]: k === "preco" ? Number(e.target.value) : e.target.value });
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4">
      <form onSubmit={e=>{e.preventDefault();
        update(quem, `${ev?"Editou":"Criou"} o evento ${f.nome}`, d => { const o = d.orgs.find(x=>x.id===orgId)!; const data = { ...f, status: f.status as Evento["status"] };
          if (ev) Object.assign(o.eventos.find(x=>x.id===ev.id)!, data); else o.eventos.unshift({ id: uid(), ...data, participantes: [] }); });
        onClose();}} className={`${card} max-h-[90vh] w-full max-w-lg space-y-3 overflow-y-auto bg-background p-6`}>
        <div className="flex items-center justify-between"><h2 className="text-lg font-bold">{ev?"Editar evento":"Criar evento"}</h2><button type="button" onClick={onClose}><X size={18}/></button></div>
        <label className="block text-sm">Nome<input required className={inp} value={f.nome} onChange={set("nome")}/></label>
        <div className="grid grid-cols-2 gap-3"><label className="block text-sm">Datas<input required className={inp} value={f.data} onChange={set("data")} placeholder="15 - 16 Nov 2026"/></label><label className="block text-sm">Horário<input className={inp} value={f.hora} onChange={set("hora")}/></label></div>
        <div className="grid grid-cols-2 gap-3"><label className="block text-sm">Local<input required className={inp} value={f.local} onChange={set("local")}/></label><label className="block text-sm">Cidade<input className={inp} value={f.cidade} onChange={set("cidade")}/></label></div>
        <label className="block text-sm">Descrição<textarea className={`${inp} h-20 py-2`} value={f.descricao} onChange={set("descricao")}/></label>
        <div className="grid grid-cols-2 gap-3"><label className="block text-sm">Preço do bilhete (Kz)<input type="number" min={0} className={inp} value={f.preco} onChange={set("preco")}/></label><label className="block text-sm">Status<select className={inp} value={f.status} onChange={set("status")}>{["Rascunho","Ativo","Encerrado"].map(s=><option key={s}>{s}</option>)}</select></label></div>
        <button className="h-10 w-full rounded-md bg-primary font-semibold text-primary-foreground">Guardar</button>
      </form>
    </div>
  );
}
