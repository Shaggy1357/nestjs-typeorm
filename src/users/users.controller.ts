import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUser } from '../dtos/createUser.dto';
import { CreateUserPost } from '../dtos/CreateUserPost.dto';
import { UpdateUser } from '../dtos/updateUser.dto';
import { UserProfile } from '../entities/profiles.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Get()
  async getUsers() {
    const users = await this.userService.findUsers();
    return users;
  }

  @Post('/create')
  createUser(@Body() createUserDto: CreateUser) {
    return this.userService.createUser(createUserDto);
  }

  @Patch(':id')
  async updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUser: UpdateUser,
  ) {
    await this.userService.updateUser(id, updateUser);
  }

  @Delete(':id')
  async DeleteUser(@Param('id', ParseIntPipe) id: number) {
    await this.userService.deleteUser(id);
  }

  @Post('/create/profiles/:id')
  createUserProfile(
    @Body() CreateUserProfile: UserProfile,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.userService.CreateUserProfile(CreateUserProfile, id);
  }

  @Post('/posts/:id')
  createUserPost(
    @Param('id', ParseIntPipe) id: number,
    @Body() createuserPost: CreateUserPost,
  ) {
    return this.userService.createUserPost(id, createuserPost);
  }
}
