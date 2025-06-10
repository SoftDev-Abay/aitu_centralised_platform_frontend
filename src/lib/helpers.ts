export const truncateText = (text: string, maxLength: number = 50) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
};

export const getFileDownloadUrl = (filename: string) => {
  return `${import.meta.env.VITE_BACKEND_URL}/files/download/${filename}`;
};
