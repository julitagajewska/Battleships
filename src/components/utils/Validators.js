export function checkUsernameLength(input) {
    const regex = /^[\w\W]{3,10}$/;
    let result = regex.test(input);
    return result
}

export function checkPasswordLength(input) {
    const regex = /^[\w\W]{3,15}$/;
    let result = regex.test(input);
    return result
}

export function hasSpace(input) {
    const regex = /\s/;
    let result = regex.test(input);
    return result
}

export function hasSpecialCharacter(input) {
    const regex = /[!@#$%^&*()\\[\]{}+=~`|:;"'<>,./?-]/;
    let result = regex.test(input);
    return result
}

export function hasLowerCaseLetter(input) {
    const regex = /[a-z]/;
    let result = regex.test(input);
    return result
}

export function hasUpperCaseLetter(input) {
    const regex = /[A-Z]/;
    let result = regex.test(input);
    return result
}

export function hasNumber(input) {
    const regex = /[0-9]/;
    let result = regex.test(input);
    return result
}

export function isEmail(input) {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    let result = regex.test(input);
    return result
}

export function isValidURL(input) {
    const regex = /^(http(s)?:\/\/.)(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/;
    let result = regex.test(input);
    return result
}
