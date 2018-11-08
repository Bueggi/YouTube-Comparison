const initialState = {
  signedInUser: null,
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case 'USER_LOG_IN':
    return{
      signedInUser: action.user };

    case 'USER_LOG_OUT':
    return {signedInUser: null}

    default: return state;
  }

}
export default user;