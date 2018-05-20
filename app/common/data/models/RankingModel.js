

export default class RankingModel {

    rank: number;
    likes: number;
    dislikes: number;

    constructor(rankingObject) {
        this.rank = rankingObject.rank;
        this.likes = rankingObject.likes;
        this.dislikes = rankingObject.dislikes;
    }

}