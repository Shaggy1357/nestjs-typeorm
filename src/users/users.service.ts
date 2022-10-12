import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserPosts } from '../entities/posts.entity';
import { UserProfile } from '../entities/profiles.entity';
import { Users } from '../entities/users.entity';
import {
  CreateUserParam,
  CreateUserPostParam,
  CreateUserProfileParam,
  UpdateUserParam,
} from '../utils/types';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private userRepo: Repository<Users>,
    @InjectRepository(UserProfile) private profileRepo: Repository<UserProfile>,
    @InjectRepository(UserPosts) private postsRepo: Repository<UserPosts>,
  ) {}
  findUsers() {
    return this.userRepo.find({ relations: ['profile', 'post'] });
  }

  createUser(userDetails: CreateUserParam) {
    const user = this.userRepo.create({
      ...userDetails,
      createdAt: new Date(),
    });

    return this.userRepo.save(user);
  }

  updateUser(id: number, updateUser: UpdateUserParam) {
    return this.userRepo.update({ id }, { ...updateUser });
  }

  deleteUser(id: number) {
    return this.userRepo.delete({ id });
  }

  async CreateUserProfile(
    createUserProfile: CreateUserProfileParam,
    id: number,
  ) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      throw new HttpException(
        'User not found. Cannot create Profile',
        HttpStatus.BAD_REQUEST,
      );
    }
    const profile = this.profileRepo.create(createUserProfile);
    const savedProfile = await this.profileRepo.save(profile);
    user.profile = savedProfile;
    return this.userRepo.save(user);
  }

  async createUserPost(id: number, createUserPostDetails: CreateUserPostParam) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      throw new HttpException(
        'User not found. Cannot create Profile',
        HttpStatus.BAD_REQUEST,
      );
    }
    const newPost = this.postsRepo.create({ ...createUserPostDetails, user });
    return this.postsRepo.save(newPost);
  }
}
