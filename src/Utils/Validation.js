export function validEmail(text) {
    const regex = RegExp(
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    );

    return regex.test(text);
}
export function validPassword(text) {
    const regex = RegExp(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*[\]{}()?"\\,><':;|_~`=+-])[a-zA-Z\d!@#$%^&*[\]{}()?"\\,><':;|_~`=+-]{6,99}$/
    );

    return regex.test(text);
}
export function userNameValidation(text) {
    const regex = RegExp(
        /^[a-zA-Z][a-zA-Z0-9!#$%^&*()_+{}\[\]:;<>,.?/~\\-]{4,}$/
    );

    return regex.test(text);
}
export function firstNameAndLastNameValidation(text) {
    const regex = RegExp(
        /^[a-zA-Z]{4,}$/
    );

    return regex.test(text);
}
