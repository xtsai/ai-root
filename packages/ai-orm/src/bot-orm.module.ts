import { DynamicModule, Module, Provider } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { botRegistEntities } from './entities/regist.entities';
import { PromptService } from './services';

const sharedProviders: Provider[] = [PromptService];

@Module({
  providers: [],
  exports: [],
})
export class BotOrmModule {
  static forRoot(global: boolean = false): DynamicModule {
    return {
      global,
      module: BotOrmModule,
      imports: [ConfigModule, TypeOrmModule.forFeature([...botRegistEntities])],
      providers: [...sharedProviders],
      exports: [...sharedProviders],
    } as DynamicModule;
  }
}
