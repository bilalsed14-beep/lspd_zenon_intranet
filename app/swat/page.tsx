import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Shell } from "@/components/Shell";

export default async function Page() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  const meta = user.user_metadata ?? {};
  const name = meta.full_name ?? meta.name ?? "Agent connecté";
  return <Shell active="swat" userName={String(name)}>
    <div className="eyebrow">Special Weapons and Tactics</div>
    <h1 className="heading">Unité SWAT</h1>
    <p className="subheading">Unité spécialisée dans les interventions à haut risque, la sécurisation de périmètres et l'appui tactique aux unités de patrouille.</p>
    <div className="page-list"><div className="row-item"><div className="card-icon">⬟</div><div><strong>Missions de l'unité</strong><span>Interventions à risque élevé, soutien tactique et sécurisation de scènes.</span></div><span className="pill">DOCTRINE</span></div>
<div className="row-item"><div className="card-icon">✓</div><div><strong>Conditions d'accès</strong><span>Sélection, maîtrise des procédures, discipline et entraînement RP.</span></div><span className="pill">RECRUTEMENT</span></div>
<div className="row-item"><div className="card-icon">▤</div><div><strong>Procédures</strong><span>Les procédures détaillées seront ajoutées par les responsables habilités.</span></div><span className="pill">À COMPLÉTER</span></div></div>
    <div className="notice">Espace en préparation : les fonctions de lecture et de modification seront activées après la mise en place des permissions et des contrôles côté serveur.</div>
  </Shell>;
}
