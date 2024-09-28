import { useState } from 'react';

interface datosInterface {
  [key: string]: string | undefined;
}

export function useFormss() {
  const [datos, setdatos] = useState<datosInterface | any>(null);

  const capTure = (event: any, fieldName?: string) => {
    if (event.target) {
  
      setdatos({ ...datos, [event.target.name]: event.target.value });
    } else if (fieldName) {
  
      setdatos({ ...datos, [fieldName]: event.value });
    }
  };

  return { datos, setdatos, capTure };
}
