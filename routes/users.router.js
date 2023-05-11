//External Dependencies
import express from 'express';
import { collections } from '../services/database.service.js';
// Global Config
export const usersRouter = express.Router();
usersRouter.use(express.json());
// GET 
usersRouter.get('/:username', async (req, res) => {
    const userName = req?.params?.username;
    try {
        const query = { userName: userName };
        const user = (await collections.users.findOne(query));
        if (!user.id) {
            res.status(200).send(user);
        }
    }
    catch (error) {
        res.status(404).send(`Could not find user with username ${userName}`);
    }
});
// POST
usersRouter.post('', async (req, res) => {
    try {
        const newUser = req.body;
        const query = { userName: newUser.userName };
        const isUser = await collections.users.findOne(query);
        if (!isUser) {
            const result = await collections.users.insertOne(newUser);
            result
                ? res.status(201).send(`Successfully created a new user with id ${result.insertedId}.`)
                : res.status(500).send('Failed to create new user.');
        }
        else {
            res.status(409).send('Username already exists in the database');
        }
    }
    catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});
// PUT
usersRouter.put("/:username", async (req, res) => {
    const userName = req?.params?.username;
    try {
        const updatedUser = req.body;
        const query = { userName: userName };
        const result = await collections.users.updateOne(query, { $set: updatedUser });
        result
            ? res.status(200).send(`Successfully updated user with id ${userName}`)
            : res.status(304).send(`User with id: ${userName} not updated`);
    }
    catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});
// DELETE
usersRouter.delete("/:username", async (req, res) => {
    const userName = req?.params?.username;
    try {
        const query = { userName: userName };
        const result = await collections.users.deleteOne(query);
        if (result && result.deletedCount) {
            res.status(202).send(`Successfully removed user with username ${userName}`);
        }
        else if (!result) {
            res.status(400).send(`Failed to remove user with username ${userName}`);
        }
        else if (!result.deletedCount) {
            res.status(404).send(`User with username ${userName} does not exist`);
        }
    }
    catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});
//# sourceMappingURL=users.router.js.map