interface CitiesProps {
  cities: string[]
}

export function Cities({ cities }: CitiesProps) {
  return (
    <div className="chip-grid">
      {cities.map((city) => (
        <span key={city} className="city-chip">
          {city}
        </span>
      ))}
    </div>
  )
}
