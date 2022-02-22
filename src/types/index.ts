export type FavoriteItem = {
  symbol: string
  companyName: string
  logoUrl: string
}

export type CompanySearchItem = {
  symbol: string
  companyName: string
}

export type StockDetails = {
  companyName: string
  description: string
  symbol: string
  sector: string
  country: string
  close: number
  latestPrice: number
  logoUrl: string
  isFavorite?: boolean
}

export type SymbolItemResponse = { symbol: string; name: string }
