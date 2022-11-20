import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignInCredentialsDto } from './dto/signin-credentials.dto';
import { JwtPayload } from './interface/jwt-payload.interface';
import { User, UserRoles } from '../users/entities/user.entity';
import { SignupCredentialsDto } from './dto/signup-credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(
    signInCredentialsDto: SignInCredentialsDto,
  ): Promise<{ accessToken: string; user: User }> {
    const { email, password } = signInCredentialsDto;
    let resp = await this.userService.findOne({ email });
    if (!resp) {
      resp = await this.userService.findOne({ username: email });
    }

    if (!resp) {
      resp = await this.userService.findOne({ phone: email });
    }
    if (!resp) {
      throw new UnauthorizedException('Invalid credentials');
    }
    if (resp && (await resp.validatePassword(password))) {
      const payload: JwtPayload = {
        id: resp.id,
        name: resp.name,
        email: resp.email,
        phone: resp.phone,
        role: resp.role,
        username: resp.username,
        photo: resp.phone,
      };
      const accessToken = this.jwtService.sign(payload);

      return {
        accessToken,
        user: resp,
      };
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async register(
    signupCredentialsDto: SignupCredentialsDto,
  ): Promise<{ accessToken: string; user: User }> {
    if (signupCredentialsDto.role === UserRoles.Admin) {
      if (!signupCredentialsDto.email.endsWith('@andela.com')) {
        throw new UnauthorizedException('Admin must have an @andela.com email');
      }
    }
    const resp = await this.userService.create(signupCredentialsDto);
    const payload: JwtPayload = {
      id: resp.id,
      name: resp.name,
      email: resp.email,
      phone: resp.phone,
      role: resp.role,
      username: resp.username,
      photo: resp.phone,
    };
    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      user: resp,
    };
  }

  async getUser(id: number): Promise<User> {
    return this.userService.findOne({ id: id });
  }
}
