import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || "");

export async function POST(request: Request) {
  try {
    const { answers } = await request.json();
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      Atue como um mestre dos arquétipos da Umbanda focado em psicologia financeira.
      Analise estas respostas do usuário: "${answers.join(", ")}".
      
      Escolha a entidade mais próxima: Exu, Ogum, Oxóssi, Pomba Gira, Xangô ou Zé Pilintra.
      
      Retorne APENAS um objeto JSON puro com:
      {
        "name": "Nome da Entidade",
        "archetype_title": "Ex: O Senhor da Estratégia",
        "teaser": "Frase curta e misteriosa para o card de compartilhamento.",
        "description": "Análise profunda de 3 parágrafos sobre o comportamento e bloqueios financeiros dele.",
        "image_prompt": "Um prompt em INGLÊS para gerar uma imagem estilo tarot, mística, dark fantasy, gold details, cinematic lighting da entidade escolhida.",
        "upsell_preview": "Resumo do que ele ganha pagando R$ 9,90 (Plano de Ação)."
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().replace(/```json/g, "").replace(/```/g, "").trim();
    const data = JSON.parse(text);

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "O Oráculo silenciou. Tente novamente." }, { status: 500 });
  }
}
