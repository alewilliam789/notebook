import { ObjectId} from "mongodb";
import User from "./users";




export default class Notes {
    
    constructor(
        public title: string,
        public body: string,
        public user_id: User["id"],
        public id?: ObjectId,
    ) {}
}