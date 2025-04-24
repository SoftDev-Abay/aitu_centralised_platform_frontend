export const truncateText = (text: string, maxLength: number = 50) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
};
