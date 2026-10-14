import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Shell } from "@/components/Shell";

export default async function DashboardPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  const meta = user.user_metadata ?? {};
  const name = meta.full_name ?? meta.name ?? meta.custom_claims?.global_name ?? "Agent connecté";
  return <Shell active="dashboard" userName={String(name)}>
    <div className="eyebrow">Centre opérationnel · Zenon RP</div>
    <h1 className="heading">Dashboard</h1>
    <p className="subheading">Bienvenue sur l'intranet de la LSPD. Retrouvez les espaces de service, les informations importantes et les outils accessibles à votre compte.</p>
    <section className="hero" style={{marginTop:24}}>
      <span className="pill">SYSTÈME INTERNE</span>
      <h2 style={{fontSize:25,margin:"18px 0 8px"}}>Servir. Protéger. Intervenir.</h2>
      <p className="subheading">Un espace centralisé pour organiser les informations et les opérations de la police de Los Santos.</p>
    </section>
    <div className="grid">
      <div className="stat"><div className="stat-label">Session</div><div className="stat-value" style={{fontSize:20}}>Connectée</div><div className="stat-note">Authentification Discord</div></div>
      <div className="stat"><div className="stat-label">Organisation</div><div className="stat-value" style={{fontSize:20}}>LSPD</div><div className="stat-note">Zenon Roleplay</div></div>
      <div className="stat"><div className="stat-label">Accès</div><div className="stat-value" style={{fontSize:20}}>À vérifier</div><div className="stat-note">Permissions en cours de configuration</div></div>
    </div>
    <h2 className="section-title">Accès rapides</h2>
    <div className="cards">
      <a className="card" href="/citoyens"><div className="card-icon">♙</div><div><h3>Citoyens</h3><p>Consulter les dossiers citoyens lorsque les droits correspondants auront été activés.</p></div></a>
      <a className="card" href="/swat"><div className="card-icon">⬟</div><div><h3>Unité SWAT</h3><p>Découvrir les missions, la doctrine et les conditions d'intégration de l'unité.</p></div></a>
      <a className="card" href="/ddr"><div className="card-icon">⌕</div><div><h3>DDR — Avis de recherche</h3><p>Accéder à l'espace prévu pour les avis de recherche autorisés.</p></div></a>
      <a className="card" href="/mon-compte"><div className="card-icon">♙</div><div><h3>Mon compte</h3><p>Consulter les informations liées à la session Discord.</p></div></a>
    </div>
    <div className="notice">Version initiale : les accès État-Major et Owner doivent être validés côté serveur avant de stocker ou d'afficher des informations confidentielles. N'utilisez pas de données réelles à ce stade.</div>
  </Shell>;
}
