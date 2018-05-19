import ThreadModel from "./ThreadModel";


export default class ThreadsListModel {

    threadsList: ThreadModel[];

    constructor(firebaseThreads) {
        const threads = firebaseThreads;

        this.threadsList = [];

        for(currentThread in threads) {
            let thread = new ThreadModel(threads[currentThread], currentThread);
            this.threadsList.push(thread);
        }
    
    }


}