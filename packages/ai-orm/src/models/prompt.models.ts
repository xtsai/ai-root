import { QueryOptionsDto } from '@xtsai/core';
import { IsOptional } from 'class-validator';

export class QueryPetOptions extends QueryOptionsDto {
  @IsOptional()
  group: string;
}
