import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('register')
  register(@Body() registerBody: RegisterDto) {
    const registerUser = this.authService.register(registerBody);

    return registerUser;
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() loginBody: LoginDto) {
    const loginUser = this.authService.login(loginBody);
    return loginUser;
  }
}
