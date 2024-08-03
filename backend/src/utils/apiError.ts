export class APIError {
    message;
    errorCode;
    constructor(err:string, errorCode:number){
        this.message = err,
        this.errorCode = errorCode
    }
}