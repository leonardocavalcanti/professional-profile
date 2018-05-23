import fetch from 'cross-fetch'

import * as actionTypes from './actionTypes';

import qs from 'qs';

import { formHeader } from '../../security/headers';
import { checkResponseStatus, loginResponseHandler } from '../../handlers/responseHandlers';

export function login(user) {
    return dispatch => {
        dispatch({ type: actionTypes.LOGIN_START });

        return fetch(`/api/uaa/oauth/token`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic YnJvd3Nlcjo='
            },
            body: qs.stringify({
                username: user.username,
                password: user.password,
                grant_type: 'password'
            })
        })
            .then(response => checkResponseStatus(response, true))
            .then(response => loginResponseHandler(response))
            .then(() => dispatch({ type: actionTypes.LOGIN_SUCCESS }))
            .catch(ex => {
                dispatch({ type: actionTypes.LOGIN_FAIL });

                throw ex;
            });
    }
}

export function changePassword(user) {
    return dispatch => {
        dispatch({ type: actionTypes.CHANGE_PASSWORD_START });

        return fetch(`/api/uaa/users/updatePassword`, {
            method: 'POST',
            headers: formHeader(),
            body: qs.stringify(user)
        })
            .then(response => checkResponseStatus(response, false))
            .then(() => dispatch({ type: actionTypes.CHANGE_PASSWORD_SUCCESS }))
            .catch(ex => {
                dispatch({ type: actionTypes.CHANGE_PASSWORD_FAIL });

                throw ex;
            });
    }
}

export function register(user) {
    return dispatch => {
        dispatch({ type: actionTypes.REGISTER_START });

        return getOwnerToken(user.ownerPassword)
            .then(json => save(json.access_token, user))
            .then(() => dispatch({ type: actionTypes.REGISTER_SUCCESS }))
            .then(() => login(user))
            .catch(ex => {
                dispatch({ type: actionTypes.REGISTER_FAIL });

                throw ex;
            });
        }
}

function getOwnerToken(ownerPassword) {
    return fetch(`/api/uaa/oauth/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa("owner:" + ownerPassword)
        },
        body: qs.stringify({
            grant_type: 'client_credentials'
        })
    })
        .then(response => checkResponseStatus(response, true))
}

function save(token, user) {
    return fetch(`/api/uaa/users/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(user)
    })
        .then(response => checkResponseStatus(response, false))
}