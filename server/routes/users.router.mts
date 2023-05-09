//External Dependencies
import express, {Request, Response} from 'express';
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
        const query = { username: newUser.userName}
        const potentialUser = (await collections.users.findOne<User>(query)) as User;

        if(!potentialUser.userName){
            const result = await collections.users.insertOne(newUser);
            result
                ? res.status(201).send(`Successfully created a new user with id ${result.insertedId}.`)
                : res.status(500).send('Failed to create new user.')
        }
        else{
            res.status(500).send('Failed to create new user.')
        }
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
            ? res.status(200).send(`Successfully updated user with id ${userName}`)
            : res.status(304).send(`User with id: ${userName} not updated`);

    }
    catch(error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
})

// DELETE
usersRouter.delete("/users/:username", async(req: Request, res: Response) => {
    const userName = req?.params?.username;

    try{
        const query = { username: userName};
        const result = await collections.users.deleteOne(query);

        if(result && result.deletedCount){
            res.status(202).send(`Successfully removed user with username ${userName}`)
        }
        else if (!result){
            res.status(400).send(`Failed to remove user with username ${userName}`);
        }
        else if(!result.deletedCount) {
            res.status(404).send(`User with username ${userName} does not exist`);
        }
    }
    catch(error){
        console.error(error.message);
        res.status(400).send(error.message);
    }
})
