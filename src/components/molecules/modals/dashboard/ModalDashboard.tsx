import {Inputs,Labels,TextAreas} from '@/components/atoms';
import {Modal} from '@/components/global';
import {useFormss} from '@/hook';
import { SpaceWork } from '@/interface/page';
import Image from 'next/image';
import React from 'react';

interface ModalDashboard {
  visible: boolean;
  closeModal: () => void;
  setspaceWorks: React.Dispatch<React.SetStateAction<SpaceWork[]>>;
}

export const ModalDashboard = ({
  visible,
  closeModal,
  setspaceWorks,
}: ModalDashboard) => {
  const { datos, capTure } = useFormss();

  const createWorkSpace = () => {
    if (datos?.titleSpaceWork != '' && datos?.descriptionSpaceWork != '') {
      closeModal();
      setspaceWorks((prevSpaceWorks: SpaceWork[]) => [...prevSpaceWorks,{ datos, tables:[]}]);
    } else {
      
    }
  };
  return (
    <div>
      <Modal
        visible={visible}
        closeModal={closeModal}        
        className='modalDashboard main-page'
        bg='#2B3146'
      >
        <main className='modalDashboard-container'>
          <div className='container-left'>
            <h1 className='container-left-tittle'>
              Vamos a crear un Espacio de trabajo
            </h1>
            <h2 className='container-left-description'>
              Impulse su productividad facilitándoles a todos el acceso a los
              tableros en una única ubicación.
            </h2>
            <Labels id='spaceWork-Name-Label' htmlFor='spaceWork-Name'>
              Nombre del Espacio de trabajo
            </Labels>
            <Inputs
              name='titleSpaceWork'
              onChange={capTure}
              type='text'
              id='spaceWork-Name'
            ></Inputs>
            <Labels id='spaceWork-Description-Label' htmlFor='spaceWork-Description'>
              Descripción del Espacio de trabajo
            </Labels>
            <TextAreas
              name='descriptionSpaceWork'
              onChange={capTure}
              typeof='text'
              id='spaceWork-Description'
            ></TextAreas>
            <div className='container-left-button'>
              <button onClick={createWorkSpace}>Crear</button>
            </div>
          </div>
          <div className='container-right'>
            <div className='container-right-image'>
              <Image
                src={'/logo/logo-tareas.png'}
                alt='logo'
                width={1000}
                height={1000}
                priority
                className='w-full h-full'
              />
            </div>
            <h1 className='container-right-text'>
              <span className='DEV'>Dev</span>
              <span className='FRIEND'>Friend</span>
            </h1>
          </div>
        </main>
      </Modal>
    </div>
  );
};

