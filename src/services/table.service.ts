
import { axiosGlobal } from "@/interceptor"



//tablas_x_work_space
export const tablasUserWorkSpace = (id:any) => {
    return axiosGlobal.get(`tablas_x_work_space/${id}`, {
      headers: { 'Content-Type': 'application/json' }
    })
  }

  //CreateTable

// CreateTable con FormData para envío de archivos
export const createTable = (data: any, file: File) => {
  const formData = new FormData();

  // Agregar los datos al formData
  formData.append('avatar_table', file);  // Suponiendo que 'file' es el archivo de imagen
  formData.append('title_table', data.title_table);
  formData.append('id_type_table', data.id_type_table);
  formData.append('id_work_space', data.id_work_space);

  // Hacer la petición con axiosGlobal usando FormData
  return axiosGlobal.post('CreateTable', formData);
};
