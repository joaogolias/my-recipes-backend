import { Request } from "express";
import { generateEndpoint } from "../utils/generateEndpoint";
import { SignupUC } from "../../business/usecase/Signup";
import { JwtAuthorizer } from "../../utils/jwt/JwtAuthorizer";
import { RefreshTokenDatabase } from "../../data/RefreshTokenDatabase";
import { UserDatabase } from "../../data/UserDatabase";
import { BcryptManager } from "../../utils/bcrypt/BcryptManager";

export const singupEndpoint = generateEndpoint(async (req: Request) => {
  const uc = new SignupUC(
    new RefreshTokenDatabase(),
    new JwtAuthorizer(),
    new UserDatabase(),
    new BcryptManager()
  );

  const result = await uc.execute({
    id: req.body.id,
    name: req.body.name,
    nickname: req.body.nickname,
    password: req.body.password,
    device: req.body.device,
  });

  return result;
});
