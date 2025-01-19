import {
  IProductImageCreateRequestModel,
  IProductImageModel,
} from "./productImageModel";
import { IRootModel } from "./rootModel";
import { IUserModel } from "./userModel";

export interface IProductModel extends IRootModel {
  productId: number;
  productUserId: number;
  productName: string;
  productDescription: string;
  productCategoryId: number;
  productPrice: number;
  productWeight: number;
  productColors: string;
  productSizes: string;
  productTransactionType: "Sell" | "Auction" | "Barter" | "PurchaseOrder";
  images: IProductImageModel[];
  user: IUserModel;
}

export interface IProductCreateRequestModel {
  productName: string;
  productDescription: string;
  productCategoryId: number;
  productPrice: number;
  productWeight: number;
  productColors?: string;
  productSizes?: string;
  productTransactionType?: "Sell" | "Auction" | "Barter" | "PurchaseOrder";
  productImages: IProductImageCreateRequestModel[];
}
