import { IRootModel } from "./rootModel";

export interface IProductCategoryModel extends IRootModel {
  productCategoryId: number;
  productCategoryName: string;
}
