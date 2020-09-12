import { Module } from '@nestjs/common';
import { AdminModule } from './modules/admin/admin.module';
import { AuthModule } from './modules/auth/auth.module';
import { TestModule } from './modules/test/test.module';
import { ChallengeModule } from './modules/challenge/challenge.module';
import { CodeSourceModule } from './modules/codesource/code-source.module';

@Module({
  imports: [
    AdminModule,
    AuthModule,
    TestModule,
    ChallengeModule,
    CodeSourceModule,
  ],
})
export class AppModule {}
