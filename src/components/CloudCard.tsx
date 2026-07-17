import { Cloud as CloudIcon } from 'lucide-react'
import type { Cloud } from '@/data/clouds'
import { Card, CardContent } from '@/components/ui/card'

export function CloudCard({ cloud }: { cloud: Cloud }) {
  return (
    <Card className="overflow-hidden pt-0">
      <img
        src={cloud.image}
        alt={`${cloud.name} clouds`}
        loading="lazy"
        className="aspect-[4/3] w-full rounded-t-[var(--radius)] object-cover"
      />
      <CardContent className="flex flex-col gap-3">
        <div>
          <h2 className="font-heading text-2xl">{cloud.name}</h2>
          <p className="text-sm tracking-wide text-muted-foreground uppercase">
            “{cloud.latinMeaning}” · {cloud.altitudeLabel}
          </p>
        </div>
        <p className="text-[0.95rem] leading-relaxed">{cloud.description}</p>
        <div>
          {/*<p className="mb-1.5 text-sm font-semibold tracking-wide text-muted-foreground uppercase">
            Look for
          </p>*/}
          <ul className="flex flex-col gap-1.5">
            {cloud.lookFor.map((clue) => (
              <li key={clue} className="flex items-start gap-2 text-[0.95rem]">
                <CloudIcon
                  className="mt-0.5 size-4 shrink-0 text-primary"
                  aria-hidden
                />
                {clue}
              </li>
            ))}
          </ul>
        </div>
        <p className="rounded-lg bg-accent/60 p-3 text-sm text-accent-foreground">
          {cloud.funFact}
        </p>
        <p className="text-xs text-muted-foreground">{cloud.credit}</p>
      </CardContent>
    </Card>
  )
}
