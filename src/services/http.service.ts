const BASE_URL = "https://cloud.iexapis.com/stable";

class Http {
  get(url: string) {
    return fetch(`${BASE_URL}${url}?` + new URLSearchParams({ token: "" }));
  }
}

const http = new Http();

export default http;
