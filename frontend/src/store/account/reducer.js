import Immutable from 'seamless-immutable';
import * as actionTypes from './actionTypes';

const initialState = Immutable({
    isProcessing: false
});

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_START:
            return state.merge({ isProcessing: true });
        case actionTypes.LOGIN_SUCCESS:
            return state.merge({ isProcessing: false });
        case actionTypes.LOGIN_FAIL:
            return state.merge({ isProcessing: false });

        case actionTypes.REGISTER_START:
            return state.merge({ isProcessing: true });
        case actionTypes.REGISTER_SUCCESS:
            return state.merge({ isProcessing: false });
        case actionTypes.REGISTER_FAIL:
            return state.merge({ isProcessing: false });

        case actionTypes.CHANGE_PASSWORD_START:
            return state.merge({ isProcessing: true });
        case actionTypes.CHANGE_PASSWORD_SUCCESS:
            return state.merge({ isProcessing: false });
        case actionTypes.CHANGE_PASSWORD_FAIL:
            return state.merge({ isProcessing: false });

        default:
            return state;
    }
};