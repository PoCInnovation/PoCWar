import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './auth/auth.module';
import { TestModule } from './modules/test/test.module';
import { ChallengeModule } from './modules/challenge/challenge.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    TestModule,
    ChallengeModule,
  ],
})
export class AppModule {}
