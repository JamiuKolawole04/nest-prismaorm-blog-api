import {
  Controller,
  Request,
  Body,
  Post,
  Get,
  UseGuards,
} from '@nestjs/common';

import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  login(@Request() req) {
    return req.user;
  }

  @Get('profile')
  profile(@Request() req) {
    return req.user;
  }

  @Post('register')
  register(@Body() createUser: CreateUserDto) {
    return this.authService.registerUser(createUser);
  }
}
