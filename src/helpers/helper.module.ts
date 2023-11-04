import { Module } from '@nestjs/common';

import { RegionsCitiesService } from '../helpers/services/regions-cities.service'
import { CategoryService } from './services/category.service';
import { HelperController } from './helper.controller';
import { SelectablesService } from './services/selectables.service';

@Module({
  providers: [
    CategoryService, 
    RegionsCitiesService, SelectablesService
  ],
  controllers: [HelperController]
})
export class HelperModule {}
