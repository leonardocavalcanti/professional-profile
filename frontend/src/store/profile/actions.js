import fetch from 'cross-fetch'

import * as actionTypes from './actionTypes';

import headers from '../../security/headers';
import { checkResponseStatus } from '../../handlers/responseHandlers';

export function getProfile() {
    return dispatch => {
        dispatch({ type: actionTypes.PROFILE_FETCH_START });

        return fetch(`/api/profile/`)
            .then(response => checkResponseStatus(response, true))
            .then(profile => dispatch({ type: actionTypes.PROFILE_FETCH_SUCCESS, item: profile }))
            .catch(() => dispatch({ type: actionTypes.PROFILE_FETCH_FAIL }))
    }
}

export function saveProfile(profile) {
    return dispatch => {
        dispatch({ type: actionTypes.PROFILE_SAVE_START });
        
        return fetch(`/api/profile/`,
            {
                method: profile.id ? 'PUT' : 'POST',
                headers: headers(),
                body: JSON.stringify(profile)
            })
            .then(response => checkResponseStatus(response, false))
            .then(() => dispatch({ type: actionTypes.PROFILE_SAVE_SUCCESS }))
            .catch(ex => {
                dispatch({ type: actionTypes.PROFILE_SAVE_FAIL });
                
                throw ex;
            });
    }
}

export function deleteProfile(profile) {
    return dispatch => {
        dispatch({ type: actionTypes.PROFILE_DELETE_START });
        
        return fetch(`/api/profile/${profile.id}`,
            {
                method: 'DELETE',
                headers: headers()
            })
            .then(response => checkResponseStatus(response, false))
            .then(() => dispatch({ type: actionTypes.PROFILE_DELETE_SUCCESS }))
            .catch(ex => {
                dispatch({ type: actionTypes.PROFILE_DELETE_FAIL });
                
                throw ex;
            });
     }
}