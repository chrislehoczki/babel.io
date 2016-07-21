import dispatcher from "../dispatcher";

export function initiateUser(user) {
  dispatcher.dispatch({
    type: "INITIATE_USER",
    user: user,
  });
};

export function removeUser() {
  dispatcher.dispatch({
    type: "REMOVE_USER",
    user: null,
  });
};
