import { useRef, useState } from 'react'
import { CloudSun } from 'lucide-react'
import { motion, useMotionValueEvent, useScroll } from 'motion/react'
import { cn } from '@/lib/utils'

type Route = 'atlas' | 'quiz'

const ROUTE_ORDER: Record<Route, number> = { atlas: 0, quiz: 1 }

export function TopNav({ route }: { route: Route }) {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 24))

  /* Which way the water should travel. Held in a ref rather than derived per
     render so it survives the re-renders `scrolled` triggers mid-animation —
     recomputing it to 0 partway through would flip the origin and jump. */
  const prevRoute = useRef(route)
  const flow = useRef(1)
  if (prevRoute.current !== route) {
    flow.current = ROUTE_ORDER[route] > ROUTE_ORDER[prevRoute.current] ? 1 : -1
    prevRoute.current = route
  }

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
          <NavPill href="#/" active={route === 'atlas'} flow={flow.current}>
            Atlas
          </NavPill>
          <NavPill href="#/quiz" active={route === 'quiz'} flow={flow.current}>
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
  flow,
  children,
}: {
  href: string
  active: boolean
  /** 1 when moving right along the nav, -1 when moving back left */
  flow: number
  children: React.ReactNode
}) {
  /* The liquid always travels the way you navigated: the pill being filled
     takes it in at its trailing edge while the one being emptied lets it out
     of the same side, so the two read as one body of water crossing the bar. */
  const fromLeadingEdge = active === (flow > 0)

  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.92 }}
      transition={{ type: 'spring', visualDuration: 0.2, bounce: 0.5 }}
      className={cn(
        'relative z-0 rounded-full border border-border px-4 py-1.5 text-sm font-medium no-underline transition-colors',
        active
          ? 'border-primary text-primary-foreground'
          : 'glass text-foreground hover:bg-white/70',
      )}
    >
      {/* a plain span does the clipping, never the animated pill itself, so the
          rounded clip holds up on WebKit */}
      <span
        aria-hidden
        className="liquid-clip absolute inset-0 overflow-hidden rounded-full"
      >
        <motion.span
          className="absolute inset-0 bg-primary"
          style={{ transformOrigin: fromLeadingEdge ? '0% 50%' : '100% 50%' }}
          initial={false}
          animate={{ scaleX: active ? 1 : 0 }}
          transition={{ type: 'spring', visualDuration: 0.55, bounce: 0.3 }}
        />
      </span>
      <span className="relative z-10">{children}</span>
    </motion.a>
  )
}
