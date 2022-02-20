import http from "./http.service";

export const getSybmols = () => http.get("/ref-data/symbols");
export const getCompany = (symbol: string) =>
  http.get(`/stock/${symbol}/company`);
export const getQuote = (symbol: string) => http.get(`/stock/${symbol}/quote`);
export const getLogo = (symbol: string) => http.get(`/stock/${symbol}/logo`);
