export type FavoriteType = {
  id: string,
  name: string,
  url: string,
  image: string,
  price: number,
  selectedCount: number,
  countInCart?: number,
  isInFavorite?: boolean
}
