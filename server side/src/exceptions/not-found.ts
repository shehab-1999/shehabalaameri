import { ErrorCode, HttpException } from "./root";

export class NotFoundException extends HttpException{
    constructor(messsage:string,errorCode:ErrorCode){
        super(messsage,errorCode,404,null);
    }
}