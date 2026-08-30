import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (e, href) => {
    if (!href.startsWith('#')) return;

    e.preventDefault();
    const targetId = href.replace('#', '');

    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } else {
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'ARENA', href: '#arena' },
    { name: 'LOGISTICS', href: '#logistics' },
    { name: 'ARCHIVES', href: '#archives' },
    { name: 'NETWORK', href: '#network' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 border-b-2 ${scrolled ? 'bg-panel/95 backdrop-blur-md border-primary py-3 shadow-[0_4px_30px_rgba(0,109,255,0.15)]' : 'bg-gunmetal/80 backdrop-blur-sm border-transparent py-5'}`}>
      {/* Subtle scan-line overlay for navbar */}
      <div className="absolute inset-0 pointer-events-none opacity-20 scanline-bg"></div>

      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center relative z-10">
        {/* LOGO */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-orbitron font-black tracking-widest flex items-center"
        >
          <div className="h-4 w-1 bg-secondary mr-2 animate-pulse"></div>
          <span className="text-white">TRANS</span>
          <span className="text-primary drop-shadow-[0_0_8px_rgba(0,109,255,0.8)]">FOR</span>
          <span className="text-secondary drop-shadow-[0_0_8px_rgba(227,27,35,0.8)]">MX</span>
        </motion.div>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link, idx) => (
            <motion.a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="relative text-metallic hover:text-primaryLight transition-colors font-orbitron text-xs font-bold tracking-widest uppercase group"
            >
              {link.name}
              {/* Hover HUD Line */}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-secondary group-hover:w-full transition-all duration-300"></span>
            </motion.a>
          ))}
          <Link to="/register">
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="cyber-button text-xs py-2 px-6 flex items-center gap-2 group"
            >
              <span>REGISTER NOW</span>
              <div className="w-2 h-2 bg-secondary rounded-full group-hover:animate-ping"></div>
            </motion.button>
          </Link>
        </div>

        {/* MOBILE TOGGLE */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-primaryLight hover:text-secondary transition-colors">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden bg-panel/95 backdrop-blur-lg border-t border-primary/30 absolute top-full left-0 w-full flex flex-col items-center py-6 space-y-6 shadow-[0_10px_30px_rgba(0,109,255,0.2)]"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                setIsOpen(false);
                handleNavClick(e, link.href);
              }}
              className="text-metallic hover:text-primaryLight font-orbitron font-bold text-sm tracking-widest uppercase"
            >
              {link.name}
            </a>
          ))}
          <Link to="/register" onClick={() => setIsOpen(false)} className="w-[80%]">
            <button className="cyber-button w-full flex justify-center items-center gap-2 group">
              REGISTER NOW
              <div className="w-2 h-2 bg-secondary rounded-full group-hover:animate-ping"></div>
            </button>
          </Link>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
