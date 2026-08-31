export interface Novel {
  id: number;
  title: string;
  cover: string;
  episodes: number;
  badge?: string;
  synopsis: string;
  tags: string[];
  primaryGenre: string;
  rating: number;
  durationApprox: string;
  highlightHook: string;
}

export const novelsList: Novel[] = [
  {
    id: 1,
    title: "A Vida Secreta do Meu Marido Bilionário",
    cover: "/capas/a vida secreta do meu marido bilionário.jpg",
    episodes: 56,
    badge: "🔥 Top 1 do Catálogo",
    synopsis:
      "Ela acreditava ter se casado com um homem humilde e trabalhador. Mal sabia que por trás daquele olhar simples se escondia o herdeiro bilionário mais temido e poderoso do país, testando a lealdade de todos ao seu redor.",
    tags: ["Bilionários", "Segredos", "Romance", "Reviravoltas"],
    primaryGenre: "Romance & Segredos",
    rating: 5.0,
    durationApprox: "56 episódios (1h 18min)",
    highlightHook: "Ela pensava que ele era um homem simples, até descobrir quem ele realmente era.",
  },
  {
    id: 2,
    title: "A Vida Dupla da Herdeira Bilionária",
    cover: "/capas/a vida dupla da herdeira bilionária.jpeg",
    episodes: 50,
    badge: "👑 Sucesso Absoluto",
    synopsis:
      "Disfarçada como uma funcionária comum para fugir das intrigas da alta sociedade, ela precisa lidar com a arrogância dos colegas e o interesse de um CEO implacável que não faz ideia de quem ela é de verdade.",
    tags: ["Herdeiras", "Identidades Secretas", "Bilionários", "Vingança"],
    primaryGenre: "Herdeiras & Identidades",
    rating: 4.9,
    durationApprox: "50 episódios (1h 10min)",
    highlightHook: "Ela fingia ser uma mulher comum, mas era a herdeira do maior império do país.",
  },
  {
    id: 3,
    title: "O Retorno da Herdeira Perdida",
    cover: "/capas/o retorno da herdeira perdida.jpeg",
    episodes: 55,
    badge: "💎 Reviravolta Épica",
    synopsis:
      "Humilhada, traída e expulsa de casa pela família adotiva gananciosa, ela descobre que é a legítima sucessora de uma das maiores dinastias empresariais. Anos depois, seu retorno é marcado por uma sede implacável de justiça.",
    tags: ["Herdeiras", "Vingança", "Histórias de Família", "Reviravoltas"],
    primaryGenre: "Herdeiras & Vingança",
    rating: 5.0,
    durationApprox: "55 episódios (1h 20min)",
    highlightHook: "Eles a humilharam na miséria. Ela voltou dona de tudo para cobrar a conta.",
  },
  {
    id: 4,
    title: "A Adorável Esposa Do Sr. Monteiro",
    cover: "/capas/A AdoráVel Esposa Do Sr. Monteiro.jpeg",
    episodes: 54,
    badge: "❤️ Favorita do Público",
    synopsis:
      "Para salvar a família, ela aceita um casamento arranjado com o temido Sr. Monteiro. Entre regras rígidas de convivência e a frieza inicial, uma paixão irresistível começa a quebrar todas as barreiras do empresário.",
    tags: ["Casamento Inesperado", "Romance", "Bilionários", "Segredos"],
    primaryGenre: "Romance & Casamentos",
    rating: 4.9,
    durationApprox: "54 episódios (1h 15min)",
    highlightHook: "Um casamento de aparências que se transformou na maior tempestade de paixão.",
  },
  {
    id: 5,
    title: "O Capo que Jurou Nunca Me Amar",
    cover: "/capas/O Capo que Jurou Nunca Me Amar.jpg",
    episodes: 58,
    badge: "⚡ Drama Intenso",
    synopsis:
      "Ele é o líder impiedoso do submundo que jurou que jamais entregaria seu coração a ninguém. Ela é a mulher forçada a entrar no seu território. O que começa como um confronto perigoso se torna uma obsessão incontrolável.",
    tags: ["Bilionários", "Vingança", "Romance", "Drama"],
    primaryGenre: "Romance & Poder",
    rating: 4.9,
    durationApprox: "58 episódios (1h 22min)",
    highlightHook: "Ele jurou que seu coração era de gelo, até cruzar o caminho dela.",
  },
  {
    id: 6,
    title: "Seduzida Pelo Fazendeiro Pai Solteiro",
    cover: "/capas/Seduzida Pelo Fazendeiro Pai Solteiro.jpeg",
    episodes: 48,
    badge: "🔥 Paixão Irresistível",
    synopsis:
      "Uma jovem da cidade grande aceita um trabalho temporário no interior e se vê diante de um fazendeiro viúvo, atraente e protetor, que luta para criar a filha sozinho. O choque de mundos logo dá lugar a uma química arrebatadora.",
    tags: ["Romance", "Histórias de Família", "Relacionamentos", "Drama"],
    primaryGenre: "Romance & Família",
    rating: 4.8,
    durationApprox: "48 episódios (1h 05min)",
    highlightHook: "Ela foi para o campo a trabalho e acabou encontrando uma família e um grande amor.",
  },
  {
    id: 7,
    title: "De Repente Casados",
    cover: "/capas/de repente casados.jpeg",
    episodes: 52,
    badge: "💍 Mais Maratonada",
    synopsis:
      "Depois de uma noite de celebração cheia de surpresas, dois desconhecidos acordam com certidões de casamento assinadas. Forçados a fingir que são um casal perfeito perante a sociedade, a farsa rapidamente vira realidade.",
    tags: ["Casamento Inesperado", "Romance", "Bilionários", "Relacionamentos"],
    primaryGenre: "Casamentos Inesperados",
    rating: 4.9,
    durationApprox: "52 episódios (1h 12min)",
    highlightHook: "Um pacto inesperado de casamento onde o amor não estava nos planos, mas aconteceu.",
  },
  {
    id: 8,
    title: "Como Domar Uma Coroa",
    cover: "/capas/como domar uma coroa.jpeg",
    episodes: 46,
    badge: "✨ Alta Sedução",
    synopsis:
      "Ela é uma mulher sofisticada, independente e que não aceita ordens de ninguém. Ele é um homem determinado a conquistá-la a qualquer custo. Um jogo envolvente de inteligência, charme e sedução onde ninguém quer ceder.",
    tags: ["Romance", "Relacionamentos", "Drama", "Reviravoltas"],
    primaryGenre: "Romance & Sedução",
    rating: 4.8,
    durationApprox: "46 episódios (1h 00min)",
    highlightHook: "Um jogo de sedução e poder onde quem se apaixona primeiro perde o controle.",
  },
  {
    id: 9,
    title: "Ligados Pela Honra",
    cover: "/capas/ligados pela honra .jpg",
    episodes: 44,
    badge: "⚡ Alta Tensão",
    synopsis:
      "Unidos por uma promessa de sangue e honra entre famílias rivais, eles precisam aprender a confiar um no outro enquanto enfrentam traidores internos que tentam destruir a frágil aliança a qualquer custo.",
    tags: ["Drama", "Vingança", "Segredos", "Relacionamentos"],
    primaryGenre: "Drama & Honra",
    rating: 4.7,
    durationApprox: "44 episódios (58min)",
    highlightHook: "Unidos por um juramento inquebrável em um mundo onde traição custa caro.",
  },
  {
    id: 10,
    title: "Só Mais Uma Vez",
    cover: "/capas/Só Mais Uma Vez.jpeg",
    episodes: 45,
    badge: "❤️ Amor Inesquecível",
    synopsis:
      "Separados no passado por mentiras de terceiros, eles se reencontram anos mais tarde quando já acreditavam ter superado. Bastou uma única troca de olhares para reacender uma chama que nunca havia se apagado.",
    tags: ["Romance", "Reviravoltas", "Drama", "Relacionamentos"],
    primaryGenre: "Romance & Reencontro",
    rating: 4.9,
    durationApprox: "45 episódios (1h 02min)",
    highlightHook: "Entre o passado e o presente, uma última chance para um amor que nunca morreu.",
  },
];
