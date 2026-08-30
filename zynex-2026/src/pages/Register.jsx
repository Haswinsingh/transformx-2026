import TeamRegistrationForm from "../components/TeamRegistrationForm";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Register() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-28 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <Link to="/" className="inline-flex items-center text-gray-400 hover:text-primary transition-colors mb-8 group">
            <ArrowLeft className="mr-2 h-4 w-4 transform group-hover:-translate-x-1 transition-transform" />
            <span className="font-orbitron tracking-wider text-sm">Return to Archive</span>
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-10">
              <span className="px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest bg-primary/10 text-primary border border-primary/30 uppercase inline-block mb-4">
                Access Request
              </span>
              <h1 className="text-4xl md:text-5xl font-orbitron font-bold mb-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                <span className="text-cyan-400">REGISTER</span> NODE
              </h1>
              <p className="text-gray-400 max-w-xl mx-auto">
                Establish a stable connection to our mainframe. Authenticate your squad to gain access to the TransForMX grid.
              </p>
            </div>
            <TeamRegistrationForm />
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
