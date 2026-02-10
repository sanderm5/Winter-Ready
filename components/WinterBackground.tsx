"use client";

import { useEffect, useState, useMemo } from "react";

interface Snowflake {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  drift: number;
  blur: number;
}

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleDuration: number;
  twinkleDelay: number;
}

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export default function WinterBackground() {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

  const stars = useMemo<Star[]>(() => {
    const rand = seededRandom(42);
    return Array.from({ length: 90 }, (_, i) => ({
      id: i,
      x: rand() * 100,
      y: rand() * 50,
      size: rand() < 0.12 ? rand() * 2.5 + 1.5 : rand() * 1.2 + 0.3,
      opacity: rand() * 0.7 + 0.15,
      twinkleDuration: rand() * 4 + 2,
      twinkleDelay: rand() * -6,
    }));
  }, []);

  useEffect(() => {
    const flakes: Snowflake[] = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 3 + 1.5,
      duration: Math.random() * 16 + 12,
      delay: Math.random() * -20,
      opacity: Math.random() * 0.4 + 0.08,
      drift: Math.random() * 50 - 25,
      blur: Math.random() < 0.25 ? Math.random() * 2 + 0.5 : 0,
    }));
    setSnowflakes(flakes);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* === ARCTIC SKY — deep polar night gradient === */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(8,12,28,0.4) 0%, rgba(15,22,45,0.2) 30%, rgba(20,30,55,0.1) 55%, transparent 70%)",
        }}
      />

      {/* Starfield */}
      {stars.map((star) => (
        <div
          key={`s-${star.id}`}
          className="absolute rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            background:
              star.size > 2
                ? "radial-gradient(circle, #fff 0%, rgba(180,210,255,0.5) 50%, transparent 100%)"
                : "#dde6ff",
            boxShadow:
              star.size > 2
                ? `0 0 ${star.size * 4}px rgba(170,200,255,0.35)`
                : "none",
            animation: `twinkle ${star.twinkleDuration}s ease-in-out ${star.twinkleDelay}s infinite`,
          }}
        />
      ))}

      {/* Moon — cold arctic glow */}
      <div
        className="absolute"
        style={{
          top: "6%",
          right: "14%",
          width: "80px",
          height: "80px",
          background:
            "radial-gradient(circle, rgba(210,225,250,0.15) 0%, rgba(180,200,235,0.06) 35%, transparent 65%)",
          borderRadius: "50%",
          filter: "blur(6px)",
        }}
      />

      {/* === AURORA BOREALIS — Nord-Norge style: vivid green dominant, curtain bands === */}
      <div className="absolute inset-0">
        {/* Main green band — strong, the classic Nord-Norge aurora */}
        <div
          className="absolute top-0 left-0 w-full h-[70%]"
          style={{
            background:
              "radial-gradient(ellipse 85% 60% at 30% 0%, rgba(80,220,100,0.22) 0%, rgba(60,200,90,0.1) 35%, transparent 70%)",
            animation: "aurora-1 16s ease-in-out infinite alternate",
          }}
        />

        {/* Secondary green — offset, creates width to the curtain */}
        <div
          className="absolute top-0 left-0 w-full h-[60%]"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 55% 0%, rgba(90,230,120,0.16) 0%, rgba(70,210,100,0.06) 40%, transparent 70%)",
            animation: "aurora-2 20s ease-in-out infinite alternate",
          }}
        />

        {/* Teal edge — the cold undertone you see in Tromsø */}
        <div
          className="absolute top-0 left-0 w-full h-[55%]"
          style={{
            background:
              "radial-gradient(ellipse 70% 40% at 65% 0%, rgba(80,200,190,0.14) 0%, rgba(60,180,170,0.05) 40%, transparent 65%)",
            animation: "aurora-3 24s ease-in-out infinite alternate",
          }}
        />

        {/* Violet/pink bottom edge — appears during strong storms */}
        <div
          className="absolute top-0 left-0 w-full h-[50%]"
          style={{
            background:
              "radial-gradient(ellipse 50% 35% at 75% 8%, rgba(180,100,200,0.1) 0%, rgba(160,80,180,0.04) 40%, transparent 65%)",
            animation: "aurora-4 18s ease-in-out infinite alternate",
          }}
        />

        {/* Green glow wash — horizon aurora reflection */}
        <div
          className="absolute top-0 left-0 w-full h-[45%]"
          style={{
            background:
              "radial-gradient(ellipse 100% 25% at 45% 8%, rgba(70,210,130,0.07) 0%, transparent 65%)",
            animation: "aurora-5 28s ease-in-out infinite alternate",
          }}
        />

        {/* Vertical curtain streaks — the hanging bands */}
        <div
          className="absolute top-0 left-[18%] h-[45%]"
          style={{
            width: "3px",
            background:
              "linear-gradient(to bottom, rgba(90,230,120,0.2), rgba(70,200,100,0.05) 70%, transparent)",
            animation: "aurora-streak 9s ease-in-out infinite alternate",
            filter: "blur(4px)",
          }}
        />
        <div
          className="absolute top-0 left-[28%] h-[40%]"
          style={{
            width: "2px",
            background:
              "linear-gradient(to bottom, rgba(100,240,140,0.15), transparent 80%)",
            animation: "aurora-streak 7s ease-in-out 1.5s infinite alternate",
            filter: "blur(3px)",
          }}
        />
        <div
          className="absolute top-0 left-[42%] h-[38%]"
          style={{
            width: "4px",
            background:
              "linear-gradient(to bottom, rgba(80,220,110,0.18), rgba(70,200,160,0.04) 60%, transparent)",
            animation: "aurora-streak 11s ease-in-out 0.5s infinite alternate",
            filter: "blur(5px)",
          }}
        />
        <div
          className="absolute top-0 left-[56%] h-[35%]"
          style={{
            width: "2px",
            background:
              "linear-gradient(to bottom, rgba(90,210,170,0.12), transparent 75%)",
            animation: "aurora-streak 8s ease-in-out 2s infinite alternate",
            filter: "blur(3px)",
          }}
        />
        <div
          className="absolute top-0 left-[68%] h-[32%]"
          style={{
            width: "3px",
            background:
              "linear-gradient(to bottom, rgba(160,120,200,0.1), transparent 70%)",
            animation: "aurora-streak 10s ease-in-out 3s infinite alternate",
            filter: "blur(4px)",
          }}
        />
      </div>

      {/* === LOFOTEN WALL — dramatic jagged peaks rising from the fjord === */}
      <div className="absolute bottom-0 left-0 w-full">

        {/* Aurora glow behind the peaks — light bleeding over the ridgeline */}
        <div
          className="absolute bottom-[22vh] left-0 w-full h-[16vh]"
          style={{
            background:
              "radial-gradient(ellipse 80% 100% at 45% 100%, rgba(70,200,110,0.08) 0%, rgba(60,190,130,0.04) 40%, transparent 70%)",
            animation: "aurora-1 16s ease-in-out infinite alternate",
            filter: "blur(20px)",
          }}
        />

        {/* Layer 1: Far range — Lyngen Alps, ghostly silhouette */}
        <svg
          className="absolute bottom-0 w-full"
          viewBox="0 0 1440 600"
          preserveAspectRatio="none"
          style={{ height: "35vh" }}
        >
          <defs>
            <linearGradient id="mtn-far" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#434c5e" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#3b4252" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#363d4f" stopOpacity="0.7" />
            </linearGradient>
          </defs>
          <path
            d="M0,600 L0,400 L30,380 L55,420 L80,340 L95,370 L120,260 L140,310 L165,220 L180,270 L210,160 L230,240 L260,180 L280,230 L310,130 L330,200 L360,150 L385,210 L420,100 L440,175 L470,120 L500,190 L535,80 L555,160 L585,95 L610,180 L645,65 L665,150 L695,90 L720,170 L755,55 L775,145 L805,85 L830,165 L865,50 L880,130 L910,75 L935,160 L970,45 L990,135 L1020,80 L1045,165 L1080,55 L1100,140 L1130,90 L1155,175 L1190,60 L1210,150 L1240,100 L1265,180 L1300,70 L1320,155 L1350,110 L1380,185 L1410,120 L1440,160 L1440,600 Z"
            fill="url(#mtn-far)"
          />
        </svg>

        {/* Layer 2: Lofoten Wall — THE dramatic silhouette with iconic peaks */}
        <svg
          className="absolute bottom-0 w-full"
          viewBox="0 0 1440 600"
          preserveAspectRatio="none"
          style={{ height: "28vh" }}
        >
          <defs>
            <linearGradient id="mtn-lofoten" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#363d4f" />
              <stop offset="30%" stopColor="#323948" />
              <stop offset="100%" stopColor="#2d3442" />
            </linearGradient>
            {/* Side-light gradient for 3D rock face effect */}
            <linearGradient id="rock-face" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#2a3040" />
              <stop offset="100%" stopColor="#3a4258" />
            </linearGradient>
          </defs>
          {/* Main ridgeline — asymmetric peaks, steep drops, knife-edges */}
          <path
            d="M0,600 L0,420 L35,400 L55,440 L85,350 L100,380 L130,270 L145,320 L170,230 L182,195 L195,230 L220,280 L240,240 L255,190 L262,155 L270,190 L290,250 L320,200 L345,165 L355,120 L362,90 L370,120 L385,175 L410,220 L440,170 L458,130 L465,85 L470,60 L478,85 L490,140 L510,195 L540,160 L565,120 L575,80 L580,50 L586,30 L592,50 L600,95 L615,150 L640,200 L670,155 L690,110 L700,70 L706,40 L712,70 L725,130 L745,185 L770,150 L790,105 L800,65 L808,38 L815,65 L825,115 L845,175 L870,210 L900,170 L920,125 L930,80 L936,48 L942,80 L955,140 L975,195 L1000,160 L1020,115 L1030,75 L1038,45 L1045,75 L1058,130 L1075,180 L1100,215 L1130,175 L1150,130 L1160,90 L1168,55 L1175,90 L1188,145 L1205,195 L1230,235 L1260,200 L1280,160 L1295,120 L1302,85 L1308,120 L1325,180 L1350,230 L1380,280 L1400,310 L1420,340 L1440,360 L1440,600 Z"
            fill="url(#mtn-lofoten)"
          />
          {/* Couloir shadows — dark gullies carved into the rock */}
          <g opacity="0.3">
            <line x1="362" y1="90" x2="370" y2="220" stroke="#1a2030" strokeWidth="2" />
            <line x1="470" y1="60" x2="482" y2="195" stroke="#1a2030" strokeWidth="2.5" />
            <line x1="586" y1="30" x2="598" y2="200" stroke="#1a2030" strokeWidth="3" />
            <line x1="706" y1="40" x2="720" y2="185" stroke="#1a2030" strokeWidth="2.5" />
            <line x1="808" y1="38" x2="822" y2="175" stroke="#1a2030" strokeWidth="2" />
            <line x1="936" y1="48" x2="950" y2="195" stroke="#1a2030" strokeWidth="2.5" />
            <line x1="1038" y1="45" x2="1052" y2="180" stroke="#1a2030" strokeWidth="2" />
            <line x1="1168" y1="55" x2="1182" y2="195" stroke="#1a2030" strokeWidth="2" />
          </g>
          {/* Snow caps on the highest peaks — asymmetric, wind-blown */}
          <g>
            <polygon points="586,30 600,38 592,42 578,36" fill="#8898b0" opacity="0.2" />
            <polygon points="706,40 718,48 712,52 698,46" fill="#8898b0" opacity="0.18" />
            <polygon points="808,38 820,46 815,50 800,44" fill="#8898b0" opacity="0.16" />
            <polygon points="470,60 482,68 478,72 462,66" fill="#8898b0" opacity="0.15" />
            <polygon points="936,48 948,56 942,60 928,54" fill="#8898b0" opacity="0.17" />
            <polygon points="1038,45 1050,53 1045,57 1030,51" fill="#8898b0" opacity="0.14" />
            <polygon points="362,90 372,97 370,100 355,95" fill="#8898b0" opacity="0.12" />
          </g>
          {/* Moonlit rock faces — subtle light on east-facing walls */}
          <g opacity="0.06">
            <polygon points="586,30 592,50 600,95 615,150 600,150 585,95" fill="#6880a0" />
            <polygon points="706,40 712,70 725,130 745,185 730,185 712,130" fill="#6880a0" />
            <polygon points="808,38 815,65 825,115 845,175 830,175 815,115" fill="#6880a0" />
          </g>
        </svg>

        {/* Arctic mist drifting through the valleys */}
        <div
          className="absolute bottom-[9vh] left-0 w-full h-[7vh]"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, rgba(50,60,80,0.2) 25%, rgba(45,55,72,0.3) 50%, rgba(40,48,65,0.2) 75%, transparent 100%)",
            animation: "mist-drift 35s ease-in-out infinite alternate",
            filter: "blur(16px)",
          }}
        />
        {/* Second mist layer — higher, thinner */}
        <div
          className="absolute bottom-[16vh] left-[20%] w-[60%] h-[4vh]"
          style={{
            background:
              "radial-gradient(ellipse 100% 100% at 50% 50%, rgba(50,60,80,0.15) 0%, transparent 70%)",
            animation: "mist-drift 25s ease-in-out 5s infinite alternate",
            filter: "blur(12px)",
          }}
        />

        {/* Layer 3: Near coastal ridge — steep but lower */}
        <svg
          className="absolute bottom-0 w-full"
          viewBox="0 0 1440 400"
          preserveAspectRatio="none"
          style={{ height: "14vh" }}
        >
          <defs>
            <linearGradient id="mtn-near" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#272e3e" />
              <stop offset="100%" stopColor="#222838" />
            </linearGradient>
          </defs>
          <path
            d="M0,400 L0,300 L40,285 L70,310 L100,250 L120,275 L150,220 L170,255 L200,200 L225,240 L260,195 L280,230 L310,205 L340,240 L380,200 L400,230 L440,210 L470,245 L510,205 L540,235 L580,215 L610,245 L650,210 L680,240 L720,220 L750,250 L790,215 L820,245 L860,225 L890,250 L930,220 L960,245 L1000,225 L1030,250 L1070,215 L1100,245 L1140,225 L1170,255 L1210,230 L1240,260 L1280,235 L1310,260 L1350,240 L1380,265 L1410,250 L1440,265 L1440,400 Z"
            fill="url(#mtn-near)"
          />
        </svg>

        {/* Sparse arctic treeline on the near ridge */}
        <svg
          className="absolute bottom-[6vh] w-full"
          viewBox="0 0 1440 50"
          preserveAspectRatio="none"
          style={{ height: "2vh" }}
        >
          <g fill="#1c2230" opacity="0.5">
            <polygon points="80,50 83,20 86,50" />
            <polygon points="160,50 164,12 168,50" />
            <polygon points="270,50 273,24 276,50" />
            <polygon points="380,50 384,16 388,50" />
            <polygon points="490,50 493,22 496,50" />
            <polygon points="610,50 614,10 618,50" />
            <polygon points="730,50 733,18 736,50" />
            <polygon points="850,50 854,14 858,50" />
            <polygon points="970,50 973,20 976,50" />
            <polygon points="1090,50 1094,12 1098,50" />
            <polygon points="1210,50 1213,22 1216,50" />
            <polygon points="1340,50 1344,16 1348,50" />
          </g>
        </svg>

        {/* === FJORD — dark arctic water === */}
        <svg
          className="absolute bottom-0 w-full"
          viewBox="0 0 1440 200"
          preserveAspectRatio="none"
          style={{ height: "7vh" }}
        >
          <defs>
            <linearGradient id="fjord-water" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#182030" />
              <stop offset="50%" stopColor="#141a26" />
              <stop offset="100%" stopColor="#101620" />
            </linearGradient>
          </defs>
          <rect width="1440" height="200" fill="url(#fjord-water)" />
        </svg>

        {/* Fjord aurora reflection + ripples */}
        <div
          className="absolute bottom-0 left-0 w-full"
          style={{ height: "7vh" }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, transparent 3%, rgba(60,190,100,0.04) 15%, rgba(70,210,120,0.08) 30%, rgba(80,220,140,0.1) 42%, rgba(60,200,110,0.06) 55%, rgba(70,200,160,0.07) 68%, rgba(55,180,110,0.04) 82%, transparent 97%)",
              animation: "fjord-shimmer 14s ease-in-out infinite alternate",
            }}
          />
          <div
            className="absolute top-[15%] left-[8%] w-[28%] h-[1px]"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(100,210,140,0.07), transparent)",
              animation: "water-ripple 9s ease-in-out infinite",
            }}
          />
          <div
            className="absolute top-[40%] left-[25%] w-[22%] h-[1px]"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(90,200,130,0.05), transparent)",
              animation: "water-ripple 11s ease-in-out 2s infinite",
            }}
          />
          <div
            className="absolute top-[60%] left-[50%] w-[24%] h-[1px]"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(100,200,150,0.06), transparent)",
              animation: "water-ripple 8s ease-in-out 1s infinite",
            }}
          />
          <div
            className="absolute top-[80%] left-[65%] w-[20%] h-[1px]"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(80,190,120,0.04), transparent)",
              animation: "water-ripple 12s ease-in-out 3s infinite",
            }}
          />
        </div>
      </div>

      {/* === SNOWFALL === */}
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute rounded-full"
          style={{
            left: `${flake.x}%`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            opacity: flake.opacity,
            background:
              flake.size > 3
                ? "radial-gradient(circle, white 30%, rgba(200,220,255,0.4) 100%)"
                : "white",
            boxShadow:
              flake.size > 3 ? "0 0 3px rgba(200,220,255,0.25)" : "none",
            filter: flake.blur > 0 ? `blur(${flake.blur}px)` : "none",
            animation: `snowfall ${flake.duration}s linear ${flake.delay}s infinite`,
            ["--drift" as string]: `${flake.drift}px`,
          }}
        />
      ))}

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 75% 65% at 50% 40%, transparent 0%, rgba(8,12,24,0.2) 100%)",
        }}
      />

      {/* Keyframe animations */}
      <style jsx>{`
        @keyframes snowfall {
          0% {
            transform: translateY(-10px) translateX(0);
          }
          25% {
            transform: translateY(25vh) translateX(calc(var(--drift) * 0.6));
          }
          50% {
            transform: translateY(50vh) translateX(var(--drift));
          }
          75% {
            transform: translateY(75vh) translateX(calc(var(--drift) * 0.4));
          }
          100% {
            transform: translateY(100vh) translateX(0);
          }
        }

        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.15;
          }
          50% {
            opacity: 1;
          }
        }

        @keyframes aurora-1 {
          0% {
            transform: translateX(-5%) scaleX(1) scaleY(1);
            opacity: 0.7;
          }
          33% {
            opacity: 1;
          }
          66% {
            transform: translateX(8%) scaleX(1.15) scaleY(1.05);
            opacity: 0.85;
          }
          100% {
            transform: translateX(15%) scaleX(1.25) scaleY(0.95);
            opacity: 0.6;
          }
        }

        @keyframes aurora-2 {
          0% {
            transform: translateX(5%) scaleX(1.1);
            opacity: 0.5;
          }
          50% {
            opacity: 0.9;
            transform: translateX(-3%) scaleX(1.2);
          }
          100% {
            transform: translateX(-10%) scaleX(0.9);
            opacity: 0.55;
          }
        }

        @keyframes aurora-3 {
          0% {
            transform: translateX(-6%) scaleX(1);
            opacity: 0.5;
          }
          50% {
            opacity: 0.9;
            transform: translateX(4%) scaleX(1.2);
          }
          100% {
            transform: translateX(10%) scaleX(1.4);
            opacity: 0.4;
          }
        }

        @keyframes aurora-4 {
          0% {
            transform: translateX(3%) scaleX(0.9);
            opacity: 0.4;
          }
          50% {
            opacity: 0.8;
            transform: translateX(-4%) scaleX(1.1);
          }
          100% {
            transform: translateX(-8%) scaleX(1.15);
            opacity: 0.35;
          }
        }

        @keyframes aurora-5 {
          0% {
            transform: translateX(0%) scaleX(1);
            opacity: 0.35;
          }
          50% {
            opacity: 0.7;
          }
          100% {
            transform: translateX(4%) scaleX(1.08);
            opacity: 0.4;
          }
        }

        @keyframes aurora-streak {
          0% {
            opacity: 0;
            transform: scaleY(0.85) translateX(0);
          }
          25% {
            opacity: 1;
          }
          75% {
            opacity: 0.7;
          }
          100% {
            opacity: 0;
            transform: scaleY(1.15) translateX(8px);
          }
        }

        @keyframes mist-drift {
          0% {
            transform: translateX(-2%);
            opacity: 0.4;
          }
          50% {
            opacity: 0.7;
          }
          100% {
            transform: translateX(2%);
            opacity: 0.4;
          }
        }

        @keyframes fjord-shimmer {
          0% {
            opacity: 0.5;
            transform: translateX(-1%);
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0.6;
            transform: translateX(1%);
          }
        }

        @keyframes water-ripple {
          0%,
          100% {
            opacity: 0;
            transform: scaleX(0.8);
          }
          50% {
            opacity: 1;
            transform: scaleX(1.1);
          }
        }
      `}</style>
    </div>
  );
}
