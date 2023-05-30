
import { API_URL, IUser } from 'Shared';
import {AuthRequest, AuthResponse} from "./auth.type";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${API_URL}/auth`,
    }),
    tagTypes: ['Auth'],
    endpoints: (build) =>(
        {
            login: build.mutation<IUser, AuthRequest>({
                query: (credentials)=>({
                    url: '/login',
                    method: 'POST',
                    body: credentials,
                    mode: 'cors',
                }),
                transformResponse(res: AuthResponse) {
                    localStorage.setItem('uid', res.authentication_token.token)
                    return res.user
                },
                invalidatesTags: ['Auth']
            }),
            refresh: build.query<IUser, string | null>({
                query: (token) => ({
                    url: `${token}`,
                }),
                transformResponse(res: AuthResponse) {
                    return res.user
                },
                providesTags: result => ['Auth']
            }),
            protected: build.mutation({
                query: () => "protected"
            })
        }
    )
})