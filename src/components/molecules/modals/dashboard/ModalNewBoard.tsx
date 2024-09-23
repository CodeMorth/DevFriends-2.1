'use client'
import {Modal} from "@/components/global";
import Image from "next/image";
import { useEffect , useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import {useFormss} from "@/hook";
import { SpaceWork } from "@/interface/page";
import { createTable } from "@/services/table.service";



interface ModalNewBoard {
  visible: boolean;
  closeModal: () => void;
  setspaceWorks: React.Dispatch<React.SetStateAction<SpaceWork[]>>;
  idWork:any
}

export const ModalNewBoard = ({
  visible,
  closeModal,
  idWork,
 
  setspaceWorks,
}: ModalNewBoard) => {
  const [acceptedFiles, setacceptedFiles] = useState<File[] | any>([]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (files: File[]) => {

      setacceptedFiles(files);
    },
  });
  const { datos, capTure, setdatos } = useFormss();



  const createSpaceWork = () => {
    const data = {
      title_table: datos.title_table || '',
      id_type_table: datos.id_type_table || '',
      id_work_space: idWork,
    };
  
    let file = null;
  
    // Verificar si se ha seleccionado un archivo de imagen
    if (acceptedFiles.length > 0) {
      file = acceptedFiles[0];  // Obtén el archivo completo, no solo el nombre
    }
  
    // Llamar al servicio y enviar los datos y el archivo
    createTable(data, file)
      .then((res) => console.log('res', res))
      .catch((err) => console.log(err));
  
    closeModal();
  };
  
  


  useEffect(() => {
    setdatos({
      ...datos,
      avatar_table: acceptedFiles[0]?.path,
    });
  }, [acceptedFiles]);



  return (
    <Modal
      visible={visible}
      closeModal={closeModal}
      className={`main-page ModalNewBoardBG`}
    >
      <div className="ModalNewBoard">
        <div className="create-board">Crear Tablero</div>
        <section className="container">
          <div {...getRootProps({ className: "dropzone" })}>
            <input type="file" name="avatar_table" {...getInputProps()} />
            {acceptedFiles.length > 0 ? (
              <Image
                src={URL.createObjectURL(acceptedFiles[0])}
                alt=""
                width={1000}
                height={1000}
                className="w-full h-full object-cover rounded-[0.5rem] "
              />
            ) : (
              <div className="container-image-upload">
                <motion.svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#58A0DE"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ width: "12rem" }}
                  animate={{ width: ["10rem", "6rem", "10rem"] }}
                  transition={{ duration: 2.2, repeat: Infinity }}
                >
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7" />
                  <line x1="16" x2="22" y1="5" y2="5" />
                  <line x1="19" x2="19" y1="2" y2="8" />
                  <circle cx="9" cy="9" r="2" />
                  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                </motion.svg>
              </div>
            )}
          </div>
        </section>
        <div className="description">Fondo</div>
        <label htmlFor="" className="title-board">
          Titulo del Tablero
        </label>
        <input
          type="text"
          name="title_table"
          onChange={capTure}
          className="title-board-input"
        />
        <label htmlFor="" className="visibility-label">
          Visibildidad
        </label>
        <select
          name="id_type_table"
          onChange={capTure}
          className="visibility-select"
        >
          <option value="Publico-Privado" className="visibility-option">
            Publico-Privado
          </option>
          <option value={2} className="visibility-option">
            Publico
          </option>
          <option value={1} className="visibility-option">
            Privado
          </option>
        </select>
        <button onClick={createSpaceWork} className="button-create">
          Crear
        </button>
      </div>
    </Modal>
  );
};

