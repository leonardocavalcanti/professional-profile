import fetch from 'cross-fetch'

import * as actionTypes from './actionTypes';

import headers from '../../security/headers';
import { checkResponseStatus } from '../../handlers/responseHandlers';

export function getSkills() {
    return dispatch => {
        dispatch({ type: actionTypes.SKILLS_FETCH_START });

        return fetch(`/api/skills/`)
            .then(response => checkResponseStatus(response, true))
            .then(skills => dispatch({ type: actionTypes.SKILLS_FETCH_SUCCESS, items: skills }))
            .catch(() => dispatch({ type: actionTypes.SKILLS_FETCH_FAIL }))
    }
}

export function saveSkill(skill) {
    return dispatch => {
        dispatch({ type: actionTypes.SKILL_SAVE_START });

        return fetch(`/api/skills/`,
            {
                method: skill.id ? 'PUT' : 'POST',
                headers: headers(),
                body: JSON.stringify(skill)
            })
            .then(response => checkResponseStatus(response, false))
            .then(() => dispatch({ type: actionTypes.SKILL_SAVE_SUCCESS }))
            .then(() => dispatch(getSkills()))
            .catch(ex => {
                dispatch({ type: actionTypes.SKILL_SAVE_FAIL });

                throw ex;
            });
    }
}

export function deleteSkill(skill) {
    return dispatch => {
        dispatch({ type: actionTypes.SKILL_DELETE_START });

        return fetch(`/api/skills/${skill.id}`,
            {
                method: 'DELETE',
                headers: headers()
            })
            .then(response => checkResponseStatus(response, false))
            .then(() => dispatch({ type: actionTypes.SKILL_DELETE_SUCCESS }))
            .then(() => dispatch(getSkills()))
            .catch(ex => {
                dispatch({ type: actionTypes.SKILL_DELETE_FAIL });

                throw ex;
            });
    }
}