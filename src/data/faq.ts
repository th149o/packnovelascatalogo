export interface FaqItem {
  question: string;
  answer: string;
  category?: string;
}

export const faqList: FaqItem[] = [
  {
    question: "Como recebo o acesso após a compra?",
    answer:
      "Assim que o seu pagamento for aprovado pelo sistema de checkout seguro, você receberá instantaneamente um e-mail com os seus dados de login e link direto para a plataforma. O acesso é 100% imediato e liberado 24 horas por dia.",
    category: "Acesso",
  },
  {
    question: "Posso assistir direto pelo celular?",
    answer:
      "Sim! Todas as 10 novelas foram produzidas e masterizadas no formato vertical nativo (9:16), exatamente igual aos vídeos de celular. Você pode assistir pelo smartphone, tablet ou computador, sem barras pretas e com carregamento ultrarrápido.",
    category: "Dispositivos",
  },
  {
    question: "Quantas novelas estão incluídas no pacote?",
    answer:
      "O pacote inclui exatamente as 10 novelas completas apresentadas nesta página. Todas as histórias possuem início, meio e desfecho concluído, sem cortes e sem necessidade de comprar moedas extras.",
    category: "Conteúdo",
  },
  {
    question: "Quantos episódios estão disponíveis no total?",
    answer:
      "São mais de 480 episódios completos somando todas as 10 produções. Cada episódio possui de 1 a 2 minutos de duração com ritmo frenético, reviravoltas intensas e sem enrolação.",
    category: "Conteúdo",
  },
  {
    question: "O conteúdo está organizado por novela e episódios?",
    answer:
      "Sim, dentro da plataforma o catálogo é totalmente organizado por títulos e sequências ordenadas de episódios. Você pode pausar, retomar de onde parou e avançar de forma simples e intuitiva.",
    category: "Plataforma",
  },
  {
    question: "Por quanto tempo o acesso fica disponível?",
    answer:
      "Ao adquirir esta oferta especial, você garante acesso por tempo indeterminado/vitalício conforme a configuração do plano, podendo maratonar no seu próprio ritmo, quantas vezes desejar.",
    category: "Garantia",
  },
  {
    question: "Existe alguma garantia de satisfação?",
    answer:
      "Sim! Você conta com uma garantia incondicional de 7 dias. Se por qualquer motivo você não amar as histórias, basta solicitar o reembolso integral com um único e-mail para nossa equipe de suporte.",
    category: "Garantia",
  },
];

