import { FormActionTypes } from './form.types';

const INITIAL_STATE = {
    posta: null,
    date: null,
    time: null,
}

const formReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case FormActionTypes.SET_POSTA:
            return {
                ...state,
                currentUser: action.payload
            }
        default:
            return state;
    }
} 

export default formReducer;