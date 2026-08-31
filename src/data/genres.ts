export interface GenreItem {
  id: string;
  title: string;
  emoji: string;
  tagline: string;
  count: string;
  accentColor: string;
}

export const genresList: GenreItem[] = [
  {
    id: "romance",
    title: "Romance Ardente",
    emoji: "❤️",
    tagline: "Química intensa, paixões proibidas e sentimentos incontroláveis que desafiam a razão.",
    count: "4 Novelas",
    accentColor: "from-pink-500/20 to-rose-600/20 border-pink-500/30 text-pink-400",
  },
  {
    id: "bilionarios",
    title: "Bilionários & CEOs",
    emoji: "💰",
    tagline: "Homens de poder implacáveis que têm o mundo aos seus pés, exceto o coração de quem amam.",
    count: "5 Novelas",
    accentColor: "from-amber-500/20 to-yellow-600/20 border-amber-500/30 text-amber-400",
  },
  {
    id: "herdeiras",
    title: "Herdeiras Ocultas",
    emoji: "👑",
    tagline: "Mulheres fortes, sucessoras legítimas subestimadas que retornam para tomar o trono.",
    count: "3 Novelas",
    accentColor: "from-purple-500/20 to-fuchsia-600/20 border-purple-500/30 text-purple-400",
  },
  {
    id: "vinganca",
    title: "Vingança & Justiça",
    emoji: "🔥",
    tagline: "Traições cruéis pagas com juros em planos calculados e momentos de humilhação pública.",
    count: "4 Novelas",
    accentColor: "from-red-500/20 to-rose-700/20 border-red-500/30 text-red-400",
  },
  {
    id: "casamentos",
    title: "Casamentos Inesperados",
    emoji: "💍",
    tagline: "Contratos frios e pactos arranjados que se transformam na maior tempestade de paixão.",
    count: "3 Novelas",
    accentColor: "from-pink-500/20 to-red-500/20 border-pink-500/30 text-pink-400",
  },
  {
    id: "segredos",
    title: "Segredos & Disfarces",
    emoji: "🤫",
    tagline: "Identidades ocultas, verdades guardadas a sete chaves e revelações estarrecedoras.",
    count: "4 Novelas",
    accentColor: "from-indigo-500/20 to-violet-600/20 border-indigo-500/30 text-indigo-400",
  },
  {
    id: "familia",
    title: "Histórias de Família",
    emoji: "👶",
    tagline: "Lutas de sangue, mães protetoras e reencontros que vão arrancar lágrimas e suspiros.",
    count: "3 Novelas",
    accentColor: "from-sky-500/20 to-blue-600/20 border-sky-500/30 text-sky-400",
  },
  {
    id: "reviravoltas",
    title: "Reviravoltas & Plot Twists",
    emoji: "⚡",
    tagline: "Finais que você jamais adivinharia, onde cada episódio termina com um gancho impossível de parar.",
    count: "Todos os Títulos",
    accentColor: "from-emerald-500/20 to-teal-600/20 border-emerald-500/30 text-emerald-400",
  },
];

