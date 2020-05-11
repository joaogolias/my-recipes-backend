import express, { Request, Response } from "express";
import { AddressInfo } from "net";

const app = express();

app.use(express.json());

app.get("/", (_, res: Response) => {
  res.status(200).send({
    message: "helloworld",
  });
});

export default app;

const server = app.listen(process.env.PORT || 3000, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server running on http://localhost:${address.port}`);
  } else {
    console.log("Failed to load server");
  }
});
