import { useState } from 'react'
import { CloudSun } from 'lucide-react'
import { motion, useMotionValueEvent, useScroll } from 'motion/react'
import { cn } from '@/lib/utils'

type Route = 'atlas' | 'quiz'

export function TopNav({ route }: { route: Route }) {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 24))

  return (
    <div className="sticky top-3 z-20 px-3 pb-3 sm:top-4 sm:px-6 sm:pb-4">
      <header
        className={cn(
          'glass glass-ultra mx-auto max-w-2xl rounded-full transition-shadow',
          scrolled && 'glass-scrolled',
        )}
      >
        <nav className="flex items-center justify-center gap-2 px-3 py-2 sm:gap-3 sm:px-5 sm:py-2.5">
          <a
            href="#/"
            className="mr-auto flex items-center gap-2 font-heading text-xl font-semibold text-foreground no-underline"
          >
            <CloudSun className="size-6 shrink-0 text-primary" aria-hidden />
            <span className="hidden sm:inline">The Cloud Atlas</span>
          </a>
          <NavPill href="#/" active={route === 'atlas'}>
            Atlas
          </NavPill>
          <NavPill href="#/quiz" active={route === 'quiz'}>
            Quiz
          </NavPill>
        </nav>
      </header>
    </div>
  )
}

function NavPill({
  href,
  active,
  children,
}: {
  href: string
  active: boolean
  children: React.ReactNode
}) {
  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.92 }}
      transition={{ type: 'spring', visualDuration: 0.2, bounce: 0.5 }}
      className={cn(
        'relative z-0 overflow-hidden rounded-full border border-border px-4 py-1.5 text-sm font-medium no-underline transition-colors',
        active
          ? 'border-primary text-primary-foreground'
          : 'glass text-foreground hover:bg-white/70',
      )}
    >
      {/* fill/drain like water: pours in from the left when this pill becomes
          active and recedes out to the right when it stops, with enough spring
          to carry the weight of the liquid as it lands */}
      <motion.span
        aria-hidden
        className="absolute inset-0 bg-primary"
        style={{ zIndex: -1, transformOrigin: active ? '0% 50%' : '100% 50%' }}
        initial={false}
        animate={{ scaleX: active ? 1 : 0 }}
        transition={{ type: 'spring', visualDuration: 0.55, bounce: 0.3 }}
      />
      {children}
    </motion.a>
  )
}
