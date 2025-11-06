export interface ProductUpdateRequest {
  id: number,
  name: string,
  description: string,
  price: number,
  active: boolean,
  preparationTime: number,
  preparationArea: number,
  categories: number[]
}