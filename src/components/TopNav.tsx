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
    <header
      className={cn(
        'sticky top-0 z-10 glass transition-shadow',
        scrolled && 'glass-scrolled',
      )}
    >
      <nav className="flex items-center justify-center gap-3 px-4 py-3">
        <a
          href="#/"
          className="mr-auto flex items-center gap-2 font-heading text-xl font-semibold text-foreground no-underline"
        >
          <CloudSun className="size-6 text-primary" aria-hidden />
          The Cloud Atlas
        </a>
        <NavPill href="#/" active={route === 'atlas'}>
          Atlas
        </NavPill>
        <NavPill href="#/quiz" active={route === 'quiz'}>
          Quiz
        </NavPill>
      </nav>
    </header>
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
