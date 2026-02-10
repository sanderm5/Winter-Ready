export interface CourseModule {
  id: string;
  title: string;
  iconType: "snow" | "brake" | "ice" | "mountain" | "rules" | "emergency" | "darkness" | "wildlife" | "arctic-weather";
  duration: number; // minutes
  heroImage?: string; // Module header image
  content: {
    heading: string;
    text: string;
    tips?: string[];
    image?: string; // Optional content image
    imageAlt?: string;
  }[];
}

export const courseModules: Record<string, CourseModule> = {
  "winter-basics": {
    id: "winter-basics",
    title: "Winter Driving Basics",
    iconType: "snow",
    duration: 3,
    heroImage: "/images/course/modules/winter-basics-hero.jpg",
    content: [
      {
        heading: "Reduce Your Speed",
        text: "In winter conditions, your stopping distance can be up to 10 times longer than on dry roads. Always drive slower than you would in summer.",
        image: "/images/course/content/reduce-speed.jpg",
        imageAlt: "Snow-covered road requiring reduced speed",
        tips: [
          "Reduce speed by at least 20-30% in snow",
          "Reduce speed by 50% or more on ice",
          "Speed limits are maximums, not targets",
        ],
      },
      {
        heading: "Increase Following Distance",
        text: "Keep at least 4-6 seconds of distance to the car in front of you. This gives you time to react and stop safely.",
        image: "/images/course/content/following-distance.jpg",
        imageAlt: "Cars maintaining safe distance on winter road",
        tips: [
          "Use the '4 second rule' - count seconds after the car ahead passes a landmark",
          "Double this distance in heavy snow or ice",
        ],
      },
      {
        heading: "Smooth Movements",
        text: "Avoid sudden movements of the steering wheel, accelerator, or brakes. Smooth, gradual inputs help maintain traction.",
        image: "/images/course/content/smooth-movements.jpg",
        imageAlt: "Hands on steering wheel demonstrating controlled driving",
        tips: [
          "Accelerate gently from stops",
          "Brake gradually, never slam the brakes",
          "Steer smoothly without jerky movements",
        ],
      },
    ],
  },

  "braking-techniques": {
    id: "braking-techniques",
    title: "Braking on Ice & Snow",
    iconType: "brake",
    duration: 2,
    heroImage: "/images/course/modules/braking-techniques-hero.jpg",
    content: [
      {
        heading: "ABS Braking",
        text: "Modern cars have ABS (Anti-lock Braking System). When braking on slippery surfaces, press the brake firmly and hold it - let the ABS do its job. You may feel pulsing in the pedal; this is normal.",
        image: "/images/course/content/abs-braking.png",
        imageAlt: "ABS braking system indicator",
        tips: [
          "Press and hold the brake firmly",
          "Don't pump the brakes with ABS",
          "Keep steering while braking",
        ],
      },
      {
        heading: "Engine Braking",
        text: "Use engine braking by shifting to a lower gear (or using 'B' mode in automatics). This slows the car without using the brakes and reduces the risk of wheel lock.",
        image: "/images/course/content/steep-hills.jpg",
        imageAlt: "Mountain road where engine braking is essential",
        tips: [
          "Downshift gradually on hills",
          "Use engine braking before curves",
        ],
      },
    ],
  },

  "black-ice": {
    id: "black-ice",
    title: "Black Ice Awareness",
    iconType: "ice",
    duration: 2,
    heroImage: "/images/course/modules/black-ice-hero.jpg",
    content: [
      {
        heading: "What is Black Ice?",
        text: "Black ice is a thin, nearly invisible layer of ice on the road. It's called 'black' because you can see the dark road surface through it. It's extremely slippery and often catches drivers by surprise.",
        image: "/images/course/content/black-ice-road.jpg",
        imageAlt: "Road surface showing nearly invisible black ice",
        tips: [
          "Most common in early morning and evening",
          "Forms on bridges, overpasses, and shaded areas first",
          "Watch for glossy patches on the road",
        ],
      },
      {
        heading: "If You Hit Black Ice",
        text: "Stay calm. Don't brake or steer suddenly. Take your foot off the accelerator and let the car slow naturally. Keep the steering wheel straight until you regain traction.",
        image: "/images/course/content/black-ice-road.jpg",
        imageAlt: "Icy road conditions requiring careful handling",
        tips: [
          "Don't panic - stay calm",
          "Ease off the accelerator",
          "Keep the wheel straight",
          "Don't brake unless absolutely necessary",
        ],
      },
    ],
  },

  "mountain-driving": {
    id: "mountain-driving",
    title: "Mountain & Fjord Driving",
    iconType: "mountain",
    duration: 3,
    heroImage: "/images/course/modules/mountain-driving-hero.jpg",
    content: [
      {
        heading: "Steep Hills & Passes",
        text: "Norwegian mountain roads can have steep gradients. Use low gear when going downhill to control speed. Never coast in neutral.",
        image: "/images/course/content/steep-hills.jpg",
        imageAlt: "Steep Norwegian mountain pass with winding road",
        tips: [
          "Use low gear (1, 2, or L) on steep descents",
          "Don't ride the brakes - they can overheat",
          "Pull over at designated rest areas if needed",
        ],
      },
      {
        heading: "Single Lane Roads",
        text: "Many mountain roads are single-lane with passing places. The car going uphill generally has right of way. Pull into passing places to let others pass.",
        image: "/images/course/content/single-lane.jpg",
        imageAlt: "Narrow mountain road with passing place",
        tips: [
          "Look ahead for passing places",
          "Reverse to a passing place if needed",
          "Flash lights to signal you're letting someone pass",
        ],
      },
      {
        heading: "Kolonnekjoring (Convoy Driving)",
        text: "In severe weather, roads may only be open for convoy driving - you follow a snowplow in a group. Check road status before driving.",
        image: "/images/course/content/convoy-driving.jpg",
        imageAlt: "Cars following snowplow in convoy formation",
        tips: [
          "Check vegvesen.no or the 175 app for road status",
          "Wait at the convoy meeting point",
          "Never try to overtake the convoy",
        ],
      },
    ],
  },

  "norwegian-rules": {
    id: "norwegian-rules",
    title: "Norwegian Traffic Rules",
    iconType: "rules",
    duration: 2,
    heroImage: "/images/course/modules/norwegian-rules-hero.jpg",
    content: [
      {
        heading: "Blood Alcohol Limit",
        text: "Norway has one of the strictest drink-driving laws in Europe. The legal limit is 0.02% BAC - effectively zero tolerance. Penalties include heavy fines, license suspension, and even imprisonment.",
        image: "/images/course/content/alcohol-limit.png",
        imageAlt: "Zero tolerance for alcohol sign",
        tips: [
          "0.02% limit - even one drink can put you over",
          "If you drink, don't drive at all",
          "Penalties are severe: fines, jail, license loss",
        ],
      },
      {
        heading: "Headlights Always On",
        text: "You must drive with headlights on at all times in Norway, day and night, all year round.",
        image: "/images/course/content/headlights.jpg",
        imageAlt: "Car driving with headlights on during daytime",
        tips: [
          "Use dipped/low beam headlights",
          "Check lights are working before your trip",
        ],
      },
      {
        heading: "Speed Limits",
        text: "Speed limits in Norway are generally lower than other European countries. Common limits: 50 km/h in towns, 80 km/h on rural roads, 90-110 km/h on highways.",
        image: "/images/course/content/speed-limit-sign.jpg",
        imageAlt: "Norwegian speed limit road sign",
        tips: [
          "Fines are based on income and can be very high",
          "Speed cameras are common",
          "Limits are maximums - reduce in bad weather",
        ],
      },
    ],
  },

  "emergency-procedures": {
    id: "emergency-procedures",
    title: "Emergency Procedures",
    iconType: "emergency",
    duration: 2,
    heroImage: "/images/course/modules/emergency-hero.jpg",
    content: [
      {
        heading: "Emergency Numbers",
        text: "In case of emergency, call these numbers immediately:",
        image: "/images/course/content/emergency-numbers.webp",
        imageAlt: "Emergency numbers 112, 113, 110",
        tips: [
          "112 - Police",
          "113 - Ambulance",
          "110 - Fire",
          "These numbers work from any phone",
        ],
      },
      {
        heading: "If You Get Stuck",
        text: "If your car gets stuck in snow or you slide off the road, stay calm and assess the situation.",
        image: "/images/course/content/stuck-car.jpg",
        imageAlt: "Car stuck in snow on the roadside",
        tips: [
          "Turn on hazard lights",
          "Stay in the car if it's cold outside",
          "Call for help: roadside assistance or 112",
          "Keep emergency kit: warm clothes, blanket, water, snacks",
        ],
      },
      {
        heading: "Viking Roadside Assistance",
        text: "Most rental cars in Norway include Viking roadside assistance. Check your rental agreement for the phone number. They can help with breakdowns, flat tires, and getting unstuck.",
        image: "/images/course/content/roadside-assistance.jpg",
        imageAlt: "Roadside assistance vehicle helping stranded car",
        tips: [
          "Keep the Viking number saved in your phone",
          "Typical number: 06000 or check rental papers",
        ],
      },
    ],
  },

  // Northern Norway-specific road safety modules

  "polar-darkness": {
    id: "polar-darkness",
    title: "Driving in Polar Darkness",
    iconType: "darkness",
    duration: 3,
    heroImage: "/images/course/modules/polar-darkness-hero.jpg",
    content: [
      {
        heading: "The Polar Night (Mørketid)",
        text: "In Northern Norway above the Arctic Circle, the sun doesn't rise for weeks during winter. In Tromsø, polar night lasts from late November to mid-January. Even outside this period, daylight hours are very short. This means you'll be driving in darkness or twilight most of the time.",
        image: "/images/course/content/polar-night-road.jpg",
        imageAlt: "Dark road in Northern Norway during polar night",
        tips: [
          "Tromsø has no sunrise from Nov 21 to Jan 21",
          "The 'blue light' of polar twilight can be deceptively dim",
          "Your perception of distance and speed changes in constant darkness",
        ],
      },
      {
        heading: "Headlight Strategy",
        text: "In total darkness, your headlights are your lifeline. Use low beams in built-up areas and high beams on open roads — but be ready to switch quickly. Oncoming traffic and reflective road markers are your navigation aids.",
        image: "/images/course/content/headlights-darkness.jpg",
        imageAlt: "Car headlights illuminating a dark arctic road",
        tips: [
          "Always use low beam in towns and when meeting traffic",
          "Switch to high beam on open roads with no oncoming cars",
          "Keep headlights and windscreen clean — salt and grime reduce visibility fast",
          "Use fog lights only in fog or heavy snowfall",
        ],
      },
      {
        heading: "Fatigue & Alertness",
        text: "Driving in continuous darkness is mentally exhausting. Your body's circadian rhythm is disrupted, and drowsiness is a serious risk. Tourists from southern latitudes are especially vulnerable.",
        image: "/images/course/content/driver-fatigue.jpg",
        imageAlt: "Driver taking a break during a winter road trip",
        tips: [
          "Take breaks every 1-2 hours — stop, stretch, get fresh air",
          "Don't drive if you feel drowsy — find a safe place to rest",
          "Keep the car slightly cool to stay alert",
          "Avoid heavy meals before driving — they increase drowsiness",
        ],
      },
    ],
  },

  "wildlife-roads": {
    id: "wildlife-roads",
    title: "Wildlife on Arctic Roads",
    iconType: "wildlife",
    duration: 3,
    heroImage: "/images/course/modules/wildlife-hero.jpg",
    content: [
      {
        heading: "Reindeer — The Arctic Highway Hazard",
        text: "Reindeer roam freely across roads in Northern Norway, especially in Troms and Finnmark. They are semi-domesticated by Sámi herders and have no fear of cars. They can appear suddenly, often in groups — if you see one, expect more to follow.",
        image: "/images/course/content/reindeer-road.jpg",
        imageAlt: "Reindeer standing on a snowy road in Northern Norway",
        tips: [
          "Reindeer often travel in herds — if one crosses, slow down and wait",
          "Most common at dawn, dusk, and during polar twilight",
          "Reduce speed near warning signs (yellow triangle with reindeer)",
          "They may freeze in headlights — honk gently and wait",
        ],
      },
      {
        heading: "Moose — Large and Dangerous",
        text: "Moose (elg) are the largest animals in Scandinavia and a collision can be fatal. An adult moose weighs 400-500 kg and stands taller than a car. Their legs break on impact, sending the body through the windshield.",
        image: "/images/course/content/moose-warning.jpg",
        imageAlt: "Moose warning road sign in Norway",
        tips: [
          "Moose are most active at dawn and dusk",
          "Watch the ditches and forest edges alongside the road",
          "If a collision is unavoidable, brake hard but don't swerve into oncoming traffic",
          "Report any wildlife collision to police: 112",
        ],
      },
      {
        heading: "What To Do After a Wildlife Collision",
        text: "If you hit an animal, stop safely, turn on hazard lights, and call the police at 02800 (non-emergency) or 112 if anyone is injured. Mark the location and do not approach the injured animal — it can be aggressive.",
        image: "/images/course/content/wildlife-collision.jpg",
        imageAlt: "Road safety warning scene after wildlife encounter",
        tips: [
          "Stop and secure the area with hazard lights and warning triangle",
          "Call police at 02800 or 112 for injuries",
          "Note the exact location (GPS coordinates or road markers)",
          "Never approach an injured moose or reindeer",
        ],
      },
    ],
  },

  "arctic-weather-driving": {
    id: "arctic-weather-driving",
    title: "Driving in Arctic Weather",
    iconType: "arctic-weather",
    duration: 3,
    heroImage: "/images/course/modules/arctic-weather-hero.jpg",
    content: [
      {
        heading: "Extreme Cold (-20°C and Below)",
        text: "Temperatures in Northern Norway can drop to -20°C or lower, especially inland. Extreme cold affects your car, your tires, and your body. Diesel cars can struggle to start, batteries drain faster, and tire pressure drops.",
        image: "/images/course/content/extreme-cold-car.jpg",
        imageAlt: "Car covered in frost at extreme cold temperatures",
        tips: [
          "Always keep the fuel tank at least half full",
          "Park facing away from the wind to protect the engine",
          "Carry extra warm clothing, a blanket, and a thermos",
          "Check that the rental car has an engine block heater if parking overnight",
        ],
      },
      {
        heading: "Whiteout & Blizzard Conditions",
        text: "Arctic blizzards can reduce visibility to near zero in seconds. Drifting snow and strong winds create 'whiteout' conditions where you cannot see the road, the horizon, or other vehicles. This is the most dangerous driving condition in Northern Norway.",
        image: "/images/course/content/whiteout-road.jpg",
        imageAlt: "Near-zero visibility during arctic blizzard",
        tips: [
          "If visibility drops suddenly, slow down gradually — don't brake hard",
          "Turn on fog lights and hazard lights",
          "Follow the road markers (snow poles with reflectors)",
          "If you can't see at all, pull off the road safely and wait it out",
        ],
      },
      {
        heading: "Strong Crosswinds",
        text: "Exposed coastal and mountain roads in Northern Norway are hit by powerful Arctic winds. Bridges, open fjord crossings, and high plateaus are especially dangerous. Gusts can push your car sideways or rock it violently.",
        image: "/images/course/content/crosswind-road.jpg",
        imageAlt: "Wind sock on an exposed Norwegian coastal road",
        tips: [
          "Reduce speed on exposed sections — especially bridges and headlands",
          "Grip the steering wheel firmly with both hands",
          "Be prepared for sudden gusts when exiting tunnels",
          "Check yr.no for wind forecasts before driving to exposed areas like Senja or Kvaløya",
        ],
      },
    ],
  },
};

export function getModulesForIds(ids: string[]): CourseModule[] {
  return ids
    .map((id) => courseModules[id])
    .filter((m): m is CourseModule => m !== undefined);
}
