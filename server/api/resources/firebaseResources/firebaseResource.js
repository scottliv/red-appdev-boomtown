const firebase = require("firebase");
require("firebase/auth");

module.exports = app => {
  const firebaseApp = firebase.initializeApp(app.get("FIREBASE_CONFIG"));
  const db = firebaseApp.database();

  return {
    async getUsers() {
      let users = await db.ref("/users").once("value");

      const userList = [];
      users = users.val();
      for (userid in users) {
        userList.push({
          id: userid,
          email: users[userid].email,
          fullname: users[userid].fullname
        });
      }
      return userList;
    },

    async getUser(userid) {
      let user = await db.ref(`/users/${userid}`).once("value");
      user = user.val();
      return {
        id: userid,
        ...user
      };
    }
  };
};
