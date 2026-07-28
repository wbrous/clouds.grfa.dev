import { useEffect, useState } from 'react'
import { Heart } from 'lucide-react'
import { useReducedMotion } from 'motion/react'
import { TopNav } from '@/components/TopNav'
import { SkyPuffs } from '@/components/SkyPuffs'
import { CloudDivider } from '@/components/CloudDivider'
import { RainTransition, type FloodPhase } from '@/components/RainTransition'
import { AtlasPage } from '@/pages/AtlasPage'
import { QuizPage } from '@/pages/QuizPage'

type Route = 'atlas' | 'quiz'

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
  const reduced = useReducedMotion()
  /* The page on screen lags the route while the water is on its way up, so the
     swap happens hidden behind a flooded screen. */
  const [shown, setShown] = useState<Route>(route)
  const [phase, setPhase] = useState<FloodPhase>('idle')

  useEffect(() => {
    if (route === shown) return
    if (reduced) {
      setShown(route)
      window.scrollTo(0, 0)
      return
    }
    setPhase('flood')
  }, [route, shown, reduced])

  return (
    <>
      <SkyPuffs />
      <TopNav route={route} />
      <main className="flex-1 overflow-x-clip">
        {shown === 'quiz' ? <QuizPage /> : <AtlasPage />}
      </main>
      <footer className="pb-8">
        <CloudDivider />
        <br />
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
      <RainTransition
        phase={phase}
        onFlooded={() => {
          setShown(route)
          window.scrollTo(0, 0)
          setPhase('drain')
        }}
        onDrained={() => setPhase('idle')}
      />
    </>
  )
}

export default App
