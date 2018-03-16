import ApiErrorModel from "../../models/error/ApiErrorModel";



export default class ErrorViewModel {

    errorMessage: string;

    constructor(model: ApiErrorModel) {
        model != null
            ? this.errorMessage = model.errorMessage
            : this.errorMessage = "Eroare! Ajutor!"; //move this to strings repo
    }
}