import { IsString, IsNotEmpty } from "class-validator";

export class GetUserByIdInput {
  @IsString()
  @IsNotEmpty()
  id?: string;
}
