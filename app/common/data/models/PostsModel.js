import PostModel from "./PostModel";

export default class PostsModel {

    postsModel: PostModel[];

    constructor(firebaseObject) {
        const posts = firebaseObject;

        this.postsModel = [];

        for(currentPost in posts) {
            let post = new PostModel(posts[currentPost], currentPost);
            this.postsModel.push(post);
        }

        // define loadMoreLimit as a consts
        const loadMoreLimit = 5;

        if(this.postsModel.length > loadMoreLimit + 1 || this.postsModel.length < loadMoreLimit) {
            this.postsModel.pop();
        }

        if(this.postsModel.length > loadMoreLimit) {
            this.postsModel.shift();
        }

        this.postsModel.reverse();
    }
}