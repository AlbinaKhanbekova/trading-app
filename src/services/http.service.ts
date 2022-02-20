const BASE_URL = process.env.REACT_APP_API_URL || ''

class Http {
  get(url: string) {
    return fetch(
      `${BASE_URL}${url}?` +
        new URLSearchParams({ token: process.env.REACT_APP_API_TOKEN || '' })
    )
  }
}

const http = new Http()

export default http
