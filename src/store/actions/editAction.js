export const editProfile = (profile) => {
return async (dispatch, getState, { getFirestore, getFirebase }) => {
  const firebase = getFirebase();
  const user = await firebase
      .auth()
      .currentUser
      .updateProfile({
        firstName: profile.firstName,
        lastName: profile.lastName
      });
      dispatch({ type: "EDITPROFILE_SUCCESS", user })
      console.log("user = " + profile.firstName);

};
}