# PlanAPlant 🌱

A simulation project about planting a plant automatically by IoT.

## Overview

PlanAPlant is an IoT-powered balcony garden system that automatically monitors
and waters your plants using sensors, a Raspberry Pi, and a smart water pump.
This repository contains a **web-based simulation dashboard** so you can
understand the system behaviour before building the real thing.

## Features

- 🖥 **IoT Simulation Dashboard** – live sensor readings (temperature, humidity,
  soil moisture, light intensity) with animated plant growth across five stages
- 💧 **Automatic watering logic** – pump activates when soil moisture drops
  below the threshold and stops once the target moisture is reached
- 📋 **Materials List** – full hardware, garden supply, and software inventory
- 🔨 **Step-by-step Build Guide** – seven-step recipe to assemble the balcony
  garden from scratch, including wiring diagrams and software setup

## Getting Started

Simply open `index.html` in any modern web browser – no server or build step
required.

```
git clone https://github.com/cardze/PlanAPlant.git
cd PlanAPlant
open index.html   # macOS
# or double-click index.html on Windows/Linux
```

## Project Structure

```
PlanAPlant/
├── index.html          # Main single-page application
├── css/
│   └── style.css       # Responsive stylesheet
├── js/
│   └── simulation.js   # Simulation engine (sensors, pump, growth)
└── README.md
```

## IoT System Architecture

```
Sensors → Raspberry Pi → Pump / Relay
               ↕
          MQTT / Cloud → This Dashboard
```

## License

See [LICENSE](LICENSE).
