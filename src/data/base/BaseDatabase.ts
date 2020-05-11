import knex from "knex";
import Knex from "knex";
import { DatabaseConnectionError } from "../../utils/error/DatabaseConnectionError";
import { DataErrorMessage } from "../error/DataErrorMessage";

export abstract class BaseDatabase {
  private static connection: Knex | null = null;
  protected abstract mainTableName: string;

  protected getConnection(): Knex {
    if (BaseDatabase.connection === null) {
      BaseDatabase.connection = knex({
        client: "mysql",
        connection: {
          host: process.env.MYSQL_HOST,
          user: process.env.MYSQL_USER,
          password: process.env.MYSQL_PASSWORD,
          database: process.env.MYSQL_DB_NAME,
        },
      });
    }
    return BaseDatabase.connection;
  }

  public static async destroyConnection(): Promise<void> {
    if (BaseDatabase.connection) {
      await BaseDatabase.connection.destroy();
      BaseDatabase.connection = null;
    }
  }

  protected handleError = (err: any) => {
    console.log(err);
    const message = err.message.toLowerCase();

    if (message.indexOf("syntax") !== -1) {
      throw new DatabaseConnectionError(DataErrorMessage.SYNTAX);
    }

    if (message.indexOf("duplicate") !== -1) {
      throw new DatabaseConnectionError(DataErrorMessage.DUPLICATE_ENTITY);
    }

    if (message.indexOf("er_no_such_table") !== -1) {
      throw new DatabaseConnectionError(DataErrorMessage.TABLE_DOES_NOT_EXIST);
    }

    throw new DatabaseConnectionError(err.message);
  };

  protected async performQuery(callback: () => Promise<any>) {
    try {
      await callback();
    } catch (err) {
      this.handleError(err);
    }
  }
}
