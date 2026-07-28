import { motion } from 'motion/react'
import { CREST } from '@/lib/liquid'

export type FloodPhase = 'idle' | 'flood' | 'drain'

/** Deterministic scatter — random() would reshuffle the rain on every render. */
const DROPS = Array.from({ length: 24 }, (_, i) => {
  const jitter = ((i * 9301 + 49297) % 233280) / 233280
  return {
    id: i,
    left: `${(i * 4.17 + jitter * 3.6) % 100}%`,
    delay: jitter * 0.55,
    duration: 0.5 + jitter * 0.4,
    length: 9 + jitter * 15,
    opacity: 0.2 + jitter * 0.4,
  }
})

/** The water starts climbing a beat after the rain does, so it reads as cause
 * and effect rather than two things moving at once. */
const RISE_DELAY = 0.22
const RISE = 0.8
const FALL = 0.62

function CloudBank() {
  return (
    <svg
      className="w-full"
      style={{ height: 132 }}
      viewBox="0 0 1200 132"
      preserveAspectRatio="none"
      aria-hidden
    >
      <g fill="#EFEAFA" fillOpacity="0.55">
        <rect x="0" y="-40" width="1200" height="92" />
        <ellipse cx="90" cy="60" rx="110" ry="48" />
        <ellipse cx="300" cy="66" rx="130" ry="54" />
        <ellipse cx="530" cy="58" rx="115" ry="46" />
        <ellipse cx="760" cy="68" rx="135" ry="55" />
        <ellipse cx="980" cy="60" rx="120" ry="48" />
        <ellipse cx="1160" cy="64" rx="110" ry="50" />
      </g>
      <g fill="#FFFFFF" fillOpacity="0.9">
        <rect x="0" y="-40" width="1200" height="74" />
        <ellipse cx="140" cy="40" rx="105" ry="42" />
        <ellipse cx="360" cy="46" rx="120" ry="46" />
        <ellipse cx="590" cy="38" rx="108" ry="40" />
        <ellipse cx="820" cy="47" rx="125" ry="47" />
        <ellipse cx="1050" cy="40" rx="112" ry="42" />
      </g>
    </svg>
  )
}

/**
 * Page-to-page weather: clouds roll in overhead, it rains, the screen floods,
 * and once the water has covered everything the page underneath is swapped and
 * the water drains away to reveal it.
 */
export function RainTransition({
  phase,
  onFlooded,
  onDrained,
}: {
  phase: FloodPhase
  /** water has covered the screen — safe to swap the page underneath */
  onFlooded: () => void
  /** water is gone — transition over */
  onDrained: () => void
}) {
  const raining = phase === 'flood'

  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
      aria-hidden
    >
      <motion.div
        className="absolute inset-x-0 top-0"
        initial={{ y: '-100%' }}
        animate={{ y: raining ? '0%' : '-100%' }}
        transition={{ duration: raining ? 0.42 : 0.5, ease: [0.3, 0, 0.2, 1] }}
      >
        <CloudBank />
      </motion.div>

      <motion.div
        className="absolute inset-0"
        animate={{ opacity: raining ? 1 : 0 }}
        transition={{ duration: raining ? 0.2 : 0.3 }}
      >
        {DROPS.map((drop) => (
          <motion.span
            key={drop.id}
            className="absolute top-0 w-[2px] rounded-full bg-white"
            style={{ left: drop.left, height: drop.length, opacity: drop.opacity }}
            initial={{ y: '-10vh' }}
            animate={{ y: '106vh' }}
            transition={{
              duration: drop.duration,
              delay: drop.delay,
              repeat: Infinity,
              ease: 'easeIn',
            }}
          />
        ))}
      </motion.div>

      {/* the flood itself, same liquid vocabulary as the buttons */}
      <motion.div
        className="absolute inset-x-0 top-0 -bottom-10"
        initial={{ y: '100%' }}
        animate={{ y: phase === 'flood' ? '0%' : '100%' }}
        transition={
          phase === 'flood'
            ? { duration: RISE, delay: RISE_DELAY, ease: [0.4, 0, 0.25, 1] }
            : { duration: FALL, ease: [0.55, 0, 0.75, 1] }
        }
        onAnimationComplete={() => {
          if (phase === 'flood') onFlooded()
          else if (phase === 'drain') onDrained()
        }}
      >
        <motion.div
          className="absolute inset-x-0 bottom-full text-[#7C6BD9]"
          style={{ height: 44, y: '50%' }}
          initial={{ scaleY: 1, rotate: 0 }}
          animate={{ scaleY: 0.35, rotate: [0, -0.6, 0.8, -0.45, 0.2, 0] }}
          transition={{
            scaleY: { duration: 1.1, ease: 'easeOut' },
            rotate: {
              duration: 1.6,
              times: [0, 0.25, 0.5, 0.68, 0.85, 1],
              ease: 'easeInOut',
            },
          }}
        >
          <svg
            className="liquid-crest absolute top-0 left-0"
            style={{ width: '200%', height: '100%' }}
            viewBox="0 0 200 40"
            preserveAspectRatio="none"
          >
            <path d={CREST} fill="currentColor" fillOpacity="0.45" />
          </svg>
          <svg
            className="liquid-crest liquid-crest-lag absolute top-0 left-0"
            style={{ width: '200%', height: '100%' }}
            viewBox="0 0 200 40"
            preserveAspectRatio="none"
          >
            <path d={CREST} fill="currentColor" />
          </svg>
        </motion.div>
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, #8FB8E8 0%, #7C6BD9 55%, #5F4EB0 100%)',
          }}
        />
      </motion.div>
    </div>
  )
}
