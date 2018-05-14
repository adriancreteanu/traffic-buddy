import MessagesModel from "../models/MessagesModel";

export default class MessagesViewModel {

    _viewModel: MessagesModel;

    constructor(model: MessagesModel) {
        this._viewModel = model;
    }

    get messagesViewModel() {
        return this._viewModel;
    }
}