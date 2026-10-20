// Catálogo exibido na landing. Espelha /api/aluno/mentor/planos da plataforma EAD JML
// (copiado em 20/10/2026). Ao mudar preço ou benefício lá, atualize aqui também.
export const planos = [
  {
    key: 'essencial',
    nome: 'Essencial',
    para: 'Para quem está começando o curso',
    preco: 29.9,
    creditos: 60,
    audio: false,
    beneficios: [
      '60 créditos por mês',
      'Chat com as fontes e o minuto exato da aula',
      'Questões de revisão e resumos de módulo',
      '1 mapa mental e 1 síntese do curso por mês',
    ],
  },
  {
    key: 'avancado',
    nome: 'Avançado',
    para: 'Para quem quer revisão completa e treino',
    preco: 59.9,
    creditos: 150,
    audio: true,
    destaque: true,
    beneficios: [
      '150 créditos por mês',
      'Sem limite mensal de mapas e sínteses',
      'Simulados de 10 questões',
      '1 episódio curto de podcast por mês',
      '7 dias de teste com 30 créditos',
    ],
  },
  {
    key: 'completo',
    nome: 'Completo',
    para: 'Para quem quer o Mentor por completo',
    preco: 99.9,
    creditos: 300,
    audio: true,
    beneficios: [
      '300 créditos por mês',
      'Simulados de 10 ou 20 questões',
      '30 minutos de podcast por mês, episódios curtos ou longos',
    ],
  },
];

// Custo em créditos de cada ação (igual em todos os planos hoje).
export const custos = { chat: 1, mapa: 8, resumo: 6, podcast: 3 };
