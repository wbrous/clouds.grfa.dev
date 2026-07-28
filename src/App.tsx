import { useEffect, useRef, useState } from 'react'
import { Heart } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { TopNav } from '@/components/TopNav'
import { SkyPuffs } from '@/components/SkyPuffs'
import { CloudDivider } from '@/components/CloudDivider'
import { AtlasPage } from '@/pages/AtlasPage'
import { QuizPage } from '@/pages/QuizPage'

type Route = 'atlas' | 'quiz'

const ROUTE_ORDER: Record<Route, number> = { atlas: 0, quiz: 1 }

const pageVariants = {
  enter: (dir: number) => ({ opacity: 0, x: dir < 0 ? -48 : 48 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir < 0 ? 48 : -48 }),
}

function useRoute(): Route {
  const [r, setR] = useState<Route>(
    location.hash === '#/quiz' ? 'quiz' : 'atlas',
  )
  useEffect(() => {
    const on = () => setR(location.hash === '#/quiz' ? 'quiz' : 'atlas')
    addEventListener('hashchange', on)
    return () => removeEventListener('hashchange', on)
  }, [])
  return r
}

function App() {
  const route = useRoute()
  const prevIndex = useRef(ROUTE_ORDER[route])
  const direction = ROUTE_ORDER[route] - prevIndex.current

  useEffect(() => {
    prevIndex.current = ROUTE_ORDER[route]
    window.scrollTo(0, 0)
  }, [route])

  return (
    <>
      <SkyPuffs />
      <TopNav route={route} />
      <main className="flex-1 overflow-x-clip">
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.div
            key={route}
            custom={direction}
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'spring', visualDuration: 0.45, bounce: 0.15 }}
          >
            {route === 'quiz' ? <QuizPage /> : <AtlasPage />}
          </motion.div>
        </AnimatePresence>
      </main>
      <footer className="pb-8">
        <CloudDivider />
        <p className="text-center text-sm text-muted-foreground">
          Photos from Wikimedia Commons · Built for looking up
        </p>
        <p className="mt-1 flex items-center justify-center gap-1.5 text-center text-sm text-muted-foreground">
          Made with
          <Heart className="size-3.5 fill-destructive text-destructive" aria-label="love" />
          by{' '}
          <a
            href="https://github.com/wbrous"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground no-underline hover:underline"
          >
            Gir0fa
          </a>
        </p>
      </footer>
    </>
  )
}

export default App
