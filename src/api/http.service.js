export const httpGet = async (url, params = {}, headers) => {
  const newURL = new URL(url)
  Object.keys(params).forEach(key =>
    newURL.searchParams.append(key, params[key])
  )

  try {
    const res = await fetch(newURL, { method: 'GET', headers: headers })
    const data = await res.json()
    return data
  } catch (error) {
    console.log(error)
  }
}
