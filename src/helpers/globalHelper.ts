export const formatAsCurrency = (amount: number) => {
  return new Intl.NumberFormat().format(amount)
}