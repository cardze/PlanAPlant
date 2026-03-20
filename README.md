# PlanAPlant 🌱

A simulation project about planting a plant automatically by IoT.

## Overview

PlanAPlant is an IoT-powered balcony garden system that automatically monitors
and waters your plants using sensors, a Raspberry Pi, and a smart water pump.
This repository contains a **web-based simulation dashboard** so you can
understand the system behaviour before building the real thing.

The repository also includes a **build guide page** and GitHub Actions workflows
that validate static-site changes and deploy the published site to GitHub Pages.

## Features

- 🖥 **IoT Simulation Dashboard** – live sensor readings (temperature, humidity,
  soil moisture, light intensity) with animated plant growth across five stages
- 💧 **Automatic watering logic** – pump activates when soil moisture drops
  below the threshold and stops once the target moisture is reached
- 📋 **Materials List** – full hardware, garden supply, and software inventory
- 🔨 **Step-by-step Build Guide** – seven-step recipe to assemble the balcony
  garden from scratch, including wiring diagrams and software setup

## Getting Started

Simply open `index.html` or `guide.html` in any modern web browser - no server
or build step required.

```
git clone https://github.com/cardze/PlanAPlant.git
cd PlanAPlant
open index.html   # macOS
# or double-click index.html on Windows/Linux
```

## Project Structure

```
PlanAPlant/
├── .github/
│   ├── scripts/        # CI/CD helper scripts for validation and staging
│   └── workflows/      # GitHub Actions workflows for CI and Pages deploy
├── index.html          # Main simulation dashboard
├── guide.html          # Step-by-step build guide page
├── css/
│   └── style.css       # Shared responsive stylesheet
├── js/
│   └── simulation.js   # Simulation engine (sensors, pump, growth)
└── README.md
```

## CI/CD

GitHub Actions is used to validate the static site and deploy it to GitHub
Pages.

- Pull requests run the `CI` workflow only.
- Pushes to `main` run the `CI` workflow and the `Deploy Pages` workflow.
- The workflows check required site files, validate JavaScript syntax, run
  HTML/CSS static checks, lint workflow YAML, and verify that the staged Pages
  artifact contains only publishable site files.

## GitHub Pages Setup

To enable deployment from this repository:

1. Open the repository settings on GitHub.
2. Go to `Pages`.
3. Set the source to `GitHub Actions`.
4. Ensure the repository allows the workflow permissions required for Pages
   deployment.

Once configured, successful pushes to `main` publish the site automatically.

## IoT System Architecture

```
Sensors → Raspberry Pi → Pump / Relay
               ↕
          MQTT / Cloud → This Dashboard
```

## License

See [LICENSE](LICENSE).
