export const setLocalStorage = (name, item) => {
    localStorage.setItem(name, item)
}

export const getLocalStorage = (name) => {
    return localStorage.getItem(name)
}
export const removeLocalStorage = (name) => {
    localStorage.removeItem(name)
}