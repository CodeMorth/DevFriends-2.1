export const CapitalizeString = (str: string) => {
  if (typeof str !== 'string' || !str) {
    return 'Problema desconocido '
  }

  return str.charAt(0)?.toUpperCase() + str.slice(1)
}
