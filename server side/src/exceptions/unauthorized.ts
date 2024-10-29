import { HttpException } from "./root";

export class UnAthorizedException extends HttpException{
    constructor(message:string,errorCode:number,error?:any){
        super(message,errorCode,401,error)
    }
}