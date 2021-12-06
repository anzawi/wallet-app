export interface User {
    name: string
    email: string
    blocked: boolean
    is_admin: boolean
    token: string
}

export interface UserFormValues {
    email: string,
    password: string
}

export interface RegisterFormValues {
    name: string,
    email: string,
    password: string
    password_confirmation: string
}