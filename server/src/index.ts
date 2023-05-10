import express from "express";
import { connectToDatabase } from "./services/database.service.js";
import { usersRouter } from "./routes/users.router.js";

const port = process.env.PORT;
const app = express();




connectToDatabase()
    .then(() => {
        app.use("/users", usersRouter);

        app.listen( port, () => {
            console.log(`Server started at http://localhost:${port}`);
        });
    })
    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
    })