import { IRootModel } from "./rootModel";

export interface IProductImageModel extends IRootModel {
  productImageId: number;
  productImageProductId: number;
  productImageUrl: string;
}

export interface IProductImageCreateRequestModel {
  productImageUrl: string;
}
