// Función para convertir de HH:MM:SS a segundos
// utilities/Cronometro.ts
export const convertirATotalSegundos = (time: string): number => {
  if (!time) return 0; // Manejo de caso en el que no hay tiempo
  const [horas, minutos, segundos] = time.split(':').map(Number);
  return horas * 3600 + minutos * 60 + segundos;
};

  
  // Función para convertir segundos a formato HH:MM:SS
 export const convertirASegundosAFormato = (segundosTotales: number) => {
    const horas = Math.floor(segundosTotales / 3600);
    const minutos = Math.floor((segundosTotales % 3600) / 60);
    const segundos = segundosTotales % 60;
    return `${horas.toString().padStart(2, '0')}:${minutos
      .toString()
      .padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
  };


  // Función para formatear el tiempo restante en HH:MM:SS
 export const formatearTiempo = (segundos: number): string => {
    const horas = Math.floor(segundos / 3600);
    const minutos = Math.floor((segundos % 3600) / 60);
    const segundosRestantes = segundos % 60;

    return `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}:${String(segundosRestantes).padStart(2, '0')}`;
  };