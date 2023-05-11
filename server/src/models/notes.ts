import { ObjectId} from "mongodb";
import User from "./users.js";




export default class Notes {
    
    constructor(
        public title: string,
        public body: string,
        public user_id: string,
        public id?: ObjectId,
    ) {}
}