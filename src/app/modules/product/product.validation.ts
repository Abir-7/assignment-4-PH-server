import { z } from "zod";

const productValidationSchema = z
  .object({
    body: z.object({
      title: z.string({
        required_error: "Title is Required",
        invalid_type_error: "Title must be string",
      }),
      category: z.string({
        required_error: "Category is Required",
        invalid_type_error: "Category must be string",
      }),
      price: z.string({
        required_error: "Price is Required",
        invalid_type_error: "Price must be number",
      }),
      description: z.string({
        required_error: "Description is Required",
        invalid_type_error: "Description must be string",
      }),
      image: z.string({
        required_error: "Image is Required",
        invalid_type_error: "Image must be string",
      }),
      availability: z.object({
        quantity: z.string({
          required_error: "Quantity is Required",
          invalid_type_error: "Quantity must be string",
        }),
        status: z
          .enum(["inStock", "stockOut"], {
            required_error: "inStock is Required",
            invalid_type_error: "inStock must be string",
          })
          .optional(),
      }),
      rating: z.number({
        required_error: "Rating is Required",
        invalid_type_error: "Rating must be string",
      }),
    }),
  })
  .strict();

const partialProductValidationSchema = z.object({
  body: productValidationSchema.shape.body.partial(),
});

export const productValidation = {
  productValidationSchema,
  partialProductValidationSchema,
};
