export type Roles = 'admin' | 'operador'

export interface User{
    username : string;
    password : string;
}

export interface UserResponse{
    message: string;
    token: string;
    res: boolean;
}

export interface UserResponseAutenticado{
    id: number;
    usuario: string;
    fechaCreacion: string;
    api_token: string;
    fechaToken: string;
    rol: Roles;
    nombre: string;
    apellido: string;
}