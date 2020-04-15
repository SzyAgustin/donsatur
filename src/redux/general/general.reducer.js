import { GeneralActionTypes } from './general.types';

const INITIAL_STATE = {
    postas: null,
    turnosOfPosta2: null,
    turnosNotAvailable: null
};

const generalReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GeneralActionTypes.SET_POSTAS:
            return {
                ...state,
                postas: action.payload
            }
        case GeneralActionTypes.SET_TURNOS_OF_POSTA_2:
            return {
                ...state,
                turnosOfPosta2: action.payload
            }
        case GeneralActionTypes.SET_TURNOS_NOT_AVAILABLE:
            return {
                ...state,
                turnosNotAvailable: action.payload
            }
        default:
            return state
    }
}

export default generalReducer;