import fetch from 'cross-fetch'

import * as actionTypes from './actionTypes';

import headers from '../../security/headers';
import { checkResponseStatus } from '../../handlers/responseHandlers';

export function getProjects() {
    return dispatch => {
        dispatch({ type: actionTypes.EXPERIMENTS_FETCH_START });

        return fetch(`/api/projects/`)
            .then(response => checkResponseStatus(response, true))
            .then(projects => dispatch({ type: actionTypes.EXPERIMENTS_FETCH_SUCCESS, items: projects }))
            .catch(() => dispatch({ type: actionTypes.EXPERIMENTS_FETCH_FAIL }))
    }
}

export function saveProject(project) {
    return dispatch => {
        dispatch({ type: actionTypes.EXPERIMENT_SAVE_START });

        return fetch(`/api/projects/`,
            {
                method: project.id ? 'PUT' : 'POST',
                headers: headers(),
                body: JSON.stringify(project)
            })
            .then(response => checkResponseStatus(response, false))
            .then(() => dispatch({ type: actionTypes.EXPERIMENT_SAVE_SUCCESS }))
            .then(() => dispatch(getProjects()))
            .catch(ex => {
                dispatch({ type: actionTypes.EXPERIMENT_SAVE_FAIL });

                throw ex;
            });
    }
}

export function deleteProject(project) {
    return dispatch => {
        dispatch({ type: actionTypes.EXPERIMENT_DELETE_START });

        return fetch(`/api/projects/${project.id}`,
            {
                method: 'DELETE',
                headers: headers()
            })
            .then(response => checkResponseStatus(response, false))
            .then(() => dispatch({ type: actionTypes.EXPERIMENT_DELETE_SUCCESS }))
            .then(() => dispatch(getProjects()))
            .catch(ex => {
                dispatch({ type: actionTypes.EXPERIMENT_DELETE_FAIL });

                throw ex;
            });
    }
}