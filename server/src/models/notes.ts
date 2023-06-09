import { ObjectId} from "mongodb";




export default class Note {
    
    constructor(
        public title: string,
        public body: string,
        public userName: string,
        public id?: ObjectId,
    ) {}
}