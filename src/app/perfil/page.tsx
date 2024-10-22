'use client'
import { Buttonss } from '@/components/atoms'
import { InputFileForm } from '@/components/global/InputFileForm'
import { InputForm } from '@/components/global/InputForm'
import { LoaderComponent } from '@/components/global/LoaderComponent'
import useProfileService from '@/hook/services/profile/useProfileService'
import { perfilValidador } from '@/validators/perfilValidador'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

export default function PagePerfil() {
  const { data, loading, putUpdateH } = useProfileService('1')

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(perfilValidador)
  })

  const updatePerfil = async (data: any) => {
    putUpdateH(data)
  }

  useEffect(() => {
    reset(data?.getById)
  }, [data, reset])

  return (
    <>
      {<LoaderComponent loading={loading?.propiertyData} />}
      {data && (
        <article className="perfil-box main-page">
          <form onSubmit={handleSubmit(updatePerfil)}>
            <div className="imagen-avatar">
              <InputFileForm control={control} name="avatar" errors={errors} />
            </div>
            <div className="w-full flex justify-center items-center">
              <InputForm
                control={control}
                name="first_name"
                errors={errors}
                placeholder="Kevin"
                className="input-perfil justify-items-end font-extrabold"
              />
              <InputForm
                control={control}
                name="last_name"
                errors={errors}
                placeholder="Ramirez"
                className="input-perfil font-extrabold"
              />
            </div>
            <div className="w-full flex justify-center items-center">
              <InputForm
                control={control}
                name="username"
                errors={errors}
                placeholder="CodeMorth"
                className="input-perfil justify-items-end"
              />
              <InputForm
                control={control}
                name="email"
                errors={errors}
                placeholder="email@gmail.com"
                className="input-perfil"
              />
            </div>
            <h4>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Laudantium illum veritatis.
            </h4>
            <div className="jobs-container">
              <div>Diseñador UX/UI Senior</div>
              <div>Madrid, España</div>
            </div>
            <div className="statistics-container">
              <div className="data-container">
                <h4 className="text-primaryPink">152</h4>
                <p>Projects</p>
              </div>
              <div className="data-container ">
                <h4 className="text-primaryBlue">10.500</h4>
                <p>Followers</p>
              </div>
              <div className="data-container">
                <h4 className=" text-primaryPink">3200</h4>
                <p>following</p>
              </div>
            </div>
            <div className="button-container">
              <Buttonss type="submit">Actualizar</Buttonss>
            </div>
          </form>
        </article>
      )}
    </>
  )
}
