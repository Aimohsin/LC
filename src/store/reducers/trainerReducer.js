const initState = {}

const trainerReducer = (state = initState, action) => {
  switch (action.type) {
    case 'ADD_TRAINER_SUCCESS':
      console.log('add trainer success');
      return state;
    case 'ADD_TRAINER_ERROR':
      console.log('add trainer error');
      return state;
      case 'ADD_EMAIL_SUCCESS':
        console.log('add email error');
        return state;
        case 'ADD_EMAIL_ERROR':
          console.log('add email error');
          return state;
    default:
      return state;
  }
};

export default trainerReducer;