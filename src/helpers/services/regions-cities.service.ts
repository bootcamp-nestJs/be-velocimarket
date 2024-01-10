import { Injectable } from '@nestjs/common';
import { REGIONS } from '../constants/regions-cities.constant';

@Injectable()
export class RegionsCitiesService {
  private readonly regionCities = REGIONS;

  findAllRegions(){
    return this.regionCities;
  }

}
