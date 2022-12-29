import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';

import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}
  async validateUser(email: string, password: string) {
    const user = await this.userService.findOneByEmail(email);

    if (!user || user.password !== password) return false;
    return user;
  }
  registerUser(createUser: CreateUserDto) {}
}
