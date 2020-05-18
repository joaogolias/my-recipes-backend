import "reflect-metadata";
import { createConnection } from "typeorm";
import app from "../src/presentation/routes";

createConnection()
  .then(async (connection) => {
    const server = app.listen(3000 || process.env.port, () => {
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
