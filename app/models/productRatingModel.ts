import { IRootModel } from "./rootModel";

export interface IProductRating extends IRootModel {
  productRatingId: number;
  productRatingUserId: number;
  productRatingProductId: number;
  productRatingStart: number;
  productRatingDescription: string;
}
