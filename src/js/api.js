import { async } from 'regenerator-runtime'

export const getReps = async (query) => {
  if (query !== '') {
    const searchQuery = encodeURIComponent(query)
    return fetch(
      `https://api.github.com/search/repositories?q=${searchQuery} in:name&per_page=5`,
      {
        headers: {
          Accept: 'application/vnd.github+json'
        }
      }
    )
  }
}
