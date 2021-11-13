export type Roles = 'admin' | 'operador'

export interface User{
    usuario : string;
    password : string;
}

export interface UserResponse{
    access_token: string;
    token_type: string; 
    expires_in: string;
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