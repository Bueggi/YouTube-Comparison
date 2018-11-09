const initialState = {
  channelsToCompare: [],
  dataFromYouTubeChannels: [],
  ownChannelData_TS: null,
  ownChannelData_Views: null,
}


const entities = ( state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_DATA':
      return {
        ...state,
        dataFromYouTubeChannels: action.data
      };

  case 'ADD_CHANNEL_TO_WATCH':
  if(state.channelsToCompare.indexOf(action.channelID) === -1) {
    return {
      ...state,
      channelsToCompare: [...state.channelsToCompare, action.channelID]
    };
  }
  else return state;

  case 'REMOVE_CHANNEL_FROM_WATCHLIST':
    return {
      ...state,
      channelsToCompare: state.channelsToCompare.filter(el => el.id !== action.channelID)
    };

  case 'SET_OWN_CHANNEL_DATA_TS':
    return {
      ...state,
      ownChannelData_TS: action.data
    };

    case 'SET_OWN_CHANNEL_DATA_VIEWS':
    return {
      ...state,
      ownChannelData_Views: action.data
    };


    default: return state;
  }
}

export default entities;