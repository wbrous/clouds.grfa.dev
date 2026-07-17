import { useReducer } from 'react'
import { Check, X } from 'lucide-react'
import { CLOUDS, type Cloud } from '@/data/clouds'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { QuizCard } from '@/components/QuizCard'

type Answer = { cloudId: string; picked: string; correct: boolean }

type QuizState =
  | { phase: 'start' }
  | {
      phase: 'round'
      round: number
      order: Cloud[]
      choices: Cloud[]
      picked: string | null
      answers: Answer[]
    }
  | { phase: 'done'; answers: Answer[] }

type QuizAction =
  | { type: 'start' }
  | { type: 'pick'; id: string }
  | { type: 'next' }
  | { type: 'restart' }

const TOTAL = 10

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function buildRound(order: Cloud[], round: number, answers: Answer[]) {
  const cloud = order[round]
  const distractors = shuffle(CLOUDS.filter((c) => c.id !== cloud.id)).slice(0, 3)
  return {
    phase: 'round' as const,
    round,
    order,
    choices: shuffle([cloud, ...distractors]),
    picked: null,
    answers,
  }
}

function reducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case 'start':
    case 'restart': {
      const order = shuffle(CLOUDS).slice(0, TOTAL)
      return buildRound(order, 0, [])
    }
    case 'pick':
      if (state.phase !== 'round' || state.picked !== null) return state
      return { ...state, picked: action.id }
    case 'next': {
      if (state.phase !== 'round' || state.picked === null) return state
      const cloud = state.order[state.round]
      const answers = [
        ...state.answers,
        { cloudId: cloud.id, picked: state.picked, correct: state.picked === cloud.id },
      ]
      if (state.round + 1 >= TOTAL) return { phase: 'done', answers }
      return buildRound(state.order, state.round + 1, answers)
    }
  }
}

function verdict(score: number): string {
  if (score >= 9) return 'Cloud whisperer'
  if (score >= 6) return 'Sky watcher'
  if (score >= 3) return 'Getting there, keep looking up'
  return 'The clouds forgive you'
}

const byId: Record<string, Cloud> = Object.fromEntries(
  CLOUDS.map((c) => [c.id, c]),
)

export function QuizPage() {
  const [state, dispatch] = useReducer(reducer, { phase: 'start' })

  if (state.phase === 'start') {
    return (
      <div className="flex flex-1 items-center justify-center px-4 py-16">
        <Card className="w-full max-w-lg text-center">
          <CardContent className="flex flex-col items-center gap-4 py-8">
            <h1>Name that cloud</h1>
            <p className="text-muted-foreground">
              Ten photos, ten genera. Pick the right name for each — the sky is
              watching.
            </p>
            <Button size="lg" onClick={() => dispatch({ type: 'start' })}>
              Start the quiz
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (state.phase === 'round') {
    const cloud = state.order[state.round]
    return (
      <div className="px-4 py-8">
        <QuizCard
          cloud={cloud}
          round={state.round + 1}
          total={TOTAL}
          picks={state.choices}
          picked={state.picked}
          onPick={(id) => dispatch({ type: 'pick', id })}
          onNext={() => dispatch({ type: 'next' })}
          isLast={state.round + 1 >= TOTAL}
        />
      </div>
    )
  }

  const score = state.answers.filter((a) => a.correct).length
  return (
    <div className="mx-auto flex w-full max-w-xl flex-col gap-6 px-4 py-8">
      <Card className="text-center">
        <CardContent className="flex flex-col items-center gap-2 py-8">
          <p className="font-heading text-6xl font-semibold">
            {score}/{TOTAL}
          </p>
          <p className="font-heading text-2xl">{verdict(score)}</p>
          <div className="mt-4 flex gap-3">
            <Button onClick={() => dispatch({ type: 'restart' })}>Quiz again</Button>
            <Button variant="outline" render={<a href="#/" />}>
              Back to the Atlas
            </Button>
          </div>
        </CardContent>
      </Card>
      <ul className="flex flex-col gap-2">
        {state.answers.map((answer, i) => {
          const cloud = byId[answer.cloudId]
          if (!cloud) return null
          const pickedCloud = answer.picked ? byId[answer.picked] : undefined
          return (
            <li
              key={`${answer.cloudId}-${i}`}
              className="flex items-center gap-3 rounded-[var(--radius-md)] border border-border bg-card p-3"
            >
              <img
                src={cloud.image}
                alt={cloud.name}
                loading="lazy"
                className="size-16 shrink-0 rounded-md object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="font-heading text-lg leading-tight">{cloud.name}</p>
                {!answer.correct && pickedCloud && (
                  <p className="text-sm">
                    you said <span className="text-destructive">{pickedCloud.name}</span>
                  </p>
                )}
              </div>
              {answer.correct ? (
                <Check className="size-5 shrink-0 text-primary" aria-label="Correct" />
              ) : (
                <X className="size-5 shrink-0 text-destructive" aria-label="Wrong" />
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
