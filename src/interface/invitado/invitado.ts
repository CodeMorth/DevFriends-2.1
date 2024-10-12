export interface Invitado {
    id_user: number;
    username: string;
    rols: Rol[];
  }
  
  interface Rol {
    type_rol: string;
  }