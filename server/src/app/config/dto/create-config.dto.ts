import { IsNotEmpty } from 'class-validator';

export class CreateConfigDto {
  @IsNotEmpty()
  serverUrl: string;

  @IsNotEmpty()
  adminDn: string;

  @IsNotEmpty()
  adminPassword: string;

  @IsNotEmpty()
  userSearchBase: string;

  @IsNotEmpty()
  usernameAttribute: string;
}
