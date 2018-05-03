
import NewsFeedService from "../services/NewsFeedService";
import ErrorViewModel from "../viewmodels/error/ErrorViewModel";

import * as newsFeedPayloads from "../payloads/NewsFeedPayloads";
import PostModel from "../models/PostModel";
import PostViewModel from "../viewmodels/PostViewModel";
import PostsViewModel from "../viewmodels/PostsViewModel";
import PostsModel from "../models/PostsModel";

export default class NewsFeedManager {

    _service: NewsFeedService;

    constructor() {
        this._service = new NewsFeedService();
    }

    async postGeneralMessage(
        payload: newsFeedPayloads.postGeneralMessagePayloadType
    ): Promise<PostViewModel | ErrorViewModel> {
        let response = await this._service.postGeneralMessage(payload);
        var viewModel: PostViewModel | ErrorViewModel = null;

        if (response instanceof PostModel) {
            viewModel = new PostViewModel(response);
        } else {
            viewModel = new ErrorViewModel(response);
        }
        return viewModel;
    }

    async fetchPosts(
        location: ?string
    ): Promise<PostsViewModel | ErrorViewModel> {
        let response = await this._service.fetchPosts(location);
        var viewModel: PostsViewModel | ErrorViewModel = null;

        if (response instanceof PostsModel) {
            viewModel = new PostsViewModel(response);
        } else {
            viewModel = new ErrorViewModel(response);
        }
        return viewModel;

    }

}