const initialState = {
  channelsToCompare: [],
  dataFromYouTubeChannels: [],
  ownChannel_TS: null
}


const entities = ( state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_DATA':
      return {
        ...state,
        dataFromYouTubeChannels: action.data
      };

  case 'ADD_CHANNEL_TO_WATCH':
  console.log(action.channelID, state.channelsToCompare)
  console.log(state.channelsToCompare.indexOf(action.channelID))
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


    default: return state;
  }
}

export default entities;