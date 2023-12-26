import { Module } from '@nestjs/common';

import { RegionsCitiesService } from '../helpers/services/regions-cities.service'
import { HelperController } from './helper.controller';
import { SelectablesService } from './services/selectables.service';

@Module({
  providers: [
    RegionsCitiesService, 
    SelectablesService
  ],
  controllers: [HelperController]
})
export class HelperModule {}
