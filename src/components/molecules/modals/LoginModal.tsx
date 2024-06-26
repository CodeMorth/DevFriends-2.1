'use client'
import {Inputs,Labels} from '@/components/atoms';
import {Modal} from "@/components/global";
import { useAlerts,useFormss,userLocalStoras } from "@/hook";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Toast } from "primereact/toast";
import { useEffect } from "react";
import { setTimeout } from "timers";

interface ModalLogin {
  visible: boolean;
  closeModal:  () => void;
  setlogin?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LoginModal = ({ visible, closeModal, setlogin }: ModalLogin) => {
  const { show, toast } = useAlerts();

  const { datos, capTure, setdatos } = useFormss();

  const { obtenerLocal } = userLocalStoras();

  const router = useRouter();

  useEffect(() => {
    let dts = obtenerLocal("user");
    setdatos(dts);
  }, []);

  useEffect(() => {}, [datos]);

  const close = () => {
    if (datos?.email !== null && datos?.password !== null) {
      closeModal();
      show("Ingreso Exitoso");
      if (setlogin) setlogin(true);
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } else {
      show("Ingrese los datos correctos");
    }
  };

  return (
    <div>
      <Modal
        visible={visible}
        closeModal={closeModal}
        widthModal="w-[90%]  phone:w-[45rem] py-[3rem] h-[50rem] "
        className="logi_box main-page"
      >
        <div className="login_modal">
          <div className="logo">
            <div className="imagen-logo-tw">
              <Image
                src={"/logo/logo-tareas.png"}
                alt="logo"
                width={1000}
                height={1000}
                priority
                className="w-full h-full drop-shadow-[0px_1px_2px_#4C6E9E]"
              />
            </div>

            <div className="logo-name_two">
              <h3>Dev</h3>
              <h2>Friend</h2>
            </div>
          </div>

          <div className="box_inputs">
            <div className="input_option">
              <Labels>Email</Labels>
              <Inputs
                name="email"
                type="email"
                value={datos?.email}
                onChange={capTure}
                placeholder="devfriend@gmail.com"
              />
            </div>
            <div className="input_option">
              <Labels>Password</Labels>
              <Inputs
                name="password"
                value={datos?.password}
                onChange={capTure}
                type="password"
                placeholder="*******"
              />
            </div>
          </div>

          <div>
            <button className="btn_login_box_ingreso" onClick={close}>
              Ingresar
            </button>
          </div>
        </div>
      </Modal>
      <Toast ref={toast} position="top-center" />
    </div>
  );
}

