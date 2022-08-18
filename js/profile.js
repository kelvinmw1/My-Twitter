// find out who is logged in using id
firebase.auth().onAuthStateChanged((user)=>{
    if(user){

        // getting user id
        var userid = user.uid;
        console.log(userid);

        // read data from firestore using userid

        firebase.firestore().collection("users").doc(userid).get().then((doc)=>{

            // get username based on the logic above

            var theUserName = doc.data().userName;
            var theEmail = doc.data().userEmail;
            var thesingUptime = doc.data().signUptime;
            var thedate = thesingUptime.toDate().toDateString();
        

            // set the element to contain the username date and email retrived above

            document.getElementById("username").innerText = theUserName;
            document.getElementById("useremail").innerText = theEmail;
            document.getElementById("usertime").innerText = thedate;
        })
    }
})