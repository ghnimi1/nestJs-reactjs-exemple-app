import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { UserDto } from 'src/dto/users.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { UserDetails } from 'src/users/user.details';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from 'src/dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  async register(user: Readonly<UserDto>): Promise<UserDetails | any> {
    const { fullName, email, country, age, password } = user;

    const existingUser = await this.usersService.findByEmail(email);

    if (existingUser)
      throw new HttpException(
        'An account with that email already exists!',
        HttpStatus.CONFLICT,
      );

    const hashedPassword = await this.hashPassword(password);

    const newUser = await this.usersService.create(
      fullName,
      email,
      country,
      age,
      hashedPassword,
    );
    return this.usersService._getUserDetails(newUser);
  }

  async doesPasswordMatch(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserDetails | null> {
    const user = await this.usersService.findByEmail(email);
    const doesUserExist = !!user;

    if (!doesUserExist)
      throw new HttpException(
        'An account with that email not exists!',
        HttpStatus.CONFLICT,
      );

    const doesPasswordMatch = await this.doesPasswordMatch(
      password,
      user.password,
    );

    if (!doesPasswordMatch)
      throw new HttpException('Incorrect password!', HttpStatus.UNAUTHORIZED);

    return this.usersService._getUserDetails(user);
  }

  async login(data: AuthDto): Promise<{ token: string } | null> {
    const { email, password } = data;

    const user = await this.validateUser(email, password);

    const jwt = await this.jwtService.signAsync({ user });
    return { token: jwt };
  }
}
