import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Zap } from 'lucide-react';

const EventDetails = () => {
  const details = [
    {
      icon: <Calendar className="w-8 h-8 text-primaryLight" />,
      title: "DATE OF EXECUTION",
      desc: "September 19th, 2026",
      label: "CHRONO_SYNC"
    },
    {
      icon: <Clock className="w-8 h-8 text-secondary" />,
      title: "DURATION",
      desc: "8 Hours Non-Stop",
      label: "ENDURANCE_PROTOCOL"
    },
    {
      icon: <MapPin className="w-8 h-8 text-primaryLight" />,
      title: "VENUE: GAMMA HALL",
      desc: "Sri Sairam Engineering College",
      label: "COORDINATES"
    },
    {
      icon: <Zap className="w-8 h-8 text-secondary" />,
      title: "ENERGY SUPPLY",
      desc: "Snacks are provided",
      label: "RECHARGE_STATION"
    }
  ];

  return (
    <section id="arena" className="py-24 relative bg-background">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-circuit opacity-20 pointer-events-none"></div>
      <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
      
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 relative">
          <div className="absolute left-1/2 -translate-x-1/2 -top-10 w-40 h-40 bg-primary/10 rounded-full blur-[50px] pointer-events-none"></div>
          <span className="text-metallicLight text-[10px] font-orbitron tracking-[0.3em] uppercase mb-4 block">Operation Parameters</span>
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-4 text-white drop-shadow-[0_0_10px_rgba(0,109,255,0.3)]">
            EVENT <span className="text-primary">PROTOCOLS</span>
          </h2>
          <div className="w-32 h-[2px] bg-gradient-to-r from-transparent via-secondary to-transparent mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {details.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="robotic-card p-6 flex flex-col items-center text-center group transition-all duration-300 hover:border-primary hover:shadow-[0_0_20px_rgba(0,109,255,0.2)]"
            >
              {/* Card internal HUD borders */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-primary/40 group-hover:border-primary transition-colors"></div>
              <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-primary/40 group-hover:border-primary transition-colors"></div>
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-primary/40 group-hover:border-primary transition-colors"></div>
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-primary/40 group-hover:border-primary transition-colors"></div>
              
              <div className="absolute top-0 right-0 px-2 py-0.5 bg-primary/20 text-primaryLight text-[8px] font-orbitron tracking-widest border-b border-l border-primary/40">
                {item.label}
              </div>

              <div className="mb-6 p-4 rounded-full bg-panel border border-primary/30 group-hover:border-secondary group-hover:shadow-[0_0_15px_rgba(227,27,35,0.3)] transition-all duration-300 relative z-10">
                {item.icon}
              </div>
              <h3 className="text-lg font-orbitron font-bold text-white mb-2 tracking-wide group-hover:text-primaryLight transition-colors">{item.title}</h3>
              <p className="text-metallic text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventDetails;
