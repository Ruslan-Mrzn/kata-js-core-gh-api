import { async } from 'regenerator-runtime'

const debounce = (fn, debounceTime) => {
  let calledId
  return async function callFn() {
    const args = [...arguments]
    if (calledId) {
      clearTimeout(calledId)
    }
    calledId = setTimeout(() => {
      fn.apply(this, args)
    }, debounceTime)
  }
}

const addRepoToFavorite = (input, favoriteReps, { login }, name, id, stars) => {
  const favoriteRepo = document
    .querySelector('.favorite-repo')
    .content.querySelector('.repo')
    .cloneNode(true)
  const favoriteRepoName = favoriteRepo.querySelector('.repo__name span')
  const favoriteRepoOwner = favoriteRepo.querySelector('.repo__owner span')
  const favoriteRepoStars = favoriteRepo.querySelector('.repo__stars span')
  const favoriteRepoDeleteButton =
    favoriteRepo.querySelector('.repo__delete-btn')

  favoriteRepoName.textContent = name
  favoriteRepoOwner.textContent = login
  favoriteRepoStars.textContent = stars
  favoriteRepoDeleteButton.dataset.repo_id = id

  favoriteRepoDeleteButton.addEventListener('click', (evt) => {
    evt.target.closest('.repo').remove()
  })

  favoriteReps.append(favoriteRepo)
  input.value = ''
}

const showAutocomplete = (reps, box, favoriteReps, input) => {
  box.querySelectorAll('.autocomplete__item').forEach((node) => node.remove())
  reps &&
    reps.length &&
    reps.forEach(({ id, name, owner, stargazers_count }) => {
      const foundRepo = document
        .querySelector('.found-repo')
        .content.querySelector('.autocomplete__item')
        .cloneNode(true)
      foundRepo.textContent = name

      foundRepo.addEventListener('click', (evt) => {
        addRepoToFavorite(
          input,
          favoriteReps,
          owner,
          name,
          id,
          stargazers_count
        )
        box
          .querySelectorAll('.autocomplete__item')
          .forEach((node) => node.remove())
      })
      box.append(foundRepo)
    })
}

export { debounce, showAutocomplete }
