import { motion } from 'motion/react'
import { CREST } from '@/lib/liquid'

export type FloodPhase = 'idle' | 'flood' | 'drain'

/** Deterministic scatter — Math.random() would reshuffle on every render. */
function jitter(seed: number) {
  return ((seed * 9301 + 49297) % 233280) / 233280
}

/** Two depth layers: big fast streaks up close, thin slow ones further back. */
const DROPS_NEAR = Array.from({ length: 26 }, (_, i) => {
  const j = jitter(i)
  return {
    id: `n${i}`,
    left: `${(i * 3.85 + j * 3.2) % 100}%`,
    delay: j * 4.5,
    duration: 1.5 + j * 1.1,
    length: 26 + j * 22,
    width: 2.5,
    opacity: 0.45 + j * 0.35,
  }
})
const DROPS_FAR = Array.from({ length: 22 }, (_, i) => {
  const j = jitter(i + 100)
  return {
    id: `f${i}`,
    left: `${(i * 4.5 + j * 4) % 100}%`,
    delay: j * 4.5,
    duration: 2.2 + j * 1.4,
    length: 14 + j * 12,
    width: 1.5,
    opacity: 0.2 + j * 0.25,
  }
})

/** Splashes where rain hits the water — evenly scattered, each firing on its
 * own repeating cadence so the surface never pops all at once. */
const SPLASH_POINTS = Array.from({ length: 15 }, (_, i) => {
  const j = jitter(i + 200)
  return {
    id: i,
    left: `${(i * 6.7 + j * 5) % 100}%`,
    delay: j * 2.4,
    cycle: 1.3 + j * 1.1,
  }
})

/** The water starts climbing a beat after the rain does, so it reads as cause
 * and effect. Everything here runs at roughly 3x the pace of a normal UI
 * transition — this is a set-piece, not a click response. */
const RISE_DELAY = 0.66
const RISE = 2.4
const FALL = 1.86

function CloudBank() {
  return (
    <svg
      className="w-full"
      style={{ height: 160 }}
      viewBox="0 0 1200 160"
      preserveAspectRatio="none"
      aria-hidden
    >
      <g fill="#D8CFEF" fillOpacity="0.6">
        <rect x="0" y="-40" width="1200" height="110" />
        <ellipse cx="90" cy="78" rx="120" ry="54" />
        <ellipse cx="300" cy="86" rx="140" ry="60" />
        <ellipse cx="530" cy="76" rx="125" ry="52" />
        <ellipse cx="760" cy="88" rx="145" ry="62" />
        <ellipse cx="980" cy="78" rx="130" ry="54" />
        <ellipse cx="1160" cy="82" rx="120" ry="56" />
      </g>
      <g fill="#EFEAFA" fillOpacity="0.75">
        <rect x="0" y="-40" width="1200" height="92" />
        <ellipse cx="140" cy="52" rx="112" ry="46" />
        <ellipse cx="360" cy="60" rx="128" ry="50" />
        <ellipse cx="590" cy="50" rx="115" ry="44" />
        <ellipse cx="820" cy="61" rx="132" ry="51" />
        <ellipse cx="1050" cy="52" rx="118" ry="46" />
      </g>
      <g fill="#FFFFFF" fillOpacity="0.92">
        <rect x="0" y="-40" width="1200" height="66" />
        <ellipse cx="190" cy="30" rx="100" ry="36" />
        <ellipse cx="410" cy="34" rx="112" ry="38" />
        <ellipse cx="640" cy="28" rx="104" ry="35" />
        <ellipse cx="870" cy="35" rx="115" ry="38" />
        <ellipse cx="1090" cy="30" rx="105" ry="36" />
      </g>
    </svg>
  )
}

/** A single point on the waterline where rain lands: a couple of flicked-up
 * droplets plus a ring that spreads and fades, repeating on its own cadence
 * for as long as it's raining. */
function Splash({ left, delay, cycle }: { left: string; delay: number; cycle: number }) {
  return (
    <span className="absolute bottom-full" style={{ left }}>
      <motion.span
        className="absolute rounded-full border border-white/70"
        style={{ width: 4, height: 4, marginLeft: -2 }}
        initial={{ scaleX: 0.3, opacity: 0 }}
        animate={{ scaleX: [0.3, 3.2], opacity: [0, 0.6, 0] }}
        transition={{
          duration: 0.9,
          delay,
          repeat: Infinity,
          repeatDelay: cycle,
          ease: 'easeOut',
        }}
      />
      {[0, 1].map((k) => (
        <motion.span
          key={k}
          className="absolute rounded-full bg-white"
          style={{ width: 3 + k, height: 3 + k, marginLeft: -1.5 - k / 2 }}
          initial={{ y: 0, x: 0, opacity: 0, scale: 0.5 }}
          animate={{
            y: [0, -(10 + k * 5), 4],
            x: [0, k === 0 ? -6 : 7, k === 0 ? -9 : 11],
            opacity: [0, 0.85, 0],
            scale: [0.5, 1, 0.6],
          }}
          transition={{
            duration: 0.55,
            delay: delay + k * 0.05,
            repeat: Infinity,
            repeatDelay: cycle,
            times: [0, 0.4, 1],
            ease: ['easeOut', 'easeIn'],
          }}
        />
      ))}
    </span>
  )
}

/**
 * Page-to-page weather: clouds roll in overhead, it rains hard, the screen
 * floods edge to edge with a choppy, splashing surface, and once the water has
 * covered everything the page underneath is swapped and the water drains away
 * to reveal it.
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
        transition={{ duration: raining ? 1.26 : 1.5, ease: [0.3, 0, 0.2, 1] }}
      >
        <CloudBank />
      </motion.div>

      {/* a stormy wash behind the rain, so the whole screen reads as overcast
          rather than just a few streaks over the normal page */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(200deg, rgba(95,110,160,0.28) 0%, rgba(90,80,150,0.16) 45%, rgba(90,80,150,0) 75%)',
        }}
        animate={{ opacity: raining ? 1 : 0 }}
        transition={{ duration: raining ? 0.9 : 0.9 }}
      />

      <motion.div
        className="absolute inset-0"
        animate={{ opacity: raining ? 1 : 0 }}
        transition={{ duration: raining ? 0.6 : 0.9 }}
      >
        {DROPS_FAR.map((drop) => (
          <motion.span
            key={drop.id}
            className="absolute top-0 rounded-full bg-white"
            style={{
              left: drop.left,
              height: drop.length,
              width: drop.width,
              opacity: drop.opacity,
            }}
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
        {DROPS_NEAR.map((drop) => (
          <motion.span
            key={drop.id}
            className="absolute top-0 rounded-full bg-white"
            style={{
              left: drop.left,
              height: drop.length,
              width: drop.width,
              opacity: drop.opacity,
            }}
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

      {/* the flood itself, same liquid vocabulary as the buttons but scaled up
          into a proper choppy sea: three crests at different speeds, taller
          and rougher, plus a field of splashes where the rain lands */}
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
          style={{ height: 84, y: '50%' }}
          initial={{ scaleY: 1, rotate: 0 }}
          animate={{ scaleY: 0.42, rotate: [0, -0.7, 1, -0.6, 0.35, -0.15, 0.08, 0] }}
          transition={{
            scaleY: { duration: 3.3, ease: 'easeOut' },
            rotate: {
              duration: 4.8,
              times: [0, 0.18, 0.36, 0.52, 0.68, 0.82, 0.92, 1],
              ease: 'easeInOut',
            },
          }}
        >
          <svg
            className="liquid-crest-flood-far absolute top-0 left-0"
            style={{ width: '200%', height: '100%' }}
            viewBox="0 0 200 40"
            preserveAspectRatio="none"
          >
            <path d={CREST} fill="currentColor" fillOpacity="0.3" />
          </svg>
          <svg
            className="liquid-crest-flood absolute top-0 left-0"
            style={{ width: '200%', height: '100%' }}
            viewBox="0 0 200 40"
            preserveAspectRatio="none"
          >
            <path d={CREST} fill="currentColor" fillOpacity="0.55" />
          </svg>
          <svg
            className="liquid-crest-flood-lag absolute top-0 left-0"
            style={{ width: '200%', height: '100%' }}
            viewBox="0 0 200 40"
            preserveAspectRatio="none"
          >
            <path d={CREST} fill="currentColor" />
          </svg>
        </motion.div>

        {raining &&
          SPLASH_POINTS.map((p) => (
            <Splash key={p.id} left={p.left} delay={p.delay} cycle={p.cycle} />
          ))}

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
