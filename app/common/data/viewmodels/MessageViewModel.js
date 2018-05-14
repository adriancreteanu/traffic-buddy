import MessageModel from "../models/MessageModel";

export default class MessageViewModel {

    _viewModel: MessageModel;

    constructor(model: MessageModel) {
        this._viewModel = model;
    }

    get messageViewModel() {
        return this._viewModel;
    }
}