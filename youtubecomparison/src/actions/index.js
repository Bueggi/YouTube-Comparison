export const updateYouTubeData = (data) => ({
  type: 'UPDATE_UPLOAD_LISTS',
  data
});

export const updateTrafficSources = (data) => ({
  type: 'UPDATE_TRAFFIC_SOURCES',
  data
});


export const setOwnTrafficSources = (data) => ({
  type: 'SET_OWN_CHANNEL_DATA_TS',
  data
});

export const setOwnChannelStats = (data) => ({
  type: 'SET_OWN_CHANNEL_DATA_VIEWS',
  data
});

export const addChannelToWatch = (channelID) => ({
  type: 'ADD_CHANNEL_TO_WATCH',
  channelID
});

export const removeChannelFromWatchList = (channelID) => ({
  type: 'REMOVE_CHANNEL_FROM_WATCHLIST',
  channelID
});

export const userLogIn = (user) => ({
  type: 'USER_LOG_IN',
  user
});

export const userLogOut = () => ({
  type: 'USER_LOG_OUT',
});

export const updateStartDate = (date) => ({
  type: 'UPDATE_START_DATE',
  date
});

export const updateEndDate = (date) => ({
  type: 'UPDATE_END_DATE',
  date
});