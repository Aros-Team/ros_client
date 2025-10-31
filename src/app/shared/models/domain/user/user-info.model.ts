import { Area } from '@models/domain/area/area-model';

export interface UserInfo {
  name: string;
  document: string;
  areas: Area[];
}
