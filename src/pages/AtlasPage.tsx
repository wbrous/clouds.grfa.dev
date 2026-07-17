import { motion, stagger } from 'motion/react'
import { CloudDivider } from '@/components/CloudDivider'
import { CloudCard } from '@/components/CloudCard'
import { CLOUDS } from '@/data/clouds'

const item = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', visualDuration: 0.5, bounce: 0.15 },
  },
} as const

export function AtlasPage() {
  return (
    <div className="px-4">
      <motion.section
        className="mx-auto max-w-2xl py-8 text-center"
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { delayChildren: stagger(0.12) } } }}
      >
        <motion.h1 variants={item}>Ten ways the sky shows off</motion.h1>
        <motion.p className="text-lg text-muted-foreground" variants={item}>
          A field guide to the clouds above you, from highest wisps to lowest
          grumbles.
        </motion.p>
      </motion.section>
      <CloudDivider />
      <motion.section
        className="grid grid-cols-1 gap-6 py-6 sm:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { delayChildren: stagger(0.06) } } }}
      >
        {CLOUDS.map((cloud) => (
          <CloudCard key={cloud.id} cloud={cloud} />
        ))}
      </motion.section>
    </div>
  )
}
