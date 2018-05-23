import Immutable from 'seamless-immutable';
import * as actionTypes from './actionTypes';

const initialState = Immutable({
    items: [],
    hasError: false,
    isLoading: false,
    isProcessing: false
});

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.JOBS_FETCH_START:
            return state.merge({ isLoading: state.items.length === 0, hasError: false });
        case actionTypes.JOBS_FETCH_SUCCESS:
            return state.merge({ items: action.items, isLoading: false, hasError: false });
        case actionTypes.JOBS_FETCH_FAIL:
            return state.merge({ items: [], isLoading: false, hasError: true });

        case actionTypes.JOB_SAVE_START:
            return state.merge({ isProcessing: true });
        case actionTypes.JOB_SAVE_SUCCESS:
            return state.merge({ isProcessing: false });
        case actionTypes.JOB_SAVE_FAIL:
            return state.merge({ isProcessing: false });

        case actionTypes.JOB_DELETE_START:
            return state.merge({ isProcessing: true });
        case actionTypes.JOB_DELETE_SUCCESS:
            return state.merge({ isProcessing: false });
        case actionTypes.JOB_DELETE_FAIL:
            return state.merge({ isProcessing: false });

        default:
            return state;
    }
};