"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Cinzel, Montserrat } from "next/font/google";
import LiquidBackground from "@/components/LiquidBackground";

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "700", "900"] });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "600", "800"] });

export default function CheckoutPage() {
  const router = useRouter();
  const [archetype, setArchetype] = useState<any>(null);

  useEffect(() => {
    const saved = sessionStorage.getItem("oriCodeArchetype");
    if (saved) setArchetype(JSON.parse(saved));
    else router.push("/quiz");
  }, [router]);

  if (!archetype) return null;

  // Gerador de Imagem Mística baseado no arquétipo
  const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(archetype.image_prompt)}?width=1080&height=1350&nologo=true&seed=${Math.floor(Math.random() * 1000)}`;

  return (
    <main className={`relative min-h-screen bg-[#030005] text-white py-10 px-4 ${montserrat.className}`}>
      <LiquidBackground />
      <div className="absolute inset-0 bg-black/90 z-10 pointer-events-none"></div>

      <div className="relative z-20 max-w-lg mx-auto flex flex-col items-center">
        
        {/* CARD DE COMPARTILHAMENTO (ESTILO INSTAGRAM STORY) */}
        <div id="share-card" className="w-full aspect-[9/16] max-w-[340px] bg-[#0a0710] border-4 border-[#cfb53b]/40 rounded-[2.5rem] overflow-hidden shadow-[0_0_60px_rgba(207,181,59,0.3)] mb-8 flex flex-col relative group">
          
          {/* Imagem da IA como Fundo */}
          <div className="absolute inset-0 z-0">
            <img src={imageUrl} alt="Entidade" className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0710] via-transparent to-[#0a0710]/40"></div>
          </div>

          {/* Conteúdo do Card */}
          <div className="relative z-10 flex flex-col h-full p-8 items-center justify-between text-center">
            <div className="space-y-1">
              <span className="text-[10px] tracking-[0.5em] text-[#cfb53b] uppercase font-bold">Identificado</span>
              <div className="h-[1px] w-12 bg-[#cfb53b]/40 mx-auto"></div>
            </div>

            <div className="space-y-4">
              <h2 className={`${cinzel.className} text-4xl md:text-5xl text-white drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)] font-black uppercase tracking-tighter`}>
                {archetype.name}
              </h2>
              <p className={`${cinzel.className} text-[#cfb53b] text-xs tracking-[0.3em] font-bold`}>
                {archetype.archetype_title}
              </p>
              <p className="text-gray-300 text-[11px] italic px-4 leading-relaxed font-medium">
                "{archetype.teaser}"
              </p>
            </div>

            <div className="space-y-4 w-full">
              <div className="bg-black/40 backdrop-blur-md border border-[#cfb53b]/20 p-3 rounded-xl">
                 <p className="text-[9px] uppercase tracking-widest text-gray-400">Padrão Invisível</p>
                 <div className="h-1 w-full bg-gray-800 rounded-full mt-2 overflow-hidden">
                    <div className="h-full bg-[#cfb53b] w-[85%]"></div>
                 </div>
              </div>
              <p className={`${cinzel.className} text-[10px] text-white/50 tracking-widest`}>ORI-CODE.APP</p>
            </div>
          </div>
        </div>

        {/* CTA DE PAGAMENTO */}
        <div className="w-full bg-[#0a0710]/80 border border-[#cfb53b]/20 p-8 rounded-[2rem] backdrop-blur-xl shadow-2xl text-center">
          <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-6">Desbloqueie sua análise completa</p>
          
          <div className="flex items-center justify-center gap-6 mb-8">
            <span className="text-gray-600 line-through text-lg font-light">R$ 47,00</span>
            <div className="relative">
              <span className={`${cinzel.className} text-5xl text-[#cfb53b] font-black`}>R$ 4,90</span>
              <div className="absolute -top-4 -right-8 bg-green-600 text-[8px] px-2 py-1 rounded-full text-white font-bold animate-bounce">90% OFF</div>
            </div>
          </div>

          <button 
            onClick={() => router.push("/resultado")}
            className="w-full py-5 bg-[#cfb53b] text-black font-black uppercase tracking-[0.2em] rounded-full hover:bg-white hover:scale-105 transition-all shadow-[0_0_30px_rgba(207,181,59,0.5)] active:scale-95"
          >
            Revelar Meu Destino
          </button>
          
          <button className="mt-6 text-[10px] text-gray-500 uppercase tracking-widest hover:text-[#cfb53b] transition-colors">
            Baixar Carta para Compartilhar
          </button>
        </div>
      </div>
    </main>
  );
}
