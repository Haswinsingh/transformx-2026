const Footer = () => {
  return (
    <footer className="bg-gunmetal py-8 border-t border-primary/20 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 scanline-bg opacity-30 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">

          {/* Logo and Copyright */}
          <div className="flex flex-col md:flex-row items-center md:items-end gap-4">
            <div className="flex items-center">
              <div className="h-4 w-1 bg-secondary mr-2"></div>
              <span className="text-xl font-orbitron font-black tracking-widest text-white">
                TRANS<span className="text-primary">FOR</span><span className="text-secondary">MX</span>
              </span>
            </div>
            <div className="h-px w-8 bg-metallicLight/30 hidden md:block mb-1.5"></div>
            <span className="text-[10px] text-metallic font-orbitron uppercase tracking-widest">
              © 2026 TRANSFORMX. ALL SYSTEMS OPERATIONAL.
            </span>
          </div>

          {/* Navigation Links */}
          <div className="flex gap-6 text-xs text-metallicLight font-orbitron uppercase tracking-widest">
            <a href="#" className="hover:text-primary transition-colors flex items-center gap-1">
              <span className="w-1 h-1 bg-primary"></span> PROTOCOL
            </a>
            <a href="#" className="hover:text-primary transition-colors flex items-center gap-1">
              <span className="w-1 h-1 bg-primary"></span> PRIVACY
            </a>
            <a href="#" className="hover:text-primary transition-colors flex items-center gap-1">
              <span className="w-1 h-1 bg-primary"></span> TERMINAL
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
