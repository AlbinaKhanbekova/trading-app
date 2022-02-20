import http from "./http.service";

export const getSybmols = () => http.get("/ref-data/symbols");
