import Immutable from 'seamless-immutable';
import * as actionTypes from './actionTypes';

const initialState = Immutable({
    item: {},
    hasError: false,
    isLoading: false,
    isProcessing: false
});

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PROFILE_FETCH_START:
            return state.merge({ isLoading: state.item === {}, hasError: false });
        case actionTypes.PROFILE_FETCH_SUCCESS:
            return state.merge({ item: action.item, isLoading: false, hasError: false });
        case actionTypes.PROFILE_FETCH_FAIL:
            return state.merge({ item: {}, isLoading: false, hasError: true });

        case actionTypes.PROFILE_SAVE_START:
            return state.merge({ isProcessing: true });
        case actionTypes.PROFILE_SAVE_SUCCESS:
            return state.merge({ isProcessing: false });
        case actionTypes.PROFILE_SAVE_FAIL:
            return state.merge({ isProcessing: false });

        case actionTypes.PROFILE_DELETE_START:
            return state.merge({ isProcessing: true });
        case actionTypes.PROFILE_DELETE_SUCCESS:
            return state.merge({ isProcessing: false });
        case actionTypes.PROFILE_DELETE_FAIL:
            return state.merge({ isProcessing: false });

        default:
            return state;
    }
};