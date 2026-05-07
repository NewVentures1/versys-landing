import { motion } from "motion/react";

/**
 * Programmatic SVG mockup of the Versys fuel card.
 * Intentionally photo-free — swap for the retouched product photo
 * by replacing this component's import in FuelProgramSection.
 */
export default function FuelCardMockup() {
  return (
    <motion.div
      className="w-full max-w-[480px] mx-auto select-none"
      animate={{ rotate: -3 }}
      whileHover={{ rotate: 0, scale: 1.02 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      aria-label="Versys fuel card mockup"
      role="img"
    >
      <svg
        viewBox="0 0 600 380"
        className="w-full h-auto drop-shadow-[0_30px_60px_rgba(22,176,90,0.25)]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="cardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#16B05A" />
            <stop offset="55%" stopColor="#0E7C3F" />
            <stop offset="100%" stopColor="#0A4A28" />
          </linearGradient>
          <linearGradient id="chipGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F4D88E" />
            <stop offset="100%" stopColor="#A8842A" />
          </linearGradient>
          <linearGradient
            id="shineGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="40%" stopColor="#ffffff" stopOpacity="0.18" />
            <stop offset="60%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Card body */}
        <rect width="600" height="380" rx="28" fill="url(#cardGradient)" />

        {/* Faded oversized VT mark on the right */}
        <text
          x="500"
          y="320"
          fontSize="320"
          fontFamily="ui-sans-serif, system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fill="#ffffff"
          opacity="0.05"
          textAnchor="middle"
          letterSpacing="-18"
        >
          VT
        </text>

        {/* Diagonal shine */}
        <rect
          width="600"
          height="380"
          rx="28"
          fill="url(#shineGradient)"
          pointerEvents="none"
        />

        {/* Top highlight edge */}
        <rect
          width="600"
          height="2"
          y="0"
          rx="28"
          fill="#ffffff"
          opacity="0.18"
        />

        {/* VT logo top-left */}
        <text
          x="48"
          y="105"
          fontSize="68"
          fontFamily="ui-sans-serif, system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fill="#ffffff"
          letterSpacing="-3"
        >
          VT
        </text>
        <text
          x="48"
          y="130"
          fontSize="13"
          fontFamily="ui-sans-serif, system-ui, -apple-system, sans-serif"
          fontWeight="700"
          fill="#ffffff"
          letterSpacing="6"
          opacity="0.9"
        >
          VERSYS
        </text>

        {/* Chip */}
        <g transform="translate(50, 200)">
          <rect width="78" height="58" rx="8" fill="url(#chipGradient)" />
          <line
            x1="0"
            y1="20"
            x2="78"
            y2="20"
            stroke="#7A5C20"
            strokeWidth="0.8"
            opacity="0.55"
          />
          <line
            x1="0"
            y1="38"
            x2="78"
            y2="38"
            stroke="#7A5C20"
            strokeWidth="0.8"
            opacity="0.55"
          />
          <line
            x1="39"
            y1="0"
            x2="39"
            y2="58"
            stroke="#7A5C20"
            strokeWidth="0.8"
            opacity="0.55"
          />
        </g>

        {/* Contactless icon — three concentric arcs opening to the right */}
        <g transform="translate(160, 230)" opacity="0.95">
          <path
            d="M 0 -22 A 22 22 0 0 1 0 22"
            stroke="#ffffff"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M -8 -16 A 16 16 0 0 1 -8 16"
            stroke="#ffffff"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M -16 -10 A 10 10 0 0 1 -16 10"
            stroke="#ffffff"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
        </g>

        {/* Bottom-right label */}
        <text
          x="552"
          y="340"
          fontSize="13"
          fontFamily="ui-sans-serif, system-ui, -apple-system, sans-serif"
          fontWeight="700"
          fill="#ffffff"
          textAnchor="end"
          letterSpacing="4"
          opacity="0.92"
        >
          FUEL CARD
        </text>
      </svg>
    </motion.div>
  );
}
