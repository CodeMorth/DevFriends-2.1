import Image from "next/image";
import React, { useEffect, useState } from "react";
import { ModalNewBoard } from "@/components/molecules";
import { useOpenModal } from "@/hook";
import { ButtonsTwo } from "@/components/atoms";
import Link from "next/link";
import { tablasUserWorkSpace } from "@/services/table.service";
import useTable_x_work_space from "@/hook/table/useTable_x_work_space";




export const TablesWorkSpaces = ( { idWork}:any) => {



  const { open, closeModal, openModal } = useOpenModal();

  const { tableWorkSpaces, getTableWorkSpaces } = useTable_x_work_space()

 

  useEffect(() => {
    if (idWork) {
      getTableWorkSpaces(idWork)
    }
  }, [idWork])




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
                tableWorkSpaces.map((data: any) => {
                  return (
                    <Link href={`/dashboard/${data?.title_table}?id=${data?.id_table}`}
                      key={data?.id_table}
                      className="tables-map"
                      style={{
                        backgroundImage: `url(${data?.avatar_table || 'https://img.freepik.com/vector-gratis/fondo-luces-neon-realista_52683-59889.jpg'})`,
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
           getTableWorkSpaces={getTableWorkSpaces}
            idWork={idWork}
            visible={open}
            closeModal={closeModal}
          ></ModalNewBoard>
        </>
      )}
    </div>
  );
};



