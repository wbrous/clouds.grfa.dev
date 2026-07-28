export type Cloud = {
  /** slug, matches public/clouds/<id>.jpg */
  id: string
  /** e.g. "Cumulus" */
  name: string
  /** plain-English reading of the Latin name, e.g. "heap" */
  latinMeaning: string
  altitude: 'high' | 'middle' | 'low' | 'vertical'
  altitudeLabel: string
  /** 2-3 sentences, field-guide voice, from a ground observer's view */
  description: string
  /** 3 short ID clues, imperative fragments */
  lookFor: string[]
  funFact: string
  image: string
  /** every photo of this genus available for the quiz, cover image included */
  images: string[]
  credit: string
}

const HIGH = 'High — 5–13 km'
const MIDDLE = 'Middle — 2–7 km'
const LOW = 'Low — below 2 km'
const VERTICAL = 'Vertical — spans all levels'

export const CLOUDS: Cloud[] = [
  {
    id: 'cirrus',
    name: 'Cirrus',
    latinMeaning: 'a curl of hair',
    altitude: 'high',
    altitudeLabel: HIGH,
    description:
      'The highest clouds you will see, made entirely of ice crystals where the air is far below freezing. They streak across the sky in white ribbons and mare\'s tails, often the first sign that the weather will change in a day or so.',
    lookFor: [
      'Look for thin white streaks high overhead',
      'Watch for silky curls that never block the sun',
      'Check for a bright sky shining straight through',
    ],
    funFact:
      'Cirrus can race along at over 160 km/h, pulled by jet-stream winds, while the air at the ground stays perfectly calm.',
    image: '/clouds/cirrus.jpg',
    images: ['/clouds/cirrus.jpg', '/clouds/cirrus-2.jpg', '/clouds/cirrus-3.jpg'],
    credit: 'Wikimedia Commons · CC BY-SA',
  },
  {
    id: 'cirrostratus',
    name: 'Cirrostratus',
    latinMeaning: 'curl + layer',
    altitude: 'high',
    altitudeLabel: HIGH,
    description:
      'A transparent veil of ice crystals spread thin over the whole sky, so subtle you may only notice it by the ring it paints around the sun or moon. That halo means warm, moist air is on its way — rain or snow often follows within a day.',
    lookFor: [
      'Look for a halo ringing the sun or moon',
      'Watch for a milky veil dimming a blue sky',
      'Check that the sun still casts a shadow through it',
    ],
    funFact:
      'The 22-degree halo cirrostratus makes is produced by ice crystals shaped like tiny hexagonal pencils bending the light.',
    image: '/clouds/cirrostratus.jpg',
    images: ['/clouds/cirrostratus.jpg', '/clouds/cirrostratus-2.jpg', '/clouds/cirrostratus-3.jpg'],
    credit: 'Wikimedia Commons · Public domain / CC BY-SA',
  },
  {
    id: 'cirrocumulus',
    name: 'Cirrocumulus',
    latinMeaning: 'curl + heap',
    altitude: 'high',
    altitudeLabel: HIGH,
    description:
      'A high sheet of tiny white ripples, like grains of rice or fish scales scattered across the sky — the "mackerel sky" of old sailors\' rhymes. Each puff is small: hold a finger at arm\'s length and it covers several of them.',
    lookFor: [
      'Look for rows of small rice-grain ripples',
      'Watch for the fish-scale pattern of a mackerel sky',
      'Check that the puffs show no shading underneath',
    ],
    funFact:
      '"Mackerel sky and mares\' tails make lofty ships carry low sails" — sailors read cirrocumulus as a warning of coming wind.',
    image: '/clouds/cirrocumulus.jpg',
    images: ['/clouds/cirrocumulus.jpg', '/clouds/cirrocumulus-2.jpg', '/clouds/cirrocumulus-3.jpg'],
    credit: 'Wikimedia Commons · CC BY-SA',
  },
  {
    id: 'altocumulus',
    name: 'Altocumulus',
    latinMeaning: 'high heap',
    altitude: 'middle',
    altitudeLabel: MIDDLE,
    description:
      'Mid-level patches of rounded white or grey puffs, often gathered in groups or long waves. Bigger than cirrocumulus — a puff at arm\'s length is roughly the size of your thumb — and usually a sign of settled weather unless they tower upward.',
    lookFor: [
      'Look for thumb-sized puffs in loose groups',
      'Watch for shaded undersides on each rounded roll',
      'Check for puffs arranged in long parallel waves',
    ],
    funFact:
      'Altocumulus at sunrise on a humid summer morning can warn of thunderstorms by late afternoon.',
    image: '/clouds/altocumulus.jpg',
    images: ['/clouds/altocumulus.jpg', '/clouds/altocumulus-2.jpg', '/clouds/altocumulus-3.jpg'],
    credit: 'Wikimedia Commons · CC BY-SA',
  },
  {
    id: 'altostratus',
    name: 'Altostratus',
    latinMeaning: 'high layer',
    altitude: 'middle',
    altitudeLabel: MIDDLE,
    description:
      'A featureless grey sheet covering the middle sky, letting the sun show through only as a bright, watery smudge with no halo. It usually arrives ahead of a wide band of steady rain or snow, thickening downward as the storm approaches.',
    lookFor: [
      'Look for a flat grey sheet over the whole sky',
      'Watch for the sun as a dim watery blob',
      'Check for no halo and no shadows on the ground',
    ],
    funFact:
      'Altostratus often begins as cirrostratus that thickens and sinks — watch one all day and you can see a storm build level by level.',
    image: '/clouds/altostratus.jpg',
    images: ['/clouds/altostratus.jpg', '/clouds/altostratus-2.jpg', '/clouds/altostratus-3.jpg'],
    credit: 'Wikimedia Commons · CC0 / CC BY-SA',
  },
  {
    id: 'nimbostratus',
    name: 'Nimbostratus',
    latinMeaning: 'rain layer',
    altitude: 'low',
    altitudeLabel: LOW,
    description:
      'The classic rainy-day sky: a dark, shapeless grey blanket hanging low overhead with rain or snow falling steadily from it. No lumps, no drama — just hours of patient, soaking precipitation.',
    lookFor: [
      'Look for a dark grey sky with no shapes at all',
      'Watch for steady rain lasting hours, not minutes',
      'Check for ragged low scraps drifting beneath it',
    ],
    funFact:
      'Nimbostratus is so thick it can span several kilometres top to bottom, which is why its rain can outlast any thunderstorm.',
    image: '/clouds/nimbostratus.jpg',
    images: ['/clouds/nimbostratus.jpg', '/clouds/nimbostratus-2.jpg', '/clouds/nimbostratus-3.jpg'],
    credit: 'Wikimedia Commons · CC BY-SA',
  },
  {
    id: 'stratocumulus',
    name: 'Stratocumulus',
    latinMeaning: 'layered heap',
    altitude: 'low',
    altitudeLabel: LOW,
    description:
      'The most common cloud on Earth: low lumpy rolls and patches of grey and white, often covering the sky in a honeycomb with blue peeping between. It looks threatening but rarely drops more than a drizzle.',
    lookFor: [
      'Look for fist-sized lumps low in the sky',
      'Watch for grey rolls with blue gaps between',
      'Check that any rain is light and brief',
    ],
    funFact:
      'Huge sheets of stratocumulus over cool oceans are visible from space as giant cotton fields — they reflect enough sunlight to help cool the planet.',
    image: '/clouds/stratocumulus.jpg',
    images: ['/clouds/stratocumulus.jpg', '/clouds/stratocumulus-2.jpg', '/clouds/stratocumulus-3.jpg'],
    credit: 'Wikimedia Commons · CC BY / CC BY-SA',
  },
  {
    id: 'stratus',
    name: 'Stratus',
    latinMeaning: 'a spread-out layer',
    altitude: 'low',
    altitudeLabel: LOW,
    description:
      'Fog that lifted off the ground: a flat, uniform grey layer hanging just above the rooftops, turning hills and towers into ghosts. It brings mist or fine drizzle, and often burns away by midday.',
    lookFor: [
      'Look for a flat grey ceiling just overhead',
      'Watch for hilltops and towers disappearing into it',
      'Check for mist or drizzle, never heavy rain',
    ],
    funFact:
      'When stratus touches the ground it is simply fog — the only difference between the two is whether you are inside it.',
    image: '/clouds/stratus.jpg',
    images: ['/clouds/stratus.jpg', '/clouds/stratus-2.jpg', '/clouds/stratus-3.jpg'],
    credit: 'Wikimedia Commons · CC BY-SA',
  },
  {
    id: 'cumulus',
    name: 'Cumulus',
    latinMeaning: 'heap',
    altitude: 'low',
    altitudeLabel: LOW,
    description:
      'The cloud of childhood drawings: detached white cotton heaps with flat grey bases, drifting across fair-weather skies. Each one marks an invisible bubble of warm rising air — glider pilots hunt them for lift.',
    lookFor: [
      'Look for puffy white heaps with flat bases',
      'Watch for crisp cauliflower tops in sunshine',
      'Check that clouds stay separate with blue between',
    ],
    funFact:
      'A modest summer cumulus weighs about as much as 100 elephants — it floats because that mass is spread over billions of droplets in rising air.',
    image: '/clouds/cumulus.jpg',
    images: ['/clouds/cumulus.jpg', '/clouds/cumulus-2.jpg', '/clouds/cumulus-3.jpg'],
    credit: 'Wikimedia Commons · CC BY-SA',
  },
  {
    id: 'cumulonimbus',
    name: 'Cumulonimbus',
    latinMeaning: 'rain heap',
    altitude: 'vertical',
    altitudeLabel: VERTICAL,
    description:
      'The thunderstorm giant: a dark mountain of cloud rising through every level of the sky until its top flattens into an anvil of ice. Inside are lightning, hail, torrential rain, and updrafts strong enough to hold a hailstone aloft until it grows to golf-ball size.',
    lookFor: [
      'Look for a towering dark mountain of cloud',
      'Watch for the flat anvil top spreading outward',
      'Check for a curtain of rain beneath a black base',
    ],
    funFact:
      'A single cumulonimbus can hold more energy than ten atomic bombs and climb higher than Mount Everest in under an hour.',
    image: '/clouds/cumulonimbus.jpg',
    images: ['/clouds/cumulonimbus.jpg', '/clouds/cumulonimbus-2.jpg', '/clouds/cumulonimbus-3.jpg'],
    credit: 'Wikimedia Commons · Public domain / CC BY / CC BY-SA',
  },
]
