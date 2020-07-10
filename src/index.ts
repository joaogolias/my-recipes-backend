import "reflect-metadata";
import { createConnection } from "typeorm";
import app from "../src/presentation/routes";
import dotenv from "dotenv";

dotenv.config();

createConnection()
  .then(async (connection) => {
    const server = app.listen(process.env.PORT || 3001, () => {
      if (server) {
        console.log(
          `Server running on http://localhost:${(server.address() as any).port}`
        );
      } else {
        console.log("Failure on running server");
      }
    });
  })
  .catch((error) => console.log(error));
