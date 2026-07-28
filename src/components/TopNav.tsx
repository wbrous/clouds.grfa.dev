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
    <a
      href={href}
      className={cn(
        'relative z-0 rounded-full border border-border px-4 py-1.5 text-sm font-medium no-underline transition-colors',
        active
          ? 'border-primary text-primary-foreground'
          : 'glass text-foreground hover:bg-white/70',
      )}
    >
      {active && (
        <motion.span
          layoutId="nav-pill-active"
          className="absolute inset-0 rounded-full bg-primary"
          style={{ zIndex: -1 }}
        />
      )}
      {children}
    </a>
  )
}
