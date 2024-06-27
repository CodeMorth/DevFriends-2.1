export function useDragAndDrop ({index , settables}:any) {
  


    const startDrap = (evt: any, item: any) => {
        evt.dataTransfer.setData('itemID', item?.tareasTables);
        evt.dataTransfer.setData('itemIndex', index);
    
      };
    
      const draginOver = (e: any) => {
        e.preventDefault();
      };
    
      
    
      const onDrop = (evt: any, newIndex: number) => {
        evt.preventDefault();
        const itemTitle = evt.dataTransfer.getData('itemID');
        const itemIndex = parseInt(evt.dataTransfer.getData('itemIndex')); // Parsea el índice a un número entero
      
        // Verifica si el índice de la tarjeta de destino es diferente al índice de la tarjeta de origen
        if (newIndex !== itemIndex) {
          // Actualiza el estado solo si el índice es diferente
          settables((prevTables: any) => {
            // Crea una nueva copia del arreglo de tareas
            const newTables = [...prevTables];
            // Encuentra la tarjeta de destino por su índice
            const targetTable = newTables[newIndex];
            // Añade el elemento arrastrado a la tarjeta de destino
            targetTable.tareasTablas.push({ tareasTables: itemTitle });
      
            // Elimina la tarea de la tarjeta de origen
            const sourceTable = newTables[itemIndex];
            sourceTable.tareasTablas = sourceTable.tareasTablas.filter(
              (task: any) => task.tareasTables !== itemTitle
            );
      
            return newTables; // Devuelve el nuevo estado actualizado
          });
        } else {
          alert("No puedes mover la tarea a la misma tarjeta.");
        }
      };

      return { onDrop , draginOver ,  startDrap}
}

