const basePrices = {
  funeralProgram: {
    premium:   3.50,
    trifold:   3.00,
    standard:  2.50,
    religious: 2.75,
  },
  businessCard: {
    premium:  0.85,
    standard: 0.45,
    rounded:  0.55,
    square:   0.60,
  },
  poster: {
    premium: 12.00,
    large:    9.00,
    medium:   6.50,
    small:    4.00,
  },
}

const sizeMultipliers = {
  // funeral programs
  '8.5x11': 1.0,
  '8.5x14': 1.2,
  // business cards
  '3.5x2':  1.0,
  '2.5x2.5': 1.05,
  // posters
  '8.5x11': 1.0,
  '11x17':  1.3,
  '18x24':  1.8,
}

const layoutMultipliers = {
  1:  1.0,
  2:  1.05,
  4:  1.1,
  8:  1.25,
  12: 1.4,
  16: 1.55,
  20: 1.7,
}

export function calculatePrice(category, type, size, layout, quantity) {
  const base = basePrices[category]?.[type]
  if (!base) return null

  const sizeMultiplier   = sizeMultipliers[size]   ?? 1.0
  const layoutMultiplier = layoutMultipliers[layout] ?? 1.0

  const pricePerUnit = base * sizeMultiplier * layoutMultiplier
  const total = pricePerUnit * quantity

  return {
    pricePerUnit: pricePerUnit.toFixed(2),
    total: total.toFixed(2),
  }
}

export default calculatePrice