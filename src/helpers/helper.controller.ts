import { Controller, Get } from '@nestjs/common';
import { RegionsCitiesService } from './services/regions-cities.service';
import { SelectablesService } from './services/selectables.service';

@Controller('common')
export class HelperController {
  constructor( 
    private readonly regionService: RegionsCitiesService,
    private readonly selectablesService: SelectablesService
  ){}

  @Get('regions')
  getRegions(){
    const regions = this.regionService.findAllRegions();

    return regions;
  }

  @Get('selectable/size')
  getSizeSelectable(){
    const size = this.selectablesService.findSize();

    return size;
  }

  @Get('selectable/condition')
  getConditionSelectable(){
    const condition = this.selectablesService.findCondition();

    return condition;
  }

  @Get('selectable/byketype')
  getBykeTypeSelectable(){
    const bykeType = this.selectablesService.findBykeType();

    return bykeType;
  }
}
