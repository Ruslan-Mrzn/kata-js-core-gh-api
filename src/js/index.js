import { async } from 'regenerator-runtime'
import '../scss/style.scss'
import { getReps } from './api'
import { debounce, showAutocomplete } from './utils'

const searchInput = document.querySelector('.search')

const autocomplete = document.querySelector('.autocomplete')

const favoriteReps = document.querySelector('.favorite-reps')

let repsData

const debouncedGetReps = debounce(async (evt) => {
  if (evt.target.value !== '') {
    try {
      const res = await getReps(evt.target.value)
      let data = await res.json()
      repsData = data.items
    } catch (err) {
      console.error(err)
    }
  } else {
    repsData = null
  }
  showAutocomplete(repsData, autocomplete, favoriteReps, searchInput)
}, 1000)

searchInput.addEventListener('input', debouncedGetReps)
