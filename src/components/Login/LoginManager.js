import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";

export const initializeFramework = () => {
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }
};

const storeAuthToken = () => {
  firebase
    .auth()
    .currentUser.getIdToken(/* forceRefresh */ true)
    .then(function (idToken) {
      sessionStorage.setItem("token", idToken);
      console.log({ idToken: idToken });
    })
    .catch(function (error) {
      console.log({ error: error });
    });
};

export const googleSignIn = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(googleProvider)
    .then((response) => {
      const user = response.user;
      const newUser = { ...user };
      newUser.username = user.displayName;
      storeAuthToken();
      sessionStorage.setItem("email", newUser.email);
      console.log(newUser);
      return newUser;
    })
    .catch((err) => {
      console.log(err);
      console.log(err.message);
    });
};

export const facebookSignIn = () => {
  const facebookProvider = new firebase.auth.FacebookAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(facebookProvider)
    .then((response) => {
      const fbUser = response.user;
      storeAuthToken();
      console.log("Facebook response : ", fbUser);
      return fbUser;
    })
    .catch((error) => {
      console.log(error);
      console.log(error.message);
    });
};

export const getCurrentUser = () => {
  return firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log("current user", user);
      return user;
    } else {
      return null;
    }
  });
};

export const updateUserProfile = (username, email, password) => {
  const user = firebase.auth().currentUser;

  user
    .updateProfile({
      username: `${username}`,
      email: `${email}`,
      password: `${password}`,
    })
    .then(function (user) {
      console.log("Updated profile", user);
      return user;
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const SignOut = () => {
  return firebase
    .auth()
    .signOut()
    .then((response) => {
      const user = "";
      return user;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export const signInUser = (email, password) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((response) => {
      const newUserInfo = response.user;
      newUserInfo.success = true;
      newUserInfo.errorMessage = "";
      storeAuthToken();
      console.log(newUserInfo);
      return newUserInfo;
    })
    .catch((err) => {
      const newUserInfo = {};
      newUserInfo.success = false;
      newUserInfo.errorMessage = err.message;
      return newUserInfo;
    });
};

export const signUpNewUser = (username, email, confirmPassword) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, confirmPassword)
    .then((response) => {
      const newUserInfo = response.user;
      newUserInfo.success = true;
      newUserInfo.username = username;
      newUserInfo.errorMessage = "";
      storeAuthToken();
      return newUserInfo;
    })
    .catch((err) => {
      const newUserInfo = {};
      newUserInfo.success = false;
      newUserInfo.username = "";
      newUserInfo.errorMessage = err.message;
      return newUserInfo;
    });
};
