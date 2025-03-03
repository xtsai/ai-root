import { Inject, Injectable, Logger } from '@nestjs/common';
import {ConfigService} from '@nestjs/config'

@Injectable()
export class SystemService {
    protected logger = new Logger(`@xtsai-system: ${SystemService.name}`)

    @Inject(ConfigService)
    protected configService:ConfigService

    constructor(){}

    getSystemConfig(){
        const opts = this.configService.get('system')
        return opts
    }
}
