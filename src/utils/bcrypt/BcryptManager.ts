import * as bcryptjs from "bcryptjs";
import { HashGateway } from "../../business/gateway/Hash";

export class BcryptManager implements HashGateway {
  public async hash(plaintext: string): Promise<string> {
    const rounds = Number(process.env.BCRYPT_COST || 1);
    const salt = await bcryptjs.genSalt(rounds);
    const result = await bcryptjs.hash(plaintext, salt);
    return result;
  }

  public async compare(plaintext: string, hash: string): Promise<boolean> {
    return bcryptjs.compare(plaintext, hash);
  }
}
