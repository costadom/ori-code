"use client"; // Precisamos disso para usar estados e navegação

import { useState } from "react";
import { useRouter } from "next/navigation";
import LiquidBackground from "@/components/LiquidBackground";
import { Cinzel, Montserrat } from "next/font/google";

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "700"] });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["300", "500", "700"] });

export default function Home() {
  const router = useRouter();
  const [isExiting, setIsExiting] = useState(false);

  const handleStart = () => {
    setIsExiting(true); // Inicia o efeito de fumaça
    
    // Aguarda 1 segundo (tempo da animação) antes de trocar de página
    setTimeout(() => {
      router.push('/quiz');
    }, 1000); 
  };

  return (
    <main className={`relative min-h-screen flex items-center justify-center overflow-hidden bg-black ${montserrat.className}`}>
      
      {/* O fundo místico continua rodando independente do texto */}
      <LiquidBackground />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.85)_100%)] z-10 pointer-events-none"></div>

      {/* Container Principal com Efeito de Saída (Fumaça)
        Quando isExiting for true, ele borra (blur-2xl), apaga (opacity-0) e expande (scale-110)
      */}
      <div 
        className={`relative z-20 flex flex-col items-center justify-center px-6 w-full max-w-5xl mx-auto pt-10 pb-20 transition-all duration-1000 ease-in-out ${
          isExiting ? "opacity-0 blur-2xl scale-110" : "opacity-100 blur-0 scale-100"
        }`}
      >
        
        {/* Eyebrow */}
        <div className="animate-fade-in flex items-center gap-3 mb-8 px-5 py-2 rounded-full border border-[#cfb53b]/30 bg-transparent backdrop-blur-sm">
          <div className="w-1.5 h-1.5 rounded-full bg-[#cfb53b] shadow-[0_0_8px_#cfb53b]"></div>
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.4em] text-[#e8c39e] font-medium opacity-90">
            Decodifique seu Arquétipo
          </span>
        </div>

        {/* Headline */}
        <h1 className={`${cinzel.className} animate-fade-in delay-100 text-5xl md:text-7xl lg:text-[5.5rem] font-bold leading-[1.1] tracking-tight text-center mb-8 w-full`}>
          <span className="text-[#f5f5f5] drop-shadow-[0_4px_10px_rgba(0,0,0,1)]">A energia secreta</span>
          <br />
          <span className="text-[#f5f5f5] drop-shadow-[0_4px_10px_rgba(0,0,0,1)]">que guia sua</span>
          <br />
          <span className="relative inline-block mt-2">
            <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-[#cfb53b] via-[#fcf6ba] to-[#b38728] drop-shadow-[0_0_15px_rgba(207,181,59,0.3)]">
              vida financeira.
            </span>
          </span>
        </h1>

        {/* Textos de Suporte */}
        <div className="animate-fade-in delay-300 flex flex-col items-center mb-16 max-w-2xl text-center balance-text">
          <p className="text-lg md:text-2xl text-gray-300 font-light tracking-wide leading-relaxed drop-shadow-md">
            Existe um padrão invisível governando suas decisões. <br className="hidden md:block" /> 
            <strong className="font-medium text-[#e8c39e]">Descubra o seu agora e mude o jogo.</strong>
          </p>
          
          <p className="mt-4 text-sm sm:text-base md:text-lg text-[#cfb53b] font-bold tracking-[0.15em] uppercase opacity-90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            Arquétipos baseados em entidades da umbanda
          </p>
        </div>

        {/* O BOTÃO TRANSPARENTE COM GLOW */}
        <div className="animate-fade-in delay-500 w-full flex justify-center">
          <button 
            onClick={handleStart}
            disabled={isExiting} // Evita duplo clique
            className="group relative flex flex-col items-center justify-center p-4 bg-transparent outline-none border-none cursor-pointer"
          >
            
            {/* Ícone da Pena */}
            <div className="text-[#cfb53b] icon-glow-hover feather-breathe mb-5">
              <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
                <line x1="16" y1="8" x2="2" y2="22"></line>
                <line x1="17.5" y1="15" x2="9" y2="15"></line>
              </svg>
            </div>

            {/* Tipografia do Botão */}
            <span className="text-glow-hover text-sm md:text-xl tracking-[0.3em] font-bold text-[#cfb53b] uppercase">
              REVELAR MEU ARQUÉTIPO
            </span>
            
            {/* Linha decorativa super sutil que estica no hover */}
            <div className="w-8 h-[1px] mt-3 bg-[#cfb53b]/50 group-hover:w-full group-hover:bg-[#cfb53b] group-hover:shadow-[0_0_10px_#cfb53b] transition-all duration-500"></div>
          </button>
        </div>

      </div>
    </main>
  );
}