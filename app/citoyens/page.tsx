import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Shell } from "@/components/Shell";

export default async function Page() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  const meta = user.user_metadata ?? {};
  const name = meta.full_name ?? meta.name ?? "Agent connecté";
  return <Shell active="citoyens" userName={String(name)}>
    <div className="eyebrow">Registre citoyen</div>
    <h1 className="heading">Citoyens</h1>
    <p className="subheading">Espace destiné aux dossiers RP des citoyens. Les données ne sont pas encore exposées tant que les droits de consultation ne sont pas finalisés.</p>
    <div className="page-list"><div className="row-item"><div className="card-icon">♙</div><div><strong>Fiches citoyens</strong><span>Prévu : identité RP, informations utiles et historique autorisé.</span></div><span className="pill">À CONFIGURER</span></div>
<div className="row-item"><div className="card-icon">⌕</div><div><strong>Recherche de dossier</strong><span>Prévu : rechercher un dossier selon les droits de l'agent.</span></div><span className="pill">À CONFIGURER</span></div>
<div className="row-item"><div className="card-icon">▤</div><div><strong>Traçabilité</strong><span>Les consultations sensibles devront être journalisées.</span></div><span className="pill">SÉCURITÉ</span></div></div>
    <div className="notice">Espace en préparation : les fonctions de lecture et de modification seront activées après la mise en place des permissions et des contrôles côté serveur.</div>
  </Shell>;
}
