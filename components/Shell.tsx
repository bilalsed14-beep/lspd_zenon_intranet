import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

const links = [
  { key: "dashboard", href: "/dashboard", icon: "▦", label: "Dashboard" },
  { key: "citoyens", href: "/citoyens", icon: "♙", label: "Citoyens" },
  { key: "swat", href: "/swat", icon: "⬟", label: "Unité SWAT" },
  { key: "ddr", href: "/ddr", icon: "⌕", label: "DDR — Avis de recherche" },
  { key: "compte", href: "/mon-compte", icon: "◎", label: "Mon compte" },
];

export async function Shell({ active, userName, children }: { active: string; userName: string; children: React.ReactNode }) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // Les liens sensibles restent volontairement cachés jusqu'à l'ajout
  // d'une vérification serveur des rôles Discord et des permissions.
  return <div className="shell">
    <aside className="sidebar">
      <div className="brand"><div className="badge-logo">L</div><div><h1>LSPD ZENON RP</h1><p>INTRANET OFFICIEL</p></div></div>
      <div className="nav-label">ESPACE DE SERVICE</div>
      <nav className="nav">{links.map(link => <a key={link.key} className={active === link.key ? "active" : ""} href={link.href}><span style={{width:18,textAlign:"center"}}>{link.icon}</span>{link.label}</a>)}</nav>
      <div className="nav-label">ADMINISTRATION</div>
      <nav className="nav">
        <a href="/etat-major"><span style={{width:18,textAlign:"center"}}>♜</span>État-Major <span className="pill" style={{marginLeft:"auto"}}>HG</span></a>
        <a href="/owner"><span className="gold" style={{width:18,textAlign:"center"}}>♛</span><span className="gold">Owner</span></a>
      </nav>
      <div className="sidebar-foot">SYSTÈME PROTÉGÉ<br/>Accès et permissions en cours de configuration.<br/>Ne pas utiliser de données réelles avant validation.</div>
    </aside>
    <main className="main">
      <header className="topbar"><div className="crumb">LSPD / {active.toUpperCase().replace("-", " ")}</div><div className="user-chip"><div className="avatar">{userName.slice(0,1).toUpperCase()}</div><span>{userName}</span><form action="/logout" method="post"><button aria-label="Déconnexion" title="Déconnexion" style={{background:"transparent",color:"#9bb0c9",border:0,marginLeft:4}}>↪</button></form></div></header>
      {children}
    </main>
  </div>;
}
