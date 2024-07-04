export interface UserByID {
    id_user:       number;
    username:      string;
    password:      string;
    first_name:    string;
    last_name:     string;
    avatar:        string|null;
    confirm_email: string|null;
    email:         string;
    id_rol:        string|null;
    work_spaces:   WorkSpace[];
}

export interface WorkSpace {
    id_work_space:          number;
    name_work_space:        string;
    description_work_space: string;
    tables:                 any[];
}
