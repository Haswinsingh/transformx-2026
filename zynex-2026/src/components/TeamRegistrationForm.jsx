import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { submitRegistration } from "../api/register";
import { ShieldAlert, TerminalSquare, UserCheck, ChevronRight, ChevronLeft, Upload, CheckCircle2, AlertCircle } from "lucide-react";

import { Cpu, Bot, Shield, GraduationCap, Car, Leaf, AlertTriangle, Cpu as ChipIcon, Code, X, Target } from "lucide-react";

const themes = [
  {
    id: "01",
    code: "SIH-01-SA",
    title: "SMART AUTOMATION",
    desc: "Ideas focused on the intelligent use of resources for transforming and advancing technology by combining Artificial Intelligence to explore various sources and get valuable insights.",
    icon: <Cpu className="w-6 h-6 text-[#00D9FF]" />,
    accent: "text-[#00D9FF]",
    focusAreas: [
      "AI-driven automation",
      "Intelligent resource management",
      "Predictive maintenance",
      "Smart monitoring",
      "Data-driven decision making"
    ],
    technologies: ["AI / ML", "IoT", "Automation", "Industry 4.0"]
  },
  {
    id: "02",
    code: "SIH-02-RD",
    title: "ROBOTICS & DRONES",
    desc: "Design drones and robots that can solve pressing challenges in India such as medical emergencies, search and rescue operations, and more.",
    icon: <Bot className="w-6 h-6 text-[#E31B23]" />,
    accent: "text-[#E31B23]",
    focusAreas: [
      "Autonomous navigation",
      "Search and rescue operations",
      "Medical supply delivery",
      "Agricultural surveillance",
      "Disaster response robotics"
    ],
    technologies: ["Robotics", "Computer Vision", "Embedded Systems", "Aerospace"]
  },
  {
    id: "03",
    code: "SIH-03-BC",
    title: "BLOCKCHAIN & CYBERSECURITY",
    desc: "Provide ideas based on decentralized and distributed ledger technology used to store digital information and transform multiple sectors.",
    icon: <Shield className="w-6 h-6 text-[#00D9FF]" />,
    accent: "text-[#00D9FF]",
    focusAreas: [
      "Decentralized identity",
      "Secure supply chain tracking",
      "Zero-trust architecture",
      "Data privacy preservation",
      "Smart contract auditing"
    ],
    technologies: ["Blockchain", "Cryptography", "Network Security", "Web3"]
  },
  {
    id: "04",
    code: "SIH-04-SE",
    title: "SMART EDUCATION",
    desc: "Smart education enables learners to learn more effectively, efficiently, flexibly and comfortably in the digital age.",
    icon: <GraduationCap className="w-6 h-6 text-[#FFD700]" />,
    accent: "text-[#FFD700]",
    focusAreas: [
      "Personalized learning paths",
      "Immersive AR/VR classrooms",
      "Automated assessment",
      "Accessibility tools",
      "Skill gap analysis"
    ],
    technologies: ["EdTech", "AR/VR", "AI Tutors", "Data Analytics"]
  },
  {
    id: "05",
    code: "SIH-05-SV",
    title: "SMART VEHICLES",
    desc: "Creating intelligent devices and technologies to improve the transportation and communication sector.",
    icon: <Car className="w-6 h-6 text-[#00FF00]" />,
    accent: "text-[#00FF00]",
    focusAreas: [
      "V2X communication",
      "Traffic flow optimization",
      "EV battery management",
      "Autonomous driving aids",
      "Fleet logistics"
    ],
    technologies: ["Automotive IoT", "Machine Learning", "Sensor Fusion", "EV Tech"]
  },
  {
    id: "06",
    code: "SIH-06-RE",
    title: "RENEWABLE / SUSTAINABLE ENERGY",
    desc: "Innovative ideas that help manage and generate renewable and sustainable energy sources more efficiently.",
    icon: <Leaf className="w-6 h-6 text-[#9D00FF]" />,
    accent: "text-[#9D00FF]",
    focusAreas: [
      "Smart grid management",
      "Energy storage optimization",
      "Solar tracking algorithms",
      "Carbon credit verification",
      "Micro-grid routing"
    ],
    technologies: ["CleanTech", "Smart Grids", "IoT", "Data Science"]
  },
  {
    id: "07",
    code: "SIH-07-DM",
    title: "DISASTER MANAGEMENT",
    desc: "Disaster management includes ideas related to risk mitigation, planning and management before, after or during a disaster.",
    icon: <AlertTriangle className="w-6 h-6 text-[#FF8C00]" />,
    accent: "text-[#FF8C00]",
    focusAreas: [
      "Early warning systems",
      "Resource allocation prediction",
      "Evacuation routing",
      "Damage assessment AI",
      "Resilient communication nets"
    ],
    technologies: ["GIS", "Satellite Imagery AI", "Telecom", "Predictive Modeling"]
  }
];

export default function TeamRegistrationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [teamSize, setTeamSize] = useState(2);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStage, setSubmitStage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successTeamId, setSuccessTeamId] = useState(null);
  const [successFileName, setSuccessFileName] = useState(null);
  const [activeThemeDetail, setActiveThemeDetail] = useState(null);
  
  const DEADLINE = new Date("2026-09-19T23:59:59+05:30").getTime();
  const isClosed = Date.now() > DEADLINE;

  const [formData, setFormData] = useState({
    teamName: "",
    leaderName: "",
    college: "",
    yearDept: "",
    studentId: "",
    email: "",
    phone: "",
    members: [
      { name: "", yearDept: "", studentId: "", email: "", phone: "" },
      { name: "", yearDept: "", studentId: "", email: "", phone: "" },
      { name: "", yearDept: "", studentId: "", email: "", phone: "" },
    ],
    problemStatement: "",
    projectType: "",
    projectTitle: "",
    abstract: "",
    technologies: "",
    ppt: null
  });

  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMsg("");
  };

  const handleMemberChange = (index, e) => {
    const updatedMembers = [...formData.members];
    updatedMembers[index][e.target.name] = e.target.value;
    setFormData({ ...formData, members: updatedMembers });
    setErrorMsg("");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 25 * 1024 * 1024) {
        setErrorMsg("FILE EXCEEDS 25MB LIMIT");
        return;
      }
      setFormData({ ...formData, ppt: file });
      setErrorMsg("");
    }
  };

  const validateStep = (step) => {
    if (step === 1) {
      if (!formData.teamName || !formData.leaderName || !formData.email || !formData.phone || !formData.yearDept || !formData.studentId || !formData.college) {
        setErrorMsg("COMMANDER DETAILS INCOMPLETE");
        return false;
      }
      for (let i = 0; i < teamSize - 1; i++) {
        const m = formData.members[i];
        if (!m.name || !m.email || !m.phone || !m.yearDept || !m.studentId) {
          setErrorMsg(`UNIT ${i+1} PARAMETERS INCOMPLETE`);
          return false;
        }
      }
    }
    if (step === 2) {
      if (!formData.problemStatement) {
        setErrorMsg("TARGET PROTOCOL NOT SELECTED");
        return false;
      }
      if (!formData.projectType) {
        setErrorMsg("SYSTEM TYPE NOT SELECTED");
        return false;
      }
    }
    if (step === 3) {
      if (!formData.projectTitle || !formData.abstract) {
        setErrorMsg("BLUEPRINT DATA MISSING");
        return false;
      }
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setErrorMsg("");
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setErrorMsg("");
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (isClosed) return;
    if (!validateStep(4)) return;

    setIsSubmitting(true);
    setSubmitStage("INITIALIZING REGISTRATION...");
    setErrorMsg("");

    const stages = [
      "VALIDATING MISSION DATA...",
      "GENERATING TEAM ID...",
      "UPLOADING PRESENTATION...",
      "SYNCHRONIZING GOOGLE SHEETS...",
      "SENDING CONFIRMATION..."
    ];
    let stageIndex = 0;
    
    // Simulate progression while waiting for the fetch
    const stageInterval = setInterval(() => {
      if (stageIndex < stages.length) {
        setSubmitStage(stages[stageIndex]);
        stageIndex++;
      }
    }, 1500);

    try {
      const payload = new FormData();
      payload.append("teamName", formData.teamName);
      payload.append("leaderName", formData.leaderName);
      payload.append("college", formData.college);
      payload.append("yearDept", formData.yearDept);
      payload.append("studentId", formData.studentId);
      payload.append("email", formData.email);
      payload.append("phone", formData.phone);
      payload.append("teamSize", teamSize);
      payload.append("problemStatement", formData.problemStatement);
      payload.append("projectType", formData.projectType);
      payload.append("projectTitle", formData.projectTitle);
      payload.append("abstract", formData.abstract);
      payload.append("technologies", formData.technologies);
      
      const activeMembers = formData.members.slice(0, teamSize - 1);
      payload.append("members", JSON.stringify(activeMembers));

      if (formData.ppt) {
        payload.append("ppt", formData.ppt);
      }

      const res = await submitRegistration(payload);
      clearInterval(stageInterval);
      setSuccessTeamId(res.teamId || "TFX-0000");
      setSuccessFileName(res.fileName || "N/A");
    } catch (error) {
      clearInterval(stageInterval);
      setErrorMsg(error.message || "INITIALIZATION FAILED");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle = "w-full p-3 bg-gunmetal border border-primary/30 text-white focus:outline-none focus:border-[#00D9FF] focus:shadow-[0_0_10px_rgba(0,217,255,0.2)] transition-all font-orbitron text-sm tracking-wide placeholder-metallic/50";

  // Step Indicators Render
  const renderIndicators = () => (
    <div className="flex items-center justify-between w-full max-w-2xl mx-auto mb-10 px-2 overflow-x-auto no-scrollbar">
      {[
        { num: "01", label: "TEAM" },
        { num: "02", label: "MISSION" },
        { num: "03", label: "ABSTRACT" },
        { num: "04", label: "PRESENTATION" }
      ].map((step, idx) => {
        const stepNum = idx + 1;
        const isActive = currentStep === stepNum;
        const isPast = currentStep > stepNum;
        
        return (
          <div key={step.num} className="flex items-center">
            <div className={`flex flex-col items-center ${isActive ? 'opacity-100' : isPast ? 'opacity-70' : 'opacity-40'}`}>
              <div className={`w-10 h-10 flex items-center justify-center font-orbitron font-bold text-sm border-2 ${
                isActive ? 'border-[#00D9FF] text-[#00D9FF] shadow-[0_0_15px_rgba(0,217,255,0.4)]' : 
                isPast ? 'border-primaryLight text-primaryLight' : 'border-metallic text-metallic'
              }`} style={{ clipPath: 'polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)' }}>
                {isPast ? <CheckCircle2 className="w-5 h-5" /> : step.num}
              </div>
              <span className={`text-[10px] font-orbitron mt-2 tracking-widest uppercase hidden md:block ${
                isActive ? 'text-[#00D9FF]' : isPast ? 'text-primaryLight' : 'text-metallic'
              }`}>{step.label}</span>
            </div>
            {idx < 3 && (
              <div className="w-8 md:w-20 h-[2px] mx-2 md:mx-4 bg-gunmetal relative overflow-hidden">
                {isPast && (
                  <motion.div 
                    initial={{ x: "-100%" }}
                    animate={{ x: 0 }}
                    className="absolute inset-0 bg-primaryLight"
                  />
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  if (successTeamId) {
    return (
      <div className="max-w-3xl mx-auto p-12 bg-panel/95 border border-[#00D9FF] relative overflow-hidden shadow-[0_0_50px_rgba(0,217,255,0.2)] text-center" style={{ clipPath: 'polygon(30px 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%, 0 30px)' }}>
        <div className="absolute inset-0 bg-circuit opacity-10 pointer-events-none" />
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative z-10 flex flex-col items-center">
          <TerminalSquare className="w-16 h-16 text-[#00D9FF] mb-6 drop-shadow-[0_0_15px_rgba(0,217,255,0.6)]" />
          <h2 className="text-4xl font-orbitron font-bold text-white tracking-widest mb-2">MISSION INITIALIZED</h2>
          <p className="text-primaryLight font-orbitron tracking-widest mb-8">REGISTRATION SUCCESSFUL</p>
          
          <div className="bg-gunmetal border border-primary/40 p-6 w-full max-w-md text-left space-y-4">
            <div>
              <span className="text-metallic text-xs font-orbitron uppercase block mb-1">TEAM ID</span>
              <span className="text-2xl font-mono text-[#00D9FF] font-bold tracking-widest">{successTeamId}</span>
            </div>
            <div>
              <span className="text-metallic text-xs font-orbitron uppercase block mb-1">PRESENTATION</span>
              <span className="text-sm font-mono text-white tracking-widest">{successFileName}</span>
            </div>
            <div>
              <span className="text-metallic text-xs font-orbitron uppercase block mb-1">STATUS</span>
              <span className="text-sm font-mono text-[#00D9FF] tracking-widest">SYSTEM ONLINE</span>
            </div>
          </div>
          
          <p className="text-metallicLight text-sm mt-8 max-w-md leading-relaxed">
            Your mission parameters have been securely logged into the mainframe. A confirmation protocol will be transmitted to the commander's secure comm link (email) shortly.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {renderIndicators()}

      <div 
        className="p-6 md:p-10 bg-panel/90 border border-primary/30 relative overflow-hidden shadow-[0_0_40px_rgba(0,109,255,0.1)]"
        style={{ clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)' }}
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] pointer-events-none" />
        <div className="absolute inset-0 bg-circuit opacity-5 pointer-events-none" />
        <div className="absolute inset-0 scanline-bg opacity-20 pointer-events-none" />

        {/* Header */}
        <div className="flex flex-col mb-8 border-b border-primary/20 pb-4 relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 bg-[#00D9FF] animate-pulse"></span>
            <span className="text-[10px] font-orbitron font-bold text-[#00D9FF] tracking-[0.2em] uppercase">
              {currentStep === 1 && "PROTOCOL 01 // TEAM IDENTITY"}
              {currentStep === 2 && "PROTOCOL 02 // SELECT MISSION"}
              {currentStep === 3 && "PROTOCOL 03 // SOLUTION BLUEPRINT"}
              {currentStep === 4 && "PROTOCOL 04 // FINAL BLUEPRINT"}
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-orbitron font-bold text-white tracking-widest drop-shadow-[0_0_8px_rgba(0,217,255,0.4)] uppercase">
            {currentStep === 1 && "TEAM INITIALIZATION"}
            {currentStep === 2 && "MISSION SELECTION"}
            {currentStep === 3 && "ABSTRACT SUBMISSION"}
            {currentStep === 4 && "PRESENTATION UPLOAD"}
          </h2>
        </div>

        {errorMsg && (
          <div className="mb-6 p-3 bg-red-900/30 border border-red-500/50 flex items-center gap-3 text-red-400 font-orbitron text-xs">
            <AlertCircle className="w-4 h-4" />
            <span>{errorMsg}</span>
          </div>
        )}

        <div className="relative z-10 min-h-[400px]">
          <AnimatePresence mode="wait">
            {/* STEP 1: TEAM */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="col-span-2 md:col-span-1">
                    <label className="text-[10px] text-metallic font-orbitron mb-2 block uppercase">Team Designation</label>
                    <input className={inputStyle} name="teamName" placeholder="[ ENTER TEAM NAME ]" value={formData.teamName} onChange={handleInputChange} />
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <label className="text-[10px] text-metallic font-orbitron mb-2 block uppercase">Select Squad Capacity</label>
                    <div className="relative">
                      <select className={`${inputStyle} appearance-none cursor-pointer`} value={teamSize} onChange={(e) => setTeamSize(Number(e.target.value))}>
                        <option value={2} className="bg-gunmetal text-white">2 UNITS (LEADER + 1)</option>
                        <option value={3} className="bg-gunmetal text-white">3 UNITS (LEADER + 2)</option>
                        <option value={4} className="bg-gunmetal text-white">4 UNITS (LEADER + 3)</option>
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#00D9FF]">▼</div>
                    </div>
                  </div>
                </div>

                <h3 className="text-xs font-orbitron font-bold tracking-widest text-[#00D9FF] mb-4 border-b border-primary/20 pb-2 uppercase">COMMANDER PROFILE</h3>
                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  <input className={inputStyle} name="leaderName" placeholder="COMMANDER NAME" value={formData.leaderName} onChange={handleInputChange} />
                  <input className={inputStyle} name="college" placeholder="COLLEGE / INSTITUTION" value={formData.college} onChange={handleInputChange} />
                  <input className={inputStyle} name="yearDept" placeholder="YEAR & DIVISION (e.g. 3rd Yr CSE)" value={formData.yearDept} onChange={handleInputChange} />
                  <input className={inputStyle} name="studentId" placeholder="IDENTIFICATION NO." value={formData.studentId} onChange={handleInputChange} />
                  <input type="email" className={inputStyle} name="email" placeholder="SECURE COMM LINK (EMAIL)" value={formData.email} onChange={handleInputChange} />
                  <input type="tel" className={inputStyle} name="phone" placeholder="COMM FREQUENCY (PHONE)" value={formData.phone} onChange={handleInputChange} />
                </div>

                {[...Array(teamSize - 1)].map((_, i) => (
                  <div key={i} className="mb-6">
                    <h3 className="text-xs font-orbitron font-bold tracking-widest text-primaryLight mb-4 border-b border-primary/20 pb-2 uppercase flex items-center gap-2">
                      <UserCheck className="w-4 h-4" /> UNIT {i + 1} PARAMETERS
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <input className={inputStyle} name="name" placeholder="UNIT DESIGNATION (NAME)" value={formData.members[i].name} onChange={(e) => handleMemberChange(i, e)} />
                      <input className={inputStyle} name="yearDept" placeholder="YEAR & DIVISION" value={formData.members[i].yearDept} onChange={(e) => handleMemberChange(i, e)} />
                      <input className={inputStyle} name="studentId" placeholder="IDENTIFICATION NO." value={formData.members[i].studentId} onChange={(e) => handleMemberChange(i, e)} />
                      <input type="email" className={inputStyle} name="email" placeholder="COMM LINK (EMAIL)" value={formData.members[i].email} onChange={(e) => handleMemberChange(i, e)} />
                      <input type="tel" className={inputStyle} name="phone" placeholder="FREQUENCY (PHONE)" value={formData.members[i].phone} onChange={(e) => handleMemberChange(i, e)} />
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {/* STEP 2: MISSION SELECTION */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="grid md:grid-cols-12 gap-8"
              >
                {/* Left Panel: Mission Brief & Project Type */}
                <div className="md:col-span-4 flex flex-col gap-6">
                  <div>
                    <span className="text-[#00D9FF] text-[10px] font-orbitron font-bold tracking-widest uppercase mb-2 block">
                      ■ PROTOCOL 02 // SELECT MISSION
                    </span>
                    <h2 className="text-3xl font-orbitron font-bold text-white tracking-widest drop-shadow-[0_0_8px_rgba(0,217,255,0.4)] uppercase">
                      MISSION SELECTION
                    </h2>
                    <div className="w-16 h-[2px] bg-[#00D9FF] my-4 shadow-[0_0_8px_rgba(0,217,255,0.8)]"></div>
                    <span className="text-metallicLight text-xs font-orbitron tracking-widest uppercase">
                      SELECT A SIH THEME
                    </span>
                  </div>

                  <div 
                    className="p-6 bg-panel/80 border-l-2 border-l-[#00D9FF] relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-16 h-16 bg-[#00D9FF]/10 blur-xl pointer-events-none" />
                    <ShieldAlert className="w-8 h-8 text-[#00D9FF] mb-4" />
                    <h3 className="text-sm font-orbitron font-bold text-white mb-2">MISSION BRIEF</h3>
                    <p className="text-xs text-metallicLight leading-relaxed">
                      These themes are inspired by practical challenges faced in India. Select a domain you are passionate about and build innovative solutions that create real-world impact.
                    </p>
                  </div>

                  <div className="w-full h-[1px] bg-primary/20"></div>

                  <div>
                    <h3 className="text-sm font-orbitron font-bold text-white mb-4">PROJECT TYPE</h3>
                    <div className="flex flex-col gap-3">
                      {["HARDWARE", "SOFTWARE"].map(type => {
                        const isSelected = formData.projectType === type || (!formData.projectType && type === "HARDWARE" && setFormData({...formData, projectType: "HARDWARE"}));
                        return (
                          <div
                            key={type}
                            onClick={() => { setFormData({...formData, projectType: type}); setErrorMsg(""); }}
                            className={`p-4 cursor-pointer border flex items-center justify-between font-orbitron tracking-widest text-sm transition-all ${
                              isSelected 
                                ? 'bg-primary/20 border-[#00D9FF] text-[#00D9FF] shadow-[inset_0_0_20px_rgba(0,217,255,0.2)]' 
                                : 'bg-gunmetal border-primary/20 text-metallic hover:border-primary/60'
                            }`}
                            style={{ clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)' }}
                          >
                            <div className="flex items-center gap-3">
                              {type === "HARDWARE" ? <ChipIcon className="w-5 h-5" /> : <Code className="w-5 h-5" />}
                              <span>{type}</span>
                            </div>
                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? 'border-[#00D9FF]' : 'border-metallic'}`}>
                              {isSelected && <div className="w-2 h-2 bg-[#00D9FF] rounded-full shadow-[0_0_5px_#00D9FF]"></div>}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>

                {/* Right Panel: Themes List */}
                <div className="md:col-span-8 flex flex-col gap-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                  {themes.map((theme) => {
                    const isSelected = formData.problemStatement === theme.code;
                    return (
                      <div 
                        key={theme.code}
                        onClick={() => { setFormData({...formData, problemStatement: theme.code}); setErrorMsg(""); setActiveThemeDetail(theme); }}
                        className={`group relative p-5 cursor-pointer border transition-all duration-300 overflow-hidden ${
                          isSelected 
                            ? 'bg-panel/90 border-[#00D9FF] shadow-[0_0_20px_rgba(0,217,255,0.2)] z-10 scale-[1.02]' 
                            : 'bg-gunmetal/60 border-primary/30 hover:border-primary hover:bg-gunmetal/80 hover:scale-[1.01]'
                        }`}
                        style={{ clipPath: 'polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)' }}
                      >
                        {/* Corner Accents */}
                        <div className={`absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 transition-colors ${isSelected ? 'border-[#00D9FF]' : 'border-primary/40 group-hover:border-primary'}`}></div>
                        <div className={`absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 transition-colors ${isSelected ? 'border-[#00D9FF]' : 'border-primary/40 group-hover:border-primary'}`}></div>
                        
                        <div className="flex items-center gap-4 relative z-10">
                          <span className={`text-xl font-orbitron font-bold tracking-widest ${isSelected ? 'text-[#00D9FF] drop-shadow-[0_0_5px_#00D9FF]' : 'text-metallic/50 group-hover:text-metallic'}`}>
                            {theme.id}
                          </span>
                          
                          <div className={`p-3 border rounded-sm transition-colors shrink-0 ${isSelected ? 'bg-primary/10 border-[#00D9FF] shadow-[0_0_10px_#00D9FF]' : 'bg-background/50 border-primary/20 group-hover:border-primary/50'}`}>
                            {theme.icon}
                          </div>
                          
                          <div className="flex-grow">
                            <h4 className={`text-sm md:text-base font-orbitron font-bold tracking-wider mb-1 transition-colors ${isSelected ? 'text-white' : 'text-metallicLight group-hover:text-white'}`}>
                              {theme.title}
                            </h4>
                            <p className={`text-xs font-light line-clamp-1 transition-colors ${isSelected ? 'text-metallicLight' : 'text-metallic/60 group-hover:text-metallic'}`}>
                              {theme.desc}
                            </p>
                          </div>
                          
                          <ChevronRight className={`w-5 h-5 shrink-0 transition-transform ${isSelected ? 'text-[#00D9FF] translate-x-1' : 'text-metallic/30 group-hover:text-primary group-hover:translate-x-1'}`} />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </motion.div>
            )}

            {/* STEP 3: ABSTRACT */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-6">
                  <label className="text-[10px] text-metallic font-orbitron mb-2 block uppercase">Project Title</label>
                  <input className={inputStyle} name="projectTitle" placeholder="[ ENTER PROJECT TITLE ]" value={formData.projectTitle} onChange={handleInputChange} />
                </div>
                
                <div className="mb-6">
                  <div className="flex justify-between items-end mb-2">
                    <label className="text-[10px] text-metallic font-orbitron uppercase">Executive Abstract</label>
                    <span className={`text-[10px] font-mono ${formData.abstract.length > 500 ? 'text-[#E31B23]' : 'text-primaryLight'}`}>
                      CHARACTERS: {formData.abstract.length} / 500
                    </span>
                  </div>
                  <textarea 
                    className={`${inputStyle} min-h-[150px] resize-y font-mono text-xs`} 
                    name="abstract" 
                    placeholder="> DETAILED SOLUTION BLUEPRINT..." 
                    value={formData.abstract} 
                    onChange={handleInputChange} 
                  />
                </div>

                <div className="mb-6">
                  <label className="text-[10px] text-metallic font-orbitron mb-2 block uppercase">Tech Stack (Optional)</label>
                  <input className={inputStyle} name="technologies" placeholder="e.g. React, Node.js, TensorFlow, ESP32" value={formData.technologies} onChange={handleInputChange} />
                </div>
              </motion.div>
            )}

            {/* STEP 4: UPLOAD & SUBMIT */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-gunmetal/50 border border-primary/30 p-6 mb-8" style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}>
                  <h3 className="text-xs font-orbitron font-bold tracking-widest text-[#00D9FF] mb-4 border-b border-primary/20 pb-2 uppercase">UPLOAD PROJECT PRESENTATION</h3>
                  
                  <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-primary/30 bg-background/50 cursor-pointer hover:border-[#00D9FF] hover:bg-primary/5 transition-all"
                       onClick={() => fileInputRef.current?.click()}
                  >
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleFileChange} 
                      className="hidden" 
                      accept=".ppt,.pptx,.pdf"
                    />
                    <Upload className={`w-10 h-10 mb-4 ${formData.ppt ? 'text-[#00D9FF]' : 'text-primaryLight'}`} />
                    
                    {formData.ppt ? (
                      <div className="text-center">
                        <span className="block text-xs font-orbitron text-[#00D9FF] mb-1">FILE ATTACHED</span>
                        <span className="block text-sm font-mono text-white">{formData.ppt.name}</span>
                      </div>
                    ) : (
                      <div className="text-center">
                        <span className="block text-xs font-orbitron text-metallic mb-1">FILE STATUS: NOT ATTACHED</span>
                        <span className="block text-xs text-metallicLight">CLICK TO BROWSE (.ppt, .pptx, .pdf)</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-[#08111C] p-6 border-l-4 border-[#00D9FF] mb-8 font-mono text-xs text-metallicLight space-y-2">
                  <div className="text-[#00D9FF] font-orbitron font-bold text-sm mb-4">REGISTRATION READY</div>
                  <div className="grid grid-cols-[120px_1fr] gap-2">
                    <span className="text-metallic">TEAM:</span> <span className="text-white">{formData.teamName || 'N/A'}</span>
                    <span className="text-metallic">MISSION:</span> <span className="text-white">{formData.problemStatement || 'N/A'}</span>
                    <span className="text-metallic">PROJECT TYPE:</span> <span className="text-white">{formData.projectType || 'N/A'}</span>
                    <span className="text-metallic">ABSTRACT:</span> <span className="text-white">{formData.abstract ? 'SUBMITTED' : 'MISSING'}</span>
                    <span className="text-metallic">PRESENTATION:</span> <span className="text-white">{formData.ppt ? 'ATTACHED' : 'NONE'}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-primary/20 relative z-10">
          {currentStep > 1 ? (
            <button 
              type="button" 
              onClick={prevStep}
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-3 border border-metallic/30 text-metallic hover:text-white hover:border-white transition-all font-orbitron text-xs tracking-widest disabled:opacity-50"
              style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}
            >
              <ChevronLeft className="w-4 h-4" /> PREVIOUS PROTOCOL
            </button>
          ) : (<div></div>)}

          {currentStep < 4 ? (
            <button 
              type="button" 
              onClick={nextStep}
              className="flex items-center gap-2 px-6 py-3 bg-primary/20 border border-primary text-[#00D9FF] hover:bg-primary/40 hover:shadow-[0_0_15px_rgba(0,109,255,0.4)] transition-all font-orbitron text-xs tracking-widest"
              style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}
            >
              NEXT PROTOCOL <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            isClosed ? (
              <div className="px-6 py-3 border border-red-500 bg-red-900/30 text-red-500 font-orbitron text-xs tracking-widest flex items-center gap-2">
                <ShieldAlert className="w-4 h-4" /> REGISTRATION CLOSED
              </div>
            ) : (
              <button 
                type="button" 
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="group flex items-center gap-2 px-6 py-3 bg-[#E31B23] border border-[#FF3030] text-white hover:bg-red-700 hover:shadow-[0_0_20px_rgba(227,27,35,0.6)] transition-all font-orbitron text-xs tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}
              >
                {isSubmitting ? submitStage : "INITIALIZE REGISTRATION"}
                {!isSubmitting && <div className="w-2 h-2 bg-white rounded-full group-hover:animate-ping ml-2"></div>}
              </button>
            )
          )}
        </div>
      </div>

      {/* Theme Details Modal */}
      <AnimatePresence>
        {activeThemeDetail && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          >
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setActiveThemeDetail(null)}
            ></div>

            {/* Modal Content */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-3xl bg-background/95 border border-primary/50 shadow-[0_0_50px_rgba(0,109,255,0.2)] rounded-sm overflow-hidden"
              style={{ clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)' }}
            >
              <div className="absolute inset-0 bg-circuit opacity-10 pointer-events-none" />
              
              {/* Modal Header */}
              <div className="p-6 border-b border-primary/20 flex justify-between items-start bg-panel/50 relative z-10">
                <div className="flex items-center gap-4">
                  <div className={`p-3 bg-gunmetal border border-primary/40 rounded-sm shadow-[0_0_15px_rgba(0,109,255,0.3)]`}>
                    {activeThemeDetail.icon}
                  </div>
                  <div>
                    <span className="text-[10px] font-orbitron font-bold text-primaryLight tracking-widest px-2 py-0.5 border border-primary/30 block w-fit mb-1 bg-primary/10">
                      THEME {activeThemeDetail.id} // {activeThemeDetail.title}
                    </span>
                    <h3 className="text-2xl font-orbitron font-bold text-white tracking-wide drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
                      {activeThemeDetail.title}
                    </h3>
                  </div>
                </div>
                <button 
                  onClick={() => setActiveThemeDetail(null)}
                  className="p-2 text-metallic hover:text-white hover:bg-primary/20 border border-transparent hover:border-primary/50 transition-all rounded-sm"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 max-h-[70vh] overflow-y-auto custom-scrollbar relative z-10 flex flex-col gap-8">
                
                <div>
                  <p className="text-metallicLight text-sm leading-relaxed border-l-2 border-primary/50 pl-4 bg-primary/5 p-4 rounded-r-sm">
                    {activeThemeDetail.desc}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Focus Areas */}
                  <div className="robotic-panel p-5 border border-primary/10 bg-panel/30" style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}>
                    <h4 className="text-xs font-orbitron font-bold text-white tracking-widest mb-4 flex items-center gap-2">
                      <Target className="w-4 h-4 text-[#00D9FF]" /> FOCUS AREAS
                    </h4>
                    <ul className="space-y-3">
                      {activeThemeDetail.focusAreas.map((area, idx) => (
                        <li key={idx} className="text-sm text-metallic font-light flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 text-[#00D9FF] shrink-0 mt-0.5" />
                          <span>{area}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col gap-8">
                    {/* Technologies */}
                    <div className="robotic-panel p-5 border border-primary/10 bg-panel/30" style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}>
                      <h4 className="text-[10px] font-orbitron font-bold text-white tracking-widest mb-4 flex items-center gap-2">
                        <ChipIcon className="w-4 h-4 text-secondary" /> TECHNOLOGIES
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {activeThemeDetail.technologies.map((tech, idx) => (
                          <span 
                            key={idx}
                            className="text-[10px] uppercase tracking-wider px-3 py-1 bg-gunmetal border border-primary/20 text-primaryLight rounded-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

              </div>
              
              {/* Modal Footer */}
              <div className="p-4 border-t border-primary/20 bg-panel/80 flex justify-end relative z-10">
                <button 
                  onClick={() => {
                    setFormData({...formData, problemStatement: activeThemeDetail.code});
                    setActiveThemeDetail(null);
                  }}
                  className="group flex items-center gap-2 px-6 py-3 bg-[#00D9FF]/20 border border-[#00D9FF] text-[#00D9FF] hover:bg-[#00D9FF]/40 hover:shadow-[0_0_15px_rgba(0,217,255,0.4)] transition-all font-orbitron text-xs tracking-widest"
                  style={{ clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)' }}
                >
                  <CheckCircle2 className="w-4 h-4" /> SELECT THIS MISSION
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
