interface datosInterface {
  email: string;
  image: File[];
  password: string;
  tableName: string;
  visibility: string;
}

export function userLocalStoras  ()  {
  const agregarLocal = (clave: string, datos: datosInterface) => {

    localStorage.setItem(clave, JSON.stringify(datos));
    
  };


  const obtenerLocal = (clave: string) => {
    try {
      const item = localStorage.getItem(clave);

      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.log(error);
    }
  };

  const eliminarLocal = (clave: string) => {
    localStorage.removeItem(clave);
  };

  return { agregarLocal, obtenerLocal, eliminarLocal };
}

