import { IsNotEmpty, IsString } from 'class-validator';

export class ChangeRoleDTO {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  role: string;
}
