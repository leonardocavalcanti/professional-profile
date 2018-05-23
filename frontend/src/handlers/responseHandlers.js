import Auth from '../security/auth';

export const checkResponseStatus = (response, json) => {
    if(response.status >= 200 && response.status < 300) {
        return json ? response.json() : null;
    } else {
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
};

export const loginResponseHandler = (response, handler) => {
    Auth.logIn(response);

    if(handler) {
        handler.call();
    }
};