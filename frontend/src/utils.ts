/** Correctly builds route for dev */
export const buildURL = (url: string) => {
    // TODO: This should be an environment parameter, but this is a 2 year old project
    // and I just want it to run again lol
    const DEV = true;
    if (DEV) {
        return `http://127.0.0.1:8080${url}`
    } else {
        return url;
    }
}