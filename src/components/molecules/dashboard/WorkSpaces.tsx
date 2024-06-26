import Image from "next/image";
import { Accordion, AccordionTab } from "primereact/accordion";
import { SpaceWork } from "@/interface/page";

interface WorkSpacesProps {
  spaceWorks: SpaceWork[];
  settableSelect: (number: number) => void;
}

export const WorkSpaces = ({ spaceWorks, settableSelect }: WorkSpacesProps) => {
  return (
    <div className="WorkSpaces">
      <Accordion className="accordion-container" activeIndex={0}>
        {spaceWorks?.map((data: SpaceWork, index: number) => {
          return (
            <AccordionTab
              key={index}
              className="dev-friends"
              header={data?.datos?.titleSpaceWork}
            >
              <div className="container">
                <div className="boards-container">
                  <div className="boards-image">
                    <Image
                      src={"/dashboard/tablero.png"}
                      alt=""
                      width={1000}
                      height={1000}
                      className="w-full h-full"
                    ></Image>
                  </div>
                  <h1
                    className="boards-text"
                    onClick={() => settableSelect(index)}
                  >
                    Tableros
                  </h1>
                </div>
                <div className="members-container">
                  <div className="members-image">
                    <Image
                      src={"/dashboard/group_2990282.png"}
                      alt=""
                      width={1000}
                      height={1000}
                      className="w-full h-full"
                    ></Image>
                  </div>
                  <div className="members-text">Miembros +</div>
                </div>
              </div>
            </AccordionTab>
          );
        })}
      </Accordion>
    </div>
  );
};

