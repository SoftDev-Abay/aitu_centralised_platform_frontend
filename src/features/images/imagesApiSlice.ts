// src/features/images/imagesApiSlice.ts
import { apiSlice } from "@/app/api/apiSlice";

export const imagesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadImage: builder.mutation<string, File>({
      query: (file) => {
        const formData = new FormData();
        formData.append("image", file);

        return {
          url: "/images",
          method: "POST",
          body: formData,
        };
      },
    }),
  }),
});

export const { useUploadImageMutation } = imagesApiSlice;
