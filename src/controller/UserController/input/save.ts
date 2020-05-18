import { IsString, IsNotEmpty } from "class-validator";

export class SaveUserInput {
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsString()
  @IsNotEmpty()
  nickname?: string;

  @IsString()
  @IsNotEmpty()
  email?: string;
}
