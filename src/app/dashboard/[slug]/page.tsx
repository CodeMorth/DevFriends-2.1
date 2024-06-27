import { AccordionHorizontal } from '@/components/design'
import { SlugTablas } from '@/components/organins'
import Image from 'next/image'
import { FaShareAltSquare } from 'react-icons/fa'
import { Metadata } from 'next'

interface SlugProps {
  params: {
    slug: string
  }
  searchParams: {}
}

export async function generateMetadata({params}: SlugProps): Promise<Metadata> {

  const metadada: Metadata = {

    title: `Tablero ${params.slug}`,
    description:"Tableros especificos"
    
  }

  return metadada

}

export default function Page() {

  return (
    <>
      <div className="SlugDashboard">
        <div className="container-slug-dashboard">
          <div className="container-slug-left">
            <div className="menu-slug">
              <AccordionHorizontal title={'Dev Friend'} titleColor="#f969aa">
                <div className="container">
                  <div className="boards-container">
                    <div className="boards-image">
                      <Image
                        src={'/dashboard/tablero.png'}
                        alt=""
                        width={1000}
                        height={1000}
                        className="w-full h-full"
                      ></Image>
                    </div>
                    <h1 className="boards-text">Tableros</h1>
                  </div>
                  <div className="members-container">
                    <div className="members-image">
                      <Image
                        src={'/dashboard/group_2990282.png'}
                        alt=""
                        width={1000}
                        height={1000}
                        className="w-full h-full"
                      ></Image>
                    </div>
                    <div className="members-text">Miembros +</div>
                  </div>
                </div>
              </AccordionHorizontal>
            </div>
          </div>
          <div className="container-slug-rigth">
            <div className="header-rigth">
              <h1 className="title-table">Titulo del tablero</h1>
              <button className="button-share">
                <div>
                  <FaShareAltSquare />
                </div>
                <p>Compartir</p>
              </button>
            </div>
            <SlugTablas />
          </div>
        </div>
      </div>
    </>
  )
}
