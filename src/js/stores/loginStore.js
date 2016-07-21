import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class LoginStore extends EventEmitter {
  constructor() {
    super();
    this.user = false;
  };

  getUser() {
    console.log("calling get user at store");
    let user = this.user ? this.user : null;

    return user;
    
  };

  getUserName() {
    let user = this.user ? this.user : null;
    console.log("CALLING GET USERNAME", user)
    if (!user) {
      return null;
    }

    console.log("FACEBOOK", this.user.facebook)
    console.log("LOCAL", this.user.local)
    let mainData;
    if (this.user.facebook) {
      if (this.user.facebook.firstName) {
        mainData = this.user.facebook;
      }
      else {
         mainData = this.user.local;
      }
    }
    else {
      mainData = this.user.local;
    }
    console.log("this is user data", mainData)
   
    return mainData.firstName;

  };
  

 handleActions(action) {
    switch(action.type) {
      case "INITIATE_USER": {
        console.log("calling initiate user");
        this.user = action.user;
        break;
      }
      case "REMOVE_USER": {
        this.user = null;
        break;
      };
    };
  };

};

const loginStore = new LoginStore;
dispatcher.register(loginStore.handleActions.bind(loginStore));


export default loginStore;