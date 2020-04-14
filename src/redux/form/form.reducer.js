import { FormActionTypes } from './form.types';

const INITIAL_STATE = {
    postaSelected: null,
    dateSelected: null,
    timeSelected: null,
}

const formReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FormActionTypes.SET_POSTA:
            return {
                ...state,
                postaSelected: action.payload
            }
        case FormActionTypes.SET_DATE:
            return {
                ...state,
                dateSelected: action.payload
            }
        case FormActionTypes.SET_TIME:
            return {
                ...state,
                timeSelected: action.payload
            }
        default:
            return state;
    }
}

export default formReducer;