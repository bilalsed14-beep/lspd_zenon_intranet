import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function LoginPage({ searchParams }: { searchParams: { error?: string } }) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (user) redirect("/dashboard");

  async function signInWithDiscord() {
    "use server";
    const client = createClient();
    const { data, error } = await client.auth.signInWithOAuth({
      provider: "discord",
      options: { redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback` },
    });
    if (error || !data.url) redirect("/login?error=oauth");
    redirect(data.url);
  }

  return <main className="login-wrap"><section className="login-card">
    <div className="brand"><div className="badge-logo">L</div><div><h1>LSPD ZENON RP</h1><p>INTRANET OFFICIEL</p></div></div>
    <div className="eyebrow">Accès sécurisé</div><h1 className="heading">Bienvenue, agent.</h1>
    <p className="subheading">Connecte-toi avec ton compte Discord pour accéder aux outils internes de la Los Santos Police Department.</p>
    {searchParams.error && <div className="notice">La connexion n'a pas abouti. Vérifie la configuration OAuth2 dans Supabase et Discord, puis réessaie.</div>}
    <form action={signInWithDiscord}><button className="btn" type="submit">◉ &nbsp; Se connecter avec Discord</button></form>
    <p className="small" style={{marginTop:20}}>L'accès est réservé aux membres autorisés. Toute tentative d'accès non autorisée peut être journalisée.</p>
    <div className="footer-note">ZENON RP · SYSTÈME D'INFORMATION POLICIER</div>
  </section></main>;
}
