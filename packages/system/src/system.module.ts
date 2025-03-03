import { Module } from '@nestjs/common';
import { SystemService } from './services/system.service';
import { DynamicModule } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm'
import { registedEntities } from './entities';

@Module({
  providers: [],
  exports: [],
})
export class SystemModule {

  static forRoot(global:boolean = false){
    return {
      global,
      module:SystemModule,
      imports:[TypeOrmModule.forFeature([...registedEntities])],
      providers:[SystemService],
      exports:[SystemService]
    } as DynamicModule
  }
}
