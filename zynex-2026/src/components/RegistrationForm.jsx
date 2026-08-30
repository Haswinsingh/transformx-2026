import { useState } from 'react';
import { motion } from 'framer-motion';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    college: '',
    email: '',
    phone: '',
    team: '',
    domain: '',
    terms: false
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Normally integrate with Firebase/REST API here
    console.log("Form Data Submitted: ", formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({ name: '', college: '', email: '', phone: '', team: '', domain: '', terms: false });
  };

  return (
    <section id="logistics" className="py-24 relative">
      <div className="absolute right-0 top-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-orbitron font-bold mb-4">
            <span className="text-primary">REGISTER</span> NODE
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-8 md:p-12 rounded-2xl relative"
        >
          {submitted ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <h3 className="text-2xl font-orbitron font-bold text-white mb-2">ACCESS GRANTED</h3>
              <p className="text-gray-400">Your registration payload has been successfully injected into the mainframe.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-gray-400 font-orbitron uppercase tracking-wider">Operative Name</label>
                  <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full bg-black/50 border border-white/10 rounded-md p-3 text-white focus:outline-none focus:border-primary transition-colors focus:ring-1 focus:ring-primary shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400 font-orbitron uppercase tracking-wider">Institution / Base</label>
                  <input type="text" name="college" required value={formData.college} onChange={handleChange} className="w-full bg-black/50 border border-white/10 rounded-md p-3 text-white focus:outline-none focus:border-primary transition-colors focus:ring-1 focus:ring-primary shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]" placeholder="University of Future" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400 font-orbitron uppercase tracking-wider">Comm Link (Email)</label>
                  <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full bg-black/50 border border-white/10 rounded-md p-3 text-white focus:outline-none focus:border-primary transition-colors focus:ring-1 focus:ring-primary shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]" placeholder="john@domain.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400 font-orbitron uppercase tracking-wider">Frequency (Phone)</label>
                  <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className="w-full bg-black/50 border border-white/10 rounded-md p-3 text-white focus:outline-none focus:border-primary transition-colors focus:ring-1 focus:ring-primary shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]" placeholder="+1 234 567 890" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400 font-orbitron uppercase tracking-wider">Squad Designation</label>
                  <input type="text" name="team" required value={formData.team} onChange={handleChange} className="w-full bg-black/50 border border-white/10 rounded-md p-3 text-white focus:outline-none focus:border-primary transition-colors focus:ring-1 focus:ring-primary shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]" placeholder="Team Cyber" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400 font-orbitron uppercase tracking-wider">Target Vector (Domain)</label>
                  <select name="domain" required value={formData.domain} onChange={handleChange} className="w-full bg-black/50 border border-white/10 rounded-md p-3 text-white focus:outline-none focus:border-primary transition-colors focus:ring-1 focus:ring-primary appearance-none cursor-pointer">
                    <option value="" disabled className="text-gray-500">Select Domain</option>
                    <option value="web" className="bg-gray-900">Web Development</option>
                    <option value="app" className="bg-gray-900">App Development</option>
                    <option value="cyber" className="bg-gray-900">Cybersecurity</option>
                    <option value="ai" className="bg-gray-900">AI & Chatbots</option>
                    <option value="iot" className="bg-gray-900">Internet of Things</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center mt-6">
                <input type="checkbox" name="terms" id="terms" required checked={formData.terms} onChange={handleChange} className="w-4 h-4 rounded border-gray-600 text-primary focus:ring-primary bg-black/50 accent-primary cursor-pointer" />
                <label htmlFor="terms" className="ml-2 text-sm text-gray-400 cursor-pointer">I agree to the Protocol Terms & Conditions and understand the rules of engagement.</label>
              </div>

              <button type="submit" className="w-full py-4 mt-8 bg-primary text-black font-orbitron font-bold text-lg tracking-widest rounded-md hover:bg-white hover:text-primary transition-colors duration-300 shadow-[0_0_20px_rgba(0,245,255,0.4)]">
                TRANSMIT DATA
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default RegistrationForm;
