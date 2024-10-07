export interface SpaceWork {
  id_work_space: number
  name_work_space: string
  description_work_space: string
  createdAt: Date
  updatedAt: Date
}

export interface WorkSpace {
  id_work_space: string
  name_work_space: string
}

export interface WorkSpaceUser {
  id_user: number
  work_spaces: WorkSpace[]
}
