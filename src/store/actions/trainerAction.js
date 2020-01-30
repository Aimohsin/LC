export const addtrainer = (add) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;
    firestore.collection('trainers').add({
      ...add,
      authorFirstName: profile.firstName,
      authorLastName: profile.lastName,
      authorId: authorId,
      createdAt: new Date()
    }).then(() => {
      dispatch({ type: 'ADD_TRAINER_SUCCESS' });
    }).catch(err => {
      dispatch({ type: 'ADD_TRAINER_ERROR' }, err);
    });
  }
};
export const trainerDetails = (tdetails) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;
    firestore.collection('trainers').add({
      ...tdetails,
      authorFirstName: profile.firstName,
      authorLastName: profile.lastName,
      authorId: authorId,
      createdAt: new Date()
    }).then(() => {
      dispatch({ type: 'TDETAILS_ADD_SUCCESS' });
    }).catch(err => {
      dispatch({ type: 'TDETAILS_ADD_ERROR' }, err);
    });
  }
};
