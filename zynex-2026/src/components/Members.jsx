import { motion } from 'framer-motion';

const Members = () => {
  return (
    <section className="py-24 relative overflow-hidden" id="network">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-orbitron font-bold mb-4 text-white">
            CORE <span className="text-secondary">MEMBERS</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-secondary to-primary mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-6 items-center">

          {/* Member 1 (Lead) */}
          <motion.div
            className="relative group rounded-xl overflow-hidden cursor-pointer h-[300px] shadow-[0_0_20px_rgba(138,43,226,0.3)]"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.5, delay: 0 }}
          >
            {/* Neon Border Glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-secondary/0 via-secondary/0 to-secondary/80 opacity-60 group-hover:opacity-100 transition-opacity duration-300 z-10" />
            <div className="absolute inset-0 border-2 border-secondary/50 group-hover:border-secondary transition-colors duration-300 z-20 rounded-xl shadow-[inset_0_0_20px_rgba(138,43,226,0.3)] group-hover:shadow-[inset_0_0_20px_rgba(138,43,226,0.7)]" />

            <img src="/assets/Code-club-details-for-website-1834.png" alt="Dr. B. Latha" className="w-full h-[300px] object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105" />

            {/* Readability Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-0"></div>

            <div className="absolute bottom-0 left-0 w-full p-6 z-30 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex flex-col justify-end h-full">
              <div className="mb-2 w-fit relative z-40">
                <span className="text-[10px] font-orbitron font-bold uppercase tracking-widest px-2 py-0.5 bg-secondary/20 border border-secondary text-secondary rounded animate-pulse shadow-[0_0_10px_rgba(138,43,226,0.5)]">
                  Lead
                </span>
              </div>
              <h3 className="text-2xl font-orbitron font-bold text-white mb-1 relative z-40 group-hover:text-secondary transition-colors">Dr. B. Latha</h3>
              <p className="text-gray-300 font-medium relative z-40">Full Stack Dev</p>
            </div>
          </motion.div>

          {/* Member 2 */}
          <motion.div
            className="relative group rounded-xl overflow-hidden cursor-pointer h-[300px]"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-primary/0 via-primary/0 to-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary transition-colors duration-300 z-20 rounded-xl shadow-[inset_0_0_20px_rgba(0,245,255,0)] group-hover:shadow-[inset_0_0_20px_rgba(0,245,255,0.5)]" />

            <img src="/assets/Code-club-details-for-website-1877.png" alt="Ms. G. Manimala" className="w-full h-[300px] object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105" />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-0"></div>

            <div className="absolute bottom-0 left-0 w-full p-6 z-30 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex flex-col justify-end h-full">
              <h3 className="text-2xl font-orbitron font-bold text-white mb-1 group-hover:text-primary transition-colors relative z-40">Ms. G. Manimala</h3>
              <p className="text-gray-300 font-medium relative z-40">AI Engineer</p>
            </div>
          </motion.div>

          {/* Member 3 */}
          <motion.div
            className="relative group rounded-xl overflow-hidden cursor-pointer h-[300px]"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-primary/0 via-primary/0 to-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary transition-colors duration-300 z-20 rounded-xl shadow-[inset_0_0_20px_rgba(0,245,255,0)] group-hover:shadow-[inset_0_0_20px_rgba(0,245,255,0.5)]" />

            <img src="/assets/Code-club-details-for-website-1925-138x150.png" alt="Dr.M.Nithya" className="w-full h-[300px] object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105" />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-0"></div>

            <div className="absolute bottom-0 left-0 w-full p-6 z-30 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex flex-col justify-end h-full">
              <h3 className="text-2xl font-orbitron font-bold text-white mb-1 group-hover:text-primary transition-colors relative z-40">Dr.M.Nithya</h3>
              <p className="text-gray-300 font-medium relative z-40">Cybersecurity</p>
            </div>
          </motion.div>



        </div>
      </div>
    </section>
  );
};

export default Members;
