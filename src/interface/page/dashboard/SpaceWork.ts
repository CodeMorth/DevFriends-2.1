export interface Table {
  image: File[];
  tableName: string;
  visibility: string;
}
  
  export interface SpaceWork {
    datos: {
      descriptionSpaceWork: string;
      titleSpaceWork: string;
    };
    tables: Table[];
  }