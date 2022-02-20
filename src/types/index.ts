export type FavoriteItem = {
  symbol: string
  companyName: string
  logoUrl: string
}

export type CompanySearchItem = {
  symbol: string
  companyName: string
}

export type CompanyDetails = {
  companyName: string
  description: string
  symbol: string
  sector: string
  country: string
  close: number
  logoUrl: string
}

export type SymbolItemResponse = { symbol: string; name: string }
