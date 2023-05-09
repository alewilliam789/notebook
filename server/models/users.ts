import { ObjectId } from "mongodb";

export default class User {
    constructor(
        public userName: string,
        public passCode: string,
        public id?: ObjectId,
    ) {}
}