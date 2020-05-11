import { Request } from "express";
import { generateEndpoint } from "../utils/generateEndpoint";
import { JwtAuthorizer } from "../../utils/jwt/JwtAuthorizer";
import { RefreshTokenDatabase } from "../../data/RefreshTokenDatabase";
import { UserDatabase } from "../../data/UserDatabase";
import { BcryptManager } from "../../utils/bcrypt/BcryptManager";
import { UuidGenerator } from "../../utils/uuid/UuidGenerator";
import { LoginUC, LoginUCInput } from "../../business/usecase/Login";

export const loginEndpoint = generateEndpoint(async (req: Request) => {
  const uc = new LoginUC(
    new RefreshTokenDatabase(),
    new JwtAuthorizer(),
    new UserDatabase(),
    new BcryptManager(),
    new UuidGenerator()
  );

  const ucInput = new LoginUCInput();
  ucInput.nickname = req.body.nickname;
  ucInput.password = req.body.password;
  ucInput.device = req.body.device;

  const result = await uc.execute(ucInput);

  return result;
});
