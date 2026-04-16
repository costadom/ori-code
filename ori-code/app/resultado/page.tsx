"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Cinzel, Montserrat } from "next/font/google";

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "700"] });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["300", "500", "700"] });

export default function ResultPage() {
  const router = useRouter();
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    // Busca o arquétipo gerado na sessão
    const savedData = sessionStorage.getItem("oriCodeArchetype");
    if (savedData) {
      setResult(JSON.parse(savedData));
    } else {
      router.push("/");
    }
  }, [router]);

  if (!result) return null;

  return (
    <main className={`min-h-screen bg-[#030005] text-white py-16 px-4 md:px-8 ${montserrat.className}`}>
      <div className="max-w-4xl mx-auto animate-fade-in flex flex-col items-center">
        
        <p className="text-[#cfb53b] tracking-[0.4em] uppercase text-xs sm:text-sm font-bold text-center mb-5 opacity-90">
          Seu Arquétipo Financeiro Revelado
        </p>
        
        {/* Título com Cinzel */}
        <h1 className={`${cinzel.className} text-4xl sm:text-5xl md:text-7xl font-bold text-center mb-16 drop-shadow-lg text-[#fcf6ba]`}>
          {result.name}
        </h1>

        {/* 1. Essência */}
        <div className="w-full bg-black/40 border border-[#cfb53b]/20 p-8 rounded-2xl mb-8 backdrop-blur-sm shadow-xl hover:border-[#cfb53b] transition-all duration-300">
          <h3 className={`${cinzel.className} text-2xl md:text-3xl text-[#cfb53b] mb-4`}>A Essência Ancestral</h3>
          <p className="text-gray-300 leading-relaxed text-lg tracking-wide">{result.description}</p>
        </div>

        {/* 2. Grid de Forças e Bloqueios */}
        <div className="w-full grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-black/40 border border-green-900/30 p-8 rounded-2xl hover:border-green-500/40 transition-all duration-300">
            <h3 className={`${cinzel.className} text-xl md:text-2xl text-green-400 mb-5`}>✦ Forças Naturais</h3>
            <ul className="space-y-3.5 text-gray-300">
              {result.strengths.map((s: string, i: number) => (
                <li key={i} className="flex gap-2.5"><span className="text-green-500">✔</span> {s}</li>
              ))}
            </ul>
          </div>

          <div className="bg-black/40 border border-red-900/30 p-8 rounded-2xl hover:border-red-500/40 transition-all duration-300">
            <h3 className={`${cinzel.className} text-xl md:text-2xl text-red-400 mb-5`}>✧ Bloqueios Ancestrais (Sombras)</h3>
            <ul className="space-y-3.5 text-gray-300">
              {result.weaknesses.map((w: string, i: number) => (
                <li key={i} className="flex gap-2.5"><span className="text-red-500">✘</span> {w}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* 3. Comportamento Financeiro */}
        <div className="w-full bg-black/40 border border-[#cfb53b]/20 p-8 rounded-2xl mb-16 backdrop-blur-sm shadow-xl">
          <h3 className={`${cinzel.className} text-2xl md:text-3xl text-[#cfb53b] mb-4`}>O Padrão Invisível de Comportamento</h3>
          <p className="text-gray-300 leading-relaxed text-lg mb-8 tracking-wide">{result.financial_behavior}</p>
          <div className="pl-4 border-l-2 border-[#cfb53b]">
            <strong className="text-[#e8c39e] block mb-1">Ponto Cego Crítico:</strong>
            <p className="text-gray-400 text-sm italic balance-text">{result.block}</p>
          </div>
        </div>

        {/* UPSELL SECTION (Onde entra o dinheiro de verdade) */}
        <div className="w-full bg-gradient-to-b from-[#1a1405] via-black to-[#0d0a02] border border-[#cfb53b]/50 p-8 sm:p-12 md:p-16 rounded-3xl text-center relative overflow-hidden shadow-[0_0_60px_rgba(0,0,0,1)]">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90%] h-1 bg-gradient-to-r from-transparent via-[#cfb53b] to-transparent"></div>
          
          <h2 className={`${cinzel.className} text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight balance-text drop-shadow-md`}>
            Quer blindar essa energia e expandir seu fluxo financeiro?
          </h2>
          <p className="text-gray-400 mb-10 max-w-2xl mx-auto balance-text leading-relaxed tracking-wide text-lg">
            Adquira o Plano Estratégico de Ação completo para o arquétipo <strong>{result.name}</strong>. Inclui hábitos ritualísticos de prosperidade, táticas de investimento baseadas na sua energia e rituais para transmutar seus bloqueios financeiros.
          </p>
          
          <button className="bg-[#cfb53b] text-black font-bold text-lg md:text-xl uppercase tracking-[0.3em] px-12 py-5 sm:py-6 rounded-full hover:bg-white hover:shadow-[0_0_30px_rgba(207,181,59,0.3)] transition-all duration-300 transform hover:scale-[1.03]">
            Desbloquear Plano por R$ 9,90
          </button>
        </div>

      </div>
    </main>
  );
}