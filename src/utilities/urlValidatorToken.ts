export const ulrValidatorToken = (request: any) => {
  const url = request?.url

  if (url?.includes('loginUser')) {
    return request
  }
  if (url?.includes('userData')) {
    return request
  }
  if (url?.includes('updateUser')) {
    return request
  }
  if (url?.includes('work_space')) {
    return request
  }
  if (url?.includes('all_Work_spaces_user')) {
    return request
  }
  if (url?.includes('tablas_x_work_space')) {
    return request
  }
  if (url?.includes('CreateTable')) {
    return request
  }
  if (url?.includes('cardsPerUser')) {
    return request
  }
  if (url?.includes('createCard')) {
    return request
  }
  if (url?.includes('getTaskTable')) {
    return request
  }
  if (url?.includes('createTask')) {
    return request
  }
  if (url?.includes('generateToken')) {
    return request
  }
  if (url?.includes('addGuestToWorkspace')) {
    return request
  }
  if (url?.includes('logout')) {
    return request
  }
  if (url?.includes('tablaAllUser')) {
    return request
  }
}
