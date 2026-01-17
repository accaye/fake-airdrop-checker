const ROOT_URL = "https://airdrop-checker-chi.vercel.app";

export const minikitConfig = {
  accountAssociation: {
    header: "", // ← isi nanti
    payload: "",
    signature: ""
  },
  miniapp: {
    version: "1",
    name: "Am I Eligible?",
    subtitle: "Fake airdrop checker",
    description: "Check if you're eligible for the $FAKE token airdrop! Just for fun.",
    iconUrl: `${ROOT_URL}/icon.png`,
    homeUrl: ROOT_URL,
    splashImageUrl: `${ROOT_URL}/splash.png`,
    splashBackgroundColor: "#0f0f0f",
    primaryCategory: "games",
    tags: ["airdrop", "fun", "fake", "eligibility", "base"],
    heroImageUrl: `${ROOT_URL}/hero.png`,
    ogTitle: "Am I Eligible for $FAKE?",
    ogDescription: "Try your luck! Fake airdrop checker for Farcaster.",
    ogImageUrl: `${ROOT_URL}/og.png`,
  },
} as const;