import fetch from 'cross-fetch'

import * as actionTypes from './actionTypes';

import headers from '../../security/headers';
import { checkResponseStatus } from '../../handlers/responseHandlers';

export function getJobs() {
    return dispatch => {
        dispatch({ type: actionTypes.JOBS_FETCH_START });

        return fetch(`/api/jobs/`)
            .then(response => checkResponseStatus(response, true))
            .then(jobs => dispatch({ type: actionTypes.JOBS_FETCH_SUCCESS, items: jobs }))
            .catch(() => dispatch({ type: actionTypes.JOBS_FETCH_FAIL }))
    }
}

export function saveJob(job) {
    return dispatch => {
        dispatch({ type: actionTypes.JOB_SAVE_START });

        return fetch(
            `/api/jobs/`,
            {
                method: job.id ? 'PUT' : 'POST',
                headers: headers(),
                body: JSON.stringify(job)
            })
            .then(response => checkResponseStatus(response, false))
            .then(() => dispatch({ type: actionTypes.JOB_SAVE_SUCCESS }))
            .then(() => dispatch(getJobs()))
            .catch(ex => {
                dispatch({ type: actionTypes.JOB_SAVE_FAIL });

                throw ex;
            });
    }
}

export function deleteJob(job) {
    return dispatch => {
        dispatch({ type: actionTypes.JOB_DELETE_START });

        return fetch(
            `/api/jobs/${job.id}`,
            {
                method: 'DELETE',
                headers: headers()
            })
            .then(response => checkResponseStatus(response, false))
            .then(() => dispatch({ type: actionTypes.JOB_DELETE_SUCCESS }))
            .then(() => dispatch(getJobs()))
            .catch(ex => {
                dispatch({ type: actionTypes.JOB_DELETE_FAIL });

                throw ex;
            });
    }
}