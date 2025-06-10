type UploadFileResponse = {
  data: {
    fileName: string;
    originalFileName: string;
    contentType: string;
    size: number;
    uploadTime: string;
    url: string;
  }[];
  success: boolean;
  message: string;
};

export type { UploadFileResponse };
