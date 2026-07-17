import { motion, useScroll, useTransform } from 'motion/react'

function CloudPuff({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 140 60"
      width="140"
      height="60"
      aria-hidden
      className={className}
    >
      <g fill="#FFFFFF" fillOpacity="0.8">
        <ellipse cx="30" cy="42" rx="26" ry="16" />
        <ellipse cx="62" cy="30" rx="30" ry="22" />
        <ellipse cx="98" cy="38" rx="28" ry="18" />
        <ellipse cx="120" cy="46" rx="20" ry="12" />
        <ellipse cx="50" cy="48" rx="34" ry="12" />
        <ellipse cx="88" cy="50" rx="30" ry="10" />
      </g>
    </svg>
  )
}

export function CloudDivider() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 600], [0, 20])

  return (
    <motion.div className="overflow-hidden py-6" style={{ y }} aria-hidden>
      <div className="cloud-divider-track flex w-max gap-16">
        <CloudPuff className="translate-y-2" />
        <CloudPuff className="-translate-y-1" />
        <CloudPuff className="translate-y-3" />
        <CloudPuff className="-translate-y-2" />
        <CloudPuff className="translate-y-1" />
        <CloudPuff className="-translate-y-1" />
      </div>
    </motion.div>
  )
}
