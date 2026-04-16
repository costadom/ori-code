import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { answers } = body;

    if (!answers || answers.length < 10) {
      return NextResponse.json({ error: "Respostas incompletas" }, { status: 400 });
    }

    // FUTURO: Aqui entrará a chamada real para a OpenAI API
    // const gptResponse = await openai.chat.completions.create(...)

    // MOCK: Simulando delay de processamento da IA
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // MOCK: Resposta estruturada do Arquétipo (Baseado no Exu que você mandou)
    // No futuro, isso será dinâmico gerado pelo GPT
    const archetypeData = {
      archetype_id: "exu_professional",
      name: "Abertura de Caminhos e Estratégia (Exu)",
      description: "Você é a energia da comunicação, da negociação e do movimento. Não existem portas trancadas para você, apenas caminhos que ainda não foram traçados.",
      professional_profile: "Estratégico, criativo e com inteligência social aguçada. Transita bem entre os bastidores e o fronte de batalha. Sabe se adaptar e 'fazer acontecer' mesmo com obstáculos.",
      strengths: ["Comunicação adaptável", "Visão de oportunidade rápida", "Poder de negociação de alto nível"],
      weaknesses: ["Impulsividade em novos caminhos", "Dificuldade em lidar com burocracia excessiva", "Pode parecer desorganizado para perfis mais rígidos"],
      financial_behavior: "Seu dinheiro precisa estar em movimento. Você gera valor através de conexões, parcerias e compra/venda. A estagnação financeira é sua maior inimiga."
    };

    return NextResponse.json(archetypeData);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao consultar o oráculo" }, { status: 500 });
  }
}