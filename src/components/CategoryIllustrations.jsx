import React from 'react'

// ─── Shared wrapper ───────────────────────────────────────────────
function IllustrationBase({ children, accent = '#c0392b' }) {
  return (
    <svg
      viewBox="0 0 400 220"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%', display: 'block' }}
    >
      {/* Dark background */}
      <rect width="400" height="220" fill="#0e0e0e" />

      {/* Grid pattern */}
      <defs>
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke={accent} strokeWidth="0.3" opacity="0.18" />
        </pattern>
        <radialGradient id="vignette" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="100%" stopColor="#0e0e0e" stopOpacity="0.7" />
        </radialGradient>
      </defs>
      <rect width="400" height="220" fill="url(#grid)" />

      {children}

      {/* Vignette overlay */}
      <rect width="400" height="220" fill="url(#vignette)" />
    </svg>
  )
}

// ─── 1. Embedded Systems ─────────────────────────────────────────
export function EmbeddedIllustration() {
  const acc = '#c0392b'
  return (
    <IllustrationBase accent={acc}>
      {/* MCU chip body */}
      <rect x="150" y="70" width="100" height="80" rx="4"
        fill="#161616" stroke={acc} strokeWidth="1.5" />
      {/* Chip label */}
      <text x="200" y="106" textAnchor="middle"
        fontFamily="Share Tech Mono, monospace" fontSize="10" fill={acc} opacity="0.9">ESP32</text>
      <text x="200" y="120" textAnchor="middle"
        fontFamily="Share Tech Mono, monospace" fontSize="7" fill="#7a7a7a">WROOM-32</text>

      {/* Left pins */}
      {[0,1,2,3,4,5].map(i => (
        <g key={`lp${i}`}>
          <rect x="130" y={78 + i * 12} width="20" height="6" rx="1"
            fill="#1e1e1e" stroke="#444" strokeWidth="0.8" />
          <line x1="110" y1={81 + i * 12} x2="130" y2={81 + i * 12}
            stroke={i % 2 === 0 ? acc : '#444'} strokeWidth="1" opacity={i % 2 === 0 ? 0.8 : 0.4} />
          {/* Trace going left */}
          {i % 2 === 0 && (
            <>
              <line x1="70" y1={81 + i * 12} x2="110" y2={81 + i * 12}
                stroke={acc} strokeWidth="0.8" opacity="0.4" />
              <circle cx="70" cy={81 + i * 12} r="3"
                fill="none" stroke={acc} strokeWidth="1" opacity="0.5" />
            </>
          )}
        </g>
      ))}

      {/* Right pins */}
      {[0,1,2,3,4,5].map(i => (
        <g key={`rp${i}`}>
          <rect x="250" y={78 + i * 12} width="20" height="6" rx="1"
            fill="#1e1e1e" stroke="#444" strokeWidth="0.8" />
          <line x1="270" y1={81 + i * 12} x2="290" y2={81 + i * 12}
            stroke={i % 2 === 1 ? acc : '#444'} strokeWidth="1" opacity={i % 2 === 1 ? 0.8 : 0.4} />
          {i % 2 === 1 && (
            <>
              <line x1="290" y1={81 + i * 12} x2="330" y2={81 + i * 12}
                stroke={acc} strokeWidth="0.8" opacity="0.4" />
              <circle cx="330" cy={81 + i * 12} r="3"
                fill="none" stroke={acc} strokeWidth="1" opacity="0.5" />
            </>
          )}
        </g>
      ))}

      {/* Signal waves on right side */}
      <path d="M 340 85 Q 348 79 356 85 Q 364 91 372 85" fill="none"
        stroke={acc} strokeWidth="1.2" opacity="0.6" />
      <path d="M 340 105 L 348 105 L 352 95 L 356 115 L 360 105 L 372 105" fill="none"
        stroke={acc} strokeWidth="1.2" opacity="0.6" />

      {/* Bottom USB connector hint */}
      <rect x="185" y="150" width="30" height="10" rx="2"
        fill="#1e1e1e" stroke="#555" strokeWidth="1" />
      <line x1="200" y1="160" x2="200" y2="175"
        stroke="#555" strokeWidth="1" />
      <text x="200" y="188" textAnchor="middle"
        fontFamily="Share Tech Mono, monospace" fontSize="8" fill="#444">USB</text>

      {/* Antenna line top */}
      <line x1="200" y1="70" x2="200" y2="50"
        stroke={acc} strokeWidth="1" opacity="0.5" />
      <line x1="185" y1="55" x2="215" y2="55"
        stroke={acc} strokeWidth="1" opacity="0.4" />
      <line x1="190" y1="50" x2="210" y2="50"
        stroke={acc} strokeWidth="1" opacity="0.3" />

      {/* Glow center */}
      <rect x="150" y="70" width="100" height="80" rx="4"
        fill={acc} fillOpacity="0.04" />

      {/* Label bottom */}
      <text x="200" y="210" textAnchor="middle"
        fontFamily="Share Tech Mono, monospace" fontSize="8" fill="#444" letterSpacing="3">
        EMBEDDED SYSTEMS
      </text>
    </IllustrationBase>
  )
}

// ─── 2. PCB Design ───────────────────────────────────────────────
export function PCBIllustration() {
  const acc = '#c0392b'
  const trace = '#7c3aed'
  return (
    <IllustrationBase accent={acc}>
      {/* PCB board outline */}
      <rect x="60" y="40" width="280" height="145" rx="4"
        fill="#0a1a0a" stroke="#1a3a1a" strokeWidth="1.5" />

      {/* Copper traces — horizontal */}
      <line x1="80" y1="70" x2="180" y2="70" stroke={trace} strokeWidth="1.5" opacity="0.7" />
      <line x1="80" y1="90" x2="140" y2="90" stroke={trace} strokeWidth="1.5" opacity="0.7" />
      <line x1="220" y1="90" x2="320" y2="90" stroke={trace} strokeWidth="1.5" opacity="0.7" />
      <line x1="200" y1="130" x2="320" y2="130" stroke={trace} strokeWidth="1.5" opacity="0.5" />
      <line x1="80" y1="150" x2="180" y2="150" stroke={trace} strokeWidth="1.5" opacity="0.5" />

      {/* Copper traces — vertical */}
      <line x1="140" y1="70" x2="140" y2="90" stroke={trace} strokeWidth="1.5" opacity="0.7" />
      <line x1="180" y1="70" x2="180" y2="110" stroke={trace} strokeWidth="1.5" opacity="0.7" />
      <line x1="220" y1="90" x2="220" y2="130" stroke={trace} strokeWidth="1.5" opacity="0.5" />
      <line x1="180" y1="130" x2="180" y2="160" stroke={trace} strokeWidth="1.5" opacity="0.5" strokeDasharray="3,2" />

      {/* IC chip */}
      <rect x="165" y="100" width="50" height="40" rx="2"
        fill="#111" stroke={acc} strokeWidth="1.2" />
      {[0,1,2].map(i => (
        <rect key={`icp${i}`} x={170 + i*14} y="97" width="6" height="6" rx="1"
          fill="#222" stroke={acc} strokeWidth="0.8" />
      ))}
      {[0,1,2].map(i => (
        <rect key={`icpb${i}`} x={170 + i*14} y="137" width="6" height="6" rx="1"
          fill="#222" stroke={acc} strokeWidth="0.8" />
      ))}
      <text x="190" y="122" textAnchor="middle"
        fontFamily="Share Tech Mono, monospace" fontSize="7" fill={acc} opacity="0.8">IC</text>
      <text x="190" y="133" textAnchor="middle"
        fontFamily="Share Tech Mono, monospace" fontSize="6" fill="#555">U1</text>

      {/* Resistors */}
      <rect x="90" y="65" width="18" height="10" rx="1"
        fill="#222" stroke="#888" strokeWidth="0.8" />
      <line x1="85" y1="70" x2="90" y2="70" stroke={trace} strokeWidth="1.5" opacity="0.7" />
      <line x1="108" y1="70" x2="140" y2="70" stroke={trace} strokeWidth="1.5" opacity="0.7" />

      <rect x="90" y="145" width="18" height="10" rx="1"
        fill="#222" stroke="#888" strokeWidth="0.8" />
      <line x1="80" y1="150" x2="90" y2="150" stroke={trace} strokeWidth="1.5" opacity="0.5" />
      <line x1="108" y1="150" x2="130" y2="150" stroke={trace} strokeWidth="1.5" opacity="0.5" />

      {/* Capacitors */}
      <g>
        <line x1="255" y1="120" x2="255" y2="128" stroke={trace} strokeWidth="1.5" opacity="0.7" />
        <line x1="250" y1="128" x2="260" y2="128" stroke="#aaa" strokeWidth="1.5" />
        <line x1="250" y1="131" x2="260" y2="131" stroke="#aaa" strokeWidth="1.5" />
        <line x1="255" y1="131" x2="255" y2="140" stroke={trace} strokeWidth="1.5" opacity="0.5" />
      </g>

      {/* Via holes */}
      {[[100,115],[290,70],[290,160],[140,160]].map(([x,y],i) => (
        <circle key={`via${i}`} cx={x} cy={y} r="4"
          fill="#0a1a0a" stroke={acc} strokeWidth="1" opacity="0.6" />
      ))}
      {[[100,115],[290,70],[290,160],[140,160]].map(([x,y],i) => (
        <circle key={`viac${i}`} cx={x} cy={y} r="1.5"
          fill={acc} opacity="0.5" />
      ))}

      {/* Mounting holes corners */}
      {[[75,55],[325,55],[75,170],[325,170]].map(([x,y],i) => (
        <circle key={`mh${i}`} cx={x} cy={y} r="5"
          fill="none" stroke="#333" strokeWidth="1" />
      ))}

      {/* Connector header right edge */}
      {[0,1,2,3].map(i => (
        <rect key={`hdr${i}`} x="318" y={58 + i*14} width="12" height="10" rx="1"
          fill="#1a1a1a" stroke="#555" strokeWidth="0.8" />
      ))}

      <text x="200" y="210" textAnchor="middle"
        fontFamily="Share Tech Mono, monospace" fontSize="8" fill="#444" letterSpacing="3">
        PCB DESIGN
      </text>
    </IllustrationBase>
  )
}

// ─── 3. Industrial Automation ────────────────────────────────────
export function AutomationIllustration() {
  const acc = '#c0392b'
  return (
    <IllustrationBase accent={acc}>
      {/* PLC unit */}
      <rect x="50" y="55" width="90" height="115" rx="4"
        fill="#161616" stroke={acc} strokeWidth="1.5" />
      {/* PLC label */}
      <text x="95" y="73" textAnchor="middle"
        fontFamily="Share Tech Mono, monospace" fontSize="8" fill={acc}>PLC</text>
      <line x1="60" y1="78" x2="130" y2="78" stroke="#333" strokeWidth="0.8" />

      {/* PLC I/O terminals */}
      {['I0','I1','I2','I3','Q0','Q1'].map((lbl, i) => (
        <g key={lbl}>
          <rect x="62" y={85 + i * 14} width="28" height="10" rx="1"
            fill="#1e1e1e" stroke={i < 4 ? '#3a3a3a' : acc} strokeWidth="0.8" />
          <text x="76" y={93 + i * 14} textAnchor="middle"
            fontFamily="Share Tech Mono, monospace" fontSize="6.5"
            fill={i < 4 ? '#666' : acc}>{lbl}</text>
          {/* Wires going right */}
          <line x1="90" y1={90 + i * 14} x2="145" y2={90 + i * 14}
            stroke={i < 4 ? '#444' : acc} strokeWidth={i >= 4 ? 1.2 : 0.8}
            opacity={i >= 4 ? 0.7 : 0.4} />
        </g>
      ))}

      {/* Ladder logic diagram */}
      <rect x="155" y="55" width="185" height="115" rx="4"
        fill="#0d0d0d" stroke="#333" strokeWidth="1" />
      <text x="247" y="68" textAnchor="middle"
        fontFamily="Share Tech Mono, monospace" fontSize="7" fill="#555">LADDER LOGIC</text>
      <line x1="165" y1="72" x2="330" y2="72" stroke="#333" strokeWidth="0.5" />

      {/* Rung 1 */}
      <line x1="170" y1="95" x2="320" y2="95" stroke="#555" strokeWidth="0.8" />
      {/* Left rail */}
      <line x1="170" y1="85" x2="170" y2="165" stroke={acc} strokeWidth="1.5" opacity="0.7" />
      {/* Right rail */}
      <line x1="320" y1="85" x2="320" y2="165" stroke={acc} strokeWidth="1.5" opacity="0.7" />

      {/* Rung 1 contact (NO) */}
      <line x1="190" y1="95" x2="210" y2="95" stroke={acc} strokeWidth="1.2" />
      <line x1="195" y1="88" x2="195" y2="102" stroke={acc} strokeWidth="1.2" />
      <line x1="205" y1="88" x2="205" y2="102" stroke={acc} strokeWidth="1.2" />
      <text x="200" y="83" textAnchor="middle"
        fontFamily="Share Tech Mono, monospace" fontSize="6" fill="#888">I0.0</text>

      {/* Rung 1 coil */}
      <line x1="270" y1="95" x2="280" y2="95" stroke={acc} strokeWidth="1.2" />
      <ellipse cx="288" cy="95" rx="8" ry="7"
        fill="none" stroke={acc} strokeWidth="1.2" />
      <line x1="296" y1="95" x2="305" y2="95" stroke={acc} strokeWidth="1.2" />
      <text x="288" y="83" textAnchor="middle"
        fontFamily="Share Tech Mono, monospace" fontSize="6" fill={acc}>Q0.0</text>

      {/* Rung 2 */}
      <line x1="170" y1="125" x2="320" y2="125" stroke="#555" strokeWidth="0.8" />
      {/* Contact NC */}
      <line x1="190" y1="125" x2="210" y2="125" stroke="#555" strokeWidth="1" />
      <line x1="195" y1="118" x2="195" y2="132" stroke="#555" strokeWidth="1" />
      <line x1="205" y1="118" x2="205" y2="132" stroke="#555" strokeWidth="1" />
      <line x1="193" y1="116" x2="207" y2="134" stroke="#888" strokeWidth="0.8" />
      <text x="200" y="113" textAnchor="middle"
        fontFamily="Share Tech Mono, monospace" fontSize="6" fill="#666">I0.1</text>

      {/* Timer block */}
      <rect x="245" y="115" width="40" height="22" rx="2"
        fill="#1a1a1a" stroke="#555" strokeWidth="0.8" />
      <text x="265" y="125" textAnchor="middle"
        fontFamily="Share Tech Mono, monospace" fontSize="6.5" fill="#888">TON</text>
      <text x="265" y="133" textAnchor="middle"
        fontFamily="Share Tech Mono, monospace" fontSize="6" fill="#555">T#2s</text>

      {/* Rung 3 */}
      <line x1="170" y1="155" x2="320" y2="155" stroke="#333" strokeWidth="0.5" strokeDasharray="3,2" />

      <text x="200" y="210" textAnchor="middle"
        fontFamily="Share Tech Mono, monospace" fontSize="8" fill="#444" letterSpacing="3">
        INDUSTRIAL AUTOMATION
      </text>
    </IllustrationBase>
  )
}

// ─── 4. Hardware / High-Voltage ───────────────────────────────────
export function HardwareIllustration() {
  const acc = '#c0392b'
  return (
    <IllustrationBase accent={acc}>
      {/* Transformer core */}
      <rect x="160" y="65" width="80" height="90" rx="3"
        fill="#111" stroke="#333" strokeWidth="1" />
      {/* Core laminations */}
      {[0,1,2,3,4,5,6,7].map(i => (
        <line key={`lam${i}`} x1="165" y1={70 + i*10} x2="235" y2={70 + i*10}
          stroke="#222" strokeWidth="0.8" />
      ))}

      {/* Primary winding left */}
      {[0,1,2,3,4].map(i => (
        <ellipse key={`pw${i}`} cx="148" cy={80 + i*15} rx="14" ry="6"
          fill="none" stroke={acc} strokeWidth="1.5" opacity="0.8" />
      ))}
      <line x1="148" y1="68" x2="148" y2="75" stroke={acc} strokeWidth="1.2" opacity="0.8" />
      <line x1="148" y1="148" x2="148" y2="155" stroke={acc} strokeWidth="1.2" opacity="0.8" />
      <text x="110" y="112" textAnchor="middle"
        fontFamily="Share Tech Mono, monospace" fontSize="7" fill={acc} opacity="0.7">~220V</text>

      {/* Secondary winding right */}
      {[0,1,2].map(i => (
        <ellipse key={`sw${i}`} cx="252" cy={88 + i*15} rx="14" ry="6"
          fill="none" stroke="#7c3aed" strokeWidth="1.5" opacity="0.7" />
      ))}
      <line x1="252" y1="76" x2="252" y2="83" stroke="#7c3aed" strokeWidth="1.2" opacity="0.7" />
      <line x1="252" y1="130" x2="252" y2="137" stroke="#7c3aed" strokeWidth="1.2" opacity="0.7" />

      {/* HV output lines */}
      <line x1="252" y1="76" x2="310" y2="76" stroke="#7c3aed" strokeWidth="1" opacity="0.6" />
      <line x1="252" y1="137" x2="310" y2="137" stroke="#7c3aed" strokeWidth="1" opacity="0.6" />

      {/* Warning symbol */}
      <polygon points="330,95 350,135 310,135"
        fill="none" stroke={acc} strokeWidth="1.5" opacity="0.8" />
      <line x1="330" y1="105" x2="330" y2="120" stroke={acc} strokeWidth="1.5" opacity="0.8" />
      <circle cx="330" cy="126" r="1.5" fill={acc} opacity="0.8" />
      <text x="330" y="148" textAnchor="middle"
        fontFamily="Share Tech Mono, monospace" fontSize="6" fill={acc} opacity="0.6">HV</text>

      {/* Input lines left */}
      <line x1="60" y1="75" x2="134" y2="75" stroke={acc} strokeWidth="1" opacity="0.6" />
      <line x1="60" y1="155" x2="134" y2="155" stroke={acc} strokeWidth="1" opacity="0.6" />
      {/* AC symbol */}
      <path d="M 72 75 Q 76 65 80 75 Q 84 85 88 75" fill="none"
        stroke={acc} strokeWidth="1.2" opacity="0.7" />

      {/* Capacitor on output */}
      <line x1="310" y1="76" x2="310" y2="100" stroke="#7c3aed" strokeWidth="1" opacity="0.5" />
      <line x1="300" y1="100" x2="320" y2="100" stroke="#aaa" strokeWidth="1.5" />
      <line x1="300" y1="105" x2="320" y2="105" stroke="#aaa" strokeWidth="1.5" />
      <line x1="310" y1="105" x2="310" y2="137" stroke="#7c3aed" strokeWidth="1" opacity="0.5" />

      {/* Gear decoration bottom-left */}
      <g transform="translate(75,105)">
        {[0,45,90,135,180,225,270,315].map(deg => {
          const r = deg * Math.PI / 180
          return <rect key={deg} x={-3 + 18*Math.cos(r)} y={-3 + 18*Math.sin(r)}
            width="6" height="6" rx="1"
            fill="#1e1e1e" stroke="#333" strokeWidth="0.8"
            transform={`rotate(${deg}, ${18*Math.cos(r)+3}, ${18*Math.sin(r)+3})`} />
        })}
        <circle cx="0" cy="0" r="13" fill="none" stroke="#333" strokeWidth="1.2" />
        <circle cx="0" cy="0" r="5" fill="#1a1a1a" stroke="#444" strokeWidth="1" />
      </g>

      <text x="200" y="210" textAnchor="middle"
        fontFamily="Share Tech Mono, monospace" fontSize="8" fill="#444" letterSpacing="3">
        HARDWARE
      </text>
    </IllustrationBase>
  )
}

// ─── 5. Software / Code ───────────────────────────────────────────
export function SoftwareIllustration() {
  const acc = '#c0392b'
  return (
    <IllustrationBase accent={acc}>
      {/* Terminal window */}
      <rect x="60" y="45" width="280" height="145" rx="6"
        fill="#111" stroke="#2a2a2a" strokeWidth="1.2" />
      {/* Title bar */}
      <rect x="60" y="45" width="280" height="24" rx="6"
        fill="#1a1a1a" />
      <rect x="60" y="57" width="280" height="12" fill="#1a1a1a" />
      {/* Traffic lights */}
      <circle cx="80" cy="57" r="4" fill="#ff5f57" />
      <circle cx="94" cy="57" r="4" fill="#febc2e" />
      <circle cx="108" cy="57" r="4" fill="#28c840" />
      <text x="200" y="61" textAnchor="middle"
        fontFamily="Share Tech Mono, monospace" fontSize="7" fill="#555">controlman — bash</text>

      {/* Code lines */}
      {/* Line 1 */}
      <text x="78" y="90" fontFamily="Share Tech Mono, monospace" fontSize="9" fill="#555">$</text>
      <text x="88" y="90" fontFamily="Share Tech Mono, monospace" fontSize="9" fill="#7a7a7a">git clone</text>
      <text x="148" y="90" fontFamily="Share Tech Mono, monospace" fontSize="9" fill={acc} opacity="0.8"> project.git</text>

      {/* Line 2 */}
      <text x="78" y="106" fontFamily="Share Tech Mono, monospace" fontSize="9" fill="#3a3a3a">// PLC init sequence</text>

      {/* Line 3 */}
      <text x="78" y="122" fontFamily="Share Tech Mono, monospace" fontSize="9" fill="#7c3aed" opacity="0.9">void</text>
      <text x="106" y="122" fontFamily="Share Tech Mono, monospace" fontSize="9" fill="#c0c0c0"> setup</text>
      <text x="148" y="122" fontFamily="Share Tech Mono, monospace" fontSize="9" fill="#666">() {'{'}</text>

      {/* Line 4 */}
      <text x="92" y="138" fontFamily="Share Tech Mono, monospace" fontSize="9" fill={acc} opacity="0.85">PLC</text>
      <text x="113" y="138" fontFamily="Share Tech Mono, monospace" fontSize="9" fill="#7a7a7a">.init(</text>
      <text x="148" y="138" fontFamily="Share Tech Mono, monospace" fontSize="9" fill="#7c3aed" opacity="0.8">24</text>
      <text x="163" y="138" fontFamily="Share Tech Mono, monospace" fontSize="9" fill="#555">);</text>

      {/* Line 5 */}
      <text x="78" y="154" fontFamily="Share Tech Mono, monospace" fontSize="9" fill="#666">{'}'}</text>

      {/* Blinking cursor */}
      <rect x="88" y="160" width="7" height="10" rx="1" fill={acc} opacity="0.7">
        <animate attributeName="opacity" values="0.7;0;0.7" dur="1.1s" repeatCount="indefinite" />
      </rect>

      {/* Right side decorative brackets */}
      <text x="355" y="100" fontFamily="Share Tech Mono, monospace" fontSize="40"
        fill={acc} opacity="0.07">{'}'}</text>

      <text x="200" y="210" textAnchor="middle"
        fontFamily="Share Tech Mono, monospace" fontSize="8" fill="#444" letterSpacing="3">
        SOFTWARE
      </text>
    </IllustrationBase>
  )
}

// ─── 6. Other / Default ──────────────────────────────────────────
export function DefaultIllustration({ letter = '?' }) {
  const acc = '#c0392b'
  return (
    <IllustrationBase accent={acc}>
      {/* Orbiting rings */}
      <circle cx="200" cy="110" r="60" fill="none" stroke={acc} strokeWidth="0.8" opacity="0.2" strokeDasharray="4,4" />
      <circle cx="200" cy="110" r="40" fill="none" stroke={acc} strokeWidth="0.8" opacity="0.3" strokeDasharray="3,3" />
      <circle cx="200" cy="110" r="20" fill={acc} fillOpacity="0.1"
        stroke={acc} strokeWidth="1.2" opacity="0.6" />
      <text x="200" y="115" textAnchor="middle"
        fontFamily="Exo 2, sans-serif" fontSize="18" fontWeight="700" fill={acc} opacity="0.8">
        {letter}
      </text>
      {/* Dots on outer ring */}
      {[0, 72, 144, 216, 288].map(deg => {
        const r = deg * Math.PI / 180
        return <circle key={deg} cx={200 + 60 * Math.cos(r)} cy={110 + 60 * Math.sin(r)}
          r="3" fill={acc} opacity="0.5" />
      })}
      <text x="200" y="210" textAnchor="middle"
        fontFamily="Share Tech Mono, monospace" fontSize="8" fill="#444" letterSpacing="3">
        PROJECT
      </text>
    </IllustrationBase>
  )
}

// ─── Map: category → illustration ────────────────────────────────
export function CategoryIllustration({ category, title }) {
  switch (category) {
    case 'Embedded Systems': return <EmbeddedIllustration />
    case 'PCB Design':       return <PCBIllustration />
    case 'Industrial Automation': return <AutomationIllustration />
    case 'Hardware':         return <HardwareIllustration />
    case 'Software':         return <SoftwareIllustration />
    default:
      return <DefaultIllustration letter={(title || category || '?').charAt(0).toUpperCase()} />
  }
}
