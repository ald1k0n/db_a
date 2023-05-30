export {};

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            API_URL: String
            PORT: number
            NODE_ENV: string
        }
    }
}