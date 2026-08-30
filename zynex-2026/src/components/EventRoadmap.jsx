import { motion } from "framer-motion";
import { Terminal, Brain, Radio, Cpu, Trophy, Zap } from "lucide-react";

const events = [
  {
    phase: "PHASE_00",
    title: "REGISTRATION PROTOCOL",
    description: "Participant onboarding and team registration sequence initiation.",
    date: "26 Apr - 19 Sep 2026",
    time: "8:00 AM - 11:59 PM",
    icon: Terminal
  },
  {
    phase: "ROUND_01",
    title: "NEURAL APTITUDE",
    description: "Technical quiz evaluating analytical and problem-solving metrics.",
    date: "2 May 2026",
    time: "6:00 PM",
    icon: Brain
  },
  {
    phase: "BROADCAST",
    title: "PHASE I QUALIFICATION",
    description: "Transmission of shortlisted units from Round 1.",
    date: "3 May 2026",
    time: "8:00 PM",
    icon: Radio
  },
  {
    phase: "ROUND_02",
    title: "QUANTUM PROJECT NEXUS",
    description: "Units select mission statements and submit structural proposals.",
    date: "3 May - 6 May 2026",
    time: "6 May 2026, 12:00 PM",
    icon: Cpu
  },
  {
    phase: "BROADCAST",
    title: "PHASE II ELITE",
    description: "Transmission of units shortlisted for the final engagement.",
    date: "7 May 2026",
    time: "8:00 PM",
    icon: Trophy
  },
  {
    phase: "FINAL_EXECUTION",
    title: "QUANTUM ARENA",
    description: "Offline tactical hackathon. Build and deploy real-time solutions.",
    date: "8 May 2026",
    time: "9:00 AM – 4:00 PM",
    icon: Zap,
    isFinal: true
  }
];

export default function EventRoadmap() {
  return (
    <section className="py-24 bg-gunmetal relative overflow-hidden scroll-mt-24" id="logistics">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-circuit opacity-10 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20 relative"
        >
          <div className="absolute left-1/2 -translate-x-1/2 -top-10 w-40 h-40 bg-secondary/10 rounded-full blur-[50px] pointer-events-none"></div>
          <span className="text-secondary font-orbitron tracking-[0.3em] text-[10px] font-bold uppercase mb-4 block">
            Mission Timeline
          </span>
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-white drop-shadow-[0_0_15px_rgba(227,27,35,0.2)]">
            EVENT <span className="text-secondary">ROADMAP</span>
          </h2>
          <div className="w-32 h-[2px] bg-gradient-to-r from-transparent via-primaryLight to-transparent mx-auto mt-4"></div>
        </motion.div>

        <div className="relative">
          {/* Vertical Glowing Line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary via-primaryLight to-secondary/50 -translate-x-1/2 shadow-[0_0_15px_rgba(0,109,255,0.6)]" />

          <div className="space-y-12">
            {events.map((event, index) => {
              const Icon = event.icon;
              const isEven = index % 2 === 0;
              const isFinal = event.isFinal;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.3, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`flex flex-col md:flex-row items-center justify-between relative ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  {/* Timeline Desktop Connectors */}
                  <div className={`hidden md:block absolute left-1/2 top-1/2 w-5 h-5 border-2 z-10 -translate-x-1/2 -translate-y-1/2 transform rotate-45 ${isFinal ? "shadow-[0_0_20px_rgba(227,27,35,1)] scale-150 bg-secondary border-secondary" : "shadow-[0_0_15px_rgba(0,109,255,1)] bg-panel border-primary"}`} />

                  <div className={`w-full md:w-5/12 ${isEven ? "md:text-right md:pr-10" : "md:pl-10"}`}>
                    <div className={`robotic-card p-6 transition-all duration-300 group ${isFinal ? "border-secondary shadow-[0_0_20px_rgba(227,27,35,0.2)] hover:shadow-[0_0_40px_rgba(227,27,35,0.4)]" : "border-primary/30 hover:border-primary hover:shadow-[0_0_20px_rgba(0,109,255,0.2)]"}`}>
                      
                      {/* Decorative corner lines */}
                      <div className={`absolute top-2 ${isEven ? "right-2" : "left-2"} w-4 h-4 border-t ${isEven ? "border-r" : "border-l"} ${isFinal ? "border-secondary" : "border-primary/50"}`}></div>

                      <div className={`flex items-center gap-3 mb-4 ${isEven ? "md:justify-end" : ""}`}>
                        {/* Mobile Icon */}
                        <div className={`md:hidden p-2 rounded-sm ${isFinal ? "bg-secondary/20 text-secondary" : "bg-primary/10 text-primaryLight"}`}>
                          <Icon size={18} />
                        </div>
                        {/* Desktop Icon Layout */}
                        {isEven ? null : (
                          <div className={`hidden md:block p-2 rounded-sm transition-colors ${isFinal ? "bg-secondary/20 text-secondary" : "bg-primary/10 text-primaryLight group-hover:bg-primary/30"}`}>
                            <Icon size={18} />
                          </div>
                        )}
                        {isFinal ? (
                          <span className="text-secondary font-orbitron text-[10px] font-bold uppercase tracking-widest px-3 py-1 border border-secondary bg-secondary/10 shadow-[0_0_10px_rgba(227,27,35,0.3)] animate-pulse">
                            CRITICAL ENGAGEMENT
                          </span>
                        ) : (
                          <span className="text-primary font-orbitron text-[10px] font-bold uppercase tracking-widest px-3 py-1 border border-primary/40 bg-primary/10">
                            {event.phase}
                          </span>
                        )}
                        {isEven ? (
                          <div className={`hidden md:block p-2 rounded-sm transition-colors ${isFinal ? "bg-secondary/20 text-secondary" : "bg-primary/10 text-primaryLight group-hover:bg-primary/30"}`}>
                            <Icon size={18} />
                          </div>
                        ) : null}
                      </div>

                      <h3 className={`text-lg font-orbitron font-bold mb-2 transition-colors ${isFinal ? "text-secondary" : "text-white group-hover:text-primaryLight"}`}>
                        {event.title}
                      </h3>

                      <p className="text-metallic text-xs font-light mb-4 leading-relaxed">
                        {event.description}
                      </p>

                      <div className={`flex flex-col gap-1 text-[10px] font-orbitron tracking-widest uppercase ${isEven ? "md:items-end" : "md:items-start"}`}>
                        <div className="flex items-center gap-2 text-metallicLight">
                          <span className={`${isFinal ? "text-secondary" : "text-primaryLight"}`}>[DATE]</span> {event.date}
                        </div>
                        <div className="flex items-center gap-2 text-metallicLight">
                          <span className={`${isFinal ? "text-secondary" : "text-primaryLight"}`}>[TIME]</span> {event.time}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Empty space for opposite side */}
                  <div className="hidden md:block md:w-5/12" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
