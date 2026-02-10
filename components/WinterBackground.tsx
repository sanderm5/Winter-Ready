"use client";

import { useEffect, useState } from "react";

interface Snowflake {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  drift: number;
}

export default function WinterBackground() {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

  useEffect(() => {
    const flakes: Snowflake[] = Array.from({ length: 35 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 3 + 2,
      duration: Math.random() * 12 + 10,
      delay: Math.random() * -15,
      opacity: Math.random() * 0.4 + 0.1,
      drift: Math.random() * 40 - 20,
    }));
    setSnowflakes(flakes);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Aurora / Northern Lights — enhanced opacity for dark backgrounds */}
      <div className="absolute inset-0">
        <div
          className="absolute top-0 left-0 w-full h-[60%]"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 20% 0%, rgba(163,190,140,0.15) 0%, transparent 70%)",
            animation: "aurora-shift-1 15s ease-in-out infinite alternate",
          }}
        />
        <div
          className="absolute top-0 left-0 w-full h-[50%]"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 60% 0%, rgba(94,129,172,0.18) 0%, transparent 70%)",
            animation: "aurora-shift-2 18s ease-in-out infinite alternate",
          }}
        />
        <div
          className="absolute top-0 left-0 w-full h-[45%]"
          style={{
            background:
              "radial-gradient(ellipse 50% 35% at 80% 0%, rgba(143,188,187,0.12) 0%, transparent 70%)",
            animation: "aurora-shift-3 20s ease-in-out infinite alternate",
          }}
        />
      </div>

      {/* Mountain silhouettes — 3 layers for depth */}
      <div className="absolute bottom-0 left-0 w-full">
        {/* Back mountains — tallest, lightest */}
        <svg
          className="absolute bottom-0 w-full"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          style={{ height: "25vh" }}
        >
          <path
            d="M0,320 L0,220 Q80,120 160,180 Q240,100 320,160 Q400,60 480,140 Q560,80 640,120 Q720,40 800,100 Q880,60 960,130 Q1040,50 1120,110 Q1200,70 1280,150 Q1360,100 1440,180 L1440,320 Z"
            fill="#3b4252"
          />
        </svg>

        {/* Mid mountains — medium height */}
        <svg
          className="absolute bottom-0 w-full"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          style={{ height: "20vh" }}
        >
          <path
            d="M0,320 L0,240 Q100,160 200,200 Q300,120 400,190 Q500,130 600,180 Q700,100 800,170 Q900,120 1000,190 Q1100,140 1200,200 Q1300,150 1440,210 L1440,320 Z"
            fill="#4c566a"
            fillOpacity="0.7"
          />
        </svg>

        {/* Front mountains — closest, darkest */}
        <svg
          className="absolute bottom-0 w-full"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          style={{ height: "15vh" }}
        >
          <path
            d="M0,320 L0,260 Q120,200 240,240 Q360,180 480,230 Q600,190 720,220 Q840,180 960,240 Q1080,200 1200,250 Q1320,210 1440,260 L1440,320 Z"
            fill="#2e3440"
          />
        </svg>
      </div>

      {/* Snowflakes */}
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${flake.x}%`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            opacity: flake.opacity,
            animation: `snowfall ${flake.duration}s linear ${flake.delay}s infinite`,
            ["--drift" as string]: `${flake.drift}px`,
          }}
        />
      ))}

      {/* Keyframe styles */}
      <style jsx>{`
        @keyframes snowfall {
          0% {
            transform: translateY(-10px) translateX(0);
          }
          50% {
            transform: translateY(50vh) translateX(var(--drift));
          }
          100% {
            transform: translateY(100vh) translateX(0);
          }
        }

        @keyframes aurora-shift-1 {
          0% {
            transform: translateX(0%) scaleX(1);
            opacity: 0.6;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateX(15%) scaleX(1.3);
            opacity: 0.7;
          }
        }

        @keyframes aurora-shift-2 {
          0% {
            transform: translateX(5%) scaleX(1.2);
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateX(-10%) scaleX(0.9);
            opacity: 0.6;
          }
        }

        @keyframes aurora-shift-3 {
          0% {
            transform: translateX(-5%) scaleX(1);
            opacity: 0.7;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateX(10%) scaleX(1.4);
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
}
