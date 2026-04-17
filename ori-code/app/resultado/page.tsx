"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Cinzel, Montserrat } from "next/font/google";

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "700", "900"] });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "500", "700"] });

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
      <div className="max-w-2xl mx-auto flex flex-col items-center">
        
        <h1 className={`${cinzel.className} text-4xl md:text-6xl text-[#cfb53b] font-bold text-center mb-2 uppercase`}>
          {result.name}
        </h1>
        <p className="text-gray-400 tracking-[0.4em] uppercase text-xs mb-12">{result.archetype_title}</p>

        {/* ANÁLISE COMPLETA (SEM BLUR) */}
        <div className="w-full space-y-8 mb-16">
          <div className="bg-black/40 border-l-4 border-[#cfb53b] p-8 rounded-r-2xl shadow-xl">
             <h3 className={`${cinzel.className} text-[#e8c39e] text-xl mb-4 tracking-widest`}>A Sua Essência Profissional</h3>
             <p className="text-gray-300 leading-relaxed text-lg italic">"{result.description}"</p>
          </div>
        </div>

        {/* SEÇÃO DE UPSELL (R$ 9,90) */}
        <div className="w-full bg-gradient-to-b from-[#1a1405] to-black border border-[#cfb53b]/50 p-10 rounded-3xl text-center relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#cfb53b] to-transparent"></div>
           
           <h2 className={`${cinzel.className} text-2xl md:text-3xl text-white font-bold mb-4`}>
             O Caminho do Ouro
           </h2>
           <p className="text-gray-400 mb-8 text-sm leading-relaxed">
             {result.upsell_preview} Queremos entregar-lhe o plano de ação exato para dominar esta energia e multiplicar os seus ganhos.
           </p>

           <div className="bg-black/60 border border-[#cfb53b]/30 rounded-xl p-4 mb-8 inline-block">
              <span className="text-xs text-gray-500 uppercase block mb-1">Oferta Única</span>
              <span className="text-3xl font-black text-[#cfb53b]">R$ 9,90</span>
           </div>

           <button className="w-full py-5 bg-white text-black font-black uppercase tracking-[0.2em] rounded-full hover:bg-[#cfb53b] transition-all shadow-lg active:scale-95">
             Obter Plano Estratégico
           </button>
        </div>
      </div>
    </main>
  );
}
