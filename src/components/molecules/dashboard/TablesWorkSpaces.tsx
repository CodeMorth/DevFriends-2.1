import Image from "next/image";
import React from "react";
import { ModalNewBoard } from "@/components/molecules";
import {useOpenModal} from "@/hook";
import {ButtonsTwo} from "@/components/atoms";
import Link from "next/link";
import {SpaceWork,Table} from "@/interface/page";

interface TablesWorkSpacesProps{

  spaceWorks:SpaceWork[];
  tableSelect:number;
  setspaceWorks:React.Dispatch<React.SetStateAction<SpaceWork[]>>;

}

export const TablesWorkSpaces = ({ spaceWorks, tableSelect, setspaceWorks }: TablesWorkSpacesProps) => {
  const { open, closeModal, openModal } = useOpenModal();
  
  const spaceWorksSpecific :SpaceWork = spaceWorks[tableSelect];

  return (
    <div className="TablesWorkSpaces">
      <div className="tables-title">Tus espacios de trabajo</div>
      {spaceWorksSpecific && (
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
                  {spaceWorksSpecific?.datos?.titleSpaceWork}
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
              {spaceWorksSpecific?.tables?.map((data:Table, index: number) => {

                let ruts = data.image[0] != undefined ? URL.createObjectURL(data?.image[0]) : "";

                return (
                  <Link href={`/dashboard/${data?.tableName}`}
                    key={index}
                    className="tables-map"
                    style={{
                      backgroundImage:`url(${ruts})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <h2>{data?.tableName}</h2>
                  </Link>
                );
              })}
            </div>
          </div>
          <ModalNewBoard
            spaceWorks={spaceWorks}
            tableSelect={tableSelect}
            setspaceWorks={setspaceWorks}
            visible={open}
            closeModal={closeModal}
          ></ModalNewBoard>
        </>
      )}
    </div>
  );
};



