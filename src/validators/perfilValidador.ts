import { z } from 'zod'

export const perfilValidador = z.object({
  username: z
    .string({ message: 'El nombre de usuario es requerido' })
    .min(1, { message: 'El nombre de usuario es requerido' })
    .max(30, {
      message: 'El nombre de usuario debe tener como máximo 30 caracteres'
    }),
  first_name: z
    .string({ message: 'El primer nombre es requerido' })
    .min(1, { message: 'El primer nombre es requerido' })
    .max(30, { message: 'Nombre máximo 30 caracteres' }),
  last_name: z
    .string({ message: 'La última parte del nombre es requerido' })
    .min(1, { message: 'La última parte del nombre es requerido' })
    .max(30, { message: 'Nombre máximo 30 caracteres' }),
  email: z
    .string({ message: 'El correo es requerido' })
    .email({ message: 'Debe ser un correo electrónico válido' })
    .max(30, { message: 'Email máximo 30 caracteres' }),
  avatar: z
    .any()
    .refine((file) => file instanceof File, {
      message: 'Debe seleccionar una imagen válida'
    })
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      // 5MB máximo
      message: 'La imagen no debe superar los 5MB'
    })
})
