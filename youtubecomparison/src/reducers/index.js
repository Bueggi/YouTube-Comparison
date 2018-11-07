import { combineReducers } from 'redux';

const initialState = {
  channelsToCompare: [],
  dataFromYouTubeChannels: []
}


const entities = ( state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_DATA':
      return {
        ...state,
        dataFromYouTubeChannels: action.data
      };

  case 'ADD_CHANNEL_TO_WATCH':
    return {
      ...state,
      channelsToCompare: [...state.channelsToCompare, action.channelID]
    };

  case 'REMOVE_CHANNEL_FROM_WATCHLIST':
    return {
      ...state,
      channelsToCompare: state.channelsToCompare.filter(el => el.id !== action.channelID)
    };
  default: return state;
  }
}


const reducers = combineReducers({
  entities,
});

export default reducers;