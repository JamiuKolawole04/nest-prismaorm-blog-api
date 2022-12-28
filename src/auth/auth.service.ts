import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';

import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  private userService: UsersService;
  constructor(private moduleRef: ModuleRef) {}
  validateUser(email: string, password: string) {}
  registerUser(createUser: CreateUserDto) {}
}
