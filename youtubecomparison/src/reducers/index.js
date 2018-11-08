import { combineReducers } from 'redux';
import entities from './channelsReducer';
import user from './userReducer';



const reducers = combineReducers({
  entities,
  user
});

export default reducers;