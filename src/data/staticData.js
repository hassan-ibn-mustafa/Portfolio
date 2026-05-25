// ──────────────────────────────────────────────────────
//  PERSONAL DATA  — Edit this file with your own info
// ──────────────────────────────────────────────────────

export const PERSONAL = {
  name: 'Hassan',
  role: 'Industrial Automation & Electronics Engineer',
  taglines: [
    'PLC & Embedded Systems',
    'PCB Design & Prototyping',
    'Industrial Control Systems',
    'Motor Drive Engineering',
    'IoT & Automation',
  ],
  bio: `Industrial Electronics & Control Engineering student at the Faculty of Electronic Engineering, Menouf. I build things that bridge hardware and intelligence — from custom PCBs and ESP32-based control boards to PLC programs and variable frequency drives. I'm passionate about turning complex industrial problems into precise, reliable engineering solutions.`,
  education: 'B.Sc. Industrial Electronics & Control Engineering — Faculty of Electronic Engineering, Menouf',
  linkedin: 'https://linkedin.com/in/hassan-ibn-mustafa',
  github: 'https://github.com/your-username',
  email: 'hassan.ibn.mustafa@gmail.com',
  cvUrl: '#', // link to your CV PDF
  location: 'Egypt',
}

// ──────────────────────────────────────────────────────
//  SKILLS
// ──────────────────────────────────────────────────────

export const SKILLS = [
  {
    category: 'Embedded Systems',
    icon: 'cpu',
    color: '#00e5ff',
    items: [
      { name: 'ESP32 / ESP-IDF', level: 90 },
      { name: 'Arduino / AVR', level: 88 },
      { name: 'ARM Cortex-M', level: 70 },
      { name: 'FreeRTOS', level: 65 },
      { name: 'UART / SPI / I²C', level: 85 },
    ],
  },
  {
    category: 'PCB Design',
    icon: 'layers',
    color: '#7c3aed',
    items: [
      { name: 'KiCad', level: 85 },
      { name: 'Altium Designer', level: 80 },
      { name: 'Proteus', level: 88 },
      { name: 'Altium 365', level: 75 },
      { name: 'Circuit Simulation', level: 82 },
    ],
  },
  {
    category: 'Industrial Automation',
    icon: 'settings',
    color: '#ffb300',
    items: [
      { name: 'PLC Programming (ST / LL)', level: 85 },
      { name: 'OpenPLC Runtime', level: 82 },
      { name: 'Variable Frequency Drives', level: 78 },
      { name: 'Motor Control (V/f, FOC)', level: 72 },
      { name: 'HMI & SCADA Concepts', level: 65 },
    ],
  },
  {
    category: 'Programming',
    icon: 'code',
    color: '#10b981',
    items: [
      { name: 'C / C++', level: 88 },
      { name: 'Python', level: 75 },
      { name: 'Structured Text (IEC 61131-3)', level: 83 },
      { name: 'Ladder Logic', level: 83 },
      { name: 'MATLAB / Simulink', level: 70 },
    ],
  },
]

// ──────────────────────────────────────────────────────
//  CERTIFICATIONS
// ──────────────────────────────────────────────────────

export const CERTIFICATIONS = [
  {
    title: 'Industrial Automation Fundamentals',
    issuer: 'HA Consulting Groub',
    year: '2024',
    color: '#00e5ff',
  },
  {
    title: 'PCB Design with KiCad',
    issuer: 'Online / Self-Study',
    year: '2024',
    color: '#7c3aed',
  },
  {
    title: 'Embedded C Programming',
    issuer: 'Online / Self-Study',
    year: '2023',
    color: '#10b981',
  },
  
]

// ──────────────────────────────────────────────────────
//  SEED PROJECTS (shown if Supabase is not configured)
// ──────────────────────────────────────────────────────

export const SEED_PROJECTS = [
  {
    id: 'seed-1',
    title: 'ESP32-Based Industrial PLC Board',
    description: 'Custom industrial-grade PCB designed in KiCad for 24V DC environments. Features isolated digital I/O, RS-485, MOSFET outputs, and onboard power regulation compatible with the OpenPLC runtime.',
    tech_stack: ['ESP32-WROOM-32', 'KiCad', 'OpenPLC', '24V DC', 'RS-485', 'Altium 365'],
    category: 'PCB Design',
    github_url: '#',
    demo_url: null,
    image_url: null,
    featured: true,
  },
  {
    id: 'seed-2',
    title: '3-Floor Elevator Control System',
    description: 'Full PLC-based elevator controller implemented in both Structured Text and Ladder Logic for OpenPLC. Handles floor calls, motor direction, door logic, and safety interlocks.',
    tech_stack: ['OpenPLC', 'Structured Text', 'Ladder Logic', 'IEC 61131-3', 'Industrial Automation'],
    category: 'Industrial Automation',
    github_url: '#',
    demo_url: null,
    image_url: null,
    featured: true,
  },
  {
    id: 'seed-3',
    title: 'Single-Phase VFD — ESP32 Based',
    description: 'Variable Frequency Drive for single-phase 220V AC input. Implements full power electronics chain: rectification, DC-link filtering, IGBT PWM inversion, with V/f and FOC control modes.',
    tech_stack: ['ESP32', 'MATLAB/Simulink', 'Gate Drivers', 'IGBT', 'FOC', 'Power Electronics'],
    category: 'Embedded Systems',
    github_url: '#',
    demo_url: null,
    image_url: null,
    featured: true,
  },
  {
    id: 'seed-4',
    title: 'Nano328 Development Board',
    description: 'Custom Arduino Nano-compatible PCB designed in Altium Designer. Includes a custom logo, published to Altium 365 viewer, and documented as a GitHub portfolio project.',
    tech_stack: ['Altium Designer', 'Altium 365', 'ATmega328P', 'PCB Layout', 'GitHub'],
    category: 'PCB Design',
    github_url: '#',
    demo_url: null,
    image_url: null,
    featured: false,
  },
  {
    id: 'seed-5',
    title: 'High-Voltage Mosquito Zapper',
    description: 'DIY high-voltage mosquito zapper with custom PCB, battery management system, boost converter circuit, and safe discharge protection circuitry.',
    tech_stack: ['High Voltage', 'BMS', 'Boost Converter', 'KiCad', 'Safety Design'],
    category: 'Hardware',
    github_url: '#',
    demo_url: null,
    image_url: null,
    featured: false,
  },
]
