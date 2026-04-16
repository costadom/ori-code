"use client";

interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = Math.round((current / total) * 100);

  return (
    <div className="w-full max-w-lg mx-auto mb-10">
      <div className="flex justify-between text-[#cfb53b] mb-2 px-1 text-xs md:text-sm font-bold tracking-widest uppercase opacity-80">
        <span>Sintonia</span>
        <span>{percentage}%</span>
      </div>
      <div className="h-1.5 w-full bg-black/50 rounded-full overflow-hidden border border-[#cfb53b]/20 backdrop-blur-sm">
        <div 
          className="h-full bg-gradient-to-r from-[#cfb53b] via-[#fcf6ba] to-[#cfb53b] transition-all duration-700 ease-out shadow-[0_0_10px_#cfb53b]"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}