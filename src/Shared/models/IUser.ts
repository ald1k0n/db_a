export interface IUser {
    id: string,
    firstName: string,
    lastName: string,
    login: string,
    email: string,
    isActive: boolean,
    role: UserRole
}

export type UserRole = "user" | "admin"