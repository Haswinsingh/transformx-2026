import { motion } from 'framer-motion';
import { Instagram, Linkedin, Github, Twitter } from 'lucide-react';

const SocialLinks = () => {
  const socials = [
    { icon: <Instagram size={24} />, href: "https://www.instagram.com/code_club_sairam?igsh=MXc3emp6ZDF3bmplYw==", color: "hover:text-pink-500 hover:border-pink-500 hover:shadow-[0_0_15px_rgba(236,72,153,0.5)]" },
    { icon: <Linkedin size={24} />, href: "https://www.linkedin.com/in/code-club-sairam-7095713b4", color: "hover:text-blue-500 hover:border-blue-500 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]" },
  ];

  return (
    <section className="py-20 relative bg-black/60 border-t border-white/5">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-4xl font-orbitron font-bold mb-8 tracking-widest text-white drop-shadow-[0_0_10px_rgba(0,245,255,0.3)]">
            STAY <span className="text-primary">INTERFACED</span>
          </h2>

          <div className="flex justify-center gap-6">
            {socials.map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                className={`w-14 h-14 flex items-center justify-center rounded-sm border border-white/20 text-gray-400 bg-white/5 backdrop-blur-sm transition-all duration-300 ${social.color}`}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SocialLinks;
