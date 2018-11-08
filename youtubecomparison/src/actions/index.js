export const updateYouTubeData = (data) => ({
  type: 'UPDATE_DATA',
  data
});

export const setOwnTrafficSources = (data) => ({
  type: 'SET_OWN_CHANNEL_DATA_TS',
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
