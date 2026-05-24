export function getImageShape(width, height) {
  if (!width || !height) {
    return 'unknown'
  }

  const ratio = width / height

  if (ratio >= 1.9) return 'panorama'
  if (ratio >= 1.18) return 'landscape'
  if (ratio <= 0.72) return 'portrait'
  return 'square'
}
