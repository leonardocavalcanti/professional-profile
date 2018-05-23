export const defaultErrorHandler = (error, handler) => {
    console.error(error);

    if(handler) {
        error.response.json().then(json => handler(json));
    }
};
