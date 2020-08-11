import { Module } from '@nestjs/common';
import { UserModule } from './user';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
