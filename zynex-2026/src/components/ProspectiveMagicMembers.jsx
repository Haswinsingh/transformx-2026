import { motion } from 'framer-motion';
import MemberLoop from './MemberLoop';

const prospectiveMembers = [
  {
    id: 1,
    name: "Sesh Hari Narayanan",
    role: "MASTER MIND",
    image: "https://placehold.co/600x800/08111C/00D9FF?text=CANDIDATE+01"
  },
  {
    id: 2,
    name: "Narmadha S D",
    role: "ADVOCATE",
    image: "https://placehold.co/600x800/08111C/E31B23?text=CANDIDATE+02"
  },
  {
    id: 3,
    name: "Sri Hariharan R",
    role: "GUIDE",
    image: "https://placehold.co/600x800/08111C/FFD700?text=CANDIDATE+03"
  },
  {
    id: 4,
    name: "Rajiv G",
    role: "INFLUENCER",
    image: "https://placehold.co/600x800/08111C/9D00FF?text=CANDIDATE+04"
  },
  {
    id: 5,
    name: "Lipiga T",
    role: "COMMUNICATOR",
    image: "https://placehold.co/600x800/08111C/00FF00?text=CANDIDATE+05"
  }
];

export default function ProspectiveMagicMembers() {

  return (
    <section className="py-24 bg-background relative overflow-hidden border-t border-primary/20">
      
      <MemberLoop 
        members={prospectiveMembers} 
        status="PROSPECTIVE"
        title="PROSPECTIVE MAGIC MEMBERS"
        subtitle="SPECIAL OPERATIVES // NEXT GENERATION"
        showCount={true}
      />

      <div className="container mx-auto px-6 text-center relative z-10">
        <h3 className="text-xl font-orbitron font-bold text-white mb-2 uppercase tracking-widest">
           THE NEXT WAVE OF MAGIC
        </h3>
        <p className="text-sm text-metallicLight font-light max-w-xl mx-auto italic">
          "New talent. New perspectives. The next generation of Magic Members."
        </p>
      </div>
    </section>
  );
}
