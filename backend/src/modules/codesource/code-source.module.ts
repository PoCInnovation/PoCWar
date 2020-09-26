import { Module } from '@nestjs/common';
import { CodeSourceController } from './code-source.controller';
import { CodeSourceService } from './code-source.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [CodeSourceController],
  providers: [CodeSourceService],
  exports: [CodeSourceService],
})
export class CodeSourceModule {}
