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

        this.postsModel.reverse();
    }


}