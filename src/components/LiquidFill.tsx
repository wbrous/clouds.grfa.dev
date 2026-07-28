import { motion, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'

/**
 * Four wave periods across a 200-unit viewBox, oscillating around the vertical
 * centre (y=20) so the crest can be centred on the waterline. Rendered at 200%
 * width and scrolled by -50% (= 100 units = 2 whole periods) to loop seamlessly.
 */
const CREST =
  'M0,20 C8.33,12 16.67,12 25,20 C33.33,28 41.67,28 50,20 ' +
  'C58.33,12 66.67,12 75,20 C83.33,28 91.67,28 100,20 ' +
  'C108.33,12 116.67,12 125,20 C133.33,28 141.67,28 150,20 ' +
  'C158.33,12 166.67,12 175,20 C183.33,28 191.67,28 200,20 ' +
  'L200,40 L0,40 Z'

/** Thrown over the rim as the water reaches the top. */
const DROPLETS = [
  { left: '23%', size: 3, delay: 0.53, rise: 7, drift: -5 },
  { left: '38%', size: 2, delay: 0.61, rise: 11, drift: -2 },
  { left: '54%', size: 3.5, delay: 0.5, rise: 13, drift: 2 },
  { left: '69%', size: 2.5, delay: 0.63, rise: 9, drift: 4 },
  { left: '83%', size: 2, delay: 0.57, rise: 6, drift: 7 },
]

type LiquidFillProps = {
  /** sets the liquid colour — the body and crest both paint with currentColor */
  className?: string
  /** droplets flung over the rim as the water lands */
  splash?: boolean
}

/**
 * Water poured into the element, treated as a container. The level rises
 * monotonically and eases off as it reaches the brim — it never overshoots and
 * drops back, because a filling container doesn't do that. The weight instead
 * shows up in the surface: the crest is choppy and tilts while the water is
 * moving, then damps level once it settles.
 */
export function LiquidFill({ className, splash = false }: LiquidFillProps) {
  const reduced = useReducedMotion()

  if (reduced) {
    return (
      <motion.span
        aria-hidden
        className={cn('pointer-events-none absolute inset-0 bg-current', className)}
        style={{ zIndex: 0, borderRadius: 'inherit' }}
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
      style={{ zIndex: 0, borderRadius: 'inherit' }}
    >
      <span
        className="liquid-clip absolute inset-0 overflow-hidden"
        style={{ borderRadius: 'inherit' }}
      >
        {/* runs past the bottom of the container so no sliver can show under it */}
        <motion.span
          className="absolute inset-x-0 top-0 -bottom-4"
          initial={{ y: '100%' }}
          animate={{ y: '0%' }}
          transition={{ duration: 0.7, ease: [0.45, 0, 0.2, 1] }}
        >
          {/* the crest straddles the top of the body — its own centre line is
              the waterline, so it can tilt and flatten without ever tearing a
              gap between the wave and the liquid below it */}
          <motion.span
            className="absolute inset-x-0 bottom-full h-6"
            style={{ y: '50%' }}
            initial={{ scaleY: 1, rotate: 0 }}
            animate={{ scaleY: 0.18, rotate: [0, -0.5, 0.9, -0.55, 0.28, -0.1, 0] }}
            transition={{
              scaleY: { duration: 1.25, ease: 'easeOut' },
              rotate: {
                duration: 1.5,
                times: [0, 0.25, 0.5, 0.65, 0.78, 0.9, 1],
                ease: 'easeInOut',
              },
            }}
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
