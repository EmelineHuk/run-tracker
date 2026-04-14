import { useState } from 'react'
import './App.css'

function App() {
  const [date, setDate] = useState('')
  const [distance, setDistance] = useState('')
  const [time, setTime] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    alert(
      `Treino salvo!\nData: ${date}\nDistância: ${distance} km\nTempo: ${time}`
    )

    setDate('')
    setDistance('')
    setTime('')
  }

  return (
    <div className="container">
      <h1>Run Tracker</h1>
      <p className="subtitle">Registre seus treinos de corrida</p>

      <form className="training-form" onSubmit={handleSubmit}>
        <label>
          Data do treino
          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            required
          />
        </label>

        <label>
          Distância (km)
          <input
            type="number"
            step="0.01"
            placeholder="Ex: 5"
            value={distance}
            onChange={(event) => setDistance(event.target.value)}
            required
          />
        </label>

        <label>
          Tempo
          <input
            type="time"
            step="1"
            value={time}
            onChange={(event) => setTime(event.target.value)}
            required
          />
        </label>

        <button type="submit">Salvar treino</button>
      </form>
    </div>
  )
}

export default App