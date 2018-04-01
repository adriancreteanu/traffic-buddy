import PostModel from "../models/PostModel";


export default class PostViewModel {

    _viewModel: ?PostModel;

    constructor(model: PostModel) {
        this._viewModel = model;
    }

    get postViewModel() {
        return this._viewModel;
    }
}