import { motion, useScroll, useTransform } from 'motion/react'

export function SkyPuffs() {
  const { scrollY } = useScroll()
  const yTop = useTransform(scrollY, [0, 1200], [0, 70])
  const yLeft = useTransform(scrollY, [0, 1200], [0, -50])
  const yFar = useTransform(scrollY, [0, 1200], [0, 25])
  const rotTop = useTransform(scrollY, [0, 1200], [0, 3])
  const rotLeft = useTransform(scrollY, [0, 1200], [0, -2.5])
  const scaleTop = useTransform(scrollY, [0, 600, 1200], [1, 1.04, 1.08])
  const fadeFar = useTransform(scrollY, [0, 500], [0.6, 1])

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
    >
      <motion.div
        className="absolute -top-10 right-[8%]"
        style={{ y: yTop, rotate: rotTop, scale: scaleTop }}
      >
        <div className="sky-puff-track" style={{ animationDuration: '70s' }}>
          <svg
            width="480"
            height="200"
            viewBox="0 0 480 200"
            fill="none"
            style={{ filter: 'blur(2px)' }}
          >
            <ellipse cx="140" cy="140" rx="120" ry="55" fill="#FFFFFF" fillOpacity="0.25" />
            <ellipse cx="250" cy="120" rx="100" ry="60" fill="#FFFFFF" fillOpacity="0.25" />
            <ellipse cx="350" cy="140" rx="90" ry="50" fill="#FFFFFF" fillOpacity="0.25" />
            <ellipse cx="200" cy="90" rx="70" ry="40" fill="#FFFFFF" fillOpacity="0.25" />
            <ellipse cx="300" cy="85" rx="60" ry="35" fill="#FFFFFF" fillOpacity="0.25" />
          </svg>
        </div>
      </motion.div>
      <motion.div
        className="absolute top-[45%] -left-16"
        style={{ y: yLeft, rotate: rotLeft }}
      >
        <div className="sky-puff-track" style={{ animationDuration: '90s' }}>
          <svg
            width="380"
            height="160"
            viewBox="0 0 380 160"
            fill="none"
            style={{ filter: 'blur(2px)' }}
          >
            <ellipse cx="110" cy="110" rx="95" ry="45" fill="#FFFFFF" fillOpacity="0.25" />
            <ellipse cx="200" cy="95" rx="80" ry="48" fill="#FFFFFF" fillOpacity="0.25" />
            <ellipse cx="285" cy="112" rx="75" ry="42" fill="#FFFFFF" fillOpacity="0.25" />
            <ellipse cx="160" cy="70" rx="55" ry="32" fill="#FFFFFF" fillOpacity="0.25" />
          </svg>
        </div>
      </motion.div>
      <motion.div
        className="absolute top-[72%] right-[22%]"
        style={{ y: yFar, opacity: fadeFar }}
      >
        <div className="sky-puff-track" style={{ animationDuration: '120s' }}>
          <svg
            width="260"
            height="110"
            viewBox="0 0 260 110"
            fill="none"
            style={{ filter: 'blur(3px)' }}
          >
            <ellipse cx="70" cy="70" rx="62" ry="28" fill="#FFFFFF" fillOpacity="0.18" />
            <ellipse cx="135" cy="58" rx="55" ry="32" fill="#FFFFFF" fillOpacity="0.18" />
            <ellipse cx="195" cy="70" rx="48" ry="26" fill="#FFFFFF" fillOpacity="0.18" />
          </svg>
        </div>
      </motion.div>
    </div>
  )
}
