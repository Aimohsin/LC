const initState = {}

const projectReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_ENROLLED_COURSE_SUCCESS':
      console.log('create enrolled course success');
      return state;
    case 'CREATE_ENROLLED_COURSE_ERROR':
      console.log('create enrolled course error');
      return state;
    default:
      return state;
  }
};

export default projectReducer;