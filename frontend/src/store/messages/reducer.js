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
        case actionTypes.MESSAGES_FETCH_START:
            return state.merge({ isLoading: state.items.length === 0, hasError: false });
        case actionTypes.MESSAGES_FETCH_SUCCESS:
            return state.merge({ items: action.items, isLoading: false, hasError: false });
        case actionTypes.MESSAGES_FETCH_FAIL:
            return state.merge({ items: [], isLoading: false, hasError: true });

        case actionTypes.MESSAGE_SAVE_START:
            return state.merge({ isProcessing: true });
        case actionTypes.MESSAGE_SAVE_SUCCESS:
            return state.merge({ isProcessing: false });
        case actionTypes.MESSAGE_SAVE_FAIL:
            return state.merge({ isProcessing: false });


        case actionTypes.MESSAGE_DELETE_START:
            return state.merge({ isProcessing: true });
        case actionTypes.MESSAGE_DELETE_SUCCESS:
            return state.merge({ isProcessing: false });
        case actionTypes.MESSAGE_DELETE_FAIL:
            return state.merge({ isProcessing: false });

        default:
            return state;
    }
};