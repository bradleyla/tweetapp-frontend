import { IUser } from "./user.model";

export interface ITweeter {
    tweetId?: number;
    user?: IUser;
    message: string;
    tag?: string;
    createdAt?: Date;
    likes: number; 

}

export class Tweeter implements ITweeter{
    likes: number;
    constructor(
        public message: string,
        public tweetId?: number,
        public user?: IUser,
        public tag?: string,
        public createdAt?: Date,
    ) {
        this.likes = 0;
    }

}