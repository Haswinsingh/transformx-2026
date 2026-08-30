import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="archives" className="py-24 relative bg-panel overflow-hidden border-t border-primary/20">
      {/* Background elements */}
      <div className="absolute inset-0 scanline-bg opacity-20 pointer-events-none"></div>
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-primary/10 pointer-events-none"></div>
      <div className="absolute top-0 left-1/2 h-full w-[1px] bg-primary/10 pointer-events-none"></div>

      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16 relative z-10">

          {/* Illustration / Graphic */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 relative"
          >
            {/* Background elements */}
            <div className="absolute inset-[-10%] bg-primary/10 blur-[80px] z-0 pointer-events-none"></div>

            {/* Floating Container */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="relative aspect-square max-w-sm lg:max-w-md mx-auto z-10"
            >
              {/* Robotic Card Container */}
              <div className="robotic-panel p-2 w-full h-full relative group">
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-secondary/30 transition-colors duration-500 pointer-events-none z-20" style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}></div>

                <div className="relative w-full h-full bg-gunmetal overflow-hidden flex items-center justify-center border border-primary/30" style={{ clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)' }}>

                  {/* Replaced with a high-tech robotic/cyber image placeholder */}
                  <div className="absolute inset-0 bg-[url('assets/logo.jpg')] bg-cover bg-center mix-blend-luminosity opacity-70 group-hover:opacity-100 group-hover:mix-blend-normal transition-all duration-700"></div>
                  <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-all duration-700 mix-blend-overlay"></div>

                  {/* HUD Elements */}
                  <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-primaryLight"></div>
                  <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-secondary"></div>

                  {/* AI CORE ACTIVE badge */}
                  <div className="absolute top-6 left-6 bg-gunmetal/90 px-3 py-1.5 border border-primaryLight flex items-center gap-2 z-20 shadow-[0_0_15px_rgba(0,217,255,0.3)] font-orbitron text-[10px] tracking-widest text-primaryLight uppercase">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primaryLight opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-primaryLight"></span>
                    </span>
                    AI Core Active
                  </div>

                  {/* SYSTEM ONLINE badge */}
                  <div className="absolute bottom-6 right-6 bg-gunmetal/90 px-4 py-2 border border-secondary flex items-center gap-3 z-20 shadow-[0_0_20px_rgba(227,27,35,0.3)]">
                    <div className="flex flex-col items-end">
                      <p className="text-[9px] text-metallic font-orbitron tracking-widest uppercase mb-0.5">Status</p>
                      <p className="text-xs text-secondary font-orbitron font-bold tracking-wider uppercase">System Online</p>
                    </div>
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary shadow-[0_0_8px_rgba(227,27,35,0.8)]"></span>
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="w-6 h-[2px] bg-secondary"></span>
              <span className="text-metallicLight font-orbitron tracking-widest text-[10px] font-bold uppercase block">ORIGIN IDENTITY</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-orbitron font-bold mb-6 text-white drop-shadow-[0_0_10px_rgba(0,109,255,0.2)]">
              ABOUT <span className="text-primary">TRANSFORMX</span>
            </h2>

            <div className="bg-gunmetal/50 border border-primary/20 p-6 rounded-sm relative mb-8">
              <div className="absolute top-0 left-0 w-2 h-full bg-primary"></div>
              <div className="text-metallic leading-relaxed text-sm md:text-base font-light space-y-4">
                <p>
                  TransformX is a one-day hackathon organized by the Code Club of Sri Sairam Engineering College, inspired by the spirit of the Smart India Hackathon (SIH). The event brings together passionate innovators, developers, and problem-solvers to tackle real-world challenges through technology and creativity.
                </p>
                <p>
                  Participants will work on SIH-inspired problem statements, transforming ideas into practical and impactful solutions within an intense one-day challenge. From identifying problems to building and presenting prototypes, TransformX encourages teamwork, innovation, critical thinking, and the spirit of building solutions that can create real-world impact.
                </p>
                <p className="font-orbitron font-bold text-primaryLight tracking-widest uppercase text-xs pt-2">
                  One Day. One Challenge. One Transformation.
                </p>
              </div>
            </div>

            <button className="cyber-button flex items-center justify-center gap-3 group">
              <span>KNOW MORE</span>
              <div className="w-2 h-2 bg-primaryLight group-hover:bg-white transition-colors rounded-full"></div>
            </button>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;
