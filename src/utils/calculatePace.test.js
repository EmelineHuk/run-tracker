import { describe, expect, it } from 'vitest'
import { calculatePace, convertTimeToSeconds } from './calculatePace'

describe('convertTimeToSeconds', () => {
  it('converte tempo para segundos corretamente', () => {
    expect(convertTimeToSeconds('01:30:00')).toBe(5400)
  })
})

describe('calculatePace', () => {
  it('calcula o pace corretamente', () => {
    expect(calculatePace('00:30:00', 5)).toBe('06:00 min/km')
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