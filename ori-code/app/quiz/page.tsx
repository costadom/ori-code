"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LiquidBackground from "@/components/LiquidBackground";
import { Cinzel, Montserrat } from "next/font/google";

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "700", "900"] });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

const QUESTIONS = [
  { question: "Como você toma as decisões financeiras mais importantes?", options: ["Intuição pura, eu sinto o movimento", "Lógica fria e planilhas", "Conselhos de pessoas de confiança", "Impulso no calor do momento"] },
  { question: "Quando o dinheiro entra na sua conta, qual é o seu primeiro instinto?", options: ["Gastar com experiências ou pessoas", "Investir e esconder o dinheiro", "Pagar contas para sentir alívio", "Comprar algo que me dê status"] },
  { question: "Como você lida com riscos e incertezas?", options: ["Amo o risco, a vida é movimento", "Fugo do risco, preciso de segurança", "Calculo cada passo milimetricamente", "Só arrisco se não tiver escolha"] },
  { question: "O que a palavra 'Escassez' desperta em você?", options: ["Raiva e vontade de lutar para fazer mais", "Ansiedade profunda e paralisia", "Criatividade para achar novas saídas", "Aceitação de um ciclo passageiro"] },
  { question: "Em relação aos seus limites profissionais, você costuma:", options: ["Doar meu tempo até me esgotar", "Ser rígido e não misturar emoções", "Ter dificuldade em cobrar o meu valor", "Saber meu valor e exigir ser pago por ele"] },
  { question: "Para você, o dinheiro é principalmente uma ferramenta de:", options: ["Liberdade e movimento irrestrito", "Poder, influência e expansão", "Segurança, paz e proteção", "Prazer e celebração da vida"] },
  { question: "Qual costuma ser o seu maior 'pecado' financeiro?", options: ["Comprar por impulso para preencher um vazio", "Perder oportunidades por pensar demais", "Emprestar dinheiro e não receber", "Esquecer de organizar o fluxo"] },
  { question: "Como você reage quando alguém te deve um favor ou valor?", options: ["Cobro de frente, sem rodeios", "Deixo pra lá para evitar conflitos", "Fico ressentido, mas apenas jogo indiretas", "Transformo em uma dívida moral futura"] },
  { question: "Onde você se sente mais produtivo e abundante?", options: ["No caos, resolvendo problemas rápidos", "No silêncio, planejando a longo prazo", "Em parcerias, conectando pessoas", "No palco, liderando a visão"] },
  { question: "Qual é o seu objetivo final ao dominar sua energia?", options: ["Não dever satisfação a ninguém", "Deixar um império duradouro", "Ajudar e elevar as pessoas ao meu redor", "Viver uma vida de luxo e mistério"] }
];

const toRoman = (num: number) => {
  const roman = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];
  return roman[num] || (num + 1).toString();
};

export default function QuizPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const handleSelect = (option: string) => {
    if (isExiting) return;
    const newAnswers = [...answers, option];
    setAnswers(newAnswers);
    setIsExiting(true);

    setTimeout(async () => {
      if (step < QUESTIONS.length - 1) {
        setStep(step + 1);
        setIsExiting(false);
      } else {
        setIsProcessing(true);
        try {
          const res = await fetch("/api/analyze", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ answers: newAnswers }),
          });
          const data = await res.json();
          sessionStorage.setItem("oriCodeArchetype", JSON.stringify(data));
          router.push("/checkout");
        } catch (error) {
          console.error("Erro", error);
          setIsProcessing(false);
        }
      }
    }, 500);
  };

  return (
    <main className={`relative min-h-screen flex items-center justify-center p-4 overflow-hidden bg-[#030005] ${montserrat.className}`}>
      <LiquidBackground />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.95)_100%)] z-10 pointer-events-none"></div>

      {/* CARD DA CARTA DE TARÔ - Centralizado e com largura travada */}
      <div className="relative z-20 w-full max-w-[380px] bg-black/80 backdrop-blur-xl border border-[#cfb53b]/40 rounded-[2.5rem] shadow-[0_0_50px_rgba(0,0,0,0.8)] p-8 flex flex-col items-center">
        
        {/* Adornos nos cantos */}
        <div className="absolute top-5 left-5 w-1 h-1 bg-[#cfb53b] rounded-full"></div>
        <div className="absolute top-5 right-5 w-1 h-1 bg-[#cfb53b] rounded-full"></div>
        <div className="absolute bottom-5 left-5 w-1 h-1 bg-[#cfb53b] rounded-full"></div>
        <div className="absolute bottom-5 right-5 w-1 h-1 bg-[#cfb53b] rounded-full"></div>

        <div className={`w-full flex flex-col transition-all duration-500 ease-in-out ${isExiting ? "opacity-0 blur-lg scale-95" : "opacity-100 blur-0 scale-100"}`}>
          
          {isProcessing ? (
            <div className="flex flex-col items-center justify-center text-center py-16">
              <div className="w-12 h-12 rounded-full border-2 border-t-[#cfb53b] border-r-transparent border-b-transparent border-l-transparent animate-spin mb-6 shadow-[0_0_15px_#cfb53b]"></div>
              <h2 className={`${cinzel.className} text-2xl text-[#cfb53b] font-bold tracking-widest`}>Lendo o Oráculo...</h2>
            </div>
          ) : (
            <>
              {/* Header da Carta */}
              <div className="flex flex-col items-center mb-8">
                <span className={`${cinzel.className} text-3xl text-[#cfb53b] font-bold drop-shadow-[0_0_10px_rgba(207,181,59,0.3)]`}>
                  {toRoman(step)}
                </span>
                <div className="w-10 h-[1px] bg-[#cfb53b]/40 mt-2"></div>
              </div>

              {/* Pergunta */}
              <h2 className={`${cinzel.className} text-xl md:text-2xl text-center text-white font-bold leading-relaxed mb-10`}>
                {QUESTIONS[step].question}
              </h2>

              {/* Opções de Resposta */}
              <div className="flex flex-col gap-4 w-full">
                {QUESTIONS[step].options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelect(opt)}
                    className="group w-full flex items-center p-4 rounded-xl bg-black border border-[#cfb53b]/20 hover:border-[#cfb53b] hover:bg-[#cfb53b]/10 transition-all duration-300 active:scale-95 text-left"
                  >
                    {/* Letra A, B, C, D */}
                    <div className={`${cinzel.className} flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full border border-[#cfb53b]/50 text-[#cfb53b] font-bold mr-4 group-hover:bg-[#cfb53b] group-hover:text-black transition-all`}>
                      {String.fromCharCode(65 + idx)}
                    </div>
                    
                    <span className="flex-1 text-gray-200 text-sm font-medium tracking-wide group-hover:text-white">
                      {opt}
                    </span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}