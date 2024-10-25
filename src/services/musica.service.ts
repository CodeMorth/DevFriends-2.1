import { compositeServices } from "@/utilities/compositeServices"




export const musicaService = (data: any) => {
    return compositeServices({
      url: 'musica',
      method: 'POST',
      data
    })
  } 


  export const musicaTable = (id: string) => {
    return compositeServices({
      url: `all_musica_table/${id}`,
      method: 'GET'
    })
  }
