export type ID=`${string}-${string}-${string}-${string}-${string}`

type Config={
    user: string,
    password:string,
    host:string,
    port: number;
    database: string,  
}

export interface User{
    id:ID,
    username:string,
    password:string
}

const {
    KEY="JHFAHGUGKNGJAGEKNS", 
    SECRET_VALUE="4738151HGA814U184914812841FAJNG38HR38",
    POSTGRES_USER="user-db",
    POSTGRES_PASSWORD='app_1234',
    POSTGRES_HOST='localhost',
    DOCKERPORT=5432,
    POSTGRES_DB='app-db'
}= process.env


export const config:Config={
    user:POSTGRES_USER,
    password:POSTGRES_PASSWORD,
    host:POSTGRES_HOST,
    port: Number(DOCKERPORT), //IT'S VERY IMPORTANT TO USE DEFAULT PORT!!!!!! 
    database: POSTGRES_DB,
}

export const key=KEY
export const secret_value= SECRET_VALUE

