import { taskUpdateCard, taskUpdateServicio } from "@/services/task.service"
import { useEffect, useRef, useState } from "react"
import { toast } from "sonner"
import useTaskXTable from "./useTaskXTable"


const useTimeTaskValidate = (cards:any) => {
//hook para renderisar card
    const {task, getTaskTabH } = useTaskXTable();
//estado para manejar time por tarea
    const [timeValues, setTimeValues] = useState<{ [id_task: string]: string }>({});
//estado para hacer referencia  al input de cada task 
    const timeInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

// estado del manejo de abrir modal de iniciar  tarea 
    const [menuTaskOpen, setMenuTaskOpen] = useState<{ [id_task: string]: boolean }>({})

// funcion para abrir el modal de iniciar tarea por id_taks
    const toggleMenu = (id_task: string) => {
        setMenuTaskOpen((prevState) => ({
          ...prevState,
          [id_task]: !prevState[id_task],
        }))
      }

//funcion para agregar los time a input time y validar ..
const handleTimeChange = (taskId: string, value: string, card:any ) => {
   
    setTimeValues((prevState) => ({
      ...prevState,
      [taskId]: value,
    }));

    const inputElement = timeInputRefs.current[taskId];

    // Validar el valor del tiempo
    if (value === "" || value === "00:00" || value < "01:00") {
      if (inputElement) {
        inputElement.classList.add("!border-red-500", "border-2"); // Agregar borde rojo
      }
      toast('Añade un Tiempo válido');
    } else {
      if (inputElement) {
        inputElement.classList.remove("!border-red-500", "border-2"); // Quitar borde rojo
        taskUpdateServicio({ id_task: taskId, homework_time: value }).then(res => {
          if (res.data) {
            getTaskTabH(card);
            toast('Tiempo Añadido');
          }
        });

      }
    }
  };


  // funcion para inicialisar la tarea

  const initialTask = async (datos: any) => {


    const { task, card } = datos;

    // Asigna el valor del tiempo, asegurándote de que nunca sea null
    const timeValue = task?.homework_time || ""; // Cambia a "" en caso de ser null
    setTimeValues((prevState) => ({
      ...prevState,
      [task?.id_task]: timeValue,
    }));

    // Verifica el input de tiempo
    const inputElement = timeInputRefs.current[task?.id_task];
    if (timeValue === '' || timeValue === '00:00:00' || timeValue < "01:00") {
      if (inputElement) {
        inputElement.classList.add("!border-red-500", "border-2");
        toast('Añade un Tiempo válido');
      }
      toggleMenu(task?.id_task);
    } else {
      if (inputElement) {
        inputElement.classList.remove("!border-none", "border-2");
      }
      await taskUpdateCard({ id_task: task?.id_task, id_card: card?.id_card + 1 })
      await getTaskTabH(cards);
      toggleMenu(task?.id_task);
    }
  };


 

 

 
  
console.log("pruba de error",cards)
  return { toggleMenu , menuTaskOpen , handleTimeChange , timeInputRefs , initialTask, timeValues }
}

export default useTimeTaskValidate
