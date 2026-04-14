export function convertTimeToSeconds(timeString) {
  const [hours, minutes, seconds] = timeString.split(':').map(Number)
  return hours * 3600 + minutes * 60 + seconds
}

export function calculatePace(timeString, distanceInKm) {
  if (!timeString) {
    throw new Error('O tempo é obrigatório.')
  }

  if (distanceInKm <= 0) {
    throw new Error('A distância deve ser maior que zero.')
  }

  const totalSeconds = convertTimeToSeconds(timeString)
  const paceInSeconds = Math.round(totalSeconds / distanceInKm)

  const minutes = Math.floor(paceInSeconds / 60)
  const seconds = paceInSeconds % 60

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} min/km`
}