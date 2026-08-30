import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldAlert } from 'lucide-react';

export default function MemberLoop({ members, status, title, subtitle, showCount }) {
  const [activeMember, setActiveMember] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    const handler = (e) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const marqueeItems = [...members, ...members];
  const isProspective = status === "PROSPECTIVE";

  // Unique ID for keyframes so the two components don't clash CSS rules
  const componentId = `marquee-${status.toLowerCase()}`;

  return (
    <section className="container mx-auto px-6 max-w-7xl relative z-10 mb-32">
      {/* Header Section (if provided) */}
      {title && (
        <div className="text-center mb-16 relative">
          <div className={`absolute left-1/2 -translate-x-1/2 -top-10 w-40 h-40 rounded-full blur-[50px] pointer-events-none ${isProspective || status === 'ACTIVE' ? 'bg-secondary/10' : 'bg-[#00D9FF]/10'}`}></div>
          {subtitle && (
            <span className="text-metallicLight text-[10px] font-orbitron tracking-[0.3em] uppercase mb-4 block">
              {subtitle}
            </span>
          )}
          <h2 className={`text-3xl md:text-5xl font-orbitron font-bold mb-4 uppercase ${isProspective || status === 'ACTIVE' ? 'drop-shadow-[0_0_10px_rgba(227,27,35,0.2)] text-white' : 'drop-shadow-[0_0_10px_rgba(0,109,255,0.2)] text-white'}`}>
            {title.split(' ')[0]} <span className={isProspective || status === 'ACTIVE' ? 'text-secondary' : 'text-[#00D9FF]'}>{title.split(' ').slice(1).join(' ')}</span>
          </h2>
          <div className={`w-24 h-1 bg-gradient-to-r from-transparent to-transparent mx-auto ${isProspective || status === 'ACTIVE' ? 'via-secondary' : 'via-[#00D9FF]'}`}></div>
          
          {showCount && (
            <div className="flex flex-col items-center justify-center mt-6">
               <div className="flex items-center gap-4 bg-gunmetal border border-secondary/30 px-6 py-3" style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}>
                 <span className="text-3xl font-orbitron font-bold text-secondary">{members.length < 10 ? `0${members.length}` : members.length}</span>
                 <div className="h-8 w-[1px] bg-secondary/30"></div>
                 <span className="text-xs font-orbitron tracking-widest text-white">PROSPECTIVE<br/>MEMBERS</span>
               </div>
            </div>
          )}
        </div>
      )}

      <div className="relative w-full overflow-hidden mb-16 no-scrollbar z-10">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes ${componentId} {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .${componentId}-anim {
          display: flex;
          width: max-content;
          animation: ${componentId} 40s linear infinite;
        }
        .${componentId}-anim.paused {
          animation-play-state: paused;
        }
        .${componentId}-anim.reduced {
          animation: none;
          flex-wrap: wrap;
          justify-content: center;
          width: 100%;
        }
      `}} />

      {/* Edge Gradients */}
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-20 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-20 pointer-events-none"></div>

      <div 
        className={`${componentId}-anim ${isHovered || activeMember ? 'paused' : ''} ${isReducedMotion ? 'reduced gap-6 px-6' : 'gap-6'}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {(isReducedMotion ? members : marqueeItems).map((member, idx) => {
          return (
            <div 
              key={`${member.id}-${idx}`}
              onClick={() => setActiveMember(member)}
              className={`group cursor-pointer flex-none relative w-[280px] md:w-[320px] transition-all duration-500 overflow-hidden bg-gunmetal border border-primary/20 scale-95 hover:scale-100 ${
                isProspective 
                  ? 'hover:border-secondary hover:shadow-[0_0_25px_rgba(227,27,35,0.3)]' 
                  : 'hover:border-[#00D9FF] hover:shadow-[0_0_25px_rgba(0,217,255,0.3)]'
              }`}
              style={{ clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)' }}
            >
              {/* HUD Corner Accents */}
              <div className={`absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 z-20 transition-colors ${isProspective ? 'border-secondary/30 group-hover:border-secondary' : 'border-[#00D9FF]/30 group-hover:border-[#00D9FF]'}`}></div>
              <div className={`absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 z-20 transition-colors ${isProspective ? 'border-secondary/30 group-hover:border-secondary' : 'border-[#00D9FF]/30 group-hover:border-[#00D9FF]'}`}></div>
              
              {/* Profile Image */}
              <div className="relative h-[320px] overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover mix-blend-luminosity opacity-70 group-hover:mix-blend-normal group-hover:opacity-100 transition-all duration-700 scale-100 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gunmetal via-gunmetal/60 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-300 z-10 pointer-events-none"></div>
                
                {/* Status Badge */}
                <div className="absolute top-4 left-4 z-20">
                  <span className={`text-[9px] font-orbitron font-bold tracking-widest text-background px-2 py-1 flex items-center gap-1 shadow-[0_0_10px_rgba(0,0,0,0.5)] ${
                    isProspective ? 'bg-secondary' : 'bg-[#00D9FF]'
                  }`}>
                     STATUS: {status}
                  </span>
                </div>

                {/* Text Overlay */}
                <div className="absolute bottom-0 left-0 w-full p-6 z-30 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 flex flex-col">
                  {isProspective && <span className="text-[10px] font-orbitron text-secondary tracking-widest uppercase mb-1">CANDIDATE {member.id < 10 ? `0${member.id}` : member.id}</span>}
                  <h3 className="text-xl font-orbitron font-bold text-white mb-2 group-hover:text-white transition-colors tracking-wide">
                    {member.name}
                  </h3>
                  <div className="w-full flex items-center justify-between">
                     <p className={`font-orbitron text-[10px] tracking-widest uppercase border px-2 py-1 w-fit ${
                       isProspective ? 'text-white border-secondary/50 bg-secondary/10' : 'text-white border-[#00D9FF]/50 bg-[#00D9FF]/10'
                     }`}>
                       [ {member.role} ]
                     </p>
                     <div className={`w-6 h-6 border rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity ${
                       isProspective ? 'border-secondary/30' : 'border-[#00D9FF]/30'
                     }`}>
                       <div className={`w-2 h-2 rounded-full animate-pulse ${isProspective ? 'bg-secondary' : 'bg-[#00D9FF]'}`}></div>
                     </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Details Modal */}
      <AnimatePresence>
        {activeMember && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          >
            <div 
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setActiveMember(null)}
            ></div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={`relative w-full max-w-md bg-gunmetal border shadow-2xl rounded-sm overflow-hidden ${
                isProspective ? 'border-secondary/50 shadow-[0_0_50px_rgba(227,27,35,0.2)]' : 'border-[#00D9FF]/50 shadow-[0_0_50px_rgba(0,217,255,0.2)]'
              }`}
              style={{ clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)' }}
            >
              <div className="absolute inset-0 bg-circuit opacity-10 pointer-events-none" />
              
              <div className="relative h-[250px] w-full">
                <img src={activeMember.image} alt={activeMember.name} className="w-full h-full object-cover mix-blend-luminosity opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-gunmetal to-transparent"></div>
                <button 
                  onClick={() => setActiveMember(null)}
                  className={`absolute top-4 right-4 p-2 bg-background/50 backdrop-blur text-white transition-all border ${
                    isProspective ? 'hover:text-secondary hover:bg-background border-secondary/30' : 'hover:text-[#00D9FF] hover:bg-background border-[#00D9FF]/30'
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-6">
                   <span className={`text-[10px] font-orbitron font-bold text-background tracking-widest px-2 py-1 shadow-lg ${
                     isProspective ? 'bg-secondary' : 'bg-[#00D9FF]'
                   }`}>
                     STATUS: {status}
                   </span>
                </div>
              </div>

              <div className="p-6 relative z-10 flex flex-col gap-6">
                <div>
                  <h3 className="text-2xl font-orbitron font-bold text-white tracking-wide mb-1 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
                    {activeMember.name}
                  </h3>
                  <div className="flex items-center gap-2 text-metallicLight">
                     <ShieldAlert className={`w-4 h-4 ${isProspective ? 'text-secondary' : 'text-[#00D9FF]'}`} />
                     <span className="text-xs font-orbitron tracking-widest uppercase">
                       {isProspective ? `PROSPECTIVE 0${activeMember.id}` : `${status} MEMBER`}
                     </span>
                  </div>
                </div>

                <div className="bg-background/50 border border-primary/20 p-4" style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}>
                   <p className="text-[10px] font-orbitron text-metallic uppercase tracking-widest mb-1">OPERATIVE ROLE</p>
                   <p className={`text-lg font-orbitron font-bold uppercase tracking-wider ${isProspective ? 'text-secondary' : 'text-[#00D9FF]'}`}>
                     {activeMember.role}
                   </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </section>
  );
}
