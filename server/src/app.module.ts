import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DataModule } from './app/data/data.module';
import { ThrottlerModule, ThrottlerOptions } from '@nestjs/throttler';
import { config } from 'src/config';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './app/config/config.module';
import { UsersModule } from './app/users/users.module';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: Number(config.API_TIMEOUT_LIMIT),
        limit: 10,
      } as ThrottlerOptions,
    ]),
    AuthModule,
    DataModule,
    ConfigModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
