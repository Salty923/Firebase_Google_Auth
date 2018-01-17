



// Initialize Firebase
 var config = {
    apiKey: "AIzaSyDgaQj-tLc13Zhx7LCgLHZuw_t12j43-g4",
    authDomain: "pet-project-1515724361205.firebaseapp.com",
    databaseURL: "https://pet-project-1515724361205.firebaseio.com",
    projectId: "pet-project-1515724361205",
    storageBucket: "pet-project-1515724361205.appspot.com",
    messagingSenderId: "1092263402676"
  };
firebase.initializeApp(config);

var provider = new firebase.auth.GoogleAuthProvider();

var database = firebase.database();

var user = firebase.auth().currentUser;
var name, email, photoUrl, uid, emailVerified;

if (user != null) {
    name = user.displayName;
    email = user.email;
    photoUrl = user.photoURL;
    emailVerified = user.emailVerified;
    uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
    // this value to authenticate with your backend server, if
    // you have one. Use User.getToken() instead.
}



$("#signInBtn").on("click",function () {
    firebase.auth().signInWithRedirect(provider);
    firebase.auth().getRedirectResult().then(function (result) {
        if (result.credential) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // ...
        }
        // The signed-in user info.
        var user = result.user;
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });
  });

  $("#submitBtn").on("click",function () {
      database.ref().set(user);
      alert(user);
    })
  


  

$("#signOutBtn").on("click",function () {
    //Logout code
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
    }).catch(function (error) {
        // An error happened.
    });
    
})
  

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        alert("signed in");
    } else {
        // No user is signed in.
        alert("signed out");
    }
});