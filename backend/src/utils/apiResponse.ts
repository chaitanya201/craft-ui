export class apiResponse {
    metadata={
        code:200,
        message:"",
        timeStamp: new Date().toISOString()
    }
    data={
        message:"",
        responseData: null
    }
    constructor({metadata,data}={metadata: this.metadata,data:this.data}){

        this.metadata= metadata;
        this.data = data
    }
}