const editProfileReducer = (state, action) => {
    switch (action.type) {
      case "EDITPROFILE_ERROR":
        return {
          ...state,
        editError: action.error
    };
      case "EDITPROFILE_SUCCESS":
        return {
          ...state,
          user:action.user
    };
      default:
      return state;
    }
  }
  
  export default editProfileReducer;
  