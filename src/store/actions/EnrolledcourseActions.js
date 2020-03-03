export const createProject = (project) => {
  return (dispatch, getState, {getFirebase}) => {
    const firestore = getFirebase();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;
    firestore.ref('Users/TrainerOffering/').push({
      ...project,
      authorId: authorId,
      createdAt: new Date()
    }).then(() => {
      dispatch({ type: 'CREATE_ENROLLED_COURSE_SUCCESS' });
    }).catch(err => {
      dispatch({ type: 'CREATE_ENROLLED_COURSE_ERROR' }, err);
    });
  }
};
