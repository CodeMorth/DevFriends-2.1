export const formatFecha = (fechas: string | number | Date) => {
    const fecha = new Date(fechas);
    
    const opciones: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  
    return fecha.toLocaleDateString('es-ES', opciones);
  };
  