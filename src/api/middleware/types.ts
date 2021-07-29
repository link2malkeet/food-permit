import { DefaultContext } from "koa";

export interface APIState {
    table1: string[],
    table2: { [key in string]: string }[]
}


export interface APIContext extends DefaultContext {
}

