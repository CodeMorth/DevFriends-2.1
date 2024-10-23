import { convertirATotalSegundos, formatearTiempo } from '@/utilities/Cronometro';
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';

interface CronometroProps {
  time?: any;
  validate?:any // tiempo inicial en formato HH:MM:SS
}

export const Cronometro: React.FC<CronometroProps> = ({ time , validate }) => {

  // Inicializa el estado con el tiempo convertido a segundos
  const [tiempoRestante, setTiempoRestante] = useState<any>(convertirATotalSegundos(time));

    // Crea un nuevo objeto de Audio para el sonido de alerta
    // const time_Init = new Audio('/sounds/hogan.mp3');  

  useEffect(() => {
    // Resetea el cronómetro cuando el prop `time` cambia
    const nuevoTiempo = convertirATotalSegundos(time);
    setTiempoRestante(nuevoTiempo);

    // Si el tiempo inicial es mayor que 0, inicia el cronómetro
   if(validate !==  null && nuevoTiempo > 0){
    //iniciar la musica
    // time_Init.play();
        const intervalo = setInterval(() => {
          setTiempoRestante((prev:any) => {
            if (prev > 0) {
              return prev - 1; // Disminuye el tiempo cada segundo
            } else {
              clearInterval(intervalo); // Detiene el cronómetro cuando llega a 0
              toast(`se termino tu tiempo ${validate}`, {duration: 1000} )
              //detener la musica
              // time_Init.pause()
              return  0;
            }
          });
        }, 1000); // Cada segundo
  
        // Limpia el intervalo cuando el componente se desmonta o cuando cambie el tiempo
        return () => clearInterval(intervalo);
      
   }
  }, [time]);

  

  return (
    <div className='absolute top-3 right-[5rem]'>
      <p>{formatearTiempo(tiempoRestante)}</p> {/* Muestra el tiempo formateado */}
      
    </div>
  );
};
