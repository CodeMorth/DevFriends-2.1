import { useState } from 'react'
interface datosInterface {
  [key: string]: string | undefined
}

export function useFormss() {
  const [datos, setdatos] = useState<datosInterface | any >(null)

  const capTure = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setdatos({ ...datos, [event.target.name]: event.target.value })
  }

  return { datos, setdatos, capTure }
}
