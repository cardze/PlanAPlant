/**
 * PlanAPlant – IoT Simulation Engine
 *
 * Simulates a balcony garden with four sensors (temperature, humidity,
 * soil moisture, light), an automatic water pump, and progressive plant
 * growth across five stages.
 */

'use strict';

/* ── Constants ──────────────────────────────────────────────────────────── */
const STAGES = [
  { label: 'Seed',        emoji: '🌱', maxDay: 3  },
  { label: 'Sprout',      emoji: '🌿', maxDay: 10 },
  { label: 'Seedling',    emoji: '🪴', maxDay: 20 },
  { label: 'Young Plant', emoji: '🌻', maxDay: 35 },
  { label: 'Mature Plant',emoji: '🌳', maxDay: Infinity },
];

const TICK_MS          = 1000;   // base simulation tick (ms real time)
const MOISTURE_TRIGGER = 35;     // pump turns ON below this %
const MOISTURE_TARGET  = 80;     // pump turns OFF above this %
const WATERING_BOOST   = 6;      // moisture added per pump tick

/* ── State ───────────────────────────────────────────────────────────────── */
let simInterval   = null;
let simRunning    = false;
let simDay        = 0;
let simTick       = 0;          // sub-day ticks
let moistureLevel = 65;
let pumpOn        = false;
let currentStage  = 0;

/* ── DOM references ──────────────────────────────────────────────────────── */
const $ = id => document.getElementById(id);

const valTemp     = $('valTemp');
const valHumidity = $('valHumidity');
const valMoisture = $('valMoisture');
const valLight    = $('valLight');
const barTemp     = $('barTemp');
const barHumidity = $('barHumidity');
const barMoisture = $('barMoisture');
const barLight    = $('barLight');
const cardMoisture= $('cardMoisture');

const pumpStatus  = $('pumpStatus');
const pumpState   = $('pumpState');
const pumpReason  = $('pumpReason');

const growthBar   = $('growthBar');
const plantDisplay= $('plantDisplay');
const stageLabel  = $('stageLabel');
const dayLabel    = $('dayLabel');

const btnStart    = $('btnStart');
const btnReset    = $('btnReset');
const simSpeed    = $('simSpeed');

const eventLog    = $('eventLog');

/* ── Helpers ─────────────────────────────────────────────────────────────── */

/** Return a floating-point number uniformly distributed in [min, max]. */
function rand(min, max) {
  return Math.random() * (max - min) + min;
}

/** Clamp value between lo and hi. */
function clamp(val, lo, hi) {
  return Math.max(lo, Math.min(hi, val));
}

/** Append a message to the event log and auto-scroll. */
function log(msg, cls = 'log-info') {
  const li = document.createElement('li');
  li.className = cls;
  const d = new Date();
  const ts = `[Day ${String(simDay).padStart(3,' ')} ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}:${String(d.getSeconds()).padStart(2,'0')}]`;
  li.textContent = `${ts} ${msg}`;
  eventLog.appendChild(li);
  eventLog.scrollTop = eventLog.scrollHeight;
}

/* ── Sensor Simulation ───────────────────────────────────────────────────── */

/**
 * Generate a plausible temperature value (°C).
 * Oscillates around 25 °C with slight random noise.
 */
function sampleTemperature() {
  const base = 25 + 5 * Math.sin((simTick / 120) * Math.PI);  // daily cycle
  return clamp(parseFloat((base + rand(-1.5, 1.5)).toFixed(1)), 10, 45);
}

/**
 * Generate a plausible air humidity (%).
 * Inversely correlated with temperature.
 */
function sampleHumidity(temp) {
  const base = clamp(90 - temp * 1.5, 30, 95);
  return clamp(parseFloat((base + rand(-5, 5)).toFixed(1)), 20, 98);
}

/**
 * Update soil moisture level.
 * Naturally decreases over time; pump boosts it back up.
 */
function updateMoisture() {
  if (pumpOn) {
    moistureLevel = clamp(moistureLevel + WATERING_BOOST, 0, 100);
  } else {
    // Evaporation / plant uptake – faster in warm conditions
    moistureLevel = clamp(moistureLevel - rand(1.0, 2.5), 0, 100);
  }
  return parseFloat(moistureLevel.toFixed(1));
}

/**
 * Generate a plausible light intensity (lux).
 * Simulates day/night cycle (0 at night, ~8000 at noon).
 */
function sampleLight() {
  const hour = (simTick % 120) / 120 * 24;  // simulated 24h in 120 ticks
  const dayFrac = Math.max(0, Math.sin(((hour - 6) / 12) * Math.PI));
  return Math.round(clamp(8000 * dayFrac + rand(-200, 200), 0, 10000));
}

/* ── Pump Logic ──────────────────────────────────────────────────────────── */

function updatePump(moisture) {
  const wasPumpOn = pumpOn;

  if (!pumpOn && moisture < MOISTURE_TRIGGER) {
    pumpOn = true;
    pumpStatus.classList.add('on');
    pumpState.textContent = 'ON  💦';
    pumpReason.textContent = `(soil moisture ${moisture}% < ${MOISTURE_TRIGGER}% threshold)`;
    log(`💦 Pump activated – soil moisture ${moisture}%`, 'log-pump');
  } else if (pumpOn && moisture >= MOISTURE_TARGET) {
    pumpOn = false;
    pumpStatus.classList.remove('on');
    pumpState.textContent = 'OFF';
    pumpReason.textContent = '';
    log(`✅ Pump stopped – soil moisture restored to ${moisture}%`, 'log-pump');
  }

  // Warn if moisture critically low even after pump is on
  if (!wasPumpOn && pumpOn && moisture < 15) {
    log('⚠️ Warning: soil moisture critically low! Check sensor or water reservoir.', 'log-warn');
  }
}

/* ── Plant Growth ────────────────────────────────────────────────────────── */

function getStageIndex(day) {
  for (let i = 0; i < STAGES.length; i++) {
    if (day < STAGES[i].maxDay) return i;
  }
  return STAGES.length - 1;
}

function updateGrowth() {
  const maxDay = 50;
  const pct    = clamp((simDay / maxDay) * 100, 0, 100);
  growthBar.style.width = pct + '%';

  const idx = getStageIndex(simDay);
  if (idx !== currentStage) {
    currentStage = idx;
    plantDisplay.textContent = STAGES[idx].emoji;
    stageLabel.textContent   = STAGES[idx].label;
    log(`🌿 Plant reached stage: ${STAGES[idx].label} (Day ${simDay})`, 'log-stage');
  }

  dayLabel.textContent = simDay;
}

/* ── Main Tick ───────────────────────────────────────────────────────────── */

function tick() {
  simTick++;
  // Advance one simulated day every 20 ticks (at 1× speed)
  if (simTick % 20 === 0) simDay++;

  const temp     = sampleTemperature();
  const humidity = sampleHumidity(temp);
  const moisture = updateMoisture();
  const light    = sampleLight();

  // Update sensor cards
  valTemp.textContent     = temp;
  valHumidity.textContent = humidity;
  valMoisture.textContent = moisture;
  valLight.textContent    = light;

  barTemp.style.width     = clamp((temp / 50) * 100, 0, 100) + '%';
  barHumidity.style.width = humidity + '%';
  barMoisture.style.width = moisture + '%';
  barLight.style.width    = clamp((light / 10000) * 100, 0, 100) + '%';

  // Colour-code moisture bar
  if (moisture < MOISTURE_TRIGGER) {
    barMoisture.style.background = 'var(--danger)';
    cardMoisture.classList.add('alert');
  } else if (moisture < 55) {
    barMoisture.style.background = 'var(--warn)';
    cardMoisture.classList.remove('alert');
  } else {
    barMoisture.style.background = 'var(--green-light)';
    cardMoisture.classList.remove('alert');
  }

  // Pump logic
  updatePump(moisture);

  // Plant growth
  updateGrowth();
}

/* ── Controls ────────────────────────────────────────────────────────────── */

function startSim() {
  if (simRunning) return;
  simRunning = true;
  btnStart.textContent = '⏸ Pause';

  const speed = parseInt(simSpeed.value, 10);
  simInterval = setInterval(tick, Math.round(TICK_MS / speed));
  log(`▶ Simulation started (speed ${speed}×)`);
}

function pauseSim() {
  if (!simRunning) return;
  simRunning = false;
  clearInterval(simInterval);
  btnStart.textContent = '▶ Resume';
  log('⏸ Simulation paused.');
}

function resetSim() {
  pauseSim();
  simDay        = 0;
  simTick       = 0;
  moistureLevel = 65;
  pumpOn        = false;
  currentStage  = 0;
  simRunning    = false;
  btnStart.textContent = '▶ Start Simulation';

  // Reset UI
  growthBar.style.width    = '0%';
  plantDisplay.textContent = STAGES[0].emoji;
  stageLabel.textContent   = STAGES[0].label;
  dayLabel.textContent     = '0';
  pumpStatus.classList.remove('on');
  pumpState.textContent    = 'OFF';
  pumpReason.textContent   = '';
  barMoisture.style.background = 'var(--green-light)';
  cardMoisture.classList.remove('alert');

  [valTemp, valHumidity, valMoisture, valLight].forEach(el => { el.textContent = '–'; });
  [barTemp, barHumidity, barMoisture, barLight].forEach(el => { el.style.width = '0%'; });

  eventLog.innerHTML = '<li class="log-info">Simulation reset. Press <strong>Start</strong> to begin.</li>';
}

btnStart.addEventListener('click', () => {
  if (simRunning) pauseSim(); else startSim();
});

btnReset.addEventListener('click', resetSim);

simSpeed.addEventListener('change', () => {
  if (simRunning) {
    clearInterval(simInterval);
    const speed = parseInt(simSpeed.value, 10);
    simInterval = setInterval(tick, Math.round(TICK_MS / speed));
    log(`⚙️  Speed changed to ${speed}×`);
  }
});

/* ── Initial state ───────────────────────────────────────────────────────── */
plantDisplay.textContent = STAGES[0].emoji;
stageLabel.textContent   = STAGES[0].label;
