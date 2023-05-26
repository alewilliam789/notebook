import express from "express";
import { connectToDatabase } from "./services/database.service.js";
import { usersRouter } from "./routes/users.router.js";
import { notesRouter } from "./routes/notes.router.js";
import cors from "cors";
const port = process.env.PORT || 3000;
const app = express();
app.use(cors());
connectToDatabase()
    .then(() => {
    app.use("/users", usersRouter);
    app.use("/notes", notesRouter);
    app.listen(port, () => {
        console.log(`Server started at ${port}`);
    });
})
    .catch((error) => {
    console.error("Database connection failed", error);
    process.exit();
});
//# sourceMappingURL=index.js.map