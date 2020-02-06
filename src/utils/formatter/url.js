export const serialize = queryString => {
  const queryParams = []

  for (let prop in queryString) {
    if (queryString[prop] !== undefined) {
      const encodeQueryParam = typeof queryString[prop] === 'object' ? queryString[prop].toISOString() : encodeURIComponent(queryString[prop])
      queryParams.push(encodeURIComponent(prop) + '=' + encodeQueryParam)
    }
  }

  return queryParams.join('&')
}