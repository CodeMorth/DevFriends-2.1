'use client'
import {useSidebar} from "@/hook";
import { Sidebar } from "primereact/sidebar";
import React from "react";

interface SideBarProps {
  setvisible: React.Dispatch<React.SetStateAction<boolean>>;
  visible: boolean;
  closeSideb: () => void;
}

export const SideBar = ({ setvisible, visible, closeSideb }: SideBarProps) => {
  const { navigateRuta, url } = useSidebar(closeSideb);

  return (
    <Sidebar
      position="right"
      className="sidebar-perfil main-page"
      visible={visible}
      onHide={() => setvisible(false)}
    >
      <div className="info-sidebar">
        {url?.map(
          (directions: { info: string; ruta: string }, index: number) => (
            <h4 key={index} onClick={() => navigateRuta(directions?.ruta)}>
              {directions?.info}
            </h4>
          )
        )}
      </div>
    </Sidebar>
  );
}
