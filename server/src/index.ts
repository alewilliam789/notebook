import express from "express";
import { connectToDatabase } from "./services/database.service.js";
import { usersRouter } from "./routes/users.router.js";
import { notesRouter } from "./routes/notes.router.js";

const port = process.env.PORT;
const app = express();




connectToDatabase()
    .then(() => {
        app.use("/users", usersRouter);
        app.use("/notes", notesRouter);

        app.listen( port, () => {
            console.log(`Server started at http://localhost:${port}`);
        });
    })
    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
    })