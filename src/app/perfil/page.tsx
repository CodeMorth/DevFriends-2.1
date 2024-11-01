'use client'
import { Buttonss } from '@/components/atoms'
import { InputFileForm } from '@/components/global/InputFileForm'
import { InputForm } from '@/components/global/InputForm'
import { LoaderComponent } from '@/components/global/LoaderComponent'
import useProfileService from '@/hook/services/profile/useProfileService'
import { perfilValidador } from '@/validators/perfilValidador'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { CgBriefcase } from 'react-icons/cg'
import { FaLocationDot } from 'react-icons/fa6'

export default function PagePerfil() {
  const { data, loading, putUpdateH } = useProfileService();
  const [edit, setEdit] = useState(false);
  const [initialValues, setInitialValues] = useState(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(perfilValidador),
  });

  const watchedData = watch();

  const handleProfileUpdate = async (formData: any) => {
    await putUpdateH(formData);
    setEdit(false);
  };

  useEffect(() => {
    if (data?.getByToken) {
      reset(data.getByToken);
      setInitialValues(data.getByToken);
    }
  }, [data, reset]);

  useEffect(() => {
    if (initialValues) {
      const hasChanged = JSON.stringify(initialValues) !== JSON.stringify(watchedData);
      setEdit(hasChanged);
    }
  }, [watchedData, initialValues]);

  return (
    <>
      <LoaderComponent loading={loading?.propiertyData} />
      {data.getByToken&& (
        <article className="perfil-box main-page">
          <form onSubmit={handleSubmit(handleProfileUpdate)}>
            <div className="imagen-avatar">
              <InputFileForm control={control} name="avatar" errors={errors} hidden />
            </div>
            <div className="w-full flex justify-center items-center">
              <InputForm
                control={control}
                name="first_name"
                errors={errors}
                placeholder="Kevin"
                className="input_first_name"
              />
              <InputForm
                control={control}
                name="last_name"
                errors={errors}
                placeholder="Ramirez"
                className="input_last_name"
              />
            </div>
            <div className="w-full flex flex-col gap-3 justify-center items-center laptop:gap-8">
              <InputForm
                control={control}
                name="username"
                errors={errors}
                placeholder="CodeMorth"
                className="input_username"
              />
              <InputForm
                control={control}
                name="email"
                errors={errors}
                placeholder="email@gmail.com"
                className="input_email"
              />
            </div>
            <h3>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Laudantium illum veritatis.
            </h3>
            <div className="flex gap-4 laptop:gap-10">
              <div className="jobs-container">
                <CgBriefcase className="text-primaryPink" />
                <h3>Diseñador UX/UI Senior</h3>
              </div>
              <div className="jobs-container">
                <FaLocationDot className="text-primaryPink" />
                <h3>Madrid, España</h3>
              </div>
            </div>
            <div className="statistics-container">
              <div className="data-container">
                <h4 className="text-primaryPink">152</h4>
                <p>Projects</p>
              </div>
              <div className="data-container">
                <h4 className="text-primaryBlue">10,500</h4>
                <p>Followers</p>
              </div>
              <div className="data-container">
                <h4 className="text-primaryPink">3,200</h4>
                <p>Following</p>
              </div>
            </div>
            {edit && (
              <div className="button-container">
                <Buttonss type="submit">Actualizar</Buttonss>
              </div>
            )}
          </form>
        </article>
      )}
    </>
  );
}
