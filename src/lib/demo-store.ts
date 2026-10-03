// Armazenamento DEMO no navegador (sem servidor). Partilhado entre Super Admin e Admin da Empresa.
import { useEffect, useState } from "react";

export type Status = "Confirmado" | "Pendente" | "Suspenso";
export type Participante = { id: string; nome: string; email: string; tipo: string; bilhete: string; status: "Confirmado" | "Pendente" | "A verificar" };
export type Evento = { id: string; nome: string; data: string; hora: string; local: string; cidade: string; descricao: string; status: "Ativo" | "Rascunho" | "Encerrado"; preco: number; participantes: Participante[] };
export type Org = { id: string; nome: string; admin: string; email: string; senha: string; plano: string; data: string; status: Status; eventos: Evento[] };
export type Log = { id: string; quando: string; quem: string; acao: string };
type DB = { orgs: Org[]; logs: Log[] };

const KEY = "ep_demo_db_v1";
export const uid = () => Math.random().toString(36).slice(2, 9);

const pessoas: [string, string, string, Participante["status"]][] = [
  ["Ana Silva", "Visitante", "Padrão", "Confirmado"], ["Carlos Mendes", "Empresário", "VIP", "Confirmado"],
  ["Juliana Sousa", "Palestrante", "VIP", "Confirmado"], ["Rafael Nunes", "Expositor", "Expositor", "Pendente"],
  ["Beatriz Costa", "Visitante", "Padrão", "Confirmado"], ["Diogo Ferreira", "Imprensa", "Imprensa", "Confirmado"],
  ["Larissa Almeida", "Visitante", "Padrão", "A verificar"],
];
const mkPart = (): Participante[] => pessoas.map(([n, t, b, s]) => ({ id: uid(), nome: n, email: n.toLowerCase().replace(" ", ".").normalize("NFD").replace(/[\u0300-\u036f]/g, "") + "@email.com", tipo: t, bilhete: b, status: s }));
const mkEvento = (nome: string, cidade = "Luanda"): Evento => ({ id: uid(), nome, data: "15 - 16 Nov 2026", hora: "08:00 - 18:00", local: "Centro de Convenções de " + cidade, cidade: cidade + ", Angola", descricao: "O maior encontro de líderes, empreendedores e profissionais de negócios para debater o futuro da economia e da inovação.", status: "Ativo", preco: 25000, participantes: mkPart() });

const seed = (): DB => ({
  logs: [],
  orgs: ([
    ["Kianda Eventos", "Ana Lopes", "ana@kianda.ao", "Profissional", "Confirmado"],
    ["Eventos Globais", "Paulo Sousa", "paulo@globais.ao", "Básico", "Confirmado"],
    ["Aura Angola", "Marta Neto", "marta@aura.ao", "Enterprise", "Confirmado"],
    ["Evento Angola", "João Dias", "joao@eventoangola.ao", "Profissional", "Pendente"],
  ] as string[][]).map(([nome, admin, email, plano, status], i) => ({
    id: uid(), nome, admin, email, senha: "1234", plano: plano!, data: "20/04/2026", status: status as Status,
    eventos: i === 0 ? [mkEvento("Conferência de Negócios 2026"), mkEvento("Feira de Tecnologia", "Benguela")] : [mkEvento(`Gala ${nome}`, ["Luanda", "Huambo", "Lubango", "Cabinda"][i])],
  })),
});

let db: DB | null = null;
const subs = new Set<() => void>();
function load(): DB {
  if (db) return db;
  try { db = JSON.parse(localStorage.getItem(KEY) || "") as DB; } catch { db = seed(); }
  if (!db?.orgs) db = seed();
  return db;
}
export function update(quem: string, acao: string, fn: (d: DB) => void) {
  const d = structuredClone(load());
  fn(d);
  d.logs.unshift({ id: uid(), quando: new Date().toLocaleString("pt-PT"), quem, acao });
  d.logs = d.logs.slice(0, 200);
  db = d;
  localStorage.setItem(KEY, JSON.stringify(d));
  subs.forEach((s) => s());
}
export function resetDemo() { db = seed(); localStorage.setItem(KEY, JSON.stringify(db)); subs.forEach((s) => s()); }
export function useDB(): DB | null {
  const [, tick] = useState(0);
  const [ready, setReady] = useState(false);
  useEffect(() => { load(); setReady(true); const f = () => tick((n) => n + 1); subs.add(f); return () => { subs.delete(f); }; }, []);
  return ready ? load() : null;
}

// Sessão demo
export type Session = { role: "super" } | { role: "empresa"; orgId: string; viaSuper?: boolean };
export const getSession = (): Session | null => { try { return JSON.parse(sessionStorage.getItem("ep_session") || "null"); } catch { return null; } };
export const setSession = (s: Session | null) => s ? sessionStorage.setItem("ep_session", JSON.stringify(s)) : sessionStorage.removeItem("ep_session");
export function findOrgLogin(email: string, senha: string) { return load().orgs.find((o) => o.email.toLowerCase() === email && o.senha === senha); }
