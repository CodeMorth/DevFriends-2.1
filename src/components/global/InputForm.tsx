import { Control, Controller } from 'react-hook-form'
import { InputHTMLAttributes } from 'react'

interface InputFormProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  control: Control<any>
  errors: any
  labelText?: string | null
}

export const InputForm = ({
  name,
  errors,
  control,
  labelText,
  ...rest
}: InputFormProps) => {
  return (
    <div
      //  className="w-full sm:w-1/2"
      className="flex flex-col gap-[1rem]"
    >
      {labelText && (
        <label
          // className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
          className="sm:px-[1rem] text-[1.8rem] lg:text-[2rem] text-[#F969AA]"
          htmlFor={name}
        >
          {labelText}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <>
            <input
              // className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-2.5 pl-12.5 pr-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
              value={
                field.value !== undefined && field.value !== null
                  ? field.value
                  : ''
              }
              onChange={field.onChange}
              onBlur={field.onBlur}
              {...rest}
            />
            {errors?.[name] && (
              <p className="text-[red]">{errors[name]?.message}</p>
            )}
          </>
        )}
      />
    </div>
  )
}
