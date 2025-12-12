import SourceCitation from '@/components/citations'
import { ArrowLeftIcon } from '@radix-ui/react-icons'
import { Link, useLoaderData } from 'react-router'
import { getScrapedData } from '@/db/interface'
import type { Route } from './+types/sources'

interface citation {
  citation: string
  url: string
}

export async function loader({ params }: Route.LoaderArgs) {
  const data = await getScrapedData()
  return { data }
}

const citations: citation[] = [
  {
    citation: `Bitcoin Pizza Day: A Slice of History. financemagnates.com https://www.financemagnates.com/trending/bitcoin-pizza-day-a-slice-of-history/`,
    url: 'https://www.financemagnates.com/trending/bitcoin-pizza-day-a-slice-of-history/',
  },
]

export default function Page() {
  const { data } = useLoaderData<typeof loader>()
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto space-y-4">
        <section className="space-y-4">
          <h1 className="text-3xl font-bold pb-2">Rationale + Fontes</h1>
          {data && (
            <Link
              to="https://search.brave.com/search?q=btc+to+brl"
              className="space-y-1 hover:underline decoration-yellow-400"
            >
              <p className="text-sm">Taxa de conversão: brave.com</p>
              <p>
                <span>1 BTC = {data.rate.toFixed(11)} BRL</span>
              </p>
              <p>
                <span>1 BRL = {(1 / data.rate).toFixed(11)} BTC</span>
              </p>
              <p className="font-light">
                {new Date(data.lastUpdateStr).toLocaleString()}
              </p>
            </Link>
          )}
          <div className="mt-4">
            {citations.map((citation) => (
              <SourceCitation
                key={citation.url}
                citationText={citation.citation}
                citationUrl={citation.url}
              />
            ))}
          </div>
        </section>

        {/* Navigation Menu */}
        <nav className="flex justify-end space-x-4 text-md">
          <Link
            to="/"
            className="border-2 rounded-md border-transparent hover:border-solid hover:border-yellow-400 p-1"
          >
            <ArrowLeftIcon />
          </Link>
        </nav>
      </div>
    </div>
  )
}
