import { useState } from "react";
import {userLocalStoras} from "@/hook";

interface datosInterface {
  email: string;
  image: File[];
  password: string;
  tableName: string;
  visibility: string;
  titleSpaceWork:string;
  descriptionSpaceWork:string;
}

export function useFormss () {
  const [datos, setdatos] = useState<datosInterface | any>({
 
  });
  const { agregarLocal } = userLocalStoras();

  const capTure = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setdatos({ ...datos, [e.target.name]: e.target.value });

    agregarLocal("user", datos);
    // localStorage.setItem('user', JSON.stringify(datos));
  };

  return { datos, setdatos, capTure };
}
