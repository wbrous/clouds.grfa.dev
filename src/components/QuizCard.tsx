import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { Cloud } from '@/data/clouds'

type QuizCardProps = {
  cloud: Cloud
  round: number
  total: number
  picks: Cloud[]
  picked: string | null
  onPick: (id: string) => void
  onNext: () => void
  isLast: boolean
}

export function QuizCard({
  cloud,
  round,
  total,
  picks,
  picked,
  onPick,
  onNext,
  isLast,
}: QuizCardProps) {
  return (
    <div className="mx-auto flex w-full max-w-xl flex-col gap-4">
      <p className="text-center text-sm font-semibold tracking-wide text-muted-foreground uppercase">
        Cloud {round} of {total}
      </p>
      <img
        src={cloud.image}
        alt="Mystery cloud — what genus is it?"
        loading="eager"
        className="aspect-[4/3] w-full rounded-[var(--radius)] border border-border object-cover shadow-(--shadow)"
      />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {picks.map((pick) => {
          const isCorrect = pick.id === cloud.id
          const isPicked = pick.id === picked
          return (
            <Button
              key={pick.id}
              variant="outline"
              size="lg"
              disabled={picked !== null}
              onClick={() => onPick(pick.id)}
              className={cn(
                'h-auto rounded-[var(--radius-md)] border-border bg-card py-3 font-heading text-lg whitespace-normal',
                picked !== null &&
                  isCorrect &&
                  'border-primary bg-primary text-primary-foreground hover:bg-primary',
                picked !== null &&
                  isPicked &&
                  !isCorrect &&
                  'border-destructive bg-destructive/15 text-destructive hover:bg-destructive/15',
                picked !== null && !isCorrect && !isPicked && 'opacity-50',
              )}
            >
              {pick.name}
            </Button>
          )
        })}
      </div>
      {picked !== null && (
        <div className="flex flex-col items-center gap-3">
          <p className="text-center text-lg">
            {picked === cloud.id
              ? `Yes — that's ${cloud.name}.`
              : `Not quite — that's ${cloud.name}.`}
          </p>
          <Button size="lg" onClick={onNext}>
            {isLast ? 'See my score' : 'Next cloud'}
          </Button>
        </div>
      )}
    </div>
  )
}
