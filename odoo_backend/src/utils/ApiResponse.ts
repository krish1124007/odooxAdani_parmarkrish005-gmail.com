interface ApiResponseInterface {
    statusCode: number;
    message: string;
    data?: any;
}

class ApiResponse implements ApiResponseInterface {
    statusCode: number;
    message: string;
    data?: any;
    constructor(statuscode: number, message: string, data?: any) {
        this.statusCode = statuscode;
        this.message = message;
        this.data = data;
    }
}

export { ApiResponse }