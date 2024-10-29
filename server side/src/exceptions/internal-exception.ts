import { HttpException } from "./root";

export  class InternalException extends HttpException{
    constructor(message:string,errros:any,errorCode:number)
    {
        super(message,errorCode,500,errros)
    }
}