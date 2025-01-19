import { z } from "zod";

export const createProductSchema = z.object({
  productName: z
    .string()
    .min(3, "Product name must be at least 3 characters")
    .max(100, "Product name must be less than 100 characters"),
  productDescription: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description must be less than 1000 characters"),
  productCategoryId: z.number({
    required_error: "Please select a category",
  }),
  productPrice: z
    .number({
      required_error: "Price is required",
    })
    .min(0, "Price must be greater than 0"),
  productWeight: z
    .number({
      required_error: "Weight is required",
    })
    .min(0, "Weight must be greater than 0"),
  productColors: z
    .string()
    .min(1, "At least one color must be selected"),
  productSizes: z
    .string()
    .min(1, "At least one size must be selected"),
  productTransactionType: z.enum(["Sell", "Auction", "Barter", "PurchaseOrder"], {
    required_error: "Please select a transaction type",
  }),
  productImages: z.array(z.object({
    uri: z.string(),
    type: z.string(),
    name: z.string(),
  })).min(1, "At least one image is required"),
});

export type CreateProductFormData = z.infer<typeof createProductSchema>; 