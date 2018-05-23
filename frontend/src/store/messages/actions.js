import fetch from 'cross-fetch'

import * as actionTypes from './actionTypes';

import headers from '../../security/headers';
import { checkResponseStatus } from '../../handlers/responseHandlers';

export function getMessages() {
    return dispatch => {
        dispatch({ type: actionTypes.MESSAGES_FETCH_START });

        return fetch(`/api/messages/`,
            {
                method: 'GET',
                headers: headers()
            })
            .then(response => checkResponseStatus(response, true))
            .then(messages => dispatch({ type: actionTypes.MESSAGES_FETCH_SUCCESS, items: messages }))
            .catch(() => dispatch({ type: actionTypes.MESSAGES_FETCH_FAIL }))
    }
}

export function saveMessage(message, captchaToken) {
    return dispatch => {
        dispatch({ type: actionTypes.MESSAGE_SAVE_START });

        return fetch(`/api/messages/${captchaToken ? captchaToken : ''}`,
            {
                method: message.id ? 'PUT' : 'POST',
                headers: message.id ? headers() : { 'Content-Type': 'application/json' },
                body: JSON.stringify(message)
            })
            .then(response => checkResponseStatus(response, false))
            .then(() => dispatch({ type: actionTypes.MESSAGE_SAVE_SUCCESS }))
            .then(() => {
                if (message.id) {
                    dispatch(getMessages());
                }
            })
            .catch(ex => {
                dispatch({ type: actionTypes.MESSAGE_SAVE_FAIL });

                throw ex;
            });
    }
}

export function deleteMessage(message) {
    return dispatch => {
        dispatch({ type: actionTypes.MESSAGE_DELETE_START });

        return fetch(`/api/messages/${message.id}`,
            {
                method: 'DELETE',
                headers: headers()
            })
            .then(response => checkResponseStatus(response, false))
            .then(() => dispatch({ type: actionTypes.MESSAGE_DELETE_SUCCESS }))
            .catch(ex => {
                dispatch({ type: actionTypes.MESSAGE_DELETE_FAIL });

                throw ex;
            });
    }
}