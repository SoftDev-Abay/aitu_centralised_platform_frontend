import { apiSlice } from "@/app/api/apiSlice";
import { UploadFileResponse } from "./types";

export const fileApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadFiles: builder.mutation<UploadFileResponse, File[]>({
      query: (files) => {
        const formData = new FormData();
        files.forEach((file) => formData.append("files", file)); // multiple files

        return {
          url: "/files/upload",
          method: "POST",
          body: formData,
        };
      },
    }),

    deleteFile: builder.mutation<any, string>({
      query: (fileName) => ({
        url: `/files/${fileName}`,
        method: "DELETE",
      }),
    }),

    getFileInfo: builder.query<any, string>({
      query: (fileName) => ({
        url: `/files/info/${fileName}`,
        method: "GET",
      }),
    }),

    getPresignedUrl: builder.query<any, { fileName: string; arg1?: number }>({
      query: ({ fileName, arg1 = 60 }) => ({
        url: `/files/presigned/${fileName}?arg1=${arg1}`,
        method: "GET",
      }),
    }),

    // downloadFile: builder.query<any, string>({
    //   query: (fileName) => `/files/download/${fileName}`,
    // }),

    listFiles: builder.query<any, void>({
      query: () => ({
        url: `/files`,
        method: "GET",
      }),
    }),

    checkFileExists: builder.query<any, string>({
      query: (fileName) => ({
        url: `/files/${fileName}`,
        method: "HEAD",
      }),
    }),

    healthCheck: builder.query<any, void>({
      query: () => ({
        url: `/files/health`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useUploadFilesMutation,
  useDeleteFileMutation,
  useGetFileInfoQuery,
  useGetPresignedUrlQuery,
  useListFilesQuery,
  useCheckFileExistsQuery,
  useHealthCheckQuery,
} = fileApiSlice;
