
export const getAllLocalStorage = (): string | null => {
  return localStorage.getItem('user')
}

export const createLocalStorage = (): void => {
  localStorage.setItem('user', JSON.stringify("")) //converte objeto em string
}

export const changeLocalStorage = (user): void => {
  localStorage.setItem('user', JSON.stringify(user))
}

export const deleteLocalStorage = () => {
  localStorage.clear()
}