import PostsModel from "../models/PostsModel";


export default class PostsViewModel {

    _viewModel: ?PostsModel;

    constructor(model: PostsModel) {
        this._viewModel = model;
    }

    get postsViewModel() {
        return this._viewModel;
    }
}