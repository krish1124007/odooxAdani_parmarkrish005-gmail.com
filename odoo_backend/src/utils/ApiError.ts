interface ApiErrorInterface{
    statusCode:number;
    message:string;
    errors?:any;
}



class ApiError extends Error implements ApiErrorInterface{
    statusCode:number;
    message:string;
    errors?:any;
    constructor(statusCode:number,message:string,errors?:any){
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.errors = errors;
        
    }
}


export { ApiError }