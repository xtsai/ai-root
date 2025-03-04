import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { RouterModule } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import {
  XAuthCacheService,
  XAuthJwtOptionsFactory,
  XAuthJwtStrategy,
} from '@xtsai/core';
import { ConfigService } from '@nestjs/config';
import { SystemLoginManager } from './services';

@Module({
  imports: [
    RouterModule.register([
      {
        path: 'auth',
        module: AuthModule,
      },
    ]),
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
  controllers: [AuthController],
  providers: [
    XAuthJwtOptionsFactory,
    XAuthCacheService,
    XAuthJwtStrategy,
    AuthService,
    SystemLoginManager,
  ],
  exports: [],
})
export class AuthModule {}
