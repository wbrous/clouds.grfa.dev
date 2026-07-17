import { motion, useScroll, useTransform } from 'motion/react'

export function SkyPuffs() {
  const { scrollY } = useScroll()
  const yTop = useTransform(scrollY, [0, 800], [0, 40])
  const yLeft = useTransform(scrollY, [0, 800], [0, -30])

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
    >
      <motion.div className="absolute -top-10 right-[8%]" style={{ y: yTop }}>
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
      <motion.div className="absolute top-[45%] -left-16" style={{ y: yLeft }}>
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
    </div>
  )
}
