import { motion } from "framer-motion";
import ProspectiveMagicMembers from "./ProspectiveMagicMembers";
import MemberLoop from "./MemberLoop";

const magicMembers = [
  {
    id: 1,
    name: "Haswin singh H K",
    role: "MASTER MIND",
    image: "/assets/magic1.jpeg"
  },
  {
    id: 2,
    name: "Ram Murugan G",
    role: "ADVOCATE",
    image: "/assets/magic2.jpeg"
  },
  {
    id: 3,
    name: "Keerthivasan",
    role: "GUIDE",
    image: "/assets/magic3.jpeg"
  },
  {
    id: 4,
    name: "Kavinaiyya V",
    role: "INFLUENCER",
    image: "/assets/magic4.jpeg"
  },
  {
    id: 5,
    name: "Gunagaran S K",
    role: "COMMUNICATOR",
    image: "/assets/magic5.jpg"
  }
];

const coreMembers = [
  {
    id: 1,
    name: "Dr. B. Latha",
    role: "HOD",
    image: "/assets/core1.png"
  },
  {
    id: 2,
    name: "Ms. G. Manimala",
    role: "COORDINATOR",
    image: "/assets/core2.png"
  },
  {
    id: 3,
    name: "Dr. M. Nithya",
    role: "COORDINATOR",
    image: "/assets/core3.png"
  },
  {
    id: 4,
    name: "Dr. J.M Nandhini",
    role: "COORDINATOR",
    image: "/assets/core4.png"
  },
  {
    id: 5,
    name: "Member Name",
    role: "ROLE",
    image: "/assets/core5.jpg"
  }
];

const eventCoordinators = [
  {
    id: 1,
    name: "Dhayaa shri S",
    role: "COORDINATOR",
    image: "/assets/event1.jpeg"
  },
  {
    id: 2,
    name: "POORVASHA K",
    role: "COORDINATOR",
    image: "/assets/event2.jpeg"
  },
  {
    id: 3,
    name: "Darshana S",
    role: "COORDINATOR",
    image: "/assets/event3.jpeg"
  },
  {
    id: 4,
    name: "PRAVEENKUMAR R",
    role: "COORDINATOR",
    image: "/assets/event4.jpeg"
  },
  {
    id: 5,
    name: "Rajiv G",
    role: "COORDINATOR",
    image: "/assets/event5.jpeg"
  }
];

export default function Coordinators() {
  return (
    <div id="network" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 scanline-bg opacity-10 pointer-events-none" />

      <MemberLoop 
        members={coreMembers} 
        status="CORE" 
        title="CORE MEMBERS" 
        subtitle="COMMAND STRUCTURE" 
      />

      <MemberLoop 
        members={magicMembers} 
        status="ACTIVE" 
        title="MAGIC MEMBERS" 
        subtitle="SPECIAL OPERATIVES" 
      />

      <ProspectiveMagicMembers />

      <MemberLoop 
        members={eventCoordinators} 
        status="COORDINATOR" 
        title="EVENT COORDINATORS" 
        subtitle="GROUND UNITS" 
      />

    </div>
  );
}

