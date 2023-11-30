import { combineReducers } from 'redux';
import employeesFetch from './Reducers';

const rootReducer = combineReducers({
  employeesFetch,
});

export default rootReducer;
