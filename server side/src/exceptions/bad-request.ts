import { ErrorCode, HttpException } from "./root";

export class BadRequestsException extends HttpException{
    constructor(messsage:string,errorCode:ErrorCode){
        super(messsage,errorCode,400,null);
    }
}