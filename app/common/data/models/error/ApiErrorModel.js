//import { strings } from "../../../localization/strings-repository";


export default class ApiErrorModel {

    errorCode: string;
    errorMessage: string;


    constructor() {
        this.errorCode = "";
        this.errorMessage = "";
    }

    static createDefaultErrorInstance(jsonObject: Object) {
        let errorModel = new ApiErrorModel();
        errorModel.errorCode = jsonObject.code;
        errorModel.errorMessage = jsonObject.message;

        switch(errorModel.errorCode) { 
            // case strings.noInternet: 
            //     errorModel.errorMessage = "test";
        }

        //TODO 
        // treat for errorCode: undefined and errorMessage: "error is not defined" ->> Something went wrong
        return errorModel;

    }
}