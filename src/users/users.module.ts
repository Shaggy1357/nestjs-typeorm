import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserPosts } from '../entities/posts.entity';
import { UserProfile } from '../entities/profiles.entity';
import { Users } from '../entities/users.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Users, UserProfile, UserPosts])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
