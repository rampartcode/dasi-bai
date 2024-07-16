import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataModule } from './app/data/data.module';
import { ThrottlerModule, ThrottlerOptions } from '@nestjs/throttler';
import { config } from 'src/config/config';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './app/config/config.module';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
