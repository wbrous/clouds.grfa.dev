import { motion, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'

/**
 * Four wave periods across a 200-unit viewBox. Rendered at 200% width and
 * scrolled by -50% (= 100 units = 2 whole periods), so the loop is seamless.
 */
const CREST =
  'M0,12 C8.33,4 16.67,4 25,12 C33.33,20 41.67,20 50,12 ' +
  'C58.33,4 66.67,4 75,12 C83.33,20 91.67,20 100,12 ' +
  'C108.33,4 116.67,4 125,12 C133.33,20 141.67,20 150,12 ' +
  'C158.33,4 166.67,4 175,12 C183.33,20 191.67,20 200,12 ' +
  'L200,40 L0,40 Z'

/** Thrown over the rim when the rising water slams into it. */
const DROPLETS = [
  { left: '23%', size: 3, delay: 0.34, rise: 7, drift: -5 },
  { left: '38%', size: 2, delay: 0.42, rise: 11, drift: -2 },
  { left: '54%', size: 3.5, delay: 0.31, rise: 13, drift: 2 },
  { left: '69%', size: 2.5, delay: 0.44, rise: 9, drift: 4 },
  { left: '83%', size: 2, delay: 0.37, rise: 6, drift: 7 },
]

type LiquidFillProps = {
  /** sets the liquid colour — the body and crest both paint with currentColor */
  className?: string
  /** droplets flung above the rim as the water lands */
  splash?: boolean
}

/**
 * Water poured into the element, treated as a container: it rushes up from the
 * bottom, overshoots, and sloshes back to level. The crest is choppy while the
 * water is moving and damps flat as it settles.
 */
export function LiquidFill({ className, splash = false }: LiquidFillProps) {
  const reduced = useReducedMotion()

  if (reduced) {
    return (
      <motion.span
        aria-hidden
        className={cn('pointer-events-none absolute inset-0 bg-current', className)}
        style={{ zIndex: -1, borderRadius: 'inherit' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      />
    )
  }

  return (
    <span
      aria-hidden
      className={cn('pointer-events-none absolute inset-0', className)}
      style={{ zIndex: -1, borderRadius: 'inherit' }}
    >
      <span
        className="absolute inset-0 overflow-hidden"
        style={{ borderRadius: 'inherit' }}
      >
        <motion.span
          className="absolute inset-0"
          initial={{ y: '100%' }}
          animate={{ y: '0%' }}
          transition={{ type: 'spring', visualDuration: 0.7, bounce: 0.3 }}
        >
          {/* the crest rides directly on top of the body, so the wavy curve is
              the waterline while it climbs and clips away once it is brim-full */}
          <motion.span
            className="absolute inset-x-0 bottom-full h-4 origin-bottom"
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0.25 }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
          >
            {/* sized inline: the Button variants force bare descendant svgs to
                size-4, which would otherwise crush these to 16px squares */}
            <svg
              className="liquid-crest absolute top-0 left-0"
              style={{ width: '200%', height: '100%' }}
              viewBox="0 0 200 40"
              preserveAspectRatio="none"
            >
              <path d={CREST} fill="currentColor" fillOpacity="0.5" />
            </svg>
            <svg
              className="liquid-crest liquid-crest-lag absolute top-0 left-0"
              style={{ width: '200%', height: '100%' }}
              viewBox="0 0 200 40"
              preserveAspectRatio="none"
            >
              <path d={CREST} fill="currentColor" />
            </svg>
          </motion.span>
          <span className="absolute inset-0 bg-current" />
        </motion.span>
      </span>
      {splash &&
        DROPLETS.map((drop) => (
          <motion.span
            key={drop.left}
            className="absolute top-0 rounded-full bg-current"
            style={{ left: drop.left, width: drop.size, height: drop.size }}
            initial={{ y: 0, x: 0, opacity: 0, scale: 0.5 }}
            animate={{
              y: [0, -drop.rise, 3],
              x: [0, drop.drift, drop.drift * 1.4],
              opacity: [0, 0.9, 0],
              scale: [0.5, 1, 0.65],
            }}
            transition={{
              duration: 0.5,
              delay: drop.delay,
              times: [0, 0.45, 1],
              ease: ['easeOut', 'easeIn'],
            }}
          />
        ))}
    </span>
  )
}
