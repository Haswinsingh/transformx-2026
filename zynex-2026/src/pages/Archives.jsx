import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Archives() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-28 pb-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-orbitron font-bold mb-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
            <span className="text-cyan-400">About</span>
          </h1>
          <p className="text-gray-400">Previous event records and archives will be retrieved soon.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
