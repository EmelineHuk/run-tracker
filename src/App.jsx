import { useState } from 'react'
import './App.css'

function App() {
  const [date, setDate] = useState('')
  const [distance, setDistance] = useState('')
  const [time, setTime] = useState('')
  const [trainings, setTrainings] = useState([])

  function convertTimeToSeconds(timeString) {
    const [hours, minutes, seconds] = timeString.split(':').map(Number)
    return hours * 3600 + minutes * 60 + seconds
  }

  function calculatePace(timeString, distanceInKm) {
    const totalSeconds = convertTimeToSeconds(timeString)
    const paceInSeconds = Math.round(totalSeconds / distanceInKm)

    const minutes = Math.floor(paceInSeconds / 60)
    const seconds = paceInSeconds % 60

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} min/km`
  }

  function handleSubmit(event) {
    event.preventDefault()

    const distanceNumber = Number(distance)

    if (distanceNumber <= 0) {
      alert('A distância deve ser maior que zero.')
      return
    }

    const pace = calculatePace(time, distanceNumber)

    const newTraining = {
      id: Date.now(),
      date,
      distance: distanceNumber,
      time,
      pace,
    }

    setTrainings([...trainings, newTraining])

    setDate('')
    setDistance('')
    setTime('')
  }

  return (
    <div className="container">
      <h1>Run Tracker</h1>
      <p className="subtitle">Registre seus treinos</p>

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

      <div className="training-list">
        <h2>Histórico de treinos</h2>

        {trainings.length === 0 ? (
          <p>Nenhum treino cadastrado ainda.</p>
        ) : (
          <ul>
            {trainings.map((training) => (
              <li key={training.id}>
                <strong>Data:</strong> {training.date} |{' '}
                <strong>Distância:</strong> {training.distance} km |{' '}
                <strong>Tempo:</strong> {training.time} |{' '}
                <strong>Pace:</strong> {training.pace}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default App