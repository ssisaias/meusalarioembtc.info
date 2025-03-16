import type { MetaFunction } from 'react-router'
import { useEffect, useState } from 'react'
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
  const [currentTheme, setCurrentTheme] = useState<string | undefined | null>(
    undefined,
  )
  const theme = useTheme()
  useEffect(() => {
    if (theme.theme) {
      if (theme.theme === 'system' && theme.systemTheme === 'dark') {
        setCurrentTheme('dark')
      } else {
        setCurrentTheme(theme.theme)
      }
    } else {
      setCurrentTheme(localStorage.getItem('theme'))
    }
  }, [theme.theme])
  return (
    <div className="max-h-screen p-8">
      <div className="fixed bottom-2 left-2">
        <ThemeSwitch />
        <Link
          to="https://github.com/ssisaias/meusalarioembtc.info"
          target="_blank"
          className=""
          data-ribbon="View on GitHub"
          title="View on GitHub"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 30 30"
            width="25px"
            height="25px"
            className="fill-current text-gray-800 dark:text-gray-200 pl-1 ml-1"
          >
            {' '}
            <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z" />
          </svg>
        </Link>
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
                currentTheme === 'dark' ? 'text-yellow-400' : ''
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
