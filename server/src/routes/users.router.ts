//External Dependencies
import express, {Request, Response} from 'express';
import {collections} from '../services/database.service.js';
import User from "../models/users.js";
import * as bcrypt from "bcrypt";




// Global Config
export const usersRouter = express.Router();


usersRouter.use(express.json());

// POST

// Add new user
usersRouter.post('', async (req: Request, res: Response ) => {

    try {
        const newUser = req.body as User;
        const query = {userName: newUser.userName};
        const isUser = await collections.users.findOne<User>(query) as User;
        if(!isUser){
            const saltRounds = 10;
            const hash = bcrypt.hashSync(newUser.password,saltRounds);
            newUser.password = hash;
            const result = await collections.users.insertOne(newUser);
                result
                    ? res.status(201).send(`Successfully created a new user with id ${result.insertedId}.`)
                    : res.status(500).send('Failed to create new user.')
            }
        else{
            res.status(409).send('Username already exists in the database')
        }
    }
    catch(error) {
        console.error(error);
        res.status(400).send(error.message);
    }
} )

// Verify current user
usersRouter.post('/login', async (req: Request, res: Response)=>{

    const userLogin: User = req.body;

    try{
        const query = { userName: userLogin.userName};
        const user = (await collections.users.findOne<User>(query)) as User;

        const match = await bcrypt.compare(userLogin.password, user.password);
        if(match){
            
            res.status(200).send('Valid login credentials');
        }
        else{
            res.status(401).send('Invalid login credentials');
        }
        
    }
    catch (error) {
        res.status(404).send(`Could not find user with username ${userLogin.userName}`);
    }
});

// PUT
usersRouter.put("/:username", async(req: Request, res: Response) => {
    const userName = req?.params?.username;

    try{
        const updatedUser: User = req.body as User;
        const query = { userName: userName};


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
usersRouter.delete("/:username", async(req: Request, res: Response) => {
    const userName = req?.params?.username;

    try{
        const query = { userName: userName};
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
