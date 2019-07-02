export function saveUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
}

export function getUser() {
    return JSON.parse(localStorage.getItem('user'));
}
