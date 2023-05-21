import { ObjectId} from "mongodb";




export default class Notes {
    
    constructor(
        public title: string,
        public body: string,
        public userName: string,
        public id?: ObjectId,
    ) {}
}