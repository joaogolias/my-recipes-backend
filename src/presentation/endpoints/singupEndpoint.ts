import { Request } from "express";
import { generateEndpoint } from "../utils/generateEndpoint";
import { SignupUC, SignupUCInput } from "../../business/usecase/Signup";
import { JwtAuthorizer } from "../../utils/jwt/JwtAuthorizer";
import { RefreshTokenDatabase } from "../../data/RefreshTokenDatabase";
import { UserDatabase } from "../../data/UserDatabase";
import { BcryptManager } from "../../utils/bcrypt/BcryptManager";
import { UuidGenerator } from "../../utils/uuid/UuidGenerator";

export const singupEndpoint = generateEndpoint(async (req: Request) => {
  const uc = new SignupUC(
    new RefreshTokenDatabase(),
    new JwtAuthorizer(),
    new UserDatabase(),
    new BcryptManager(),
    new UuidGenerator()
  );

  const ucInput = new SignupUCInput();
  ucInput.name = req.body.name;
  ucInput.email = req.body.email;
  ucInput.nickname = req.body.nickname;
  ucInput.password = req.body.password;
  ucInput.device = req.body.device;

  const result = await uc.execute(ucInput);

  return result;
});
