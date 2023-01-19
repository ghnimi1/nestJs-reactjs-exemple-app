import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthDto } from 'src/dto/auth.dto';
import { UserDto } from 'src/dto/users.dto';
import { UserDetails } from 'src/users/user.details';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('register')
  register(@Body() user: UserDto): Promise<UserDetails | null> {
    return this.service.register(user);
  }
  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() user: AuthDto): Promise<{ token: string } | null> {
    return this.service.login(user);
  }
}
