import { TypeWithKey } from '@/interface/models/typeWhitKeys'

export const getValidationError = (errorCode: string) => {
  const codeMatcher: TypeWithKey<string> = {
    ERR_NETWORK: 'Error de red',
    ERR_TIMEOUT: 'Se acabó el tiempo de espera',
    ERR_CANCEL: 'Se canceló la petición',
    ERR_UNKNOWN: 'Error desconocido',
    ERR_400: 'Error 400',
    ERR_401: 'Error 401',
    ERR_403: 'Error 403',
    ERR_BAD_REQUEST:"Error al procesar la peticion",
    ERR_BAD_RESPONSE:"Error al procesar la respuesta"
  }

  return codeMatcher[errorCode] ?? "Error desconocido"
}
