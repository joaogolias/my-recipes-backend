import { IdGateway } from "../../business/gateway/Id";
import { v4 } from "uuid";

export class UuidGenerator implements IdGateway {
  public generateId(): string {
    return v4();
  }
}
