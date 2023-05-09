//External Dependencies
import express, {Request, Response} from 'express';
import { ObjectId } from 'mongodb';
import {collections} from "../services/database.service";
import User from "../models/users";


// Global Config
export const usersRouter = express.Router();


usersRouter.use(express.json());


// GET 
usersRouter.get('/users/:username', async (req: Request, res: Response)=>{

    const userName = req?.params?.username;
    try{

        const query = { username: userName};
        const user = (await collections.users.findOne<User>(query)) as User;

        if(!user.id){
            res.status(200).send(user)
        }
    }
    catch (error) {
        res.status(404).send(`Unable to find matching user with username: ${req.params.username}`);
    }
});

// POST
usersRouter.post('/users', async (req: Request, res: Response ) => {

    try {
        const newUser = req.body as User;
        const result = await collections.users.insertOne(newUser);

        result
            ? res.status(201).send(`Successfully created a new user with id ${result.insertedId}.`)
            : res.status(500).send('Failed to create new user.')
    }
    catch(error) {
        console.error(error);
        res.status(400).send(error.message);
    }
} )

// PUT
usersRouter.put("/users/:username", async(req: Request, res: Response) => {
    const userName = req?.params?.username;

    try{
        const updatedUser: User = req.body as User;
        const query = { username: userName};


        const result = await collections.users.updateOne(query, {$set: updatedUser});

        result
            ? res.status(200).send(`Successfully updated game with id ${userName}`)
            : res.status(304).send(`Game with id: ${userName} not updated`);

    }
    catch(error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
})






// DELETE

