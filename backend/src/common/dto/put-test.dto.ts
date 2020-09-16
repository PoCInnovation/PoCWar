import {
  IsInt, IsString, Min, Max, IsArray,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateTestDto } from './create-test.dto';

export class PutTestDto extends CreateTestDto {}
export class PutTestAdminDto extends CreateTestDto {}
