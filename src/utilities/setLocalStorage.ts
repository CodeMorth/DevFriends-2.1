export const setLocalStorage = (clave: string, datos:any) => {

    localStorage.setItem(clave, JSON.stringify(datos));
    
  };