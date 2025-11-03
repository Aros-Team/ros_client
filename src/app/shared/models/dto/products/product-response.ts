import { AreaSimpleResponse } from "../areas/area-simple-response";
import { CategorySimpleResponse } from "../category/category-simple-response";

export interface ProductReponse {
  id: number,
  name: string,
  description: string,
  price: number,
  active: boolean,
  preparationTime: number,
  preparationArea: AreaSimpleResponse,
  categories: CategorySimpleResponse[]
}