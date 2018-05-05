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

        // Remove the last item from list i.e. the with the lastItemId
        this.postsModel.pop();

        // If we are not at the end of the list, then we have fetched one to many items, so we remove the last one
        if(this.postsModel.length > loadMoreLimit) {
            this.postsModel.shift();
        }

        // Reverse the items so they are in chronological order
        this.postsModel.reverse();
    }
}