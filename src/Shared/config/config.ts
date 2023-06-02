/** API entrypoint */
export const API_URL = "http://moddabyl.kz:4000/api";

/** Режим запуска программы */
export const NODE_ENV = process.env.NODE_ENV;
/** Режим разработки */
export const isDevEnv = NODE_ENV === "development";
/** Режим продакшена */
export const isProdEnv = NODE_ENV === "production";
