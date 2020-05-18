import { IsString, IsNotEmpty } from "class-validator";

export class DeleteUserInput {
  @IsString()
  @IsNotEmpty()
  id?: string;
}
