import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Shell } from "@/components/Shell";

export default async function Page() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  const meta = user.user_metadata ?? {};
  const name = meta.full_name ?? meta.name ?? "Agent connecté";
  return <Shell active="ddr" userName={String(name)}>
    <div className="eyebrow">Direction des dossiers de recherche</div>
    <h1 className="heading">DDR — Avis de recherche</h1>
    <p className="subheading">Espace prévu pour les avis de recherche RP actifs. Aucun avis réel ou fictif n'est affiché dans cette version initiale.</p>
    <div className="page-list"><div className="row-item"><div className="card-icon">⌕</div><div><strong>Avis actifs</strong><span>Prévu : motif, description RP, niveau de danger et statut.</span></div><span className="pill">À CONFIGURER</span></div>
<div className="row-item"><div className="card-icon">▤</div><div><strong>Créer un avis</strong><span>La création sera réservée aux agents habilités et journalisée.</span></div><span className="pill">PERMISSIONS</span></div>
<div className="row-item"><div className="card-icon">✓</div><div><strong>Clôture et archivage</strong><span>Prévu : suspendre ou clôturer un avis avec traçabilité.</span></div><span className="pill">À CONFIGURER</span></div></div>
    <div className="notice">Espace en préparation : les fonctions de lecture et de modification seront activées après la mise en place des permissions et des contrôles côté serveur.</div>
  </Shell>;
}
