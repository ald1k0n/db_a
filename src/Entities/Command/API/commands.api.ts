import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { API_URL, ICommand } from "Shared";
import {executeCommandRequest} from "./commands.type";

export const commandsAPI = createApi({
    reducerPath: 'commandsAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: `${API_URL}`,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('uid')
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
                return headers
            }
        },
    }),
    tagTypes: ['Command'],
    endpoints: (build) =>(
        {
            fetchCommands: build.query<ICommand[], void>({
                query: ()=>({
                    url: '/commands',
                }),
                transformResponse: (data: { commands: ICommand[] }) => {
                    return data.commands
                },
                providesTags: result => ['Command']
            }),
            createCommand: build.mutation<ICommand, ICommand>({
                query: (Command) => ({
                    url: '/commands',
                    method: 'POST',
                    body: Command
                }),
                invalidatesTags: ['Command']
            }),
            updateCommand: build.mutation<ICommand, ICommand>({
                query: (command) => ({
                    url: `/commands/${command.id}`,
                    method: 'PATCH',
                    body: command
                }),
                invalidatesTags: ['Command']
            }),
            deleteCommand: build.mutation<ICommand, ICommand>({
                query: (command) => ({
                    url: `/commands/${command.id}`,
                    method: 'DELETE',
                }),
                invalidatesTags: ['Command']
            }),
            executeCommand: build.mutation<ICommand, executeCommandRequest>({
                query: (request)=>({
                    url: `/commands/${request.id}`,
                    method: 'POST',
                    body: request.body,
                    params: request.params,
                }),
                invalidatesTags: ['Command']
            }),
            getExampleFile: build.query<ICommand[], void>({
                query: ()=>({
                    url: '/examplefile',
                }),
            }),
        }
    )
})