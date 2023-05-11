import { ObjectId} from "mongodb";




export default class Notes {
    
    constructor(
        public title: string,
        public body: string,
        public user_id: string,
        public id?: ObjectId,
    ) {}
}