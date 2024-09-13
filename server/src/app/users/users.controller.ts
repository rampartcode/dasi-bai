import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { Prisma } from '@prisma/client';

import { CreateUserDTO } from './dto/create-user';
import { ChangeRoleDTO } from './dto/change-role';

@UseGuards(AuthGuard('jwt'))
@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('')
  async createUser(@Body() createUser: CreateUserDTO) {
    return await this.usersService.createUser(createUser);
  }

  @Get('')
  findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Query('order') order: string = 'asc',
  ) {
    const params = {
      page: Number(page),
      limit: Number(limit),
      order: order === 'desc' ? Prisma.SortOrder.desc : Prisma.SortOrder.asc,
    };

    return this.usersService.findAll(params);
  }

  @Patch('change-role')
  async changeRole(@Body() changeRoleDto: ChangeRoleDTO) {
    return await this.usersService.changeRole(changeRoleDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    console.log(id);
    return await this.usersService.deleteUser(id);
  }
}
