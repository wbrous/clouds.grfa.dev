import { CloudDivider } from '@/components/CloudDivider'
import { CloudCard } from '@/components/CloudCard'
import { CLOUDS } from '@/data/clouds'

export function AtlasPage() {
  return (
    <div className="px-4">
      <section className="mx-auto max-w-2xl py-8 text-center">
        <h1>Ten ways the sky shows off</h1>
        <p className="text-lg text-muted-foreground">
          A field guide to the clouds above you, from highest wisps to lowest
          grumbles.
        </p>
      </section>
      <CloudDivider />
      <section className="grid grid-cols-1 gap-6 py-6 sm:grid-cols-2 lg:grid-cols-3">
        {CLOUDS.map((cloud) => (
          <CloudCard key={cloud.id} cloud={cloud} />
        ))}
      </section>
    </div>
  )
}
