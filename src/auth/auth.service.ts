import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity.js';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto.js';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto.js';
import * as bcrypt from "bcrypt"

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService
  ){}
  registerUser(createUserDto: CreateUserDto){
    createUserDto.userPassword = bcrypt.hashSync(createUserDto.userPassword, 5)
    return this.userRepository.save(createUserDto)
  }
  async loginUser(loginUserDto: LoginUserDto) {
  const user = await this.userRepository.findOne({
    where: {
      userEmail: loginUserDto.userEmail
    }
  });
  if (!user) {
    throw new UnauthorizedException("Credenciales inválidas (correo no encontrado)");
  }

  const match = await bcrypt.compare(loginUserDto.userPassword, user.userPassword);
  if (!match) {
    throw new UnauthorizedException("No estás autorizado");
  }

  const payload = {
    userEmail: user.userEmail,
    userRoles: user.userRoles
  };

  const token = this.jwtService.sign(payload);
  return { token };
}
}
