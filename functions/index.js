const functions = require("firebase-functions");
const admin = require("firebase-admin");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
admin.initializeApp();
exports.userCreated = functions.auth.user().onCreate(async (user) => {
  const { uid } = user;
  const getUserAmount = await admin
    .firestore()
    .collection("counting")
    .doc("people")
    .get();
  const amount = getUserAmount.data().user;

  admin
    .firestore()
    .collection("users")
    .doc(uid)
    .set({
      name: `User#${amount.toString().padStart(4, "0")}`,
      score: 0,
    })
    .then(() =>
      admin
        .firestore()
        .collection("counting")
        .doc("people")
        .update({ user: admin.firestore.FieldValue.increment(1) })
    );

  console.log(`created user:${uid} success`);
  return "Success";
});
