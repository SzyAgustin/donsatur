import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import generalReducer from './general/general.reducer';
import formReducer from './form/form.reducer';

export default combineReducers({
    user: userReducer,
    general: generalReducer,
    form: formReducer
});