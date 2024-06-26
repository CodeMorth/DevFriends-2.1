"use client"
import {Modal} from '@/components/global';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Toast } from 'primereact/toast';
import {useFormss,userLocalStoras} from '@/hook';
import {Buttonss} from '@/components/atoms';
import { useAlerts } from '@/hook/useAlerts';
import { userType } from '@/interface/components/modals/ModalRegistrer';
import {Labels,Inputs} from '@/components/atoms';

interface ModalRegister {
  visible: boolean;
  closeModal: () => void;
}

export const ModalRegister = ({ visible, closeModal }: ModalRegister) => {
  const { show, toast } = useAlerts();

  const [users, setusers] = useState<userType>({
    nombre:'',
    email:'',
    password:'',
  });

  const { datos, capTure } = useFormss();

  const { obtenerLocal } = userLocalStoras();

  useEffect(() => {
    const dts = obtenerLocal('user');
    setusers(dts);
  }, [datos]);

  const close = () => {
    if (
      users?.email !== undefined &&
      users?.nombre !== undefined &&
      users?.password !== undefined
    ) {
      closeModal();
      show('Registro Exitoso');
    } else {
      show('Completa los campos');
    }
  };

  return (
    <div>
      <Modal
        visible={visible}
        closeModal={closeModal}
        widthModal='w-[90%]  phone:w-[45rem] py-[3rem] h-[60rem] '
        className='logi_box main-page'
      >
        <div className='login_modal'>
          <div className='logo'>
            <div className='imagen-logo-tw'>
              <Image
                src={'/logo/logo-tareas.png'}
                alt='logo'
                width={1000}
                height={1000}
                priority
                className='w-full h-full drop-shadow-[0px_1px_2px_#4C6E9E]'
              />
            </div>

            <div className='logo-name_two'>
              <h3>Dev</h3>
              <h2>Friend</h2>
            </div>
          </div>

          <div className='box_inputs'>
            <div className='input_option'>
              <Labels>Nombre</Labels>
              <Inputs
                onChange={capTure}
                name='nombre'
                type='text'
                placeholder='Mario'
              />
            </div>
            <div className='input_option'>
              <Labels>Email</Labels>
              <Inputs
                onChange={capTure}
                name='email'
                type='email'
                placeholder='devfriend@gmail.com'
              />
            </div>
            <div className='input_option'>
              <Labels>Password</Labels>
              <Inputs
                onChange={capTure}
                name='password'
                type='password'
                placeholder='*******'
              />
            </div>
          </div>

          <div>
            <Buttonss onClick={close}>Registrar</Buttonss>
          </div>
        </div>
      </Modal>
      <Toast ref={toast} position='top-center' />
    </div>
  );
}

