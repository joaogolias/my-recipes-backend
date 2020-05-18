import express from "express";
import * as bodyParser from "body-parser";
import cors from "cors";
import { getById } from "./users/getById";
import { all } from "./users/all";
import { save } from "./users/save";
import { deleteUser } from "./users/delete";

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/users", all);
app.get("/users/:id", getById);
app.post("/users", save);
app.delete("/users/:id", deleteUser);

export default app;
