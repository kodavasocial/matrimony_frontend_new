
export const header = (method, data,) => {
    const requestOptions = {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };
    return requestOptions;
}
export const toastify = (cb, text, theme) => {

    return cb(text, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: theme,
    });
}

export const randomString = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

export const calculateAge = (dateOfBirth) => {
    if (dateOfBirth) {
        const dob = new Date(dateOfBirth);
        const currentDate = new Date();
        const yearsDiff = currentDate.getFullYear() - dob.getFullYear();
        if (
            currentDate.getMonth() < dob.getMonth() ||
            (currentDate.getMonth() === dob.getMonth() && currentDate.getDate() < dob.getDate())
        ) {
            return yearsDiff - 1
        } else {
            return yearsDiff

        }
    }

};








