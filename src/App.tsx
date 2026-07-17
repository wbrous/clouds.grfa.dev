import { useEffect, useState } from 'react'
import { TopNav } from '@/components/TopNav'
import { CloudDivider } from '@/components/CloudDivider'
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
  return (
    <>
      <TopNav route={route} />
      <main className="flex-1">
        {route === 'quiz' ? <QuizPage /> : <AtlasPage />}
      </main>
      <footer className="pb-8">
        <CloudDivider />
        <p className="text-center text-sm text-muted-foreground">
          Photos from Wikimedia Commons · Built for looking up
        </p>
      </footer>
    </>
  )
}

export default App
