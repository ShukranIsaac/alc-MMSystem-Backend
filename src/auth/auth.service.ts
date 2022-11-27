
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignInCredentialsDto } from './dto/signin-credentials.dto';
import { JwtPayload } from './interface/jwt-payload.interface';
import { User, UserRoles } from '../users/entities/user.entity';
import { SignupCredentialsDto } from './dto/signup-credentials.dto';
import { MailService } from 'src/common/mail/mail.service';
import { Repository } from 'typeorm';
import { UpdatePasswordDto } from 'src/users/dto/update-password';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: Repository<User>,
    private userService: UsersService,
    private mailService: MailService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) { }

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

    if (await resp.validatePassword(password)) {
      const accessToken = this.generateJWT(resp);

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
    const accessToken = this.generateJWT(resp);

    return {
      accessToken,
      user: resp,
    };
  }

  async verifyEmail(email: string, verificationToken: string) {
    if (!email?.trim()) {
      throw new BadRequestException('E-mail is required');
    }

    // TODO: confirm verification token
    console.log(`verification-token --> ${verificationToken}`);

    const user0 = await this.userService.findOne({ email });
    if (!user0) {
      throw new NotFoundException('No record found');
    }

    if (user0.email_verified) {
      throw new UnprocessableEntityException('E-mail is already verified');
    }

    user0.email_verified = true;
    const user = await this.userService.createOrUpdate(user0);
    const accessToken = this.generateJWT(user);

    // remove PII
    delete user.password;
    delete user.salt;

    return {
      status: true,
      data: {
        ...user,
        accessToken,
      },
      message: 'E-mail verification was successful',
    };
  }

  async getUser(id: number): Promise<User> {
    return this.userService.findOne({ id: id });
  }


  //Password recovery

  async forgotPassword(forgotPasswordDto: UpdatePasswordDto): Promise<User> {
    const resp = await this.userService.findOne({ email: forgotPasswordDto.email });

    if (!resp) {
      throw new BadRequestException('Invalid email');
    }
    const password = crypto.randomUUID();
    resp.reset_code = bcrypt.hashSync(crypto.randomUUID(), 8)

    await this.mailService.send({
      from: this.configService.get<string>('MAIL_USER'),
      to: resp.email,
      subject: 'Forgot Password',
      html: `
          <h3>Hello ${resp.email}!</h3>
          <p>Please use this rest_code ${resp.password}" to reset your password.</p>
      `,
    });

    return await this.userRepository.save(resp)
  }

  async changePassword(changePasswordDto: UpdatePasswordDto): Promise<User> {
    const resp = await this.userService.updatePassword(changePasswordDto);
    await this.mailService.send({
      from: this.configService.get<string>('MAIL_USER'),
      to: resp.email,
      subject: 'Succes',
      html: `
        <p>Succes to reset your password.</p>
    `,
    });
    return resp;
  };
}

  private generateJWT(user: User) {
    const payload: JwtPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      username: user.username,
      photo: user.phone,
    };

    return this.jwtService.sign(payload);
  }


