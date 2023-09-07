export const formatAsCurrency = (amount: number) => {
  return new Intl.NumberFormat().format(amount);
};

export const getBookEmoji = (str: string) => {
  const emojisArr = ["📘","📔","📕","📗","📙"];
  const index = str.length % emojisArr.length;
  return emojisArr[index];
};
