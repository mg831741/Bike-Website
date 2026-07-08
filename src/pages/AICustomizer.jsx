import { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/aiCustomizer.css";

// ── Configuration Data ──────────────────────────────────────
const BIKE_TYPES = [
  { id: "cruiser",  icon: "🏍️", name: "Cruiser",    desc: "Low, relaxed stance",    baseCost: 12000 },
  { id: "sports",   icon: "🚀", name: "Sports",     desc: "Aggressive, track-ready", baseCost: 18000 },
  { id: "retro",    icon: "🕰️", name: "Retro",      desc: "Classic cafe racer",     baseCost: 14000 },
  { id: "offroad",  icon: "⛰️", name: "Offroad",    desc: "Rugged adventure build",  baseCost: 16000 },
];

const COLORS = [
  { id: "matte_black",  label: "Matte Black",  hex: "#1a1a1a", cssClass: "color-filter-none",   cost: 3500 },
  { id: "candy_red",    label: "Candy Red",    hex: "#cc1a1a", cssClass: "color-filter-red",    cost: 5000 },
  { id: "liquid_gold",  label: "Liquid Gold",  hex: "#c9a227", cssClass: "color-filter-gold",   cost: 6000 },
  { id: "neon_lime",    label: "Neon Lime",    hex: "#3ddc3d", cssClass: "color-filter-green",  cost: 4500 },
  { id: "ocean_blue",   label: "Ocean Blue",   hex: "#1a4dcc", cssClass: "color-filter-blue",   cost: 4000 },
  { id: "royal_purple", label: "Royal Purple", hex: "#6a1ab5", cssClass: "color-filter-purple", cost: 5500 },
];

const WHEELS = [
  { id: "alloy",  icon: "⚙️", name: "Alloy Mag",     desc: "Lightweight 5-spoke",  cost: 8000  },
  { id: "spoke",  icon: "🔩", name: "Chrome Spoke",  desc: "Classic wire spoke",   cost: 6000  },
  { id: "knobby", icon: "🌿", name: "Offroad Knobby",desc: "Wide grip terrain",    cost: 7000  },
  { id: "carbon", icon: "✨", name: "Carbon Fiber",  desc: "Ultra lightweight",    cost: 15000 },
];

const EXHAUST = [
  { id: "sc_project",   icon: "🔥", name: "SC Project",    desc: "Italian full titanium", cost: 25000 },
  { id: "akrapovic",    icon: "⚡", name: "Akrapovic",      desc: "Austrian premium",      cost: 30000 },
  { id: "straight",     icon: "📡", name: "Straight Pipes", desc: "Raw unmuffled power",   cost: 4000  },
  { id: "two_brothers", icon: "🎵", name: "Two Brothers",   desc: "Deep aggressive tone",  cost: 18000 },
];

const ACCESSORIES = [
  { id: "crash_guards", icon: "🛡️", name: "Crash Guards",   cost: 3500 },
  { id: "led_lights",   icon: "💡", name: "LED Lights",      cost: 4000 },
  { id: "windscreen",   icon: "🔲", name: "Windscreen",      cost: 2500 },
  { id: "usb_charger",  icon: "🔌", name: "USB Charger",     cost: 800  },
  { id: "tank_bag",     icon: "👜", name: "Tank Bag",        cost: 2200 },
  { id: "bar_ends",     icon: "🎯", name: "Bar End Mirrors", cost: 1500 },
];

// ── Style Transformer Data ───────────────────────────────────
const SOURCE_BIKES = [
  { id: "splendor",    name: "Hero Splendor",    cc: "100cc", type: "Commuter" },
  { id: "hf_deluxe",  name: "Hero HF Deluxe",   cc: "100cc", type: "Commuter" },
  { id: "activa",     name: "Honda Activa",      cc: "110cc", type: "Scooter"  },
  { id: "shine",      name: "Honda Shine",       cc: "125cc", type: "Commuter" },
  { id: "pulsar_150", name: "Bajaj Pulsar 150",  cc: "150cc", type: "Sports"   },
  { id: "pulsar_220", name: "Bajaj Pulsar 220",  cc: "220cc", type: "Sports"   },
  { id: "apache",     name: "TVS Apache 200",    cc: "200cc", type: "Sports"   },
  { id: "fz",         name: "Yamaha FZ-S",       cc: "149cc", type: "Sports"   },
  { id: "avenger",    name: "Bajaj Avenger",     cc: "220cc", type: "Cruiser"  },
  { id: "gixxer",     name: "Suzuki Gixxer",     cc: "155cc", type: "Sports"   },
];

const TARGET_LOOKS = [
  {
    id: "classic350",
    name: "Royal Enfield Classic 350",
    icon: "👑",
    desc: "Timeless retro cruiser with round headlight",
    image: "/image/ai_cafe_racer.jpg",
    colorClass: "color-filter-gold",
    tint: "#8B6914",
    modifications: [
      { part: "Fuel Tank",         desc: "Teardrop RE Classic style tank",            cost: 12000, effort: "High"   },
      { part: "Round Headlight",   desc: "7-inch chrome round halogen/LED headlight", cost: 3500,  effort: "Low"    },
      { part: "Seat",              desc: "Long dual-tone brown leather seat",          cost: 6000,  effort: "Medium" },
      { part: "Exhaust",           desc: "RE-style single silencer chrome pipe",      cost: 8000,  effort: "Medium" },
      { part: "Handlebar",         desc: "High rise chrome cruiser handlebar",        cost: 2500,  effort: "Low"    },
      { part: "Fenders",           desc: "Rounded mudguards front & rear",            cost: 4000,  effort: "Medium" },
      { part: "Wire Spoke Wheels", desc: "Classic spoked wheel conversion",           cost: 9000,  effort: "High"   },
      { part: "Engine Cowl",       desc: "Finned engine shroud cover",                cost: 3500,  effort: "Low"    },
      { part: "Paint & Decals",    desc: "Royal Enfield color scheme repaint",        cost: 8000,  effort: "High"   },
    ],
    compatibility: "⚠️ Frame geometry differs — aesthetic mods only. Not a mechanical conversion.",
    vibeDesc: "Old-school charm with thumper soul.",
  },
  {
    id: "bullet",
    name: "Royal Enfield Bullet 350",
    icon: "🏆",
    desc: "The legendary thumper, raw and classic",
    image: "/image/ai_stealth.jpg",
    colorClass: "color-filter-none",
    tint: "#222222",
    modifications: [
      { part: "Fuel Tank",       desc: "Narrow teardrop chrome-capped tank",      cost: 10000, effort: "High"   },
      { part: "Headlight",       desc: "Round chrome sealed beam headlight",      cost: 3000,  effort: "Low"    },
      { part: "Seat",            desc: "Single flat leather saddle seat",         cost: 4500,  effort: "Medium" },
      { part: "Exhaust",         desc: "Classic left-side chrome silencer",       cost: 7500,  effort: "Medium" },
      { part: "Fenders",         desc: "Valanced mudguards with chrome trim",     cost: 4500,  effort: "Medium" },
      { part: "Paint",           desc: "Black or silver matte repaint",           cost: 6000,  effort: "High"   },
      { part: "Handlebar",       desc: "Wide vintage flat bar",                   cost: 2000,  effort: "Low"    },
    ],
    compatibility: "✅ Good base for commuter bikes — most parts bolt-on adaptable.",
    vibeDesc: "Pure muscle. Zero compromise.",
  },
  {
    id: "himalayan",
    name: "Royal Enfield Himalayan",
    icon: "⛰️",
    desc: "Adventure touring beast for mountain roads",
    image: "/image/ai_adventure.jpg",
    colorClass: "color-filter-warm",
    tint: "#6B3A2A",
    modifications: [
      { part: "Windscreen",      desc: "Tall adventure touring windshield",       cost: 4500,  effort: "Low"    },
      { part: "Crash Guards",    desc: "Full engine & tank protection bars",      cost: 7000,  effort: "Medium" },
      { part: "Knobby Tyres",    desc: "Dual sport off-road tyres",               cost: 9000,  effort: "High"   },
      { part: "Panniers",        desc: "Side luggage boxes + rear rack",          cost: 8000,  effort: "Medium" },
      { part: "Handguards",      desc: "Full hand protection guards",             cost: 2500,  effort: "Low"    },
      { part: "Seat",            desc: "Tall adventure seat with padding",        cost: 5500,  effort: "Medium" },
      { part: "Headlight Guard", desc: "Grill protective headlight cover",        cost: 1500,  effort: "Low"    },
      { part: "Paint",           desc: "Matte adventure color scheme",            cost: 7000,  effort: "High"   },
    ],
    compatibility: "✅ Great conversion for bikes with good suspension clearance.",
    vibeDesc: "Born for the mountains. Ready for anything.",
  },
  {
    id: "r15",
    name: "Yamaha R15 V4",
    icon: "🚀",
    desc: "Track-inspired full fairing supersport",
    image: "/image/ai_sports_red.jpg",
    colorClass: "color-filter-blue",
    tint: "#001a66",
    modifications: [
      { part: "Full Fairing Kit",  desc: "R15-style aerodynamic body fairing",    cost: 22000, effort: "High"   },
      { part: "Clip-On Handles",   desc: "Low aggressive clip-on handlebars",     cost: 4000,  effort: "Medium" },
      { part: "Split Seat",        desc: "R15-style race split seat",             cost: 5500,  effort: "Medium" },
      { part: "Front Cowl",        desc: "Dual projector headlight front cowl",   cost: 9000,  effort: "High"   },
      { part: "Belly Pan",         desc: "Under-engine aerodynamic panel",        cost: 4500,  effort: "Medium" },
      { part: "Rear Fairing",      desc: "Tail section with LED strip",           cost: 6000,  effort: "Medium" },
      { part: "Paint",             desc: "Yamaha MotoGP livery paint job",        cost: 10000, effort: "High"   },
    ],
    compatibility: "⚠️ Complex conversion — recommend sports base bikes (150cc+) only.",
    vibeDesc: "Circuit precision. Street thunder.",
  },
  {
    id: "ktm_duke",
    name: "KTM Duke 390",
    icon: "🦊",
    desc: "Naked street fighter, sharp and aggressive",
    image: "/image/ai_cyberpunk.jpg",
    colorClass: "color-filter-red",
    tint: "#cc2200",
    modifications: [
      { part: "Naked Headlight",   desc: "Sharp LED projector naked headlight",   cost: 7000,  effort: "Medium" },
      { part: "Trellis Frame Look",desc: "Orange frame powder coat finish",        cost: 5000,  effort: "Medium" },
      { part: "Seat Cowl",         desc: "Single seat tail cowl conversion",      cost: 4500,  effort: "Medium" },
      { part: "USD Forks Cover",   desc: "Upside-down fork style shroud",         cost: 6000,  effort: "High"   },
      { part: "Clip-On Bar",       desc: "Street-fighter style handlebar",        cost: 3500,  effort: "Low"    },
      { part: "Exhaust",           desc: "Under-belly exhaust routing",            cost: 12000, effort: "High"   },
      { part: "Paint",             desc: "KTM orange & black livery",             cost: 8000,  effort: "High"   },
    ],
    compatibility: "✅ Works well with naked sports bikes as base.",
    vibeDesc: "Ready to fight. Born to win.",
  },
  {
    id: "thunderbird",
    name: "RE Thunderbird 350X",
    icon: "⚡",
    desc: "Touring cruiser — highway legend",
    image: "/image/ai_cruiser_black.jpg",
    colorClass: "color-filter-none",
    tint: "#1a1a2e",
    modifications: [
      { part: "Wide Handlebar",    desc: "Long-haul cruiser touring bar",         cost: 3000,  effort: "Low"    },
      { part: "Large Fuel Tank",   desc: "Touring tank with extra capacity",      cost: 14000, effort: "High"   },
      { part: "Dual Exhaust",      desc: "Twin chrome silencer pipes",            cost: 11000, effort: "High"   },
      { part: "Long Seat",         desc: "Two-up touring comfort seat",           cost: 6500,  effort: "Medium" },
      { part: "Saddlebag Rails",   desc: "Side bag mounting rails",               cost: 4000,  effort: "Low"    },
      { part: "LED DRL",           desc: "Strip daytime running light",           cost: 2500,  effort: "Low"    },
      { part: "Paint",             desc: "Thunder matte black repaint",           cost: 7000,  effort: "High"   },
    ],
    compatibility: "✅ Best suited for 150cc+ bikes with cruiser-style geometry.",
    vibeDesc: "Eat highways for breakfast.",
  },
];

// AI status messages
const AI_STATUSES = [
  "Initializing neural design engine...",
  "Analyzing motorcycle geometry...",
  "Mapping color parameters...",
  "Calculating part compatibility...",
  "Rendering photorealistic surfaces...",
  "Applying lighting simulation...",
  "Finalizing custom design output...",
];

const TRANSFORM_STATUSES = [
  "Scanning source bike dimensions...",
  "Identifying compatible modification parts...",
  "Cross-referencing target bike blueprints...",
  "Calculating structural compatibility...",
  "Estimating labor and part costs...",
  "Generating transformation roadmap...",
  "Finalizing style conversion plan...",
];

function pickImage(bikeType, colorId, wheelId) {
  if (bikeType === "offroad" || wheelId === "knobby") return "/image/ai_adventure.jpg";
  if (bikeType === "retro"   || colorId === "liquid_gold") return "/image/ai_cafe_racer.jpg";
  if (bikeType === "sports"  || colorId === "candy_red")   return "/image/ai_sports_red.jpg";
  if (colorId === "matte_black" || bikeType === "cruiser") return "/image/ai_cruiser_black.jpg";
  if (colorId === "neon_lime" || colorId === "ocean_blue" || colorId === "royal_purple") return "/image/ai_cyberpunk.jpg";
  return "/image/ai_stealth.jpg";
}

function buildDesignName(bikeType, colorId) {
  const typeNames  = { cruiser:"Cruiser", sports:"Hyper-R", retro:"Cafe Classic", offroad:"Storm Raider" };
  const colorNames = { matte_black:"Carbon", candy_red:"Blaze", liquid_gold:"Gold Edition", neon_lime:"Venom", ocean_blue:"Cobalt", royal_purple:"Phantom" };
  return `MG ${colorNames[colorId] || "Custom"} ${typeNames[bikeType] || "Build"}`;
}

// ── Component ────────────────────────────────────────────────
export default function AICustomizer() {

  // Tab state
  const [activeTab, setActiveTab] = useState("customizer"); // "customizer" | "transformer"

  // Customizer state
  const [bikeType, setBikeType]       = useState("cruiser");
  const [color, setColor]             = useState(COLORS[0]);
  const [wheels, setWheels]           = useState("alloy");
  const [exhaust, setExhaust]         = useState("sc_project");
  const [accessories, setAccessories] = useState([]);
  const [modLevel, setModLevel]       = useState(5);
  const [prompt, setPrompt]           = useState("");
  const [isGenerating, setIsGenerating]   = useState(false);
  const [progress, setProgress]           = useState(0);
  const [statusMsg, setStatusMsg]         = useState("");
  const [statusIndex, setStatusIndex]     = useState(0);
  const [rendered, setRendered]           = useState(false);
  const [renderImg, setRenderImg]         = useState("");
  const [designName, setDesignName]       = useState("");
  const [showTags, setShowTags]           = useState(false);

  // Transformer state
  const [sourceBike, setSourceBike]   = useState(null);
  const [targetLook, setTargetLook]   = useState(null);
  const [isTransforming, setIsTransforming] = useState(false);
  const [transformProgress, setTransformProgress] = useState(0);
  const [transformStatus, setTransformStatus]     = useState("");
  const [transformStatusIdx, setTransformStatusIdx] = useState(0);
  const [transformResult, setTransformResult]     = useState(null);

  const statusTimer    = useRef(null);
  const progressTimer  = useRef(null);
  const tStatusTimer   = useRef(null);
  const tProgressTimer = useRef(null);

  const toggleAccessory = (id) =>
    setAccessories(prev => prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]);

  const calcCost = () => {
    const bt = BIKE_TYPES.find(b => b.id === bikeType)?.baseCost || 12000;
    const cl = color.cost;
    const wh = WHEELS.find(w => w.id === wheels)?.cost || 0;
    const ex = EXHAUST.find(e => e.id === exhaust)?.cost || 0;
    const ac = accessories.reduce((sum, aid) => {
      return sum + (ACCESSORIES.find(a => a.id === aid)?.cost || 0);
    }, 0);
    return { bt, cl, wh, ex, ac, total: bt + cl + wh + ex + ac };
  };

  const fmt = (n) => "₹" + n.toLocaleString("en-IN");

  // ── Customizer Generate ──────────────────────────────────
  const handleGenerate = (e) => {
    e.preventDefault();
    if (isGenerating) return;
    setIsGenerating(true);
    setRendered(false);
    setShowTags(false);
    setProgress(0);
    setStatusIndex(0);
    setStatusMsg(AI_STATUSES[0]);
    let prog = 0;
    progressTimer.current = setInterval(() => {
      prog += Math.random() * 8 + 3;
      if (prog >= 100) { prog = 100; clearInterval(progressTimer.current); }
      setProgress(Math.min(prog, 100));
    }, 250);
    let sIdx = 0;
    statusTimer.current = setInterval(() => {
      sIdx = Math.min(sIdx + 1, AI_STATUSES.length - 1);
      setStatusIndex(sIdx);
      setStatusMsg(AI_STATUSES[sIdx]);
    }, 450);
    setTimeout(() => {
      clearInterval(progressTimer.current);
      clearInterval(statusTimer.current);
      setProgress(100);
      const img   = pickImage(bikeType, color.id, wheels);
      const dname = buildDesignName(bikeType, color.id);
      setRenderImg(img);
      setDesignName(dname);
      setTimeout(() => {
        setIsGenerating(false);
        setRendered(true);
        setTimeout(() => setShowTags(true), 600);
      }, 400);
    }, 3200);
  };

  // ── Style Transformer Generate ───────────────────────────
  const handleTransform = () => {
    if (!sourceBike || !targetLook || isTransforming) return;
    setIsTransforming(true);
    setTransformResult(null);
    setTransformProgress(0);
    setTransformStatusIdx(0);
    setTransformStatus(TRANSFORM_STATUSES[0]);
    let prog = 0;
    tProgressTimer.current = setInterval(() => {
      prog += Math.random() * 7 + 4;
      if (prog >= 100) { prog = 100; clearInterval(tProgressTimer.current); }
      setTransformProgress(Math.min(prog, 100));
    }, 280);
    let sIdx = 0;
    tStatusTimer.current = setInterval(() => {
      sIdx = Math.min(sIdx + 1, TRANSFORM_STATUSES.length - 1);
      setTransformStatusIdx(sIdx);
      setTransformStatus(TRANSFORM_STATUSES[sIdx]);
    }, 500);
    setTimeout(() => {
      clearInterval(tProgressTimer.current);
      clearInterval(tStatusTimer.current);
      setTransformProgress(100);
      setTimeout(() => {
        setIsTransforming(false);
        setTransformResult(targetLook);
      }, 400);
    }, 3600);
  };

  useEffect(() => () => {
    clearInterval(statusTimer.current);
    clearInterval(progressTimer.current);
    clearInterval(tStatusTimer.current);
    clearInterval(tProgressTimer.current);
  }, []);

  const costs            = calcCost();
  const selectedWheel    = WHEELS.find(w => w.id === wheels);
  const selectedExhaust  = EXHAUST.find(e => e.id === exhaust);
  const partTags = [
    { label: selectedWheel?.name,   top: "72%", left: "18%" },
    { label: selectedExhaust?.name, top: "55%", left: "62%" },
    { label: color.label + " Wrap", top: "35%", left: "38%" },
  ];

  const transformTotal = transformResult
    ? transformResult.modifications.reduce((s, m) => s + m.cost, 0)
    : 0;

  return (
    <>
      <Navbar />

      <div className="ai-page">

        {/* ── Header ── */}
        <div className="ai-header">
          <div className="ai-badge">
            <span className="ai-badge-dot"></span>
            MG Garage AI Design Studio
          </div>
          <h1>Bike Customizer &amp; Style Transformer</h1>
          <p>
            Build your dream bike from scratch — or transform your current ride into a legendary style.
            MG Garage AI renders a photorealistic plan before we pick up a wrench.
          </p>
        </div>

        {/* ── Tab Switcher ── */}
        <div className="ai-tab-switcher">
          <button
            className={`ai-tab-btn ${activeTab === "customizer" ? "active" : ""}`}
            onClick={() => setActiveTab("customizer")}
          >
            🎨 Custom Build Studio
          </button>
          <button
            className={`ai-tab-btn ${activeTab === "transformer" ? "active" : ""}`}
            onClick={() => setActiveTab("transformer")}
          >
            🔄 Style Transformer
          </button>
        </div>

        {/* ══════════════ CUSTOMIZER TAB ══════════════ */}
        {activeTab === "customizer" && (
          <div className="ai-workspace">

            <form className="config-panel" onSubmit={handleGenerate}>

              <div>
                <div className="config-section-title">1. Bike Type</div>
                <div className="options-grid">
                  {BIKE_TYPES.map(bt => (
                    <div key={bt.id} className={`opt-card ${bikeType === bt.id ? "active" : ""}`} onClick={() => setBikeType(bt.id)}>
                      <div className="opt-card-icon">{bt.icon}</div>
                      <div className="opt-card-name">{bt.name}</div>
                      <div className="opt-card-desc">{bt.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="config-section-title">2. Body Paint &amp; Wrap</div>
                <div className="color-swatches">
                  {COLORS.map(cl => (
                    <div key={cl.id} className={`color-swatch ${color.id === cl.id ? "active" : ""}`}
                      style={{ background: cl.hex }} onClick={() => setColor(cl)} title={cl.label}>
                      <span className="swatch-label">{cl.label.split(" ")[0]}</span>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 28, fontSize: 12, color: "#888" }}>
                  Selected: <span style={{ color: color.hex, fontWeight: 700 }}>{color.label}</span>
                  &ensp;·&ensp;{fmt(color.cost)}
                </div>
              </div>

              <div>
                <div className="config-section-title">3. Wheels &amp; Rims</div>
                <div className="options-grid">
                  {WHEELS.map(wh => (
                    <div key={wh.id} className={`opt-card ${wheels === wh.id ? "active" : ""}`} onClick={() => setWheels(wh.id)}>
                      <div className="opt-card-icon">{wh.icon}</div>
                      <div className="opt-card-name">{wh.name}</div>
                      <div className="opt-card-desc">{wh.desc} · {fmt(wh.cost)}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="config-section-title">4. Exhaust System</div>
                <div className="options-grid">
                  {EXHAUST.map(ex => (
                    <div key={ex.id} className={`opt-card ${exhaust === ex.id ? "active" : ""}`} onClick={() => setExhaust(ex.id)}>
                      <div className="opt-card-icon">{ex.icon}</div>
                      <div className="opt-card-name">{ex.name}</div>
                      <div className="opt-card-desc">{ex.desc} · {fmt(ex.cost)}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="config-section-title">5. Accessories</div>
                <div className="options-grid">
                  {ACCESSORIES.map(ac => (
                    <div key={ac.id} className={`opt-card ${accessories.includes(ac.id) ? "active" : ""}`} onClick={() => toggleAccessory(ac.id)}>
                      <div className="opt-card-icon">{ac.icon}</div>
                      <div className="opt-card-name">{ac.name}</div>
                      <div className="opt-card-desc">{fmt(ac.cost)}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="config-section-title">6. Modification Level</div>
                <div className="slider-row">
                  <span style={{ fontSize: 12, color: "#666" }}>Stock</span>
                  <input type="range" min="1" max="10" value={modLevel}
                    onChange={e => setModLevel(+e.target.value)} className="ai-slider" />
                  <span className="slider-val">{modLevel}/10</span>
                </div>
              </div>

              <div>
                <div className="config-section-title">7. AI Vision Prompt</div>
                <textarea className="ai-prompt-box" rows="3"
                  placeholder="e.g. 'Rain-slicked Tokyo streets at night' or 'Desert mountain trail at sunset'..."
                  value={prompt} onChange={e => setPrompt(e.target.value)} />
              </div>

              <button type="submit" className="generate-btn" disabled={isGenerating}>
                {isGenerating ? "⚡ AI Processing..." : "🎨 Generate AI Design"}
              </button>
            </form>

            {/* Visualizer */}
            <div className="visualizer-panel">
              <div className="render-canvas">
                <div className="render-corner tl"></div>
                <div className="render-corner tr"></div>
                <div className="render-corner bl"></div>
                <div className="render-corner br"></div>

                {!rendered && !isGenerating && (
                  <div className="render-placeholder">
                    <div className="render-placeholder-icon">🏍️</div>
                    <div className="render-placeholder-text">Configure &amp; Generate Your Design</div>
                  </div>
                )}

                {rendered && (
                  <>
                    <img src={renderImg} alt="AI Rendered Bike" className={`render-bike-img ${color.cssClass}`} />
                    <div className="color-tint-overlay" style={{ backgroundColor: color.hex }}></div>
                    <div className="design-name-badge">{designName}</div>
                    <div className="render-watermark">MG Garage · AI Render</div>
                    {showTags && (
                      <div className="part-tags">
                        {partTags.map((tag, i) => (
                          <div key={i} className="part-tag" style={{ top: tag.top, left: tag.left }}>
                            <div className="part-tag-line"></div>
                            <div className="part-tag-bubble">{tag.label}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}

                {isGenerating && (
                  <div className="ai-gen-overlay">
                    <div className="ai-grid-overlay"></div>
                    <div className="ai-scan-bar"></div>
                    <div className="ai-gen-title">⚡ AI RENDERING</div>
                    <div className="ai-gen-status" key={statusIndex}>{statusMsg}</div>
                    <div className="ai-progress-bar-wrap">
                      <div className="ai-progress-bar-fill" style={{ width: `${progress}%` }}></div>
                    </div>
                    <div style={{ color: "#555", fontSize: 12 }}>{Math.round(progress)}% complete</div>
                  </div>
                )}
              </div>

              {rendered && (
                <>
                  <div className="info-row">
                    <div className="info-card">
                      <h4>Design Specifications</h4>
                      <div className="spec-list">
                        {[
                          ["Build Style", BIKE_TYPES.find(b=>b.id===bikeType)?.name],
                          ["Paint",       color.label],
                          ["Wheels",      selectedWheel?.name],
                          ["Exhaust",     selectedExhaust?.name],
                          ["Mod Level",   `${modLevel} / 10`],
                          ["Accessories", accessories.length > 0 ? `${accessories.length} selected` : "None"],
                        ].map(([k,v]) => (
                          <div key={k} className="spec-row">
                            <span className="spec-key">{k}</span>
                            <span className="spec-value">{v}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="info-card">
                      <h4>💰 Cost Estimate</h4>
                      <div className="cost-items">
                        {[
                          ["Base Build",    costs.bt],
                          ["Paint Job",     costs.cl],
                          ["Wheels",        costs.wh],
                          ["Exhaust",       costs.ex],
                          ...(costs.ac > 0 ? [["Accessories", costs.ac]] : []),
                        ].map(([l,v]) => (
                          <div key={l} className="cost-row">
                            <span className="cost-label">{l}</span>
                            <span className="cost-amount">{fmt(v)}</span>
                          </div>
                        ))}
                        <div className="cost-row">
                          <span className="cost-label">Total Estimate</span>
                          <span className="cost-amount">{fmt(costs.total)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="action-row">
                    <button className="action-btn primary" onClick={() => { window.location.hash = "/booking"; }}>📅 Book This Build</button>
                    <button className="action-btn secondary" onClick={() => {
                      const text = `MG Garage Custom Build:\n${designName}\nBike: ${BIKE_TYPES.find(b=>b.id===bikeType)?.name} | Color: ${color.label} | Wheels: ${selectedWheel?.name} | Exhaust: ${selectedExhaust?.name}\nEst. Cost: ${fmt(costs.total)}`;
                      navigator.clipboard?.writeText(text);
                      alert("Design summary copied!");
                    }}>📋 Copy Summary</button>
                    <button className="action-btn secondary" onClick={() => { setRendered(false); setShowTags(false); }}>🔄 Reset</button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* ══════════════ TRANSFORMER TAB ══════════════ */}
        {activeTab === "transformer" && (
          <div className="transformer-workspace">

            {/* Step 1: Select your bike */}
            <div className="transformer-step">
              <div className="transformer-step-header">
                <div className="step-number">01</div>
                <div>
                  <h3>Your Current Bike</h3>
                  <p>Select the bike you own right now</p>
                </div>
              </div>
              <div className="bike-selector-grid">
                {SOURCE_BIKES.map(b => (
                  <div
                    key={b.id}
                    className={`bike-selector-card ${sourceBike?.id === b.id ? "active" : ""}`}
                    onClick={() => setSourceBike(b)}
                  >
                    <div className="bike-card-type-tag">{b.type}</div>
                    <div className="bike-card-name">{b.name}</div>
                    <div className="bike-card-cc">{b.cc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Arrow */}
            <div className="transformer-arrow">
              <div className="arrow-line"></div>
              <div className="arrow-label">TRANSFORM INTO</div>
              <div className="arrow-line"></div>
            </div>

            {/* Step 2: Select target look */}
            <div className="transformer-step">
              <div className="transformer-step-header">
                <div className="step-number">02</div>
                <div>
                  <h3>Target Style</h3>
                  <p>Choose the look you want to achieve</p>
                </div>
              </div>
              <div className="target-selector-grid">
                {TARGET_LOOKS.map(t => (
                  <div
                    key={t.id}
                    className={`target-card ${targetLook?.id === t.id ? "active" : ""}`}
                    onClick={() => setTargetLook(t)}
                  >
                    <div className="target-card-icon">{t.icon}</div>
                    <div className="target-card-name">{t.name}</div>
                    <div className="target-card-desc">{t.desc}</div>
                    <div className="target-card-vibe">{t.vibeDesc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <div className="transformer-generate-row">
              {sourceBike && targetLook ? (
                <div className="transform-summary-pill">
                  <span className="ts-from">{sourceBike.name}</span>
                  <span className="ts-arrow">→</span>
                  <span className="ts-to">{targetLook.icon} {targetLook.name}</span>
                </div>
              ) : (
                <div className="transform-hint">Select your bike and a target style above to begin</div>
              )}
              <button
                className="generate-btn transform-gen-btn"
                disabled={!sourceBike || !targetLook || isTransforming}
                onClick={handleTransform}
              >
                {isTransforming ? "🔄 AI Analyzing..." : "⚡ Generate Transformation Plan"}
              </button>
            </div>

            {/* AI Progress Overlay */}
            {isTransforming && (
              <div className="transform-loading-card">
                <div className="transform-scan-anim">
                  <div className="tscan-bar"></div>
                  <div className="tscan-label">AI TRANSFORMATION ENGINE RUNNING</div>
                </div>
                <div className="ai-gen-status" key={transformStatusIdx}>{transformStatus}</div>
                <div className="ai-progress-bar-wrap" style={{ width: "100%", maxWidth: "500px" }}>
                  <div className="ai-progress-bar-fill" style={{ width: `${transformProgress}%` }}></div>
                </div>
                <div style={{ color: "#555", fontSize: 12, marginTop: 8 }}>{Math.round(transformProgress)}% complete</div>
              </div>
            )}

            {/* Transformation Result */}
            {transformResult && !isTransforming && (
              <div className="transform-result">

                {/* Header */}
                <div className="transform-result-header">
                  <div className="trh-left">
                    <div className="trh-badge">✅ Transformation Plan Ready</div>
                    <h2>{sourceBike.name} <span>→</span> {transformResult.icon} {transformResult.name}</h2>
                    <p className="trh-compat">{transformResult.compatibility}</p>
                  </div>
                  <div className="trh-cost-bubble">
                    <div className="trh-cost-label">Estimated Total</div>
                    <div className="trh-cost-val">{fmt(transformTotal)}</div>
                    <div className="trh-cost-sub">+ Labour charges apply</div>
                  </div>
                </div>

                {/* Render */}
                <div className="transform-render-row">
                  <div className="render-canvas transform-render-canvas">
                    <div className="render-corner tl"></div>
                    <div className="render-corner tr"></div>
                    <div className="render-corner bl"></div>
                    <div className="render-corner br"></div>
                    <img
                      src={transformResult.image}
                      alt="Target Style Render"
                      className={`render-bike-img ${transformResult.colorClass}`}
                    />
                    <div className="color-tint-overlay" style={{ backgroundColor: transformResult.tint }}></div>
                    <div className="design-name-badge">{transformResult.name} Style</div>
                    <div className="render-watermark">MG Garage · Style Transform</div>
                  </div>

                  {/* Parts Checklist */}
                  <div className="transform-parts-list">
                    <div className="tpl-header">
                      🔧 Required Modifications ({transformResult.modifications.length} parts)
                    </div>
                    {transformResult.modifications.map((mod, i) => (
                      <div key={i} className="tpl-item">
                        <div className="tpl-item-left">
                          <div className="tpl-part-name">{mod.part}</div>
                          <div className="tpl-part-desc">{mod.desc}</div>
                        </div>
                        <div className="tpl-item-right">
                          <div className="tpl-effort" data-effort={mod.effort.toLowerCase()}>{mod.effort}</div>
                          <div className="tpl-cost">{fmt(mod.cost)}</div>
                        </div>
                      </div>
                    ))}
                    <div className="tpl-total-row">
                      <span>Total Modification Cost</span>
                      <span className="tpl-total-val">{fmt(transformTotal)}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="action-row" style={{ marginTop: 20 }}>
                  <button className="action-btn primary" onClick={() => { window.location.hash = "/booking"; }}>
                    📅 Book This Transformation
                  </button>
                  <button className="action-btn secondary" onClick={() => {
                    const text = `MG Garage Style Transformation:\n${sourceBike.name} → ${transformResult.name}\n\nParts:\n${transformResult.modifications.map(m=>`• ${m.part}: ${fmt(m.cost)}`).join("\n")}\n\nTotal: ${fmt(transformTotal)}`;
                    navigator.clipboard?.writeText(text);
                    alert("Transformation plan copied!");
                  }}>
                    📋 Copy Plan
                  </button>
                  <button className="action-btn secondary" onClick={() => {
                    setTransformResult(null);
                    setSourceBike(null);
                    setTargetLook(null);
                  }}>
                    🔄 Start Over
                  </button>
                </div>

              </div>
            )}
          </div>
        )}

      </div>
      <Footer />
    </>
  );
}
