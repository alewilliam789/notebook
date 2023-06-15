//External Dependencies
import express from 'express';
import { ObjectId } from 'mongodb';
import { collections } from '../services/database.service.js';
// Global Config
export const notesRouter = express.Router();
notesRouter.use(express.json());
// GET 
// GET all notes for a user
notesRouter.get('/:username', async (req, res) => {
    const username = req?.params?.username;
    try {
        const query = { userName: username };
        const notes = (await collections.notes.find(query).toArray());
        res.status(200).send(notes);
    }
    catch (error) {
        res.status(404).send(`Could not find notes for user with username : ${username}`);
    }
});
// GET specific note
notesRouter.get('/note/:noteid', async (req, res) => {
    const noteId = req?.params?.noteid;
    try {
        const query = { _id: new ObjectId(noteId) };
        const note = (await collections.notes.findOne(query));
        if (note) {
            res.status(200).send(note);
        }
    }
    catch (error) {
        res.status(404).send(`Could not find note`);
    }
});
// POST
notesRouter.post('', async (req, res) => {
    try {
        const newNote = req.body;
        const result = await collections.notes.insertOne(newNote);
        result
            ? res.status(201).send(newNote)
            : res.status(500).send('Failed to create new note.');
    }
    catch (error) {
        res.status(400).send(error.message);
    }
});
// PUT
notesRouter.put("/:noteid", async (req, res) => {
    const noteId = req?.params?.noteid;
    try {
        const updatedNote = req.body;
        const query = { _id: new ObjectId(noteId) };
        const result = await collections.notes.updateOne(query, { $set: updatedNote });
        result
            ? res.status(200).send(updatedNote)
            : res.status(304).send(`Note with id: ${noteId} not updated`);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
});
// DELETE
notesRouter.delete("/:noteid", async (req, res) => {
    const noteId = req?.params?.noteid;
    try {
        const query = { _id: new ObjectId(noteId) };
        const result = await collections.notes.deleteOne(query);
        if (result && result.deletedCount) {
            res.status(202).send(`Successfully removed note with noteId ${noteId}`);
        }
        else if (!result) {
            res.status(400).send(`Failed to remove user with noteId ${noteId}`);
        }
        else if (!result.deletedCount) {
            res.status(404).send(`User with noteId ${noteId} does not exist`);
        }
    }
    catch (error) {
        res.status(400).send(error.message);
    }
});
//# sourceMappingURL=notes.router.js.map