import { combineReducers } from 'redux';

const initialState = {
  channelsToCompare: []
}


const entities = ( state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_DATA':
      return {
        ...state,
        channelsToCompare: action.data
      };
    default: return state;
  }
};

const reducers = combineReducers({
  entities,
});

export default reducers;