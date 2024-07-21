import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('api/users')
export class UserController {
  constructor(private userService: UserService) {}
  @Post('')
  createUser(@Body() createUser: CreateUserDTO) {
    return this.userService.createUser(createUser);
  }
}
