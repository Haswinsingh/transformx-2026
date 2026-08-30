import { Loader2 } from "lucide-react";

export default function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="flex flex-col items-center">
        <Loader2 className="w-12 h-12 text-cyan-400 animate-spin mb-4" />
        <span className="text-cyan-400 font-orbitron tracking-widest text-sm animate-pulse">
            INITIALIZING SECURE CONNECTION...
        </span>
      </div>
    </div>
  );
}
