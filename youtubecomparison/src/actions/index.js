export const updateYouTubeData = (data) => ({
  type: 'UPDATE_DATA',
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