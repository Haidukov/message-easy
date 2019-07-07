export function saveUserToLocalStorage(user) {
    localStorage.setItem('user', JSON.stringify(user));
}

export function getUserFromLocalStorage() {
    return JSON.parse(localStorage.getItem('user'));
}

export function removeUserFromLocalStorage() {
    localStorage.removeItem('user');
}
