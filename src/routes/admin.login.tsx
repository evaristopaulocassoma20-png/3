import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Lock, Mail, ShieldCheck } from "lucide-react";
import { findOrgLogin, setSession } from "@/lib/demo-store";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: "Entrar — Super Admin EventPro" },
      { name: "description", content: "Acesso do super administrador do sistema EventPro." },
      { property: "og:title", content: "Entrar — Super Admin EventPro" },
      { property: "og:description", content: "Acesso do super administrador do sistema EventPro." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminLogin,
});

// DEMO apenas (sem servidor): credenciais de protótipo. Substituir por autenticação real ao ligar o backend.
const DEMO_EMAIL = "evaristopaulocassom00@gmail.com";
const DEMO_PASS = "2352";

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const em = email.trim().toLowerCase();
    if (em === DEMO_EMAIL && pass === DEMO_PASS) {
      setSession({ role: "super" });
      navigate({ to: "/admin/dashboard" });
      return;
    }
    const org = findOrgLogin(em, pass);
    if (!org) return setError("E-mail ou senha incorretos.");
    if (org.status === "Suspenso") return setError("Esta empresa está suspensa. Contacte o suporte.");
    setSession({ role: "empresa", orgId: org.id });
    navigate({ to: "/empresa/dashboard" });
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-xl border border-border bg-card p-8 shadow-[0_0_60px_-20px_var(--primary)]">
        <Link to="/" className="mb-6 flex items-center gap-3">
          <span className="brand-mark"><span /><span /><span /></span>
          <div><p className="text-xl font-extrabold">EventPro</p><p className="text-xs text-muted-foreground">SISTEMA</p></div>
        </Link>
        <span className="inline-flex items-center gap-1 rounded border border-primary/60 px-2 py-0.5 text-xs font-bold text-primary"><ShieldCheck size={14}/> SUPER ADMIN · ADMIN DA EMPRESA</span>
        <h1 className="mt-4 text-2xl font-bold">Entrar no painel</h1>
        <p className="mt-1 text-sm text-muted-foreground">Super admin e administradores das empresas entram aqui.</p>
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <label className="block text-sm">E-mail
            <div className="mt-1 flex items-center gap-2 rounded-md border border-border bg-input px-3">
              <Mail size={16} className="text-muted-foreground"/>
              <input type="email" required value={email} onChange={e=>setEmail(e.target.value)} className="h-11 w-full bg-transparent outline-none" placeholder="admin@empresa.com"/>
            </div>
          </label>
          <label className="block text-sm">Senha
            <div className="mt-1 flex items-center gap-2 rounded-md border border-border bg-input px-3">
              <Lock size={16} className="text-muted-foreground"/>
              <input type="password" required value={pass} onChange={e=>setPass(e.target.value)} className="h-11 w-full bg-transparent outline-none" placeholder="••••"/>
            </div>
          </label>
          {error && <p className="text-sm text-destructive" style={{color:"oklch(0.7 0.2 25)"}}>{error}</p>}
          <button type="submit" className="h-11 w-full rounded-md bg-primary font-semibold text-primary-foreground hover:opacity-90">Entrar</button>
        </form>
      </div>
    </main>
  );
}
