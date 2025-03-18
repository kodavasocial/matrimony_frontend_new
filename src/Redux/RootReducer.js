import { combineReducers } from 'redux';
import { AuthReducer } from './Reducers/AuthReducer';
import { ProfileReducer } from './Reducers/ProfileReducer';


// Combine individual reducers into a root reducer
const rootReducer = combineReducers({
    Auth: AuthReducer,
    Profile: ProfileReducer,
});

export default rootReducer;
