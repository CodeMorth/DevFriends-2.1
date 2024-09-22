import Image from "next/image";
import React, { useEffect, useState } from "react";
import { ModalNewBoard } from "@/components/molecules";
import {useOpenModal} from "@/hook";
import {ButtonsTwo} from "@/components/atoms";
import Link from "next/link";
import {SpaceWork} from "@/interface/page";
import { tablasUserWorkSpace } from "@/services/table.service";

interface TablesWorkSpacesProps{

  spaceWorks:SpaceWork[];
  tableSelect:number;
  setspaceWorks:React.Dispatch<React.SetStateAction<SpaceWork[]>>;
  idWork:number | null;

}


export const TablesWorkSpaces = ({ spaceWorks, tableSelect, setspaceWorks ,idWork }: TablesWorkSpacesProps) => {


  
  const { open, closeModal, openModal } = useOpenModal();
  
  const spaceWorksSpecific :SpaceWork = spaceWorks[tableSelect];
  const [tableWorkSpaces, settableWorkSpaces] = useState<any>(null)
  
  useEffect(() => {
   if(idWork){
    tablasUserWorkSpace(idWork).then(res =>settableWorkSpaces(res.data.tablasTheWorkSpace)).catch(err => console.log(err))
   }
  }, [idWork])
  

  
 console.log("tableWorkSpaces",tableWorkSpaces)
  
  return (
    <div className="TablesWorkSpaces">
      <div className="tables-title">Tus espacios de trabajo</div>
      {tableWorkSpaces && (
        <>
          <div className="tables-content">
            <div className="content-top">
              <div className="content-top-name">
                <div className="content-top-name-image">
                  <Image
                    src={"/logo/logo-tareas.png"}
                    alt="logo"
                    width={1000}
                    height={1000}
                    priority
                    className="w-full h-full"
                  />
                </div>
                <span className="content-top-name-text">
                  {/* {spaceWorksSpecific?.datos?.titleSpaceWork} */}
                </span>
              </div>
              <ButtonsTwo>Tableros</ButtonsTwo>
              <ButtonsTwo>Miembros</ButtonsTwo>
              <ButtonsTwo>Configuracion</ButtonsTwo>
            </div>
            <div className="container-tables">
              <button onClick={openModal} className="content-main">
                Crear tablero nuevo
              </button>
              {
                tableWorkSpaces.map((data:any, index: number) => {
                  return (
                    <Link href={`/dashboard/${data?.title_table}`}
                      key={index}
                      className="tables-map"
                      style={{
                        backgroundImage:`url(${data?.avatar_table || 'https://img.freepik.com/vector-gratis/fondo-luces-neon-realista_52683-59889.jpg'})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      <h2>{data?.title_table}</h2>
                    </Link>
                  );

                })
              }
            
            </div>
          </div>
          <ModalNewBoard
            setspaceWorks={setspaceWorks}
            idWork={idWork}
            visible={open}
            closeModal={closeModal}
          ></ModalNewBoard>
        </>
      )}
    </div>
  );
};



