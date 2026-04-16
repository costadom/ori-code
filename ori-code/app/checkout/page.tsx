"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Cinzel, Montserrat } from "next/font/google";
import LiquidBackground from "@/components/LiquidBackground";

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "700", "900"] });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "600"] });

export default function CheckoutPage() {
  const router = useRouter();
  const [archetype, setArchetype] = useState<any>(null);

  useEffect(() => {
    const saved = sessionStorage.getItem("oriCodeArchetype");
    if (saved) setArchetype(JSON.parse(saved));
    else router.push("/quiz");
  }, []);

  if (!archetype) return null;

  return (
    <main className={`relative min-h-screen bg-[#030005] text-white py-10 px-4 ${montserrat.className}`}>
      <LiquidBackground />
      <div className="absolute inset-0 bg-black/90 z-10"></div>

      <div className="relative z-20 max-w-lg mx-auto flex flex-col items-center">
        
        {/* CARD DE COMPARTILHAMENTO (O GATILHO VÍRAL) */}
        <div className="w-full aspect-[3/4] bg-gradient-to-b from-[#1a1405] to-black border-2 border-[#cfb53b]/40 rounded-[2.5rem] p-8 mb-8 flex flex-col items-center justify-between shadow-[0_0_40px_rgba(207,181,59,0.2)]">
          <span className={`${cinzel.className} text-[#cfb53b] tracking-[0.4em] uppercase text-xs`}>Energia Identificada</span>
          
          {/* Nome da Entidade VISÍVEL e FORTE */}
          <div className="text-center">
            <h2 className={`${cinzel.className} text-5xl md:text-6xl text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] mb-2 uppercase`}>
              {archetype.name.split(" ")[0]} 
            </h2>
            <div className="h-1 w-20 bg-[#cfb53b] mx-auto rounded-full"></div>
          </div>

          {/* O TEXTO BORRADO (O que faz ele pagar) */}
          <div className="relative w-full py-4 px-2 overflow-hidden">
             <div className="filter blur-md opacity-40 select-none text-center space-y-2">
                <p>Você possui um caminho de ouro guardado por forças que não dormem.</p>
                <p>Sua inteligência financeira é superior, mas existe um bloqueio no seu chakra...</p>
                <p>Para desbloquear a abundância total, você precisa entender o segredo de...</p>
             </div>
             <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-black/60 backdrop-blur-sm border border-[#cfb53b]/30 px-4 py-2 rounded-full text-[10px] uppercase tracking-widest text-[#cfb53b] font-bold">
                  Conteúdo Bloqueado
                </span>
             </div>
          </div>

          <button className="text-[10px] text-[#cfb53b] underline tracking-[0.2em] uppercase font-bold opacity-70">
            Compartilhar Descoberta
          </button>
        </div>

        {/* ÁREA DE PAGAMENTO */}
        <div className="w-full bg-[#0a0710] border border-[#cfb53b]/20 p-8 rounded-3xl text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-4">Revelação Completa + Guia</p>
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="text-gray-600 line-through text-lg">R$ 47,00</span>
            <span className={`${cinzel.className} text-4xl text-[#cfb53b] font-black animate-pulse`}>R$ 4,90</span>
          </div>

          {/* Mock do QR Code */}
          <div className="bg-white p-3 rounded-xl inline-block mb-6 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
             <div className="w-40 h-40 bg-gray-200 flex items-center justify-center text-black text-[10px] font-bold">QR CODE PIX</div>
          </div>

          <button 
            onClick={() => router.push("/resultado")}
            className="w-full py-5 bg-[#cfb53b] text-black font-black uppercase tracking-widest rounded-full hover:bg-white transition-all shadow-[0_0_25px_rgba(207,181,59,0.4)]"
          >
            Copiar Código PIX
          </button>
        </div>
      </div>
    </main>
  );
}