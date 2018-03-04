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

        switch(errorModel.errorCode) { 
            // case strings.noInternet: 
            //     errorModel.errorMessage = "test";
        }

    }
}