import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShieldAlert, Zap, Cpu, Target } from 'lucide-react';

const Hero = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    const targetDate = new Date("2026-09-19T23:59:59+05:30").getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsClosed(true);
        return true;
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
        setIsClosed(false);
        return false;
      }
    };

    if (calculateTime()) return;

    const interval = setInterval(() => {
      if (calculateTime()) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const features = [
    { title: "ONE DAY", desc: "INTENSE HACKATHON", icon: Target },
    { title: "SIH PROBLEMS", desc: "REAL WORLD IMPACT", icon: ShieldAlert },
    { title: "INNOVATE", desc: "BUILD SOLUTIONS", icon: Cpu },
    { title: "TRANSFORM", desc: "THE FUTURE", icon: Zap },
  ];

  return (
    <div className="relative">
      <section className="relative min-h-[calc(100vh-80px)] pt-24 pb-0 lg:pb-0 flex flex-col justify-center overflow-hidden bg-[#03070D]">
        
        {/* Background Grids for Left Side */}
        <div className="absolute inset-0 bg-circuit opacity-30 z-0 pointer-events-none" />
        <div className="absolute inset-0 scanline-bg opacity-30 z-0 pointer-events-none" />

        {/* Content Container */}
        <div className="container relative z-20 mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center w-full min-h-[calc(100vh-80px)]">
          
          {/* LEFT SIDE CONTENT */}
          <div className="w-full lg:w-[48%] flex flex-col items-start text-left pt-10 pb-10 lg:pb-0 z-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-6 w-full"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-[1px] bg-primary"></span>
                <span className="text-[9px] md:text-xs font-orbitron font-bold tracking-[0.2em] md:tracking-[0.3em] text-metallicLight uppercase">
                  ONE DAY • ONE CHALLENGE • ONE TRANSFORMATION
                </span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-orbitron font-black tracking-tighter mb-4 text-white drop-shadow-[0_0_15px_rgba(0,109,255,0.3)]">
                TRANSFORMX<br/>
                <span className="text-3xl md:text-5xl lg:text-5xl xl:text-6xl text-primary">HACKATHON 2026</span>
              </h1>
              
              <p className="text-sm md:text-lg lg:text-xl font-orbitron font-bold tracking-widest mt-6">
                <span className="text-white">INNOVATE.</span>{' '}
                <span className="text-primary">BUILD.</span>{' '}
                <span className="text-white">SECURE.</span>{' '}
                <span className="text-secondary">TRANSFORM.</span>
              </p>
            </motion.div>

            {/* Countdown Timer */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="flex flex-wrap gap-3 md:gap-4 my-8"
            >
              {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className={`robotic-card flex flex-col items-center p-3 md:p-4 w-[72px] md:w-24 shadow-[0_0_15px_rgba(0,109,255,0.15)] ${isClosed ? 'border-secondary bg-secondary/10' : ''}`}>
                  {/* HUD Corner Decor */}
                  <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-primaryLight"></div>
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-primaryLight"></div>
                  
                  <span className={`text-2xl md:text-4xl font-orbitron font-bold mb-1 ${isClosed ? 'text-secondary drop-shadow-[0_0_10px_rgba(227,27,35,0.6)]' : 'text-primaryLight drop-shadow-[0_0_10px_rgba(0,217,255,0.6)]'}`}>
                    {value < 10 ? `0${value}` : value}
                  </span>
                  <span className="text-[9px] md:text-[10px] font-orbitron font-bold uppercase tracking-widest text-metallic">{unit}</span>
                </div>
              ))}
            </motion.div>

            {/* Registration Button */}
            {isClosed ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="cyber-button cyber-button-active cursor-not-allowed flex items-center justify-center gap-3 w-full md:w-auto"
              >
                <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
                <span>REGISTRATION CLOSED</span>
                <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
              </motion.div>
            ) : (
              <Link to="/register" className="w-full md:w-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="cyber-button flex items-center justify-center gap-3 group w-full md:w-auto"
                >
                  <div className="w-2 h-2 bg-primaryLight group-hover:bg-white transition-colors rounded-full animate-pulse"></div>
                  <span>REGISTER NOW</span>
                  <div className="w-2 h-2 bg-primaryLight group-hover:bg-white transition-colors rounded-full animate-pulse"></div>
                </motion.div>
              </Link>
            )}
          </div>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className="relative lg:absolute lg:right-0 lg:top-0 w-full lg:w-[55%] h-auto lg:h-full z-10 flex lg:block mt-8 lg:mt-0">
          
          {/* Desktop Blending Gradients */}
          <div 
            className="hidden lg:block absolute inset-y-0 left-0 w-full z-10 pointer-events-none"
            style={{
              background: 'linear-gradient(to right, #03070D 0%, rgba(3,7,13,0.85) 15%, rgba(3,7,13,0.2) 45%, transparent 70%)'
            }}
          />
          <div className="hidden lg:block absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#03070D] to-transparent z-10 pointer-events-none" />
          <div className="hidden lg:block absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#03070D] to-transparent z-10 pointer-events-none" />

          {/* Blue/Red Subtle Lighting */}
          <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-1/4 left-1/4 w-[250px] h-[250px] bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />

          <img 
            src="/images.png" 
            alt="TransForMX Hero" 
            className="w-full h-auto lg:h-full object-cover lg:object-center" 
          />
        </div>

      </section>

      {/* Feature Strip */}
      <div className="relative z-20 w-full bg-gunmetal border-y border-primary/20 shadow-[0_0_30px_rgba(0,0,0,0.8)]">
        <div className="container mx-auto px-6 md:px-12 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} className="flex items-center gap-3 md:gap-4 group">
                  <div className="relative flex items-center justify-center w-10 h-10 md:w-12 md:h-12 robotic-card bg-panel border-primary/40 group-hover:border-primary transition-colors flex-shrink-0">
                    <Icon className="text-primaryLight group-hover:text-secondary transition-colors w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white font-orbitron font-bold text-[10px] md:text-xs tracking-wider uppercase leading-tight">{feature.title}</span>
                    <span className="text-metallic text-[8px] md:text-[10px] tracking-widest uppercase mt-0.5">{feature.desc}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
