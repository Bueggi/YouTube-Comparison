const moment = require('moment');

const initialState = {
  channelsToCompare: [],
  fetchedUploadLists: [],
  ownChannelData_TS: null,
  ownChannelData_Views: null,
  trafficSources: null,
  startDate: moment().subtract(28, 'days').format('YYYY-MM-DD'),
  endDate:  moment().format('YYYY-MM-DD'),
}


const entities = ( state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_UPLOAD_LISTS':
      return {
        ...state,
        fetchedUploadLists: action.data
      };

      case 'UPDATE_TRAFFIC_SOURCES':
        return {
          ...state,
          trafficSources: action.data
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
    console.log('///////////// CHANNELREDUCER', action.channelID, state.channelsToCompare, state.channelsToCompare.filter(el => el !== action.channelID))
      return {
        ...state,
        channelsToCompare: state.channelsToCompare.filter(el => el !== action.channelID)
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

      case 'UPDATE_START_DATE':
      return {
        ...state,
        startDate: action.date
      };

      case 'UPDATE_END_DATE':
      return {
        ...state,
        endDate: action.date
      };

    default: return state;
  }
}

export default entities;