import { describe, expect, it } from 'vitest'
import { calculatePace, convertTimeToSeconds } from './calculatePace'

describe('convertTimeToSeconds', () => {
  it('converte tempo para segundos corretamente', () => {
    expect(convertTimeToSeconds('01:30:00')).toBe(5400)
  })

  it('converte 10 minutos e 30 segundos corretamente', () => {
    expect(convertTimeToSeconds('00:10:30')).toBe(630)
  })
})

describe('calculatePace', () => {
  it('calcula o pace corretamente', () => {
    expect(calculatePace('00:30:00', 5)).toBe('06:00 min/km')
  })

  it('calcula o pace corretamente para 1 hora em 10 km', () => {
    expect(calculatePace('01:00:00', 10)).toBe('06:00 min/km')
  })

  it('lança erro quando a distância é zero', () => {
    expect(() => calculatePace('00:30:00', 0)).toThrow(
      'A distância deve ser maior que zero.'
    )
  })

  it('lança erro quando o tempo não é informado', () => {
    expect(() => calculatePace('', 5)).toThrow('O tempo é obrigatório.')
  })
})