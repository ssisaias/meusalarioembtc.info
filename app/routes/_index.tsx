import type { MetaFunction } from 'react-router'
import { useState } from 'react'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Link } from 'react-router'
import { getScrapedData } from '@/db/interface'
import type { Route } from './+types/_index'
import { ThemeSwitch } from '~/components/theme-switch'
import { useTheme } from 'next-themes'

export const meta: MetaFunction = () => {
  return [
    { title: 'Meu Salário em BTC' },
    { name: 'Descubra quanto vale seu salário em btc' },
    {
      name: 'keywords',
      content: 'salário, btc, conversão, brasil, estados unidos',
    },
    {
      name: 'description',
      content: 'Descubra quanto vale seu salário em btc',
    },
  ]
}

export async function loader({ params }: Route.LoaderArgs) {
  return await getScrapedData()
}

export default function Index({ loaderData }: Route.ComponentProps) {
  const data = loaderData
  const [salary, setSalary] = useState('1518')
  const dollarValue = Number(salary) * (data?.rate ?? 5.6) // Simple fixed conversion for demo
  const theme = useTheme()

  return (
    <div className="max-h-screen p-8">
      <div className="fixed bottom-2 right-2">
        <ThemeSwitch />
      </div>
      <div className="max-w-4xl mx-auto space-y-4">
        {/* Header Section */}
        <section className="text-center space-y-4 mb-2">
          <h1 className="text-4xl font-bold">Meu salário em Reais:</h1>

          {/* Salary Input */}
          <Input
            type="number"
            value={salary}
            max={9999999999999}
            maxLength={15}
            onChange={(e) => setSalary(e.target.value)}
            placeholder="Digite seu salário em reais aqui"
            className={`webkit-appearance-none -moz-appearance-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
                text-4xl text-center w-full h-12 bg-gray focus-visible:ring-1 focus-visible:ring-yellow-400 border-1 focus-visible:bg-input-bg`}
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
          />

          {/* Dollar Conversion */}
          <div className="space-y-4">
            <h2 className="text-4xl font-bold">Meu salário em BTC:</h2>
            <p
              className={`text-5xl font-bold text-center overflow-hidden text-ellipsis ${
                theme.resolvedTheme === 'dark' ? 'text-yellow-400' : ''
              }`}
            >
              {new Intl.NumberFormat(undefined, {
                minimumFractionDigits: 15,
              }).format(dollarValue)}
            </p>
          </div>
        </section>

        {/* "Você sabia?" Section */}
        <section className="mt-16 pt-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-black text-white rounded-xl p-2">
            {/* Card 1 */}
            <Card className="bg-transparent border-transparent text-yellow-400 hover:border-solid hover:border-yellow-400">
              <CardHeader className="">
                <h3 className="text-xl font-bold">Pizza do milhão</h3>
              </CardHeader>
              <CardContent>
                <p className="italic">
                  Em 22 de maio de 2010, Laszlo Hanyecz, pagou 10.000 Bitcoins
                  por duas pizzas grandes. Na época, 10.000 Bitcoins valiam $41.
                </p>
              </CardContent>
            </Card>

            {/* Card 2 */}
            <Card className="bg-transparent border-transparent text-yellow-400 hover:border-solid hover:border-yellow-400">
              <CardHeader>
                <h3 className="text-xl font-bold">Inflação</h3>
              </CardHeader>
              <CardContent>
                <iframe
                  width="100%"
                  height="auto"
                  src="https://www.youtube.com/embed/efbgpaXYB1U?si=gks9WKbzAuR7tl8N"
                  title="YouTube video player"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </CardContent>
            </Card>

            {/* Card 3 */}
            <Card className="bg-transparent border-transparent text-yellow-400 hover:border-solid hover:border-yellow-400">
              <CardHeader>
                <h3 className="text-xl font-bold">Anuncie aqui:</h3>
              </CardHeader>
              <CardContent>
                <p className="italic">Em breve...</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Navigation Menu */}
        <nav className="grid justify-items-end md:flex md:justify-end md:space-x-4">
          <Link
            to="https://impostometro.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 rounded-md border-transparent hover:border-solid hover:border-yellow-400 p-1"
          >
            Impostômetro
          </Link>
          <Link
            to="https://cdn.mises.org/a-anatomia-do-estado_portuguese.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 rounded-md border-transparent hover:border-solid hover:border-yellow-400 p-1"
          >
            A Anatomia do Estado
          </Link>
          <Link
            to="https://meusalarioemdolar.info"
            className="border-2 rounded-md border-transparent hover:border-solid hover:border-yellow-400 p-1"
          >
            Meu Salário em Dólar
          </Link>
          <Link
            to="sources"
            className="border-2 rounded-md border-transparent hover:border-solid hover:border-yellow-400 p-1"
          >
            Fontes
          </Link>
        </nav>
      </div>
    </div>
  )
}
