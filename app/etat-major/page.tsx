import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Shell } from "@/components/Shell";

export default async function Page() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  return <Shell active="etat-major" userName={String(user.user_metadata?.full_name ?? user.user_metadata?.name ?? "Agent connecté")}>
    <div className="eyebrow">Commandement</div><h1 className="heading">État-Major</h1>
    <p className="subheading">Espace réservé aux hauts gradés autorisés pour la gestion des agents, les annonces internes et le suivi du service.</p>
    <div className="notice">Accès en attente : cette page n'affiche aucune donnée confidentielle. Avant l'activation, une vérification serveur des rôles Discord autorisés doit être ajoutée. Ne considère pas le simple affichage de cette page comme une protection d'accès.</div>
    <div className="page-list"><div className="row-item"><div className="card-icon">♜</div><div><strong>Gestion de l'effectif</strong><span>Grades, matricules, unités et suivi administratif.</span></div><span className="pill">À CONFIGURER</span></div><div className="row-item"><div className="card-icon">▤</div><div><strong>Annonces et rapports</strong><span>Communications réservées au commandement.</span></div><span className="pill">À CONFIGURER</span></div></div>
  </Shell>;
}
