import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Shell } from "@/components/Shell";

export default async function Page() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  const meta = user.user_metadata ?? {};
  const name = meta.full_name ?? meta.name ?? "Agent connecté";
  return <Shell active="compte" userName={String(name)}>
    <div className="eyebrow">Profil de l'agent</div>
    <h1 className="heading">Mon compte</h1>
    <p className="subheading">Consulte les informations de ton compte authentifié. Le grade et l'unité ne doivent être attribués que par une procédure administrative autorisée.</p>
    <div className="page-list"><div className="row-item"><div className="card-icon">◎</div><div><strong>Identité Discord</strong><span>Compte connecté via le fournisseur Discord de Supabase.</span></div><span className="pill">CONNECTÉ</span></div>
<div className="row-item"><div className="card-icon">▤</div><div><strong>Matricule et grade</strong><span>Les champs de profil seront liés à la table profiles après synchronisation sécurisée.</span></div><span className="pill">À CONFIGURER</span></div>
<div className="row-item"><div className="card-icon">⚙</div><div><strong>Sécurité du compte</strong><span>La session peut être fermée via le bouton de déconnexion.</span></div><span className="pill">DISPONIBLE</span></div></div>
    <div className="notice">Espace en préparation : les fonctions de lecture et de modification seront activées après la mise en place des permissions et des contrôles côté serveur.</div>
  </Shell>;
}
