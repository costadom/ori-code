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
    if (saved) {
      setArchetype(JSON.parse(saved));
    } else {
      router.push("/quiz");
    }
  }, [router]);

  if (!archetype) return null;

  // Geramos a URL da imagem baseada no prompt da IA
  const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(archetype.image_prompt)}?width=400&height=600&nologo=true&model=flux`;

  return (
    <main className={`relative min-h-screen bg-[#030005] text-white py-10 px-4 ${montserrat.className}`}>
      <LiquidBackground />
      <div className="absolute inset-0 bg-black/90 z-10 pointer-events-none"></div>

      <div className="relative z-20 max-w-lg mx-auto flex flex-col items-center">
        
        {/* CARTA DE TARÔ GERADA POR IA */}
        <div className="w-full max-w-[340px] aspect-[2/3] bg-[#0a0710] border-2 border-[#cfb53b]/40 rounded-[2rem] overflow-hidden shadow-[0_0_40px_rgba(207,181,59,0.2)] mb-8 flex flex-col">
          <div className="relative flex-1 bg-gray-900">
             {/* Imagem da IA */}
             <img 
               src={imageUrl} 
               alt="Arquétipo" 
               className="w-full h-full object-cover opacity-80"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-[#0a0710] via-transparent to-transparent"></div>
             
             {/* Nome da Entidade */}
             <div className="absolute bottom-6 left-0 right-0 text-center">
                <h2 className={`${cinzel.className} text-4xl text-white drop-shadow-lg uppercase tracking-tighter`}>
                  {archetype.name}
                </h2>
                <p className="text-[#cfb53b] text-[10px] tracking-[0.3em] uppercase font-bold mt-1">
                  {archetype.archetype_title}
                </p>
             </div>
          </div>
        </div>

        {/* TEXTO BORRADO (O GATILHO) */}
        <div className="w-full bg-black/60 border border-[#cfb53b]/20 p-6 rounded-2xl backdrop-blur-md mb-8 relative overflow-hidden">
           <div className="filter blur-md opacity-30 select-none text-sm leading-relaxed space-y-4">
              <p>{archetype.description.substring(0, 100)}...</p>
              <p>O seu maior bloqueio financeiro está ligado a um padrão que...</p>
              <p>Para transmutar esta energia e abrir os caminhos do ouro, você precisa...</p>
           </div>
           <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
              <span className="bg-[#cfb53b] text-black px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-2 shadow-lg">
                Análise Bloqueada
              </span>
              <p className="text-white text-xs font-medium">Pague a taxa de revelação para ler o seu destino.</p>
           </div>
        </div>

        {/* ÁREA DE PAGAMENTO (PIX MOCK) */}
        <div className="w-full bg-[#0a0710] border border-[#cfb53b]/20 p-8 rounded-3xl text-center shadow-2xl">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="text-gray-600 line-through text-sm italic font-light">R$ 47,00</span>
            <span className={`${cinzel.className} text-4xl text-[#cfb53b] font-black`}>R$ 4,90</span>
          </div>

          {/* QR Code Fake */}
          <div className="bg-white p-2 rounded-lg inline-block mb-6">
             <div className="w-32 h-32 bg-gray-200 flex items-center justify-center text-black text-[10px] font-bold">QR CODE PIX</div>
          </div>

          <button 
            onClick={() => router.push("/resultado")}
            className="w-full py-5 bg-[#cfb53b] text-black font-black uppercase tracking-[0.2em] rounded-full hover:bg-white transition-all shadow-[0_0_20px_rgba(207,181,59,0.4)] active:scale-95"
          >
            Copiar Código PIX
          </button>
          
          <p className="mt-4 text-[9px] text-gray-500 uppercase tracking-widest">Acesso imediato após o pagamento</p>
        </div>
      </div>
    </main>
  );
}
