import express, { Response } from "express";
import { singupEndpoint } from "./presentation/endpoints/singupEndpoint";
import dotenv from "dotenv";
import { loginEndpoint } from "./presentation/endpoints/loginEndpoint";

dotenv.config();

const app = express();

app.use(express.json());
g;

app.post("/signup", singupEndpoint);
app.post("/login", loginEndpoint);

export default app;

const server = app.listen(process.env.PORT || 3000, () => {
  if (server) {
    const address = server.address() as any;
    console.log(`Server running on http://localhost:${address.port}`);
  } else {
    console.log("Failed to load server");
  }
});
