import { IUser } from "Shared";

export interface AuthResponse {
    user: IUser;
    authentication_token: {
        token: string,
        expiry: string
    };
}

export interface AuthRequest {
    login: string,
    password: string,
}