import { IsOptional } from 'class-validator';
import { QueryOptionsDto } from './query.options.model';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class QueryLogParams extends QueryOptionsDto {
  @ApiPropertyOptional({
    required: false,
    description: 'username',
  })
  @IsOptional()
  username?: string;

  @ApiPropertyOptional({
    required: false,
    description: 'query has error logs',
  })
  @IsOptional()
  isErrored?: boolean;
}
