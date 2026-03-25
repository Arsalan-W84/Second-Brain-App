declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_LINK: string;
      JWT_SECRET : string
    }
  }
}

export {};   