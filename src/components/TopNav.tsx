import { CloudSun } from 'lucide-react'
import { cn } from '@/lib/utils'

type Route = 'atlas' | 'quiz'

export function TopNav({ route }: { route: Route }) {
  return (
    <header className="sticky top-0 z-10 bg-background/70 backdrop-blur">
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
        'rounded-full border border-border px-4 py-1.5 text-sm font-medium no-underline transition-colors',
        active
          ? 'border-primary bg-primary text-primary-foreground'
          : 'bg-card text-foreground hover:bg-muted',
      )}
    >
      {children}
    </a>
  )
}
