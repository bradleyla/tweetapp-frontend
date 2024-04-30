import { ITweeter, Tweeter } from "./tweeter.model";
import { IUser } from "./user.model";


export interface IReply {
    replyId: number;
    replyMessage: string;
    tag?: string; 
    createdAt?: Date; 
    tweet?: ITweeter;
    user?: IUser; 
    likes?: number;
}

export class Reply implements IReply {
    constructor(
        public replyMessage: string= "",
        public tweet?: ITweeter,
        public user?: IUser,
        public tag: string = "",
        public createdAt?: Date,
        public replyId: number = 0,
        public likes: number = 0
    ) {}

}