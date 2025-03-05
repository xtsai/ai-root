import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import {
  CapatchaService,
  XAuthCacheService,
  XAuthJwtOptionsFactory,
  XAuthJwtStrategy,
} from '@xtsai/core';
import { ConfigService } from '@nestjs/config';
import { SystemLoginManager } from './services';
import { CapatchaController } from './controllers/capatcha.controller';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: true,
    }),
    JwtModule.registerAsync({
      global: true,
      imports: [],
      useClass: XAuthJwtOptionsFactory,
      inject: [ConfigService],
      extraProviders: [],
    }),
  ],
  controllers: [AuthController, CapatchaController],
  providers: [
    XAuthJwtOptionsFactory,
    XAuthCacheService,
    XAuthJwtStrategy,
    AuthService,
    SystemLoginManager,
    CapatchaService,
  ],
  exports: [],
})
export class AuthModule {}
