import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Target, 
  Cpu, 
  Bot, 
  Shield, 
  GraduationCap, 
  Car, 
  Leaf, 
  AlertTriangle,
  X,
  ChevronRight
} from 'lucide-react';

const themes = [
  {
    id: "01",
    title: "SMART AUTOMATION",
    desc: "Ideas focused on the intelligent use of resources for transforming and advancements of technology with combining Artificial Intelligence to explore various sources and get valuable insights.",
    icon: <Cpu className="w-8 h-8 text-primaryLight" />,
    focusAreas: [
      "AI-driven automation",
      "Intelligent resource management",
      "Predictive maintenance",
      "Smart monitoring",
      "Data-driven decision making",
      "AI / ML integration"
    ],
    impact: "Intelligent systems that improve efficiency, reduce operational cost and solve real-world industrial challenges.",
    techDomains: ["AI / ML", "IoT", "Automation", "Industry 4.0"]
  },
  {
    id: "02",
    title: "ROBOTICS & DRONES",
    desc: "There is a need to design drones and robots that can solve some of the pressing challenges of India such as handling medical emergencies, search and rescue operations, etc.",
    icon: <Bot className="w-8 h-8 text-primaryLight" />,
    focusAreas: [
      "Autonomous navigation",
      "Search and rescue operations",
      "Medical supply delivery",
      "Agricultural surveillance",
      "Disaster response robotics"
    ],
    impact: "Rapid response capabilities in critical situations, reducing human risk and improving operational efficiency in remote areas.",
    techDomains: ["Robotics", "Computer Vision", "Embedded Systems", "Aerospace"]
  },
  {
    id: "03",
    title: "BLOCKCHAIN & CYBERSECURITY",
    desc: "Provide ideas in a decentralized and distributed ledger technology used to store digital information that powers cryptocurrencies and NFTs and can radically change multiple sectors.",
    icon: <Shield className="w-8 h-8 text-secondary" />,
    focusAreas: [
      "Decentralized identity",
      "Secure supply chain tracking",
      "Zero-trust architecture",
      "Data privacy preservation",
      "Smart contract auditing"
    ],
    impact: "Establishing trust in digital ecosystems, preventing fraud, and ensuring the integrity of critical data infrastructure.",
    techDomains: ["Blockchain", "Cryptography", "Network Security", "Web3"]
  },
  {
    id: "04",
    title: "SMART EDUCATION",
    desc: "Smart education, a concept that describes learning in digital age. It enables learners to learn more effectively, efficiently, flexibly and comfortably.",
    icon: <GraduationCap className="w-8 h-8 text-primaryLight" />,
    focusAreas: [
      "Personalized learning paths",
      "Immersive AR/VR classrooms",
      "Automated assessment",
      "Accessibility tools",
      "Skill gap analysis"
    ],
    impact: "Democratizing access to high-quality education and catering to diverse learning styles for better student outcomes.",
    techDomains: ["EdTech", "AR/VR", "AI Tutors", "Data Analytics"]
  },
  {
    id: "05",
    title: "SMART VEHICLES",
    desc: "Creating intelligent devices to improve commutation sector.",
    icon: <Car className="w-8 h-8 text-primaryLight" />,
    focusAreas: [
      "V2X communication",
      "Traffic flow optimization",
      "EV battery management",
      "Autonomous driving aids",
      "Fleet logistics"
    ],
    impact: "Reducing carbon footprints, lowering accident rates, and optimizing urban transportation networks.",
    techDomains: ["Automotive IoT", "Machine Learning", "Sensor Fusion", "EV Tech"]
  },
  {
    id: "06",
    title: "RENEWABLE / SUSTAINABLE ENERGY",
    desc: "Innovative ideas that help manage and generate renewable / sustainable sources more efficiently.",
    icon: <Leaf className="w-8 h-8 text-secondary" />,
    focusAreas: [
      "Smart grid management",
      "Energy storage optimization",
      "Solar tracking algorithms",
      "Carbon credit verification",
      "Micro-grid routing"
    ],
    impact: "Accelerating the transition to clean energy and ensuring grid stability amidst volatile renewable sources.",
    techDomains: ["CleanTech", "Smart Grids", "IoT", "Data Science"]
  },
  {
    id: "07",
    title: "DISASTER MANAGEMENT",
    desc: "Disaster management includes ideas related to risk mitigation, Planning and management before, after or during a disaster.",
    icon: <AlertTriangle className="w-8 h-8 text-primaryLight" />,
    focusAreas: [
      "Early warning systems",
      "Resource allocation prediction",
      "Evacuation routing",
      "Damage assessment AI",
      "Resilient communication nets"
    ],
    impact: "Saving lives and minimizing economic damage through proactive planning and rapid, coordinated response systems.",
    techDomains: ["GIS", "Satellite Imagery AI", "Telecom", "Predictive Modeling"]
  }
];

const ProblemStatements = () => {
  const [activeTheme, setActiveTheme] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    const handler = (e) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Duplicate array for seamless infinite scroll
  const marqueeItems = [...themes, ...themes];

  return (
    <section className="py-24 relative bg-background border-t border-primary/20 overflow-hidden">
      
      {/* Dynamic CSS for the Marquee to ensure perfect seamless looping */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes custom-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .sih-marquee {
          display: flex;
          width: max-content;
          animation: custom-marquee 45s linear infinite;
        }
        .sih-marquee.paused {
          animation-play-state: paused;
        }
        .sih-marquee.reduced {
          animation: none;
          flex-wrap: wrap;
          justify-content: center;
          width: 100%;
        }
        
        /* Hide scrollbar for reduced motion mode */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />

      <div className="absolute inset-0 bg-circuit opacity-10 pointer-events-none" />
      <div className="absolute inset-0 scanline-bg opacity-20 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-7xl mb-16">
        <div className="text-center relative">
          <div className="absolute left-1/2 -translate-x-1/2 -top-10 w-40 h-40 bg-primary/10 rounded-full blur-[50px] pointer-events-none"></div>
          <span className="text-metallicLight text-[10px] font-orbitron tracking-[0.3em] uppercase mb-4 block">
            SIH THEMATIC DOMAINS
          </span>
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-white drop-shadow-[0_0_10px_rgba(0,109,255,0.3)]">
            SIH THEMES
          </h2>
          <div className="text-metallic text-sm tracking-widest mt-4 uppercase font-light">
            EXPLORE • INNOVATE • IMPACT
          </div>
          <div className="w-32 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-6"></div>
        </div>
      </div>

      {/* Marquee Loop */}
      <div className="relative z-10 w-full overflow-hidden no-scrollbar">
        {/* Gradients to fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-20 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-20 pointer-events-none"></div>

        <div 
          className={`sih-marquee ${isHovered || activeTheme ? 'paused' : ''} ${isReducedMotion ? 'reduced gap-6 px-6' : 'gap-6'}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* If reduced motion, only show the original 7 themes to avoid duplicate wrapping */}
          {(isReducedMotion ? themes : marqueeItems).map((theme, idx) => {
            const isActive = activeTheme?.id === theme.id;
            
            return (
              <div 
                key={`${theme.id}-${idx}`}
                onClick={() => setActiveTheme(theme)}
                className={`robotic-card cursor-pointer flex flex-col p-6 border-y transition-all duration-500 w-[300px] md:w-[350px] flex-none relative overflow-hidden group ${
                  isActive 
                    ? 'border-primaryLight bg-panel/90 shadow-[0_0_25px_rgba(0,217,255,0.25)] scale-[1.02] z-30' 
                    : 'border-transparent bg-panel/30 opacity-60 hover:opacity-100 hover:bg-panel/50 hover:border-primary/30 scale-95 hover:scale-100'
                }`}
              >
                {/* HUD Corner Accents */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary/40 group-hover:border-primaryLight transition-colors"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary/40 group-hover:border-primaryLight transition-colors"></div>
                
                <div className="flex justify-between items-start mb-6 relative z-10">
                  <div className={`p-4 bg-gunmetal/80 border rounded-sm transition-colors ${isActive ? 'border-primary shadow-[0_0_15px_rgba(0,109,255,0.4)]' : 'border-primary/20 group-hover:border-primary/50'}`}>
                    {theme.icon}
                  </div>
                  <div className="text-right">
                     <span className={`text-[10px] font-orbitron font-bold tracking-widest px-2 py-1 border block mb-1 transition-colors ${isActive ? 'text-primaryLight border-primaryLight/50 bg-primary/10' : 'text-metallic border-metallic/30'}`}>
                       THEME {theme.id}
                     </span>
                  </div>
                </div>
                
                <h4 className={`text-lg font-orbitron font-bold mb-3 transition-colors relative z-10 ${isActive ? 'text-white drop-shadow-[0_0_5px_rgba(0,217,255,0.8)]' : 'text-metallic group-hover:text-white'}`}>
                  {theme.title}
                </h4>
                
                <p className={`text-xs font-light leading-relaxed flex-grow line-clamp-3 relative z-10 ${isActive ? 'text-metallicLight' : 'text-metallic/60 group-hover:text-metallic/90'}`}>
                  {theme.desc}
                </p>

                {/* Animated scanline effect inside active card */}
                {isActive && (
                  <motion.div 
                    initial={{ top: '-10%' }}
                    animate={{ top: '110%' }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    className="absolute left-0 right-0 h-[2px] bg-primaryLight/30 blur-[2px] z-0"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Theme Details Modal */}
      <AnimatePresence>
        {activeTheme && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          >
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setActiveTheme(null)}
            ></div>

            {/* Modal Content */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-3xl bg-background/95 border border-primary/50 shadow-[0_0_50px_rgba(0,109,255,0.2)] rounded-sm overflow-hidden"
            >
              <div className="absolute inset-0 bg-circuit opacity-10 pointer-events-none" />
              
              {/* Modal Header */}
              <div className="p-6 border-b border-primary/20 flex justify-between items-start bg-panel/50 relative z-10">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gunmetal border border-primary/40 rounded-sm shadow-[0_0_15px_rgba(0,109,255,0.3)]">
                    {activeTheme.icon}
                  </div>
                  <div>
                    <span className="text-[10px] font-orbitron font-bold text-primaryLight tracking-widest px-2 py-0.5 border border-primary/30 block w-fit mb-1 bg-primary/10">
                      THEME {activeTheme.id}
                    </span>
                    <h3 className="text-2xl font-orbitron font-bold text-white tracking-wide drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
                      {activeTheme.title}
                    </h3>
                  </div>
                </div>
                <button 
                  onClick={() => setActiveTheme(null)}
                  className="p-2 text-metallic hover:text-white hover:bg-primary/20 border border-transparent hover:border-primary/50 transition-all rounded-sm"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 max-h-[70vh] overflow-y-auto custom-scrollbar relative z-10 flex flex-col gap-8">
                
                <div>
                  <p className="text-metallicLight text-sm leading-relaxed border-l-2 border-primary/50 pl-4 bg-primary/5 p-4 rounded-r-sm">
                    {activeTheme.desc}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Focus Areas */}
                  <div className="robotic-panel p-5 border border-primary/10 bg-panel/30">
                    <h4 className="text-xs font-orbitron font-bold text-white tracking-widest mb-4 flex items-center gap-2">
                      <Target className="w-4 h-4 text-primary" /> FOCUS AREAS
                    </h4>
                    <ul className="space-y-3">
                      {activeTheme.focusAreas.map((area, idx) => (
                        <li key={idx} className="text-sm text-metallic font-light flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 text-primaryLight shrink-0 mt-0.5" />
                          <span>{area}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col gap-8">
                    {/* Potential Impact */}
                    <div className="robotic-panel p-5 border border-primary/10 bg-panel/30">
                      <h4 className="text-xs font-orbitron font-bold text-white tracking-widest mb-3 flex items-center gap-2">
                        <Cpu className="w-4 h-4 text-secondary" /> POTENTIAL IMPACT
                      </h4>
                      <p className="text-sm text-metallic font-light leading-relaxed">
                        {activeTheme.impact}
                      </p>
                    </div>

                    {/* Tech Domains */}
                    <div>
                      <h4 className="text-[10px] font-orbitron font-bold text-metallic tracking-widest mb-3 uppercase">
                        Technology Domains
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {activeTheme.techDomains.map((tech, idx) => (
                          <span 
                            key={idx}
                            className="text-[10px] uppercase tracking-wider px-3 py-1 bg-gunmetal border border-primary/20 text-primaryLight rounded-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

              </div>
              
              {/* Modal Footer */}
              <div className="p-4 border-t border-primary/20 bg-panel/80 flex justify-end relative z-10">
                <button 
                  onClick={() => setActiveTheme(null)}
                  className="px-6 py-2 text-xs font-orbitron font-bold tracking-widest text-white border border-primary/50 hover:bg-primary/20 hover:shadow-[0_0_15px_rgba(0,109,255,0.4)] transition-all uppercase"
                >
                  CLOSE PANEL
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default ProblemStatements;
