import { Link } from 'react-router'
import telasAd from '~/assets/allelec.mp4'

export function AdsBanner() {
  return (
    <div className="w-[95%] mx-auto rounded-sm p-1">
      <Link
        to="https://wa.me/558585661352?text=Olá!"
        target="_blank"
        rel="noopener noreferrer"
      >
        <video autoPlay loop muted playsInline>
          <source src={telasAd} type="video/mp4" />
        </video>
      </Link>
    </div>
  )
}
