import { Injectable } from '@nestjs/common';
import { SIZE } from '../constants/size.constant';
import { BYKE_TYPE } from '../constants/byke-type.constant';
import { CONDITION } from '../constants/condition.constant';

@Injectable()
export class SelectablesService {
  private readonly size = SIZE;
  private readonly bykeType = BYKE_TYPE;
  private readonly condition = CONDITION;

  findBykeType(){
    return this.bykeType;
  }

  findCondition(){
    return this.condition;
  }

  findSize(){
    return this.size;
  }
}
