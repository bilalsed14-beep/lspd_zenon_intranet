import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Shell } from "@/components/Shell";

export default async function Page() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  const ownerId = process.env.DISCORD_OWNER_ID;
  const discordId = String(user.user_metadata?.provider_id ?? user.user_metadata?.sub ?? "");
  const isOwnerId = Boolean(ownerId && discordId && discordId === ownerId);

  return <Shell active="owner" userName={String(user.user_metadata?.full_name ?? user.user_metadata?.name ?? "Compte connecté")}>
    <div className="eyebrow">Administration système</div><h1 className="heading">Espace Owner</h1>
    <p className="subheading">Administration générale de l'intranet LSPD Zenon RP.</p>
    <div className="notice">Protection en cours de développement. Correspondance de l'identifiant détectée : {isOwnerId ? "oui" : "non ou identifiant Discord non fourni par les métadonnées"}. La vérification du rôle Discord Owner et une autorisation serveur complète sont nécessaires avant d'activer les actions d'administration.</div>
    <div className="page-list"><div className="row-item"><div className="card-icon">♛</div><div><strong>Gestion des autorisations</strong><span>Configuration prévue des rôles et des accès par catégorie.</span></div><span className="pill">À CONFIGURER</span></div><div className="row-item"><div className="card-icon">⚙</div><div><strong>Configuration de l'intranet</strong><span>Paramètres système et contrôles de sécurité.</span></div><span className="pill">À CONFIGURER</span></div></div>
  </Shell>;
}
