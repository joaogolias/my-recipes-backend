import express, { Response } from "express";
import { singupEndpoint } from "./presentation/endpoints/singupEndpoint";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (_, res: Response) => {
  res.status(200).send({
    message: "helloworld",
  });
});

app.post("/signup", singupEndpoint);

export default app;

const server = app.listen(process.env.PORT || 3000, () => {
  if (server) {
    const address = server.address() as any;
    console.log(`Server running on http://localhost:${address.port}`);
  } else {
    console.log("Failed to load server");
  }
});
