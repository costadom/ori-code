"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Cinzel, Montserrat } from "next/font/google";
import LiquidBackground from "@/components/LiquidBackground";

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "700", "900"] });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "500", "800"] });

export default function ResultPage() {
  const router = useRouter();
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    const saved = sessionStorage.getItem("oriCodeArchetype");
    if (saved) setResult(JSON.parse(saved));
    else router.push("/");
  }, [router]);

  if (!result) return null;

  return (
    <main className={`min-h-screen bg-[#030005] text-white py-12 px-4 ${montserrat.className}`}>
      <LiquidBackground />
      <div className="max-w-2xl mx-auto flex flex-col items-center relative z-20">
        
        <div className="text-center mb-16">
          <span className="text-[#cfb53b] text-xs tracking-[0.5em] uppercase">Análise Desbloqueada</span>
          <h1 className={`${cinzel.className} text-5xl md:text-7xl text-white font-black mt-4 uppercase drop-shadow-[0_0_20px_rgba(207,181,59,0.3)]`}>
            {result.name}
          </h1>
          <div className="h-1 w-24 bg-[#cfb53b] mx-auto mt-4 rounded-full"></div>
        </div>

        {/* CONTEÚDO REVELADO */}
        <div className="w-full bg-[#0a0710]/60 border border-[#cfb53b]/20 p-8 md:p-12 rounded-[2.5rem] backdrop-blur-xl mb-12 shadow-2xl">
           <h3 className={`${cinzel.className} text-[#e8c39e] text-xl mb-6 tracking-widest font-bold`}>A Visão do Oráculo</h3>
           <div className="space-y-6 text-gray-300 leading-relaxed text-lg font-medium">
              {result.description.split('\n').map((para: string, i: number) => (
                <p key={i}>{para}</p>
              ))}
           </div>
        </div>

        {/* SEÇÃO DE UPSELL (R$ 9,90) */}
        <div className="w-full bg-gradient-to-br from-[#1a1405] via-black to-[#0d0a02] border-2 border-[#cfb53b]/60 p-10 rounded-[3rem] text-center shadow-[0_0_50px_rgba(207,181,59,0.2)] relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-4">
              <span className="bg-red-600 text-[10px] font-bold px-3 py-1 rounded-full text-white animate-pulse">OFERTA LIMITADA</span>
           </div>

           <h2 className={`${cinzel.className} text-3xl md:text-4xl text-white font-bold mb-6`}>
             O Mapa da Mina de {result.name.split(' ')[0]}
           </h2>
           
           <p className="text-gray-300 mb-8 text-sm leading-relaxed max-w-md mx-auto">
             {result.upsell_preview} Descubra os **3 passos práticos** para começar a faturar usando sua energia natural hoje.
           </p>

           <div className="flex flex-col gap-3 mb-10 text-left max-w-xs mx-auto">
              <div className="flex items-center gap-3 text-xs text-[#cfb53b]">
                <div className="w-4 h-4 rounded-full bg-[#cfb53b] text-black flex items-center justify-center font-bold">✓</div>
                Ritual de Ativação Financeira
              </div>
              <div className="flex items-center gap-3 text-xs text-[#cfb53b]">
                <div className="w-4 h-4 rounded-full bg-[#cfb53b] text-black flex items-center justify-center font-bold">✓</div>
                Onde investir sua energia agora
              </div>
           </div>

           <button className="w-full py-6 bg-white text-black font-black uppercase tracking-[0.2em] rounded-full hover:bg-[#cfb53b] hover:text-black hover:scale-105 transition-all shadow-xl active:scale-95">
             Quero o Plano Estratégico (R$ 9,90)
           </button>
        </div>
      </div>
    </main>
  );
}
